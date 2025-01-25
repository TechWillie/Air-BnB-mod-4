'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
      })

      Spot.hasMany(models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'spot'
        }
      });

      Spot.hasMany(models.Review, {
        foreignKey: 'id',
      });

    }
  }
  Spot.init(
    {   
      id: {  // Explicitly define the primary key 'id'
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true, // Automatically incrementing ID
      },
      ownerId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
          }
        },
        spotImage:{
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "Images",
            key: "id"
            }
          },
        address:{
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
              len: [3, 100],
            },
        },
        city:{
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
          validate: {
              len: [3, 100],
            },
        },
        state:{
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
          validate: {
              len: [3, 100],
            },
        },
        country:{
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
          validate: {
              len: [3, 100],
            },
        },
        lat:{
          type: DataTypes.FLOAT,
          allowNull: false,
          unique: false,
          validate: {
              isNumeric: true
            },
        },
        lng:{
          type: DataTypes.FLOAT,
          allowNull: false,
          unique: false,
          validate: {
              isNumeric: true
            },
        },
        name:{
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
              len: [3, 30]
            },
        },
        description:{
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
              len: [3, 150]
            },
        },
        price:{
          type: DataTypes.FLOAT,
          allowNull: false,
          unique: false,
          validate: {
              isNumeric: true
            },
      }
    }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};