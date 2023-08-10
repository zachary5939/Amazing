'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    static associate(models) {
      category.belongsToMany(models.Product, {
        foreignKey: 'categoryId',
        as: 'products',
      });
    }
  }
  category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'category',
    tableName: 'categories',
  });
  return category;
};
