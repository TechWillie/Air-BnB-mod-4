'use strict';

const {Booking} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        id: 1,
        spotId: 1,
        userId: 1,
        spot: "Cornre Store",
        startDate: "2026-02-15",
        endDate: "2026-02-20"
      },
      {
        id: 2,
        spotId: 2,
        userId: 2,
        spot: "Cornre shop",
        startDate: "2026-03-01",
        endDate: "2026-03-07"
      },
      {
        id: 3,
        spotId: 3,
        userId: 3,
        spot: "Luxury Ocean Villa",
        startDate: "2026-03-15",
        endDate: "2026-03-20"
      },
      {
        id: 4,
        spotId: 3,
        userId: 4,
        spot: "Ski Lodge Haven",
        startDate: "2026-04-01",
        endDate: "2026-04-07"
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spot: {[Op.in]: [
        "Cornre Store", "Cornre shop", "Luxury Ocean Villa", "Ski Lodge Haven"
      ]}
    }, {});
  }
};