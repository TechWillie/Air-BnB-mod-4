'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: 'id'
      });
      
      // Booking.belongsTo(models.Spot, {
      //   foreignKey: 'ownerId'
      // });
    }
  }
  Booking.init({
    // id: {  // Explicitly define the primary key 'id'
    //   primaryKey: true,
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true, // Automatically incrementing ID
    // },
    spot: {
      type: DataTypes.STRING,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isFuture(value) {
          if (new Date(value) < new Date()) {
            throw new Error('Start date must be in the future');
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterStartDate(value) {
          if (new Date(value) <= new Date(this.startDate)) {
            throw new Error('End date must be after start date');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};