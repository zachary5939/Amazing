"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          firstName: "Demo User",
          lastName: "McDemo",
          email: "demo@user.io",
          username: "demo",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Zachary",
          lastName: "Stallings",
          email: "user1@user.io",
          username: "zachary",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Omar",
          lastName: "El Sahlah",
          email: "user2@user.io",
          username: "omar",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Sam",
          lastName: "Handelsman",
          email: "user3@user.io",
          username: "sam",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Jason",
          lastName: "Murphy",
          email: "user4@user.io",
          username: "jason",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "JP",
          lastName: "Park",
          email: "user5@user.io",
          username: "JPark",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Joey",
          lastName: "Enright",
          email: "user6@user.io",
          username: "joey",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Cathal",
          lastName: "Paz",
          email: "user7@user.io",
          username: "cathal",
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["demo", "zachary", "omar", "sam", "jason", "JPark", "joey", "cathal"] },
      },
      options
    );
  },
};
