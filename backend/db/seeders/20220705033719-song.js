'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
   await queryInterface.bulkInsert('Songs', [{
    title:'Its Demo Time',
    description:'This is a bad song',
    url: 'link to song',
    previewImage:'link to image',
    albumId: 1,
    artistId: 1
   },{
    title:'Risky Business',
    description:'This is a bad song too',
    url: 'link to song',
    previewImage:'link to image',
    albumId: 1,
    artistId: 1
   },{
    title:'Cant believe its not DEMO',
    description:'This is a bad song also',
    url: 'link to song',
    previewImage:'link to image',
    albumId: 1,
    artistId: 1
   },
   {
    title:'ABCDEFG',
    description:'This is a bad song too',
    url: 'link to song',
    previewImage:'link to image',
    albumId: 2,
    artistId: 2
   },{
    title:'Hooked on Phonixxx',
    description:'This is a bad song too',
    url: 'link to song',
    previewImage:'link to image',
    albumId: 2,
    artistId: 2
   },
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Songs', {
      title: ['Its Demo Time','Risky Business','Cant believe its not DEMO','ABCDEFG','Hooked on Phonixxx']
    })
  }
};
