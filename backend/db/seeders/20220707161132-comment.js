'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     * }], {});
    */
     await queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        songId:4,
        body:'This song sucks'

      },
      {
        userId: 3,
        songId:1,
        body:"This song isn't completely terrible'"
      },
      {
        userId: 2,
        songId:1,
        body:"I LOVE THIS SONGGGG'"
      },
      {
        userId: 2,
        songId:2,
        body:"🔥🔥🔥"
      },
      {
        userId: 3,
        songId:5,
        body:"💩💩💩"
      },
    ],
     {});
    },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Comments', null, {});

  }
};
