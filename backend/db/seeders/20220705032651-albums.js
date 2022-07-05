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
      previewImage: 'link to image here',
      artistId:1
   },
   {
    title: 'Words in Soup',
    previewImage: 'link to image here',
    artistId:2
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
