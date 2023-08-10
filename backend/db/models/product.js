'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Product.belongsToMany(models.categories, {
      //   through: "category",
      //   foreignKey: "product_id",
      // });
    }
  }
  product.init({
    name:
    { type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl:{
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
        notEmpty: true,
      },
      allowNull: false,
      defaultValue:
        "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg",
    },
    price: DataTypes.DECIMAL,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};
