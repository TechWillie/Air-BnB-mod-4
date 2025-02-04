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
        spotId: 2,
        review: "Absolutely stunning location with breathtaking views!",
        stars: 5,
        user: "TravelPro"
      },
      {
        id: 2,
        userId: 2,
        spotId: 3,
        review: "Perfect getaway spot, very clean and comfortable",
        stars: 4,
        user: "Wanderlust"
      },
      {
        id: 3,
        userId: 3,
        spotId: 2,
        review: "Exceptional hospitality and amazing amenities",
        stars: 5,
        user: "GlobalExplorer"
      },
      {
        id: 4,
        userId: 4,
        spotId: 1,
        review: "Cozy space with great attention to detail",
        stars: 4,
        user: "HomeAway"
      },
      {
        id: 5,
        userId: 4,
        spotId: 3,
        review: "Modern and stylish interior, great location",
        stars: 5,
        user: "UrbanStay"
      },
      {
        id: 6,
        userId: 3,
        spotId: 3,
        review: "Wonderful beachfront property, will return!",
        stars: 5,
        user: "BeachLover"
      },
      {
        id: 7,
        userId: 2,
        spotId: 2,
        review: "Peaceful mountain retreat with fantastic views",
        stars: 4,
        user: "Mountaineer"
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      user: {[Op.in]: [
        "TravelPro", "Wanderlust", "GlobalExplorer", "HomeAway", "UrbanStay",
        "BeachLover", "Mountaineer"
      ]}
    }, {});
 }
};