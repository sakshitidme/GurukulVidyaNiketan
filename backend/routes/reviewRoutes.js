const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const authMiddleware = require('../middleware/auth');

// @route   POST api/reviews
// @desc    Submit a new review
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, content, stars, role } = req.body;
    if (!name || !content) {
      return res.status(400).json({ success: false, message: 'Please provide Name and Content' });
    }
    const newReview = new Review({ name, content, stars, role: role || 'Parent' });
    await newReview.save();
    res.status(201).json({ success: true, message: 'Review submitted and pending approval.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET api/reviews
// @desc    Get all approved reviews
// @access  Public
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'Approved' }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET api/reviews/admin
// @desc    Get all reviews for admin
// @access  Private (Admin)
router.get('/admin', authMiddleware, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT api/reviews/admin/:id
// @desc    Update review status
// @access  Private (Admin)
router.put('/admin/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const review = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    res.status(200).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE api/reviews/admin/:id
// @desc    Delete a review
// @access  Private (Admin)
router.delete('/admin/:id', authMiddleware, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    res.status(200).json({ success: true, message: 'Review deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
