'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album.belongsTo(
        models.Artist,
        {
          foreignKey: 'artistId'
          // , onDelete:'cascade',hooks:true
        }
      )
      Album.hasMany(
        models.Song,
        {
          foreignKey: 'albumId'
          , onDelete: 'cascade', hooks: true
        }


      )
    }
  }
  Album.init({
    artistId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Artists',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://res.cloudinary.com/fpalacios153/image/upload/v1659330814/Screen_Shot_2022-07-31_at_10.12.51_PM_npyums.png'
    }
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
