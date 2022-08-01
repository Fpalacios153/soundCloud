'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Songs', [{
      title: 'Its Demo Time',
      description: 'This is a bad song',
      url: 'https://res.cloudinary.com/fpalacios153/video/upload/v1659119131/sample1_nxfix5.mp3',
      previewImage: 'https://images.pexels.com/photos/2327065/pexels-photo-2327065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      albumId: 1,
      artistId: 1
    }, {
      title: 'Risky Business',
      description: 'This is a bad song too',
      url: 'https://res.cloudinary.com/fpalacios153/video/upload/v1659119131/sample2_fw7vyn.mp3',
      previewImage: 'https://images.pexels.com/photos/2327065/pexels-photo-2327065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      albumId: 1,
      artistId: 1
    }, {
      title: 'Cant believe its not DEMO',
      description: 'This is a bad song also',
      url: 'https://res.cloudinary.com/fpalacios153/video/upload/v1659119131/sample3_q78zbf.mp3',
      previewImage: 'https://images.pexels.com/photos/2327065/pexels-photo-2327065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      albumId: 1,
      artistId: 1
    },
    {
      title: 'ABCDEFG',
      description: 'This is a bad song too',
      url: 'https://res.cloudinary.com/fpalacios153/video/upload/v1659119131/sample4_zrpxan.mp3',
      previewImage: 'https://images.pexels.com/photos/1337374/pexels-photo-1337374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      albumId: 2,
      artistId: 2
    }, {
      title: 'Hooked on Phonixxx',
      description: 'This is a bad song too',
      url: 'https://res.cloudinary.com/fpalacios153/video/upload/v1659119131/sample1_nxfix5.mp3',
      previewImage: 'https://images.pexels.com/photos/1337374/pexels-photo-1337374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      albumId: 2,
      artistId: 2
    }, {
      title: 'Another One',
      description: 'This is a bad song too',
      url: 'https://res.cloudinary.com/fpalacios153/video/upload/v1659119131/sample3_q78zbf.mp3',
      previewImage: 'https://images.pexels.com/photos/12896240/pexels-photo-12896240.jpeg',
      albumId: 2,
      artistId: 2
    },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Songs', {
      title: ['Its Demo Time', 'Risky Business', 'Cant believe its not DEMO', 'ABCDEFG', 'Hooked on Phonixxx']
    })
  }
};
