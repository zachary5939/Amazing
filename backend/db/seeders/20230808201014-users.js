"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production" && process.env.SCHEMA) {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          firstName: "Some",
          lastName: "Guy",
          email: "demo@user.io",
          username: "demo",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Just",
          lastName: "AnotherGuy",
          email: "user1@user.io",
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Third",
          lastName: "Person",
          email: "user2@user.io",
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Fourth",
          lastName: "Person",
          email: "user3@user.io",
          username: "FakeUser3",
          hashedPassword: bcrypt.hashSync("password4"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["demo", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
