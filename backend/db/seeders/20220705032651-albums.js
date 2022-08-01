'use strict';

const artist = require("../models/artist");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Albums', [
      {
        title: 'Men At Work',
        artistId: 1,
        previewImage: 'https://images.pexels.com/photos/2327065/pexels-photo-2327065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        description: "An album about working.",
      },
      {
        title: 'Words in Soup',
        artistId: 2,
        previewImage: 'https://images.pexels.com/photos/12896240/pexels-photo-12896240.jpeg',
        description: "An album about words.",
      }
    ])

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Albums', {
      title: ['Men At Work', 'Words in Soup']
    });

  }
};
