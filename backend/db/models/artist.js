'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Artist.hasMany(
        models.Album,
        {foreignKey:'artistId', onDelete:'CASCADE',hooks:true}
      )
      Artist.hasMany(
        models.Song,
        {foreignKey:'artistId', onDelete:'CASCADE',hooks:true}
      )
      Artist.belongsTo(
        models.User,
        {foreignKey:'userId'}
      )

    }
  }
  Artist.init({
    name:{
      type: DataTypes.STRING
    },
    totalSongs: {
      type: DataTypes.INTEGER
    },
    totalAblums: {
      type: DataTypes.INTEGER

    },
    previewImages: {
      type: DataTypes.STRING,

    },
    userId: {
      type: DataTypes.INTEGER,
      references:{
        model:'Users',
        key:'id'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};
