'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "products";
    const productsData = [
      {
        name: 'Laptop',
        description: 'Powerful laptop for all your computing needs',
        imageUrl: 'https://example.com/laptop.jpg',
        price: 999.99,
        categoryId: 1,
      },
      {

      },
    ];
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
