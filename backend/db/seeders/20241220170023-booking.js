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
        spot: "Cumberland Mall",
        startDate: "2025-02-01",
        endDate: "2025-02-05"
      },
      {
        id: 2,
        spotId: 2,
        userId: 2,
        spot: "Twoncenter Mall",
        startDate: "2025-02-01",
        endDate: "2025-02-05"
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
   // Delete the inserted review record in case of rollback
   options.tableName = 'Bookings';
   const Op = Sequelize.Op;
   await queryInterface.bulkDelete(options, {
     spot: {[Op.in]:[ "Cumberland Mall", "Twoncenter Mall"]}
   }, {});
 }
};