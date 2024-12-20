'use strict';

/** @type {import('sequelize-cli').Migration} */
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
      }], { validate: true });
    },
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
