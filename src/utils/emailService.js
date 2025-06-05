import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
dotenv.config({path: '../.env'});

  const sendEmail = async (newPassword, email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"Your ecommerce password" <pk.hmrtech@gmail.com>',
    to: email,
    subject: 'Your new password',
    text: `Your password has been reset. Your new password is: ${newPassword}`,
  };

  try {
    
    await transporter.sendMail(mailOptions);
  
  } catch (error) {
   
    throw error;
  
  }
};

export{
  sendEmail
}