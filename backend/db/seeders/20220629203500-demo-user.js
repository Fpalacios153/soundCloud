'use strict';
const bcrypt = require("bcryptjs")
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'Alex',
        lastName: 'Sanchez',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        isArtist: true
      },
      {
        email: 'user1@user.io',
        firstName: 'Alfred',
        lastName: 'Johnson',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        isArtist: true
      },
      {
        email: 'user2@user.io',
        username: 'Bayside',
        firstName: 'Tony',
        lastName: 'Nugget',
        hashedPassword: bcrypt.hashSync('password3'),
        isArtist: false
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
