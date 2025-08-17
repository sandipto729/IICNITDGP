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

const sendEmail = async (to, subject, content, attachments = []) => {
  // Determine if content is HTML or plain text
  const isHTML = content.includes('<') && content.includes('>');
  
  const mailOptions = {
    from: 'iifnitdgp@gmail.com',
    to: to,
    subject: subject,
    ...(isHTML ? { html: content } : { text: content }),
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