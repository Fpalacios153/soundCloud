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
        {foreignKey:'artistId'
        // , onDelete:'cascade',hooks:true
      }
      )
      Album.hasMany(
        models.Song,
        {foreignKey:'albumId'
        // , onDelete:'cascade',hooks:true
      }


      )
    }
  }
  Album.init({
    title:{
       type:DataTypes.STRING,
       allowNull:false
      },
    previewImage: {
      type:DataTypes.STRING
    },
    artistId:{
      type:DataTypes.INTEGER,
      references:{
        model: 'Artists',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
