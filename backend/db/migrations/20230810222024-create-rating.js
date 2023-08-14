'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};

if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ratings',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
        },
        productId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Products',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        rating: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 5,
          },
        },
        text: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        timestamp: {
          type: Sequelize.DATE,
          allowNull: false,
          validate: {
            isDate: true,
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Ratings";
    await queryInterface.dropTable(options);
  },
};
