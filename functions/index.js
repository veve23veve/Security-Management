const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// ✅ Replace with your Gmail and App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourgmail@gmail.com",           // ✅ Your Gmail address
    pass: "jdknzotaiiofeetf"         // ✅ 16-digit App Password (not Gmail password)
  }
});

exports.emailSekkiSupport = functions.https.onRequest(async (req, res) => {
  const { companyName, licenseNumber, contactPerson, contactEmail, contactPhone, address } = req.body;

  const mailOptions = {
    from: "Sekki Platform <yourgmail@gmail.com>",
    to: "support@sekki.com.au",
    subject: `New Company Registration – ${companyName}`,
    text: `
📢 A new company just registered:

Company: ${companyName}
License: ${licenseNumber}
Contact Person: ${contactPerson}
Email: ${contactEmail}
Phone: ${contactPhone}
Address: ${address}

Log in to approve this request from your Super Admin dashboard.
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("✅ Email sent to Sekki Support.");
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    res.status(500).send("Email failed.");
  }
});
