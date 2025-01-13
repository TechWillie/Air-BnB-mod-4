'use strict';

const { Image } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Image.bulkCreate([
      {
        url: "https://example.com/spot1.jpg",
        preview: "true",
        spotId: 1,
        imageableId: 1,
        imageableType: 'spot'
      },
      {
        url: "https://example.com/review1.jpg",
        preview: "false",
        reviewId: 1,
        imageableId: 1,
        imageableType: 'review'
      },
      {
        url: "https://example.com/spot2.jpg",
        preview: "true",
        spotId: 2,
        imageableId: 2,
        imageableType: 'spot'
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Images';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
        "https://example.com/spot1.jpg",
        "https://example.com/review1.jpg",
        "https://example.com/spot2.jpg"
      ]}
    }, {});
  }
};