const express = require('express');
const {Booking, Spot, User} = require('../../db/models');
const {requireAuth} = require('../../utils/auth');
const {check, validationResult} = require('express-validator');
const router = express.Router();

//! Create a Booking from a Spot based on the Spot's id
router.post('/:spotId', requireAuth, [
  // Validate
  check('startDate').isDate().withMessage('Start date is required and should be a valid date'),
  check('endDate').isDate().withMessage('End date is required and should be a valid date'),
  check('startDate').custom((value, {req}) => {
    // new Date(value): converts the value of startDate from req.body.startDate, into a JavaScript Date object.
      if (new Date(value) >= new Date(req.body.endDate)){
        throw new Error('Start date must be before the end date');
      }
      return true;
    }),
], async (req, res) => {
    // Unpack
  const {spotId} = req.params;
  const {startDate, endDate} = req.body;

  // validate errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // spot by ID
    const spot = await Spot.findByPk(spotId);
    // if spot exists
    if (!spot){
      return res.status(404).json({message: 'Spot not found'});
    }
    // current user is owner of spot?
    if (spot.ownerId === req.user.id) {
        //  401 "Unauthorized: Indicates thaat a login failed"
      return res.status(403).json({message: 'You cannot book your own spot'});
    }
    // Check for conflicting bookings
    const existingBooking = await Booking.findOne({
      where: {
        spotId: spot.id,
        // check if the startDate of an existing booking is 
        // "less than or equal to" the endDate of the new booking.
        startDate: {
          [Op.lte]: new Date(endDate),
        },
        // check if the endDate of an existing booking 
        // "is greater than or equal to" the startDate of the new booking.
        endDate: {
          [Op.gte]: new Date(startDate),
        },
      },
    });
    // If booking already exist.. 
    if (existingBooking) {
        // return error
      return res.status(403).json({ message: 'Booking already exists for these dates' });
    }
    // Create new booking
    const newBooking = await Booking.create({
      userId: req.user.id,
      spotId: spot.id,
      startDate,
      endDate,
    });

    // Return the booking data
    return res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create the booking' });
  }
});

module.exports = router;
