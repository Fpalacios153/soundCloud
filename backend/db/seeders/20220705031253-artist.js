'use strict';

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
    await queryInterface.bulkInsert('Artists', [
      {
        name: 'DEMOMEN',
        totalSongs: 3,
        totalAlbums: 1,
        previewImage: 'some link herer',
        userId: 1
      },
      {
        name: 'Alpha-Bet',
        totalSongs: 2,
        totalAlbums: 1,
        previewImage: 'some link herer',
        userId: 2
      },
      {
        name: 'Bayside',
        totalSongs: 3,
        totalAlbums: 1,
        previewImage: 'some link herer',
        userId: 3
      }

    ])

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Artists', {
      name: ['DEMOMEN', 'Alpha-Bet']
    })
  }
};
