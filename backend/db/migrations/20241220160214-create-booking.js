'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', 
      { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        spotId:{
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Spots",
            key: "id"
          },
          onDelete: 'CASCADE'
        },
        spot:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        userId:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model: "Users",
            key: "id"
          },
          onDelete: 'CASCADE'
        },
        startDate:{
          type: Sequelize.STRING,
          allowNull: true,
        },
        endDate:{
          type: Sequelize.STRING,
          allowNull: true,
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

  async down (queryInterface, Sequelize) {
    
     await queryInterface.dropTable('Bookings');
     
  }
};
