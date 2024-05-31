const nodemailer = require("nodemailer");
async function sendEmail(email, subject, template) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zahidulislam1971kvs@gmail.com",
      pass: "alyxaywgutojhghv",
    },
  });
  const info = await transporter.sendMail({
    from: `"OREBI" <zahidulislam1971kvs@gmail.com>`,
    to: email,
    subject: subject,
    html: template,
  });
}
module.exports = sendEmail;
