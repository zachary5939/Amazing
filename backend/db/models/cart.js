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
        foreignKey: 'user_id',
        as: 'user', // Optional alias for the associated User
      });

      // Associate with Product model
      Cart.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product', // Optional alias for the associated Product
      });
    }
  }
  
  Cart.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
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
  });
  return Cart;
};
