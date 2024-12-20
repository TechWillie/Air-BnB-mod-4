'use strict';

const {Review} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        id: 1,
        userId: 1,
        spotId: 1,
        review: "Very nice place",
        stars: 4,
        user: "Marlin"
      },
      {
        userId: 2,
        spotId: 2,
        review: "Very big condo",
        stars: 5,
        user: "Willie"
      },
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
   // Delete the inserted review record in case of rollback
   options.tableName = 'Reviews';
   const Op = Sequelize.Op;
   await queryInterface.bulkDelete(options, {
     name: {[Op.in]:[ "Cornre Store", "Cornre shop"]}
   }, {});
 }
};