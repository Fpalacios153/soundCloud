'use strict';
const {
  Model, Validator} = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toSafeObject() {
      const { id, username, email} = this;
      return{ id, username, email}
    }
    validatePassword(password){
      return bcrypt.compareSync(password,this.hashedPassword.toString());
    }
    static getCurrentUserById(id){
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({firstName,lastName,username, email,password, isArtist}){
      const hashedPassword =bcrypt.hashSync(password);
      const user =await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword,
        isArtist
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      // define association here
      User.hasMany(
        models.Comment,{
          foreignKey:'userId'
        }
      ),
      User.hasMany(
        models.Playlist,{
          foreignKey:'userId'
        }
      )
    }
  }
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[4,30],
        isNotEmail(value){
          if(Validator.isEmail(value)){
            throw new Error("Canot be an email.")
          }
        }
      }
    },
    firstName:{
      type: DataTypes.STRING,
      allowNull:false
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        len: [3, 256]
      }
    },
    isArtist :{
      type: DataTypes.BOOLEAN,
      allowNull: false,
        defaultValue: false
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes:{
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser:{
        attributes: { exclude: ["hashedPassword"] }
      },
      loginUser:{
        attributes:{}
      },
      isValidArtist:{
        where:{
          isArtist:true
        }

      }

    },



  });
  return User;
};
