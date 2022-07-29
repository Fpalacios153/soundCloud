'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsTo(
        models.Album,
        {
          foreignKey: 'albumId',
          // onDelete:'cascade', hooks:true
        }
      )
      Song.belongsTo(
        models.Artist,
        {
          foreignKey: 'artistId'
          // ,onDelete:'cascade', hooks:true
        }
      )
      Song.hasMany(
        models.Comment, {
        foreignKey: 'songId'
      }
      )
      Song.belongsToMany(
        models.Playlist, {
        through: models.SongsPlaylist, foreignKey: 'songId', otherKey: 'playlistId'
      }

      )
    }
  }
  Song.init({
    artistId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Artists',
        key: 'id'
      }
    },
    albumId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Albums',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false

    },
    description: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    previewImage: {
      type: DataTypes.STRING,
    },

  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
