const express = require('express');
const {SpotImage, Spot} = require('../../db/models');
const { requireAuth } = require('../../utils/auth'); // Ensure user is authenticated
const router = express.Router();

// ! DELETE an image for a sopt 
router.delete('/:imageId', requireAuth, async (req, res) => {
  const {imageId} = req.params;
  const userId = req.user.id;

  try {
    const image = await SpotImage.findByPk(imageId);
    if(!image){
      return res.status(404).json({message: 'Image not found'});
    }
    // Find spot associated with the image
    const spot = await Spot.findByPk(image.spotId);
    if (!spot){
      return res.status(404).json({ message: 'Spot not found' });
    }

    // Is user the owner of the spot
    if (spot.ownerId !== userId) {
      return res.status(403).json({ message: 'Forbidden: You are not authorized to delete this image' });
    }

    // Now.. Delete the image
    await image.destroy();
    return res.json({message: 'Image successfully deleted' });
  }catch(error){
    console.error(error);
    return res.status(500).json({message: 'Internal server error'});
  }
});

// ! Delete an image for a review
router.delete('/:imageId', requireAuth, async (req, res) => {
    const {imageId} = req.params;
    const userId = req.user.id;
    try{
      // if image exist?
      const image = await ReviewImage.findByPk(imageId);
      if(!image){return res.status(404).json({message: 'Review image not found'});
    }
  
      // review linked to the image
      const review = await Review.findByPk(image.reviewId);
      if(!review){return res.status(404).json({message: 'Review not found'});
    }
  
      // if user is the owner of the review?
      if(review.userId !== userId){
        return res.status(403).json({message: 'Forbidden: Not authorized to delete this image'});
      }
      // Delete image
      await image.destroy();
      // Return success message
      return res.json({message: 'Review image successfully deleted'});
    }catch(error){
      console.error(error);
      return res.status(500).json({message: 'Internal server error'});
    }
  });

module.exports = router;
