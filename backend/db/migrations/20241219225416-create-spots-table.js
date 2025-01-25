'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', 
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,  // Corrected typo from 'primarykey' to 'primaryKey'
          autoIncrement: true,  // Ensures the id auto-increments
        },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
      },
      spotImage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      lat: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      lng: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await queryInterface.dropTable('Spots');
  }
};
