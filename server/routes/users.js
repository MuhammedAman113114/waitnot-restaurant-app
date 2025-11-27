import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userDB } from '../db.js';

const router = express.Router();

// Store OTPs temporarily (in production, use Redis)
const otpStore = new Map();

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP (in production, integrate with SMS service like Twilio)
router.post('/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || phone.length !== 10) {
      return res.status(400).json({ error: 'Valid 10-digit phone number required' });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with 5 minute expiry
    otpStore.set(phone, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    // In production, send SMS here
    console.log(`OTP for ${phone}: ${otp}`);
    
    // For development, return OTP in response
    res.json({ 
      success: true, 
      message: 'OTP sent successfully',
      // Remove this in production!
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify OTP and login/register
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp, name } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP required' });
    }

    // Check OTP
    const storedOTP = otpStore.get(phone);
    
    if (!storedOTP) {
      return res.status(400).json({ error: 'OTP not found or expired' });
    }

    if (storedOTP.expiresAt < Date.now()) {
      otpStore.delete(phone);
      return res.status(400).json({ error: 'OTP expired' });
    }

    if (storedOTP.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // OTP verified, remove from store
    otpStore.delete(phone);

    // Check if user exists
    let user = await userDB.findByPhone(phone);

    if (!user) {
      // Create new user
      user = await userDB.create({
        phone,
        name: name || 'User',
        createdAt: new Date()
      });
    } else if (name && name !== user.name) {
      // Update name if provided
      user = await userDB.update(user._id, { name });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');
    const user = await userDB.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user._id,
      phone: user.phone,
      name: user.name
    });
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Get user's order history
router.get('/orders', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');
    const user = await userDB.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get orders by phone number
    const { orderDB } = await import('../db.js');
    const orders = await orderDB.findByPhone(user.phone);

    res.json(orders);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
