const nodemailer = require('nodemailer');
const db = require('../config/db'); 
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendPromotionalEmails = async () => {
  try {
  
    const [rows] = await db.query('SELECT username FROM users'); 

    if (rows.length === 0) {
      console.log('No users found');
      return;
    }

  
    rows.forEach((row) => {
      const mailOptions = {
        from: process.env.EMAIL,
        to: row.email,
        subject: 'Weekly Promotions',
        text: 'Check out our latest promotions and exciting products!'
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email to', row.email, ':', error);
        } else {
          console.log('Promotional email sent to', row.email, ':', info.response);
        }
      });
    });
  } catch (error) {
    console.log('Error fetching user emails:', error);
  }
};

module.exports = { sendPromotionalEmails };
