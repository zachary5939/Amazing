'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {

  up: async (queryInterface, Sequelize) => {


    await queryInterface.bulkInsert("Categories",
      [
        {
          name: "Electronics",
        },
        {
          name: "Entertainment",
        },
        {
          name: "Clothing",
        },
        {
          name: "Home",
        },
      ],
      options
    );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Categories';
    await queryInterface.bulkDelete(options);
  }
};
