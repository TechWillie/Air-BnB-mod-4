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
        spotId: 1,
        spot: "Cumberland Mall",
        userId: 2
      },
      {
        spotId: 2,
        spot: "Twoncenter Mall",
        userId: 1
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