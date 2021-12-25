"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST_SMTP_ADDRESS,
    port: process.env.EMAIL_HOST_SMTP_PORT,
    secure: process.env.EMAIL_HOST_SMTP_SECURE,
    auth: {
      user: process.env.EMAIL_AUTH_ADDRESS,
      pass: process.env.EMAIL_AUTH_PASSWORD,
    },
  });
}

const sendVerifyMail = (to) => {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"${process.env.EMAIL_INFO_NAME}" <${process.env.EMAIL_AUTH_ADDRESS}>`, // sender address
    to,
    subject: "Email Verification Code", // Subject line
    text: "Hello world?", // plain text body
    html: fs.readFileSync("../../assets/email/verify_email.html", "utf8"), // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

main().catch(console.error);
