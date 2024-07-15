const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendOrderConfirmation = (order,username) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: username,
    subject: 'Order Confirmation',
    text: `Thank you for your order please visit us again, ${order.customerName}!`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendOrderConfirmation };
