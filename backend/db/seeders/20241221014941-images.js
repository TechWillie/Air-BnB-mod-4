'use strict';

const { Image } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await Image.bulkCreate([
      {
        url: "https://example.com/image1.jpg",
        preview: true,
        spotId: 1
      },
      {
        url: "https://example.com/image2.jpg",
        preview: false,
        spotId: 1
      },
      {
        url: "https://example.com/review1.jpg",
        preview: false,
        reviewId: 1
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      url: {
        [Op.in]: [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg",
          "https://example.com/review1.jpg"
        ]
      }
    }, {});
  }
};