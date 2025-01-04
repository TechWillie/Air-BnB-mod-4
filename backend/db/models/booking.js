'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: "userID"
      })
    }
  }
  Booking.init(
    {
    spotId:{
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
          model: "Spot",
          key: "id"
        },
    },
    spot:{
        type: DataTypes.STRING
    },
    userId:{
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
          model: "User",
          key: "id"
        },
    },
    startDate:{
        type: DataTypes.STRING
    },
    endDate:{
        type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};