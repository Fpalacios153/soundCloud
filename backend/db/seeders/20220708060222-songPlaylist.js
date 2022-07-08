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
    await queryInterface.bulkInsert('SongsPlaylists', [
      {
        songId: 1,
        playlistId: 1
      },
      {
        songId: 2,
        playlistId: 1
      },
      {
        songId: 3,
        playlistId: 1
      },
      {
        songId: 3,
        playlistId: 2
      },
      {
        songId: 4,
        playlistId: 2
      },
      {
        songId: 5,
        playlistId: 2
      },
      {
        songId: 1,
        playlistId: 4
      },
      {
        songId: 2,
        playlistId: 4
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('SongsPlaylists', null, {});
  }
};
