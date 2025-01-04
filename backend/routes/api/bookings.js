const express = require('express');
const {Booking, Spot, User} = require('../../db/models');
const {requireAuth} = require('../../utils/auth');
const { Op } = require('sequelize'); // To compare dates
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
      return res.status(403).json({ message: 'Booking already exists for these dates'});
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
    return res.status(500).json({ message: 'Failed to create the booking'});
  }
});

// ! Get all of the Current User's Bookings
router.get('/', requireAuth, async (req, res) => {
    try {
      const userId = req.user.id;
      // Find all bookings by current user
      const bookings = await Booking.findAll({
          // Only fetch bookings for the current user
        where: {
          userId: userId, 
        },
        // Include associated Spot attributes
        include: [
          {
            model: Spot, 
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
              'price',
              'previewImage',
            ],
          },
        ],
      });
    //    Does bookings exist
      if (!bookings || bookings.length === 0){
        return res.status(404).json({message: 'No bookings found for this user'});
      }
  
      // Respond with booking attributes
      const bookingsData = bookings.map((booking) => {
        return {
          id: booking.id,
          spotId: booking.spotId,
          userId: booking.userId,
          startDate: booking.startDate,
          endDate: booking.endDate,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt,
          // Returning the associated Spot data
          spot: booking.Spot, 
        };
      });
      return res.json({bookings: bookingsData});
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: 'Internal server error'});
    }
  });

// ! Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const {spotId} = req.params;
    const userId = req.user.id;
    try {
      // if spot exists
      const spot = await Spot.findByPk(spotId);
      if (!spot) {
        return res.status(404).json({ message: 'Spot not found' });
      }
  
      // current user is owner of spot?
      const isOwner = spot.ownerId === userId;
  
      // Get the bookings for the spot
      const bookings = await Booking.findAll({
        where: {
          spotId: spotId,
        },
        include: isOwner
          ? [
              {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
              },
            ] : [],
      });
  
      if (!bookings || bookings.length === 0){
        return res.status(404).json({ message:'No bookings found for this spot'});
      }
      // Respond with booking attributes
      const bookingsData = bookings.map((booking) => {
        const bookingData = {
          spotId: booking.spotId,
          startDate: booking.startDate,
          endDate: booking.endDate,
        };
  
        if (isOwner) {
          // If the user is the owner, include more details
          bookingData.id = booking.id;
          bookingData.userId = booking.userId;
          bookingData.createdAt = booking.createdAt;
          bookingData.updatedAt = booking.updatedAt;
          bookingData.user = booking.User; // Associated user data
        }
  
        return bookingData;
      });
  
      return res.json({ bookings: bookingsData });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// ! Edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const {bookingId} = req.params;
    const {startDate, endDate} = req.body;
    const userId = req.user.id;
  
    try {
      // if booking exist?
      const booking = await Booking.findByPk(bookingId);
      if(!booking){
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      // Is user the owner of the booking?
      if(booking.userId !== userId){
        return res.status(403).json({message: 'Forbidden: You are not the owner of this booking'});
      }
  
      // startDate cannot be before today
      if (new Date(startDate) < new Date()){
        return res.status(400).json({message: 'Start date cannot be in the past'});
      }
  
      // endDate is after the startDate?
      if(new Date(startDate) >= new Date(endDate)){
        return res.status(400).json({ message: 'Start date must be before the end date' });
      }
  
      // conflicting bookings for the same spot and dates?
      const spotId = booking.spotId;
      const compareBookings = await Booking.findAll({
        where: {
          spotId: spotId,
          // Exclude the current booking
          id: { [Op.ne]: bookingId }, 
          [Op.or]: [
            {
              startDate: {[Op.lte]: new Date(endDate)},
              endDate: {[Op.gte]: new Date(startDate)},
            },
          ],
        },
      });
  
      if (compareBookings.length > 0) {
        return res.status(403).json({ message: 'There is already a booking for this spot on the selected dates' });
      }
  
      // Update the booking with new dates
      booking.startDate = new Date(startDate);
      booking.endDate = new Date(endDate);
      await booking.save();
  
      // Return the updated booking
      return res.json({
        id: booking.id,
        userId: booking.userId,
        spotId: booking.spotId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

// ! DELETE a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const {bookingId} = req.params;
    const userId = req.user.id;
  
    try {
      // booking exist?
      const booking = await Booking.findByPk(bookingId);
      if (!booking){
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      // Is user the owner of the booking AND the owner of the spot
      const spot = await Spot.findByPk(booking.spotId);
      if(booking.userId !== userId && spot.ownerId !== userId){
        return res.status(403).json({ message: 'Forbidden: Not authorized to delete this booking' });
      }
  
      // start date has passed?
      if(new Date(booking.startDate) < new Date()){
        return res.status(400).json({ message: 'Cannot delete past or current bookings' });
      }
  
      // Delete the booking
      await booking.destroy();
      // Return success message
      return res.json({ message: 'Booking successfully deleted' });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
