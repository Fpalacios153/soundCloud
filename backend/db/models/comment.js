'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(
        models.User,
        {
          foreignKey:'userId'
        }
      )
    }
  }
  Comment.init({
    userId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Users',
        key:'id'
      }
    },
    songId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Songs',
        key:'id'
      }
    },
    body: {
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
