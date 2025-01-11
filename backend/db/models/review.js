'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Spot, {
        foreignKey: "spotId"
      })

      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      Review.hasMany(models.Image, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE'
      });
    }
  }
  Review.init(
    {
    userId:{
        type: DataTypes.INTEGER,
        // allowNull: false,
    },
    spotId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Spots",
          key: "id"
        }
    },
    review:{
        type: DataTypes.STRING
    },
    stars:{
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true
        },
    },
    user:{
        type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};