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
        address: '123 drive court',
        city: "Smyrna",
        state: "Georgia",
        country: "United Kingdom",
        lat: 31.23,
        lng: 23.45,
        name: "Cornre Store",
        description: "Not your ordinary store...",
        price: 234,
        avgRating: 4.5,
        previewImage: "url image"
      },
      {
        address: '123 dve court',
        city: "Smyruuua",
        state: "Geoa",
        country: "United states",
        lat: 31.23,
        lng: 23.45,
        name: "Cornre shop",
        description: "Not your  store...",
        price: 34,
        avgRating: 5,
        previewImage: "url age"
      }], { validate: true });
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
