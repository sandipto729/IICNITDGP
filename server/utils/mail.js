require('dotenv').config();

const nodemailer = require('nodemailer');
const password = process.env.PassKey;
console.log(password);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'iifnitdgp@gmail.com',
    pass: password,
  },
});

const sendEmail = async (to, subject, text, attachments = []) => {
  const mailOptions = {
    from: 'iifnitdgp@gmail.com',
    to: to,
    subject: subject,
    text: text,
    attachments: attachments, 
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;