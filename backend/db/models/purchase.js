"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    static associate(models) {
      // Define the association between Purchase and User
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      this.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  Purchase.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      purchaseDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Purchase",
    }
  );
  return Purchase;
};
