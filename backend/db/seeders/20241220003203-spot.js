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
        ownerId: 1,
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
        ownerId: 2,
        address: '123 dve court',
        city: "Smyruuua",
        state: "Geoa",
        country: "United states",
        lat: 3123,
        lng: 2345,
        name: "Cornre shop",
        description: "Not your  store...",
        price: 34
      },
      {
        ownerId: 3,
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
        ownerId: 4,
        address: '123 dve court',
        city: "Smyruuua",
        state: "Geoa",
        country: "United states",
        lat: 3123,
        lng: 2345,
        name: "Cornre shop",
        description: "Not your  store...",
        price: 34
      }
    ],
       {validate: true});
    },
    async down(queryInterface, Sequelize) {
      // Delete the inserted spot record in case of rollback
      options.tableName = 'Spots';
      const Op = Sequelize.Op;
      await queryInterface.bulkDelete(options, {
        name: {[Op.in]:[ "Cornre Store", "Cornre shop"]}
      }, {});
    }
  };
