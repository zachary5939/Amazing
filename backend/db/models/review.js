'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      review.belongsTo(models.User, { foreignKey: 'user_id' })
      review.belongsTo(models.Product, { foreignKey: 'product_id' })
    }
  }
  review.init({
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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: DataTypes.DATE
  },
  {
    sequelize,
    modelName: 'review',
  });
  return review;
};
