'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Associate with User model
      Cart.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        targetKey: 'id',
      });

      // Associate with Product model
      Cart.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
        targetKey: 'id',
      });
    }
  }
//refactor to allow more then 1 item in cart //many to many
  Cart.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10,
      },
    },
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'Carts',
  });
  return Cart;
};
