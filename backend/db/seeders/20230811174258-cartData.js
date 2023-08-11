'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Carts";
    await queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          productId: 1,
          quantity: 3,
        },
      ],
      options
    );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Carts";
    await queryInterface.bulkDelete(options);
  }
  }
