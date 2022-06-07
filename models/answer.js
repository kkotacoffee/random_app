'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer',{
    userID: DataTypes.INTEGER,
    category: DataTypes.STRING,
    message: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "回答は必ず入力して下さい。"
        }
      }
    }
  },{}
  );
  Answer.associate = (models) => {
    Answer.belongsTo(models.User, {foreignKey: "userID"});
    Answer.belongsTo(models.Category, {foreignKey: "category"});
    // define association here
  }
  return Answer;
};