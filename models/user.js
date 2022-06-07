'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',
  {
    userID: DataTypes.INTEGER,
    nickname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "名前は必ず入力して下さい。"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "パスワードは必ず入力して下さい。"
        },
        len: {
          args: [8,20],
          msg: 'パスワードは8文字以上20文字以下にしてください'
        }
      }
    }
  },{});
  User.associate = (models) => { 
    User.hasMany(models.Answer); 
  }
  return User;
};