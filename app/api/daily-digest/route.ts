// import { NextRequest } from "next/server";
import { initializeApp, cert, getApps, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// ---- Types ----
interface Membership {
  name?: string;
  mobile?: string;
  email?: string;
  dob?: string | FirebaseFirestore.Timestamp | Date;
  membershipValidTill?: string | FirebaseFirestore.Timestamp | Date;
  paymentRef?: string;
}

// ---- ENV ----
const {
  FB_PROJECT_ID,
  FB_CLIENT_EMAIL,
  FB_PRIVATE_KEY,
  GMAIL_USER,
  GMAIL_APP_PASSWORD,
  DIGEST_TO_EMAIL,
} = process.env;

// ---- Firebase Admin init ----
if (!getApps().length) {
  const key =
    (FB_PRIVATE_KEY || "").includes("\\n")
      ? FB_PRIVATE_KEY!.replace(/\\n/g, "\n")
      : FB_PRIVATE_KEY || "";

  initializeApp({
    credential: cert({
      projectId: FB_PROJECT_ID!,
      clientEmail: FB_CLIENT_EMAIL!,
      privateKey: key,
    } as ServiceAccount),
  });
}
const db = getFirestore();

// ---- Helpers ----
function istTodayRange() {
  const tz = "Asia/Kolkata";
  const now = new Date();
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [Y, M, D] = fmt.format(now).split("-");
  const start = new Date(`${Y}-${M}-${D}T00:00:00+05:30`);
  const end = new Date(`${Y}-${M}-${D}T23:59:59.999+05:30`);
  return { Y, M, D, start, end };
}

function extractDate(v: unknown): Date | undefined {
  if (!v) return undefined;

  if (typeof v === "string") {
    const m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) return new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`);

    const t = Date.parse(v);
    if (!isNaN(t)) return new Date(t);
    return undefined;
  }

  if (v instanceof Date) return v;

  if (typeof (v as { toDate?: () => Date }).toDate === "function") {
    return (v as { toDate: () => Date }).toDate();
  }

  return undefined;
}

function fmtIN(d?: Date): string {
  return d ? new Intl.DateTimeFormat("en-IN").format(d) : "";
}

function isBirthdayToday(
  dob: string | Date | FirebaseFirestore.Timestamp | undefined,
  M: string,
  D: string
): boolean {
  const dt = extractDate(dob);
  if (!dt) return false;
  return (
    String(dt.getMonth() + 1).padStart(2, "0") === M &&
    String(dt.getDate()).padStart(2, "0") === D
  );
}

function htmlTable(title: string, rows: string[][], cols: string[]) {
  if (!rows.length) return `<h3>${title}</h3><p>None</p>`;
  const head = cols
    .map(
      (c) =>
        `<th style="text-align:left;padding:6px 10px;">${c}</th>`
    )
    .join("");
  const body = rows
    .map(
      (r) =>
        `<tr>${r
          .map((v) => `<td style="padding:6px 10px;">${v ?? ""}</td>`)
          .join("")}</tr>`
    )
    .join("");
  return `<h3>${title}</h3>
  <table border="1" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
    <thead><tr>${head}</tr></thead><tbody>${body}</tbody>
  </table>`;
}

// ---- Email sender (Gmail SMTP via App Password) ----
async function sendEmail({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });
  await transporter.sendMail({
    from: `Arya Samaj Seawoods <${GMAIL_USER}>`,
    to: DIGEST_TO_EMAIL,
    subject,
    html,
  });
}

// ---- Handler ----
export async function GET() {
  // For testing locally, let this run without cron header.
  // For prod, uncomment below guard:
  // const isCron = req.headers.get("x-vercel-cron") === "true";
  // if (process.env.NODE_ENV === "production" && !isCron) {
  //   return new Response("Forbidden", { status: 403 });
  // }

  const { Y, M, D, start, end } = istTodayRange();
  const startTs = Timestamp.fromDate(start);
  const endTs = Timestamp.fromDate(end);

  const snap = await db.collection("memberships").get();

  const birthdays: string[][] = [];
  const expiring: string[][] = [];

  for (const doc of snap.docs) {
    const x = doc.data() as Membership;

    if (isBirthdayToday(x.dob, M, D)) {
      birthdays.push([
        x.name || "",
        x.mobile || "",
        x.email || "",
        fmtIN(extractDate(x.dob)),
      ]);
    }

    const till = extractDate(x.membershipValidTill);
    if (till) {
      const ms = till.getTime();
      if (ms >= startTs.toMillis() && ms < endTs.toMillis()) {
        expiring.push([
          x.name || "",
          x.mobile || "",
          x.email || "",
          fmtIN(till),
          x.paymentRef || "",
        ]);
      }
    }
  }

  const subject = `Daily Digest • ${D}-${M}-${Y} (Birthdays & Expiring Memberships)`;
  const html = `
    <div style="font-family:system-ui,Segoe UI,Arial,sans-serif">
      <h2>Arya Samaj Seawoods — Daily Admin Digest</h2>
      ${htmlTable("🎂 Birthdays Today", birthdays, [
        "Name",
        "Mobile",
        "Email",
        "DOB",
      ])}
      <br/>
      ${htmlTable("🗓️ Memberships Ending Today", expiring, [
        "Name",
        "Mobile",
        "Email",
        "Valid Till",
        "Payment Ref",
      ])}
      <p style="margin-top:16px;color:#666">Auto-generated at 08:00 IST.</p>
    </div>`;

  await sendEmail({ subject, html });

  return new Response("ok");
}
