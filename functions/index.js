import functions from "firebase-functions";
import admin from "firebase-admin";
import sgMail from "@sendgrid/mail";

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.key);

export const sendVerificationEmail = functions.firestore
  .document("memberships/{memberId}")
  .onUpdate((change) => {
    const before = change.before.data();
    const after = change.after.data();

    if (!before.verified && after.verified) {
      const msg = {
        to: after.email,
        from: "arya.dhavalv@gmail.com", // Verified sender in SendGrid
        subject: "🎉 Arya Samaj Seawoods Membership Verified!",
        html: `
          <h2>Namaste ${after.name},</h2>
          <p>We are delighted to confirm your membership with <strong>Arya Samaj Seawoods</strong>.</p>
          <p>Welcome to our family dedicated to truth, knowledge, and service.</p>

          <p style="font-size: 18px; font-weight: bold; color: #444;">✨ कृण्वन्तो विश्वमार्यम् ✨</p>
          <p><em>"Let us make the world noble."</em></p>

          <p>📅 <strong>Every Sunday</strong> we host <strong>Havan, Satsang, and Guest Lectures</strong> starting at 9:00 AM.<br/>
          You're warmly invited to attend and gain spiritual, moral, and social inspiration.</p>

          <p>🌐 Website: <a href="https://www.aryasamajseawoods.org" target="_blank">www.aryasamajseawoods.org</a> (placeholder)</p>
          <p>📞 Contact: +91-9876543210 (placeholder)</p>

          <br/>
          <p>Warm regards,<br/>
          Arya Samaj Seawoods Team</p>
        `,
      };

      return sgMail.send(msg);
    } else {
      return null;
    }
  });
