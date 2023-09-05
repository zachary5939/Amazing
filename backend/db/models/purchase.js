'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    static associate(models) {
      // Define the association between Purchase and User
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      this.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });
    }
  }
  Purchase.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    purchaseDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Purchase',
  });
  return Purchase;
};
