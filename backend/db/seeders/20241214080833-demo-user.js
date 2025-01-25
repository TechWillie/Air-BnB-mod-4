'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        id: 1,

        firstName: "Demo",
        lastName: "User",
        email: 'demo@user.io',
        username: 'Demo lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 2,

        firstName: "Will",
        lastName: "coxx",
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        id: 3,

        firstName:" Micke",
        lastName: "hers",  
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        id: 4,

        firstName: "DEfesa",
        lastName: "Mango",
        email: 'forth@user.io',
        username: 'Forth Guy',
        hashedPassword: bcrypt.hashSync('pasord')
      },
      {
        id: 5,

        firstName: "Peter",
        lastName: "cockman",
        email: '5thguy@user.io',
        username: 'Mr Five',
        hashedPassword: bcrypt.hashSync('five')
      },
      {
        id: 6,

        firstName: "fred",
        lastName: "Sanford",
        email: 'numsix@user.io',
        username: 'Sixth God',
        hashedPassword: bcrypt.hashSync('sixers')
      },
      {
        id: 7,

        firstName: "Dsavid",
        lastName: "loptop",
        email: '7thHesaven@wanderlust.com',
        username: 'Lucky Seven',
        hashedPassword: bcrypt.hashSync('7Days')
      },
      {
        id: 8,

        firstName: "Larry",
        lastName: "Davis",
        email: '8ball@superhost.com',
        username: 'Super Eight',
        hashedPassword: bcrypt.hashSync('eight')
      },
      {
        id: 9,

        firstName: "virtes",
        lastName: "pepers",
        email: '9Lives@explore.com',
        username: 'Ninth Wonder',
        hashedPassword: bcrypt.hashSync('99x')
      },
      {
        id: 10,
        firstName: "semba",
        lastName: "Mufasa",
        email: 'ten@stays.com',
        username: 'Ten Toes',
        hashedPassword: bcrypt.hashSync('10times')
      },
      {
        id: 11,
        firstName: "Sazu",
        lastName: "Jafar",
        email: 'eleven@digital.com',
        username: 'eleventh Hour',
        hashedPassword: bcrypt.hashSync('twelve')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
