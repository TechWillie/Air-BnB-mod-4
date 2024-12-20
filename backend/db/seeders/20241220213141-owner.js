'use strict';

const {Owner} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Owner.bulkCreate([
      {
        firstName: "Waterfish",
        lastName: "Gallonhead"
      },
      {
        firstName: "Dave",
        lastName: "Ford"
      },
      {
        firstName: "Kevin",
        lastName: "Steward"
      }
    ], {validate: true})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Owners', null, options); 
  }
};