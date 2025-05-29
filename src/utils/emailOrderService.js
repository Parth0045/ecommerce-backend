import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
dotenv.config({path: '../.env'});
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOrderAcceptedEmail = async (toEmail, orderId) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: `Your order form ecommerce has been accepted`,
        text: `Hello,\n\nYour order with ID ${orderId} has been accepted.\n\nThank you for shopping with us!`,
    };
    await transporter.sendMail(mailOptions);
};
export{
    sendOrderAcceptedEmail
}