'use strict';

const { Image } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Image.bulkCreate([
      {
        id: 1,
        url: "https://source.unsplash.com/random/200x300",
        preview: true,
     
        imageableId: 1,
        imageableType: 'spot'
      },
      {
        id: 2,
        url: "https://picsum.photos/200/200",
        preview: true,
       
        imageableId: 1,
        imageableType: 'review'
      },
      {
        id: 3,
        url: "https://picsum.photos/200/300",
        preview: true,
       
        imageableId: 2,
        imageableType: 'spot'
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Images';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
        "https://source.unsplash.com/random/200x300",
        "https://picsum.photos/200/200",
        "https://picsum.photos/200/300"
      ]}
    }, {});
  }
};