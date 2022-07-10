'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist.belongsTo(
        models.User,
        {foreignKey:'userId'}
      )
      Playlist.belongsToMany(
        models.Song,{through: models.SongsPlaylist,foreignKey:'playlistId',otherKey:'songId'}
      )
      Playlist.hasMany(
        models.SongsPlaylist, {foreignKey:'playlistId'}
      )
    }
  }
  Playlist.init({
    userId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Users',
        key:'id'
      }
    },
    name: {
      type:DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    previewImage: {
      type:DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
