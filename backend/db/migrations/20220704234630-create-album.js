'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Albums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      artistId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Artists',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false

      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      previewImage: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'https://res.cloudinary.com/fpalacios153/image/upload/v1659330814/Screen_Shot_2022-07-31_at_10.12.51_PM_npyums.png'

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Albums');
  }
};
