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
    }
  }
  Review.init(
    {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    userId:{
        type: DataTypes.INTEGER
    },
    spotId:{
        type: DataTypes.INTEGER
    },
    review:{
        type: DataTypes.STRING
    },
    stars:{
        type: DataTypes.INTEGER,
        isNumeric: true
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