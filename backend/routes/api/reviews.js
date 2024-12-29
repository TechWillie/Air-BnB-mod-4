const express = require('express');
const { Review, Spot, Image, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validationResult, body } = require('express-validator');
const router = express.Router();


// !Create a Review for a Spot based on the Spot's id
// Validation for review attributes
const validateReview = [
  body('review').isString().notEmpty().withMessage('Review text is required'),
  body('stars').isInt({ min: 1, max: 5 }).withMessage('Stars must be an integer between 1 and 5'),
];

// Create Review for a Spot
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    // Destructure
  const {spotId} = req.params;
  const {review, stars} = req.body;
// check for errors
  const errors = validationResult(req);

  // If errors exist
  if (!errors.isEmpty()){
    // Status 400
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    // Check if the spot exists by its id (Primary key)
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

// ! Ad an image to a review based on the spots id
// Maximum number of images per review (you can adjust this based on your needs)
const MAX_IMAGES = 7;

// First create the route
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    // Destructure
  const { reviewId } = req.params;
  const { url } = req.body;

  try {
    // Does review exists
    const review = await Review.findByPk(reviewId);

    // If not, return a 404 error
    if (!review){
      return res.status(404).json({ message: 'Review not found' });
    }

    // Is the current user the owner of the review
    if (review.userId !== req.user.id){
        // If not.. error 403 
      return res.status(403).json({ message: 'You are not the owner of this review' });
    }

    // Check how many images are already inthe review
    const existingImages = await Image.findAll({
      where: {
        reviewId: reviewId,
      },
    });

    // If review has max images...
    if (existingImages.length >= MAX_IMAGES) {
        //  return a 403 error
      return res.status(403).json({ message: 'Maximum number of images reached for this review' });
    }
    // Finally ...
    // Create the new image for review
    const newImage = await Image.create({
      reviewId,
      url,
    });

    // Return the new image attributes
    return res.status(201).json({
      id: newImage.id,
      url: newImage.url,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to add image to the review' });
  }
});

// ! Get all Reviews of the Current User
// GET all Reviews by Current User
router.get('/current', requireAuth, async (req, res) => {
    try {
      // Find all reviews by current user
      const reviews = await Review.findAll({
        // Make sure it's correct users review 
        where: { userId: req.user.id },
        // Include User (firstName, lastName)
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName'], 
          },
          // Include Spot attributes
          {
            model: Spot,
            attributes: [
              'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage'
            ], 
          },
          // Include ReviewImages
          {
            model: Image,
            attributes: ['id', 'url'], 
          }
        ],
      });
  
      // Return the reviews with the  data
      return res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to fetch reviews' });
    }
  });

// ! Get all Reviews by a Spot's id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
  
    try{
      const spot = await Spot.findByPk(spotId);
      // If no spot...
      if (!spot){
          // return 404 error
        return res.status(404).json({message: 'Spot not found'});
      }
      // Find all reviews for that spot
      const reviews = await Review.findAll({
        where: {spotId},
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
          },
          {
            model: Image,
            attributes: ['id', 'url'],
          },
        ],
      });
      // Return the review
      return res.status(200).json(reviews);
    } catch (error){
      console.error(error);
      return res.status(500).json({message: 'Failed to fetch reviews for this spot' });
    }
  });


  
module.exports = router;
