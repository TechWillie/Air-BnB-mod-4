const express = require('express');
const { Review, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validationResult, body } = require('express-validator');
const router = express.Router();

// Validation for review attributes
const validateReview = [
  body('review').isString().notEmpty().withMessage('Review text is required'),
  body('stars').isInt({ min: 1, max: 5 }).withMessage('Stars must be an integer between 1 and 5'),
];

// Create Review for a Spot
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    // Destructure
  const { spotId } = req.params;
  const { review, stars } = req.body;
// check for errors
  const errors = validationResult(req);

  // If validation errors exist
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);

    // If the spot does NOT exist, return 404 error
    if (!spot) {
      return res.status(404).json({ message: 'Spot not found' });
    }

    // Has the current user already reviewed this spot?...
    const existingReview = await Review.findOne({
      where: {
        spotId: spotId,
        userId: req.user.id,
      },
    });
    // If so: 
    if (existingReview) {
        // return status 403 "Understands the request but will NOT allow access"
      return res.status(403).json({ message: 'You have already reviewed this spot' });
    }

    // Otherwise,.
    // Create the new review
    const newReview = await Review.create({
      review,
      stars,
      spotId,
      userId: req.user.id,
    });

    // Return the new review data
    return res.status(201).json({
      id: newReview.id,
      userId: newReview.userId,
      spotId: newReview.spotId,
      review: newReview.review,
      stars: newReview.stars,
      createdAt: newReview.createdAt,
      updatedAt: newReview.updatedAt,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create the review' });
  }
});

module.exports = router;
