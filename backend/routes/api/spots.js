// backend/routes/api/spots.js
const express = require('express');
const router = express.Router();
// Imports from the class
const { Spot, Image } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');
const { validationResult, body } = require('express-validator');

//! GET all spots
router.get('/', async (req, res) => {
  try {
    //Fetch from the database
    const spots = await Spot.findAll();

    // Map over all the spots in the table and customize the response
    // Save to a variable..
    const spotsList = spots.map((spot) => ({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      previewImage: spot.previewImage,
      avgRating: spot.avgRating,
    }));

    // Return the spots in the response
    return res.status(200).json(spotsList);
  } catch (error) {
    // If any errors.. Log the error
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

//! Create a new spot

// Validation for new spot fields
const spotValidationRules = [
  body('address').notEmpty().withMessage('Address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('country').notEmpty().withMessage('Country is required'),
  body('lat').isFloat().withMessage('Latitude must be a valid number'),
  body('lng').isFloat().withMessage('Longitude must be a valid number'),
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
];

router.post('/', requireAuth, spotValidationRules, async (req, res) => {
  // First: Check for validation errors
  const errors = validationResult(req);
  // If the errors object is NOT empty.. 
  if (!errors.isEmpty()) {
    // Error 40 is for "Bad Request"
    // Return the 400 status and the errors from validateResults as an array
    return res.status(400).json({ errors: errors.array() });
  }

  // Second: Destructure all the neccessary attributes from the request body 
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  // Save the request user id as the  NEW owner id  
  // Assuming the user is authenticated
  const ownerId = req.user.id; 
  // Third: Now create the spot 
  try {
    const newSpot = await Spot.create({
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    // return res.status(201).json({newSpot})
    return res.status(201).json({
      id: newSpot.id,
      ownerId: newSpot.ownerId,
      address: newSpot.address,
      city: newSpot.city,
      state: newSpot.state,
      country: newSpot.country,
      lat: newSpot.lat,
      lng: newSpot.lng,
      name: newSpot.name,
      description: newSpot.description,
      price: newSpot.price,
      createdAt: newSpot.createdAt,
      updatedAt: newSpot.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create spot' });
  }
});


//! Add an image to a spot based on the Spota id
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;

  // Validate input data
  if (!url || !preview) {
    return res.status(400).json({
      error: "Image URL and preview are required"
    });
  }

  try {
    // Find the spot by id
    const spot = await Spot.findByPk(spotId);

    // If spot doesn't exist, return 404
    if (!spot) {
      return res.status(404).json({ error: "Spot not found" });
    }

    // Check if the authenticated user is the owner of the spot
    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({
        error: "You are not authorized to add an image to this spot"
      });
    }

    // Create the image and associate it with the spot
    const newImage = await Image.create({
      spotId: spot.id,
      url,
      preview,
    });

    // Return the created image data
    return res.status(201).json({
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add image" });
  }
});

//! Add an image to a spot based on the spots id
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;

  // Validate input data
  if (!url || !preview) {
    return res.status(400).json({
      error: "Image URL and preview are required"
    });
  }

  try {
    // Find the spot by its ID
    const spot = await Spot.findByPk(spotId);

    // If spot does not exist, return 404 error
    if (!spot) {
      return res.status(404).json({
        error: "Spot not found"
      });
    }

    // Check if the authenticated user is the owner of the spot
    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({
        error: "You are not authorized to add an image to this spot"
      });
    }

    // Create a new image and associate it with the spot
    const newImage = await Image.create({
      spotId: spot.id,
      url,
      preview,
    });

    // Return the newly created image data
    return res.status(201).json({
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add image" });
  }
});



module.exports = router;
