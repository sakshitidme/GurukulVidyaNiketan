const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Email transporter (only active if SMTP_PASS is configured)
const createTransporter = () => {
  if (!process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Local memory store for OTPs format: { "9876543210": { otp: "1234", expiry: 17181812312 } }
const otpStore = new Map();

// POST /api/admissions/send-otp
router.post('/send-otp', async (req, res) => {
  try {
    const { phone, name } = req.body;
    if (!phone || phone.length !== 10) return res.status(400).json({ success: false, message: 'Invalid phone number' });

    // Generate 4 digit random OTP for production
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Calculate expiry (5 minutes)
    const expiry = Date.now() + 5 * 60 * 1000;
    
    // Save to store
    otpStore.set(phone, { otp, expiry });

    // Construct SMS URL
    const username = 'bkeducation@999';
    const pass = 'Intel@2026';
    const senderid = 'BKEWSN';
    const tempid = '1707177530128300775';
    const safeName = name ? name.trim().split(' ')[0] : 'Parent';
    const message = `Hi ${safeName},Your login OTP is ${otp} Sanskar English Medium School Team BK Educational and Welfare Society.`;
    
    const smsUrl = `https://www.smsjust.com/sms/user/urlsms.php?username=${username}&pass=${pass}&senderid=${senderid}&dest_mobileno=${phone}&msgtype=TXT&message=${encodeURIComponent(message)}&tempid=${tempid}`;

    // Fetch SMS sending URL
    const smsResponse = await fetch(smsUrl);
    const smsText = await smsResponse.text();
    console.log(`[SMS Gateway] Response for ${phone}:`, smsText);

    res.json({ success: true, message: 'OTP sent successfully via SMS' });
  } catch (error) {
    console.error('[OTP] Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// POST /api/admissions/verify-otp
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const record = otpStore.get(phone);

    if (!record) {
      return res.status(400).json({ success: false, message: 'OTP not found or has not been sent yet.' });
    }

    if (Date.now() > record.expiry) {
      otpStore.delete(phone);
      return res.status(400).json({ success: false, message: 'OTP has expired.' });
    }

    if (record.otp === otp.toString().trim()) {
      // Keep it in store momentarily or just delete. We delete to prevent reuse.
      otpStore.delete(phone);
      return res.json({ success: true, message: 'OTP verified successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('[OTP] Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
});

// POST /api/admissions/create-order
router.post('/create-order', async (req, res) => {
  try {
    const options = {
      amount: 200 * 100, // Rs. 200 in paise
      currency: "INR",
      receipt: "receipt_order_200", // Can be dynamic
    };
    
    const order = await razorpay.orders.create(options);
    
    if (!order) {
      return res.status(500).json({ success: false, message: 'Some error occurred while creating order' });
    }
    
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Error creating razorpay order:', error);
    res.status(500).json({ success: false, message: 'Could not create order' });
  }
});

// POST /api/admissions
router.post('/', upload.fields([
  { name: 'studentPhoto', maxCount: 1 },
  { name: 'fatherPhoto', maxCount: 1 },
  { name: 'motherPhoto', maxCount: 1 },
  { name: 'fatherSignature', maxCount: 1 },
  { name: 'motherSignature', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('[DEBUG] Admissions Body:', req.body);
    console.log('[DEBUG] Admissions Files:', req.files ? Object.keys(req.files) : 'None');
    
    // Helper to get nested field either as "key[subKey]" or "key.subKey"
    const body = req.body;
    const getValue = (key, subKey) => {
      // Direct access e.g. body['studentName[firstName]']
      if (body[`${key}[${subKey}]`] !== undefined) return body[`${key}[${subKey}]`];
      // Object access e.g. body.studentName.firstName (if some middleware parsed it)
      if (body[key] && typeof body[key] === 'object') return body[key][subKey];
      return undefined;
    };

    const admissionData = {
      studentName: {
        surname: getValue('studentName', 'surname'),
        firstName: getValue('studentName', 'firstName'),
        middleName: getValue('studentName', 'middleName')
      },
      fatherName: {
        surname: getValue('fatherName', 'surname'),
        firstName: getValue('fatherName', 'firstName'),
        middleName: getValue('fatherName', 'middleName'),
        education: getValue('fatherName', 'education')
      },
      motherName: {
        surname: getValue('motherName', 'surname'),
        firstName: getValue('motherName', 'firstName'),
        middleName: getValue('motherName', 'middleName'),
        education: getValue('motherName', 'education')
      },
      dateOfBirth: body.dateOfBirth,
      applyingForGrade: body.applyingForGrade,
      disability: body.disability,
      disabilityType: body.disabilityType,
      category: body.category,
      email: body.email,
      phone: body.phone,
      residentialAddress: body.residentialAddress,
      pincode: body.pincode,
      photos: {
        studentPhoto: req.files['studentPhoto'] ? req.files['studentPhoto'][0].path : undefined,
        fatherPhoto: req.files['fatherPhoto'] ? req.files['fatherPhoto'][0].path : undefined,
        motherPhoto: req.files['motherPhoto'] ? req.files['motherPhoto'][0].path : undefined
      },
      signatures: {
        father: req.files['fatherSignature'] ? req.files['fatherSignature'][0].path : undefined,
        mother: req.files['motherSignature'] ? req.files['motherSignature'][0].path : undefined
      },
      registrationFeePaid: true,
      paymentDetails: {
        razorpay_order_id: body.razorpay_order_id,
        razorpay_payment_id: body.razorpay_payment_id,
        razorpay_signature: body.razorpay_signature
      }
    };

    // Verify Signature
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    if (razorpay_order_id && razorpay_payment_id && razorpay_signature) {
      const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
      hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      const generated_signature = hmac.digest('hex');
      
      if (generated_signature !== razorpay_signature) {
         return res.status(400).json({ success: false, message: 'Payment verification failed. Invalid signature.' });
      }
    } else {
      return res.status(400).json({ success: false, message: 'Payment details are missing.' });
    }
    // TEMP BYPASS TO AVOID MONGOOSE TIMEOUT DURING TESTING
    const newAdmission = admissionData; // Just a dummy object for the response
    // await new Admission(admissionData).save();
    console.log('[DB BYPASS] Admission data not saved to MongoDB to allow Payment Testing');

    // Send confirmation email if SMTP is configured
    const transporter = createTransporter();
    if (transporter && body.email) {
      const studentFullName = `${admissionData.studentName.firstName} ${admissionData.studentName.middleName} ${admissionData.studentName.surname}`.trim();
      const parentFullName = `${admissionData.fatherName.firstName} ${admissionData.fatherName.surname}`.trim();
      try {
        await transporter.sendMail({
          from: `"Gurukul Vidya Niketan" <${process.env.SMTP_USER}>`,
          to: body.email,
          subject: '✅ Admission Confirmation — Gurukul Vidya Niketan',
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
              <div style="background:#3b82f6;color:#fff;padding:24px;text-align:center;">
                <h2 style="margin:0;">Gurukul Vidya Niketan</h2>
                <p style="margin:4px 0 0;font-size:14px;">Admission Confirmation</p>
              </div>
              <div style="padding:24px;">
                <p>Dear <strong>${parentFullName}</strong>,</p>
                <p>Thank you for taking admission to Gurukul Vidya Niketan for child <strong>${studentFullName}</strong> in class <strong>${admissionData.applyingForGrade}</strong>.</p>
                <p>Our team will review your application and get back to you soon.</p>
                <br/>
                <p>Regards,</p>
                <p><strong>Gurukul Vidya Niketan</strong></p>
              </div>
              <div style="background:#f8fafc;text-align:center;padding:12px;font-size:12px;color:#64748b;">
                This is an automated email. Please do not reply to this message.
              </div>
            </div>
          `
        });
        console.log(`[EMAIL] Confirmation sent to ${body.email}`);      } catch (emailErr) {
        console.error('[EMAIL] Failed to send confirmation:', emailErr.message);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: 'Admission inquiry submitted successfully!',
      data: newAdmission
    });
  } catch (error) {
    console.error('Admission submission error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to submit admission inquiry.'
    });
  }
});

const authMiddleware = require('../middleware/auth');

// GET /api/admissions (Protected for admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ submittedAt: -1 });
    res.status(200).json({
      success: true,
      data: admissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admissions.'
    });
  }
});

module.exports = router;
