'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName="Purchases";

    await queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          productId: 3,
          quantity: 1,
          totalPrice: 499.99,
          purchaseDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      options
    )
  },

  async down (queryInterface, Sequelize) {
    options.tableName="Purchases";
    await queryInterface.bulkDelete(options, {
      userId: 1,
      productId: 1
    });
  }
};
