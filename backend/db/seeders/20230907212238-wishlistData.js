"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Wishlists";
    await queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          productId: 1,
          dateAdded: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          productId: 2,
          dateAdded: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Wishlists";
    await queryInterface.bulkDelete(options);
  },
};
