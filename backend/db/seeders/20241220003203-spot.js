'use strict';

const {Spot} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        id: 1,
        ownerId: 1,
        spotImage: 1,
        address: '123 drive court',
        city: "Smyrna",
        state: "Georgia",
        country: "United Kingdom",
        lat: 3123,
        lng: 2345,
        name: "Cornre Store",
        description: "Not your ordinary store...",
        price: 234
      },
      {
        id: 2,
        ownerId: 1,
        spotImage: 1,
        address: '123 dve court',
        city: "Smyruuua",
        state: "Geoa",
        country: "United states",
        lat: 3123,
        lng: 2345,
        name: "Cornre shop",
        description: "Not your fav store...",
        price: 34
      },
      {
        id: 3,
        ownerId: 1,
        spotImage: 2,
        address: '1243 drive court',
        city: "Smyrna",
        state: "Georgia",
        country: "United Kingdom",
        lat: 3123,
        lng: 2345,
        name: "Study Lounge",
        description: "easly lisening music.",
        price: 234
      }
    ],
    {validate: true});
  },
  
  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: {[Op.in]: [
        "Cornre Store", "Cornre shop", "Study Lounge"
      ]}
    }, {});
  }
};