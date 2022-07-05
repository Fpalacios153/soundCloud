'use strict';

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
     await queryInterface.bulkInsert('Artists', [
      {
        name:'DEMOMEN',
        totalSongs: 10,
        totalAblums: 1,
        previewImages: 'some link herer',
        userId: 1
      },
      {
        name:'Alpha-Bet',
        totalSongs: 10,
        totalAblums: 1,
        previewImages: 'some link herer',
        userId: 2
      }

    ])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Artists', {
      name :['DEMOMEN','Alpha-Bet']
    })
  }
};
