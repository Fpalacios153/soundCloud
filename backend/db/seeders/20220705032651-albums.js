'use strict';

const artist = require("../models/artist");

module.exports = {
  async up (queryInterface, Sequelize) {
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
      artistId:1,
      previewImage: 'link to image here',
      description: "An album about working.",
   },
   {
    title: 'Words in Soup',
    artistId:2,
    previewImage: 'link to image here',
    description: "An album about words.",
 }
  ] )

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Albums', {
      title:['Men At Work', 'Words in Soup']
    });

  }
};
