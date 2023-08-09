'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production" && process.env.SCHEMA) {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: 'MacBook Pro 14 inch Laptop',
          description: 'Powerful laptop for all your computing needs',
          imageUrl: 'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg',
          price: 999.99,
          categoryId: 1,
        },
        {
          name: 'Nintendo Switch OLED Model',
          description: 'Play games at home or on the go.',
          imageUrl: 'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg',
          price: 349.99,
          categoryId: 1,
        },
        {
          name: 'PlayStation 5',
          description: 'Experience the next generation in Video Games.',
          imageUrl: 'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg',
          price: 499.99,
          categoryId: 1,
        },
      ],
    )
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Products";
    await queryInterface.bulkDelete(options);
  },
};
