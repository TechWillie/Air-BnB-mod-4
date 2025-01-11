'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Spot, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'spot'
        }
      });

      Image.belongsTo(models.Review, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'review'
        }
      });
    }
  }
  Image.init({
    imageableId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageableType: {
      type: DataTypes.STRING,
      allowNull: false
  },
  spotId: {
    type: DataTypes.INTEGER
  },
  reviewId: {
      type: DataTypes.INTEGER
  },
    url: DataTypes.STRING,
    preview: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};