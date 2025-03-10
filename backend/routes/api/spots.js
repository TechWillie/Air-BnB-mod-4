// backend/routes/api/spots.js
const express = require('express');
const router = express.Router();
// Imports from the model class
const { Spot, Image, Review, User } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');
const { validationResult, body } = require('express-validator');

//! GET all spots
router.get('/', async (req, res) => {
  try {
    //Fetch from the database
    const spots = await Spot.findAll({
      include: [{model: Review}]
    });
    console.log(spots);
    
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
      avgRating: spot.dataValues.Reviews.reduce((accum, review) => {
        // console.log(review.stars);
        accum += review.stars
        // console.log(accum);
        return accum
      }, 0 )/ spot.dataValues.Reviews.length,
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
  console.log("this willie spot id for images");
  
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

//! Get all spots owned by the current user
router.get('/current', requireAuth, async (req, res) => {
  try {
    // Fetch spots from the Spot table and asve to a variable
    const spots = await Spot.findAll({
      // Make sure owned by the authenticated user
      where: {
        ownerId: req.user.id,  // Ensure spots belong to the current user
      },
      include: [
        // Include images to get the preview image
        {
          model: Image,
          attributes: ['url', 'preview'],
          // where: { preview: true }, 
          // Not all spots may have a preview image
          required: false, 
        },
      ],
      attributes: [
        'id',
        'ownerId',
        'address',
        'city',
        'state',
        'country',
        'lat',
        'lng',
        'name',
        'description',
        'price',
        'createdAt',
        'updatedAt',
      ],
    });

    // If no spots found, return 404 error message
    if (!spots.length) {
      return res.status(404).json({ message: "No spots found for the current user" });
    }

    // Format the response to include previewImage
    // Map through the spots array you created. 
    const spotData = spots.map(spot => {
    // For each spot, check if the spot has any images...
    const previewImage = spot.Images.length > 0 
    // if so, set the previewImage to the URL of the first image.
    ? spot.Images[0].url : null; // Take first preview image
    //  If there are no images, you're setting previewImage to null.

      return {
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
        previewImage, // Add previewImage field
      };
    });

    return res.json(spotData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch spots" });
  }
});

// ! Get details for a spot from an id..
// Define the route to get a spot by ID
router.get('/:id', async (req, res) => {
  console.log("get route from BE. req.param Obj: ", req.params);
  try {
    // Get the spot ID from the URL params.. Destructured
    const {id} = req.params
    console.log("th is the id: ", id);
    

    // Fetch the spot model by its ID, 
    // Save to a variable
    const spot = await Spot.findByPk(id, {
      // including related data (Images, User, and Reviews)
      include: [
        {
          model: Image,
          // Only include relevant fields from Image
          attributes: ['id', 'url', 'preview'], 
        },
        {
          // Assuming the User model is related to Spot as the owner
          model: User, 
          // Include relevant user info
          attributes: ['id', 'firstName', 'lastName'], 
        },
        {
          // Include Review model to aggregate data
          model: Review, 
          // No need to return reviews themselves here
          attributes: [] 
        },
      ],
    });

    // Check if the spot exists
    if (!spot) {
      // If not, return error message 404
      return res.status(404).json({ message: 'Spot not found' });
    }

    // Calculate review data: count and average star rating
    const numReviews = await Review.count({ where: { spotId: id } });

    // const avgStarRating = numReviews > 0 
    //   // {spotId: id} => id from params!!
    //   ? await Review.avg('rating', { where: { spotId: id } }) 
    //   // Return null if no reviews exist
    //   : null; 

    // Prepare the response data
    const spotData = {
      id: spot.id,
      ownerId: spot.userId, // Assuming owner ID is stored as `userId` in the Spot table
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
      numReviews, // Lazy load above
      // avgStarRating, // Lazy load above
      previewImage: spot?.previewImage,
      Images: spot.Image, // Associated Images data
      Owner: spot.User, // Associated Owner (User) data
    };

    // Return the spot data as a JSON response
    return res.json(spotData);
  } catch (error) {
    // Handle any errors
    console.error(error);
    return res.status(500).json({ message: 'Willi Internal server error' });
  }
});

// ! EDIT/Update a spot
// save Validates for spot attributes aas array:
const validateSpot = [
  body('address').isString().notEmpty().withMessage('Address is required'),
  body('city').isString().notEmpty().withMessage('City is required'),
  body('state').isString().notEmpty().withMessage('State is required'),
  body('country').isString().notEmpty().withMessage('Country is required'),
  body('lat').isDecimal().withMessage('Latitude must be a number'),
  body('lng').isDecimal().withMessage('Longitude must be a number'),
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('description').isString().notEmpty().withMessage('Description is required'),
  body('price').isDecimal().withMessage('Price must be a number'),
];

//! Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
  const errors = validationResult(req);

  // If validation errors are NOT empty.. Errors exist..
  if (!errors.isEmpty()) {
    // Return 400 "Bad Request: Due to client error"
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  // Destructure the spotId from req.params 
  const { spotId } = req.params;
  // && attributes from req.body
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  try {
    // Find the spot by ID (The primary key)
    const spot = await Spot.findByPk(spotId);
    // If the spot does not exist...
    if (!spot) {
      // return a 404 error "Page not found".
      return res.status(404).json({ message: "Spot not found" });
    }

    // Check if the current user is the owner of the spot
    // If NOT: ( !== )...
    if (spot.ownerId !== req.user.id) {
      // return error.status 403 "Forbiddin: Unable to grant access"
      return res.status(403).json({ message: "You are not the owner of this spot" });
    }
    // If NO ERRORS..
    // Update the spot with new data, Overridding existing data
    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

    // SAVE() the updated spot in the database
    await spot.save();

    // Return the updated spot data
    return res.json({
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
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update the spot" });
  }
});

//! Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  // Destructure the id from url...
  const { spotId } = req.params;

  try {
    // Find the spot by ID you destructured
    const spot = await Spot.findByPk(spotId);

    // If the spot does NOT exist... 
    if (!spot) {
      // return a 404 error "Page not found"
      return res.status(404).json({ message: "Spot not found" });
    }

    // Check if the current user is the owner of the spot
    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({ message: "You are not the owner of this spot" });
    }
    // If no errors
    // Delete the spot
    await spot.destroy();

    // Return success message
    return res.json({ message: "Successfully deleted" });
  } catch (error) {
    // console log the errors
    console.error(error);
    // Return res.status 500 "Internal server error:
    // Unable to complete request from client"
    return res.status(500).json({ message: "Failed to delete the spot" });
  }
});

// ! Query filters to get all spots

// Helper function: pagination and validation
const validate = (query) => {
  // create an array for error messages to go if neccessary
  const errors = [];
  // Valid page and size params
  // https://localhost:8000./api/page?param1=value1&param2=value2
  // If a query parameter exists in url AND is not a number... 
  if(query.page && isNaN(query.page)){
    // Push the error message accoiated with the error
     errors.push('Page must be a number');}
  if(query.size && isNaN(query.size)) errors.push('Size must be a number');

  // Valid lat and lng range
  if(query.minLat && isNaN(query.minLat)) errors.push('minLat must be a number');
  if(query.maxLat && isNaN(query.maxLat)) errors.push('maxLat must be a number');
  if(query.minLng && isNaN(query.minLng)) errors.push('minLng must be a number');
  if(query.maxLng && isNaN(query.maxLng)) errors.push('maxLng must be a number');

  // Valid price range
  if(query.minPrice && isNaN(query.minPrice)) errors.push('minPrice must be a number');
  if(query.maxPrice && isNaN(query.maxPrice)) errors.push('maxPrice must be a number');

  return errors;
};

//! GET /api/spots...
router.get('/', async (req, res) =>{
  // Desturcture
  const {
    // Give page and size defaults
    page = 1, size = 10, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;

  // Validate query parameters
  const errors = validate(req.query);
  if(errors.length > 0){
    return res.status(400).json({errors});
  }

  // Create query filters object
  const filters = {};
  // If values exist for the rest of the queries..
  // (minLat, maxLat, minLng, maxLng, minPrice, maxPrice)
  // 
  if (minLat !== undefined && maxLat !== undefined) {
    filters.lat = 
    // The operator [Op.between] is being used to express this condition in a Sequelize query
    // ? in SQL: lat BETWEEN minLat AND maxLat
    { [Op.between]: [parseFloat(minLat), parseFloat(maxLat)] };
  }
  if (minLng !== undefined && maxLng !== undefined) {
    filters.lng = { [Op.between]: [parseFloat(minLng), parseFloat(maxLng)] };
  }
  if (minPrice !== undefined && maxPrice !== undefined) {
    filters.price = { [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)] };
  }

  try {
    // Calculate pagination limits
    // limit: This defines how many records you want to fetch per page...
    // The value is parsed from the query parameter size, which should be a "string"...
    // Convert it to an integer using parseInt(size, 10)...
    //  The second argument, 10, is the radix... 
    // radix specifies that the string should be parsed as a base-10 integer.
    // the LIMIT is how many entries to post
    const limit = parseInt(size, 10);
    // the OFFSET is how many entries to skip
    const offset = (parseInt(page, 10) - 1) * limit;

    // Query (SEARCH) the spots with filters, limit, and offset
    const spots = await Spot.findAll({
      where: filters,
      limit: limit,
      offset: offset,
      attributes: [
        'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt', 'previewImage'
      ]
    });

    // Return... spots and pagination results
    return res.json({
      spots,
      page: parseInt(page, 10),
      size: limit
    });
  }catch(error){
    console.error(error);
    return res.status(500).json({message: 'Internal server error'});
  }
});

module.exports = router;
