'use strict';
const {
  Model, Validator
} = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Spot.init(
    {
      ownerId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users" ,
            key: "id"
        },
      },
      adress:{
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
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
            isNumeric: true
          },
      },
      lng:{
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
            isNumeric: true
          },
      },
    }, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email'],
      },
    },
  });
  return Spot;
};