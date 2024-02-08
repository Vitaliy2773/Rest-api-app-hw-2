const nodemailer = require("nodemailer");
const { nanoid } = require("nanoid");
require("dotenv").config();

const User = require("./models/userModel");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendVerificationEmail(userEmail) {
  try {
    const verificationToken = nanoid();

    await User.findOneAndUpdate({ email: userEmail }, { verificationToken });

    const verificationUrl = `http://localhost:3000/api/users/verify/${verificationToken}`;

    await transporter.sendMail({
      from: "vitalii64773@gmail.com",
      to: userEmail,
      subject: "Please verify your email",
      html: `<p>Please verify your email by clicking on the following link: <a href="${verificationUrl}">Verify Email</a></p>`,
    });

    console.log("Verification email sent to:", userEmail);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}

module.exports = { sendVerificationEmail };
