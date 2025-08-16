import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    const snapshot = await getDocs(collection(db, "memberships"));
    const membersToEmail = snapshot.docs
      .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
      .filter((m) => m.verified && !m.emailSent);

    for (const member of membersToEmail) {
      const msg = {
        to: member.email,
        from: "arya.dhavalv@gmail.com", // your verified sender
        subject: "🎉 Arya Samaj Seawoods Membership Verified!",
        html: `
          <h2>Namaste ${member.name},</h2>
          <p>Your membership has been verified. Welcome to Arya Samaj Seawoods!</p>
          <p>✨ कृण्वन्तो विश्वमार्यम् ✨</p>
          <p>Website: https://www.aryasamajseawoods.org</p>
        `,
      };

      await sgMail.send(msg);

      const memberRef = doc(db, "memberships", member.id);
      await updateDoc(memberRef, { emailSent: true });
    }

    res.status(200).json({ message: `Sent ${membersToEmail.length} verification emails.` });
  } catch {
    res.status(500).json({ message: "Error sending emails." });
  }
}
