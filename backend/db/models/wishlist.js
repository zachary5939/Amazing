"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wishlist.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        targetKey: "id",
      });

      Wishlist.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
        targetKey: "id",
      });
    }
  }

  Wishlist.init(
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
      dateAdded: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
    },
    {
      sequelize,
      modelName: "Wishlist",
      tableName: "Wishlists",
    }
  );

  return Wishlist;
};
