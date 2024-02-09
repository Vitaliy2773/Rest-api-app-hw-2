const nodemailer = require("nodemailer");

require("dotenv").config();

const apiUrl = process.env.API_URL;
const emailFrom = process.env.EMAIL_FROM;
const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

async function sendVerificationEmail(userEmail, verificationToken) {
  const verificationUrl = `${apiUrl}/api/users/verify/${verificationToken}`;

  try {
    await transporter.sendMail({
      from: emailFrom,
      to: userEmail,
      subject: "Please verify your email",
      html: `<p>Please verify your email by clicking on the following link: <a href="${verificationUrl}">Verify Email</a></p>`,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}

module.exports = { sendVerificationEmail, transporter };
