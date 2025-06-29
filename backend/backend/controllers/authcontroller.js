const pool = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/mailer');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// 1. Send OTP for email verification
exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  console.log("after body")


  try {
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: '❌ Email already registered! Please try logging in instead.' });
    }

    const otp = generateOTP();
    console.log("after body after otp generation")

    await pool.query(
      `INSERT INTO email_verifications (email, otp, is_verified, created_at)
       VALUES ($1, $2, false, NOW())
       ON CONFLICT (email) DO UPDATE SET otp = EXCLUDED.otp, is_verified = false, created_at = NOW()`,
      [email, otp]
    );
    console.log("after email insertion")

    await sendMail({
      to: email,
      subject: '📧 Verify Your Email - RFT Careers',
      html: `
        <div style="max-width: 600px; margin: auto; padding: 30px; font-family: Arial, sans-serif; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #e0e0e0;">
          <h1 style="color: #2e7d32; font-size: 28px; text-align: center;">📧 Email Verification</h1>
          
          <p style="font-size: 16px; color: #333; line-height: 1.5;">
            Welcome to RFT Careers! Please verify your email address to complete your registration.
          </p>
          
          <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #e8f5e8; border-radius: 8px; border: 2px solid #4CAF50;">
            <h2 style="color: #2e7d32; font-size: 32px; margin: 0; letter-spacing: 8px; font-family: monospace;">${otp}</h2>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">Your 6-digit verification code</p>
          </div>
          
          <p style="font-size: 14px; color: #666; line-height: 1.5;">
            <strong>⏰ This code is valid for 10 minutes.</strong><br>
            Enter this code in the verification form to complete your registration.
          </p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              <strong>💡 Tip:</strong> If you didn't sign up for RFT Careers, you can safely ignore this email.
            </p>
          </div>
        </div>
      `
    });
    console.log("after mail sending")

    res.json({ message: '✅ Verification code sent to your email! Check your inbox (and spam folder).' });
  } catch (err) {
    console.error('Send OTP error:', err);
    res.status(500).json({ error: '😔 Failed to send verification code! Please try again.' });
  }
};

// 2. Verify OTP for registration
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM email_verifications WHERE email = $1 AND otp = $2 AND created_at > NOW() - INTERVAL \'10 minutes\'',
      [email, otp]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: '❌ Invalid or expired verification code! Please request a new one.' });
    }

    await pool.query('UPDATE email_verifications SET is_verified = true WHERE email = $1', [email]);

    res.json({ message: '✅ Email verified successfully! You can now complete your registration.' });
  } catch (err) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ error: '😔 Failed to verify code! Please try again.' });
  }
};

