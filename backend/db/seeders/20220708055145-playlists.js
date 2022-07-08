'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     *   name: 'John Doe',
     *   isBetaMember: false
     */
    await queryInterface.bulkInsert('Playlists', [
      {
        userId: 1,
        name: 'Funkyyy Music',
        previewImage: 'image url'
      },
      {
        userId: 2,
        name: 'Workout Mix',
        previewImage: 'image url'
      },
      {
        userId: 1,
        name: 'LoFi Beats To Study To',
        previewImage: 'image url'
      },
      {
        userId: 2,
        name: 'PUMP up the JAMZ',
        previewImage: 'image url'
      },
      {
        userId: 3,
        name: 'Pregame Mix',
        previewImage: 'image url'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};
