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
        {foreignKey:'albumId',
        // onDelete:'cascade', hooks:true
      }
      )
      Song.belongsTo(
        models.Artist,
        {foreignKey:'artistId'
        // ,onDelete:'cascade', hooks:true
      }
      )
      Song.hasMany(
        models.Comment,{
          foreignKey:'songId'
        }
      )
      Comment.belongsTo(
        models.Song,
        {
          foreignKey:'songId'
        }
      )
    }
  }
  Song.init({
    title: {
      type:DataTypes.STRING
    },
    description: {
      type:DataTypes.STRING
    },
    url: {
      type:DataTypes.STRING
    },
    previewImage: {
      type:DataTypes.STRING,
    },
    albumId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Albums',
        key:'id'
      }
    },
    artistId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Artists',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