// 3. Register user (only if OTP is verified)
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const verification = await pool.query('SELECT * FROM email_verifications WHERE email = $1 AND is_verified = true', [email]);
    if (verification.rows.length === 0) {
      return res.status(400).json({ error: '❌ Email not verified! Please verify your email first.' });
    }

    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: '❌ Email already registered! Please try logging in instead.' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashed]
    );

    await pool.query('DELETE FROM email_verifications WHERE email = $1', [email]);

    await sendMail({
      to: email,
      subject: '🎉 Welcome to RFT Careers!',
      html: `
        <div style="max-width: 600px; margin: auto; padding: 30px; font-family: Arial, sans-serif; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #e0e0e0;">
  <h1 style="color: #2e7d32; font-size: 28px; text-align: center;">🎉 Welcome, ${name}!</h1>

  <p style="font-size: 16px; color: #333; line-height: 1.5; text-align: center;">
    We're thrilled to have you onboard with <strong>RFT Careers</strong>.<br>
    You can now explore job opportunities and skill-building courses tailored just for you.
  </p>

  <div style="text-align: center; margin-top: 30px;">
    <a href="https://rftcareers.com/dashboard"
       style="display: inline-block; padding: 12px 25px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
      🚀 Go to Your Dashboard
    </a>
  </div>

  <p style="font-size: 13px; color: #888; margin-top: 40px; text-align: center;">
    If you didn't sign up for RFT Careers, you can safely ignore this email.
  </p>
</div>
`
    });

    res.status(201).json({ message: '🎉 Registration successful! Welcome to RFT Careers!', user: result.rows[0] });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: '😔 Registration failed! Please try again.' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: '❌ Invalid email or password! Please check your credentials and try again.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: '✅ Login successful! Welcome back!', token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: '😔 Login failed! Please try again.' });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: '❌ Email not found! Please check your email address and try again.' });
    }

    const resetCode = generateOTP();

    await pool.query(
      `INSERT INTO email_verifications (email, otp, is_verified, created_at)
       VALUES ($1, $2, false, NOW())
       ON CONFLICT (email) DO UPDATE SET otp = EXCLUDED.otp, is_verified = false, created_at = NOW()`,
      [email, resetCode]
    );

    await sendMail({
      to: email,
      subject: '🔐 Reset Your Password - RFT Careers',
      html: `
        <div style="max-width: 600px; margin: auto; padding: 30px; font-family: Arial, sans-serif; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #e0e0e0;">
          <h1 style="color: #2e7d32; font-size: 28px; text-align: center;">🔐 Password Reset Request</h1>
          
          <p style="font-size: 16px; color: #333; line-height: 1.5;">
            Hello! We received a request to reset your password for your RFT Careers account.
          </p>
          
          <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #e8f5e8; border-radius: 8px; border: 2px solid #4CAF50;">
            <h2 style="color: #2e7d32; font-size: 32px; margin: 0; letter-spacing: 8px; font-family: monospace;">${resetCode}</h2>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">Your 6-digit reset code</p>
          </div>
          
          <p style="font-size: 14px; color: #666; line-height: 1.5;">
            <strong>⏰ This code is valid for 10 minutes.</strong><br>
            If you didn't request this password reset, you can safely ignore this email.
          </p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              <strong>💡 Tip:</strong> Enter this code in the password reset form to create your new password.
            </p>
          </div>
        </div>
      `
    });

    res.json({ message: '✅ Password reset code sent to your email! Check your inbox (and spam folder).' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: '😔 Something went wrong! Please try again in a few moments.' });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const verification = await pool.query(
      'SELECT * FROM email_verifications WHERE email = $1 AND otp = $2 AND created_at > NOW() - INTERVAL \'10 minutes\'',
      [email, otp]
    );

    if (verification.rows.length === 0) {
      return res.status(400).json({ error: '❌ Invalid or expired reset code! Please request a new one.' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2',
      [hashed, email]
    );

    await pool.query('DELETE FROM email_verifications WHERE email = $1', [email]);

    // Send confirmation email
    await sendMail({
      to: email,
      subject: '✅ Password Successfully Reset - RFT Careers',
      html: `
        <div style="max-width: 600px; margin: auto; padding: 30px; font-family: Arial, sans-serif; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #e0e0e0;">
          <h1 style="color: #2e7d32; font-size: 28px; text-align: center;">✅ Password Reset Successful!</h1>
          
          <p style="font-size: 16px; color: #333; line-height: 1.5;">
            Your password has been successfully updated. You can now log in to your RFT Careers account with your new password.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://rftcareers.com/signin"
               style="display: inline-block; padding: 12px 25px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
              🚀 Go to Login
            </a>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #d4edda; border-radius: 8px; border-left: 4px solid #28a745;">
            <p style="margin: 0; color: #155724; font-size: 14px;">
              <strong>🔒 Security Note:</strong> If you didn't make this change, please contact our support team immediately.
            </p>
          </div>
        </div>
      `
    });

    res.json({ message: '🎉 Password reset successful! You can now log in with your new password.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: '😔 Failed to reset password! Please try again.' });
  }
};
