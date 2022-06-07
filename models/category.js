'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category',{
    category: {type: DataTypes.STRING}
  },{}
  );
  Category.associate = (models) => {
    Category.hasMany(models.Answer, {foreignKey: 'category'});
    // define association here
  }
  return Category;
};