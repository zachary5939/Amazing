"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Existing association with Rating table
      this.hasMany(models.Rating, {
        foreignKey: 'userId',
        as: 'ratings'
      });

      // Association with Cart table
      this.hasMany(models.Cart, {
        foreignKey: 'userId',
        as: 'carts'
      });

      // Association with Wishlist table
      this.hasMany(models.Wishlist, {
        foreignKey: 'userId',
        as: 'wishlists'
      });
      
      // Association with Purchase table
      this.hasMany(models.Purchase, {
        foreignKey: 'userId',
        as: 'purchases'
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmailC(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
