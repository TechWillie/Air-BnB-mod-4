'use strict';

const { sequelize } = require('../models');
// const { TIME } = require('sequelize').DataTypes;


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('spots', 
      { id: Sequelize.INTEGER,
        ownerId: Sequelize.INTEGER,
        address: Sequelize.TEXT,
        city: Sequelize.TEXT,
        state: Sequelize.TEXT,
        country: Sequelize.TEXT,
        lat: Sequelize.INTEGER,
        lng: Sequelize.INTEGER,
        name: Sequelize.TEXT,
        description: Sequelize.TEXT,
        price: Sequelize.INTEGER,
        createdAt: Sequelize.TIME,
        updatedAt: Sequelize.TIME,
        previewImage: Sequelize.TEXT
       });
     

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
