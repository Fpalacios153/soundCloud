'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SongsPlaylist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SongsPlaylist.belongsTo(models.Playlist, {foreignKey: 'playlistId', onDelete: 'CASCADE', hooks: true})
    }
  }
  SongsPlaylist.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    songId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Songs',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    playlistId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Playlists',
        key: 'id'
      },
      onDelete: "CASCADE"
    }
  }, {
    sequelize,
    modelName: 'SongsPlaylist',
  });
  return SongsPlaylist;
};
