'use strict';

const {Image} = require('../models')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Image.bulkCreate([
          {
            url: "www.pic.cpm",
            preview: "hello"
          },
          {
            url: "www.picture.cpm",
            preview: "hello to you"
          }
        ], {validate: true})
      },
    
      async down (queryInterface, Sequelize) {
       // Delete the inserted review record in case of rollback
       options.tableName = 'Images';
       const Op = Sequelize.Op;
       await queryInterface.bulkDelete(options, {
         url: {[Op.in]:[ "www.pic.cpm", "www.picture.cpm"]}
       }, {});
     }
    };