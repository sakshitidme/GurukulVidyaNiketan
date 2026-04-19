const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST route to handle contact form submissions
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create a new contact entry using our model
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });

    // Save it to MongoDB
    await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong. Please try again later.'
    });
  }
});

const authMiddleware = require('../middleware/auth');

// GET route to fetch all contact entries (Protected for admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact inquiries.'
    });
  }
});

module.exports = router;

