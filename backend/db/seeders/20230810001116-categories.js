'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {

  up: async (queryInterface, Sequelize) => {

    let options = {};
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA;
    }

    await queryInterface.bulkInsert("categories",
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

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    let options = {};
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA;
    }

    await category.destroy({
      where: {
        name: { [Op.in]: ["Electronics", "Entertainment", "Clothing", "Home"] },
      },
    });
  },
};
