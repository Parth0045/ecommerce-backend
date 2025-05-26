import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
       user: process.env.EMAIL_USER || 'pk.hmrtech@gmail.com',   
      pass: process.env.EMAIL_PASS || 'luqy zqlm imjc qdcw',   
    },
  });

  const mailOptions = {
    from: '"Your ecommerce password" <pk.hmrtech@gmail.com>',
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
