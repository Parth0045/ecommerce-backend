import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // use Gmail for simplicity
    auth: {
      user: 'pk.hmrtech@gmail.com',
      pass: 'luqy zqlm imjc qdcw', // App password generated from Google
    },
  });

  const mailOptions = {
    from: '"Your App Name" <pk.hmrtech@gmail.com>',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', to); 
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
