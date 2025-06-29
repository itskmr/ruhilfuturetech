const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

const sendMail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"RFT Careers" <${process.env.EMAIL}>`,
      to,
      subject,
      html
    });
    console.log('✅ Email sent:', info.response);
  } catch (err) {
    console.error('❌ Email sending error:', err.message || err);
    throw err; // Let the calling function handle it
  }
};

module.exports = sendMail;
