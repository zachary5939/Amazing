'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Ratings";
    await queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          productId: 1,
          rating: 5,
          text: "This is a great computer for coding!",
          timestamp: new Date(),
        },
        {
          userId: 2,
          productId: 2,
          rating: 5,
          text: "I love the Nintendo Switch!",
          timestamp: new Date(),
        },
        {
          userId: 3,
          productId: 3,
          rating: 5,
          text: "The PlayStation 5 is the best console ever!",
          timestamp: new Date(),
        },
        {
          userId: 2,
          productId:4,
          rating: 5,
          text: "This is the best game ever made!",
          timestamp: new Date(),
        },
        {
          userId: 4,
          productId:5,
          rating: 3,
          text: "Pretty good movie, but not as good as the games!",
          timestamp: new Date(),
        },
        {
          userId: 4,
          productId:6,
          rating: 5,
          text: "One of Kid Cudis best albums!",
          timestamp: new Date(),
        },
        {
          userId: 2,
          productId:7,
          rating: 2,
          text: "Bought this to save money but the coffee tastes like trash!",
          timestamp: new Date(),
        },
        {
          userId: 5,
          productId:8,
          rating: 4,
          text: "This is definitely a refrigerator!",
          timestamp: new Date(),
        },
        {
          userId: 6,
          productId:9,
          rating: 4,
          text: "I LOVE vacuum's!",
          timestamp: new Date(),
        },
        {
          userId: 7,
          productId:10,
          rating: 5,
          text: "I eat these until I feel sick!",
          timestamp: new Date(),
        },
        {
          userId: 2,
          productId:10,
          rating: 3,
          text: "I can't have dairy but eat them anyways :)",
          timestamp: new Date(),
        },
        {
          userId: 5,
          productId:11,
          rating: 4,
          text: "Been eating these since I was a kid!",
          timestamp: new Date(),
        },
        {
          userId: 4,
          productId:12,
          rating: 2,
          text: "These arrived moldy. I ate them anyways!",
          timestamp: new Date(),
        },
        {
          userId: 7,
          productId:13,
          rating: 5,
          text: "One of the best games ever made!",
          timestamp: new Date(),
        },
        {
          userId: 2,
          productId:13,
          rating: 5,
          text: "One of my favorites!",
          timestamp: new Date(),
        },
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Ratings";
    await queryInterface.bulkDelete(options, {
        [Sequelize.Op.or]: [
            { userId: 1, productId: 1 },
            { userId: 2, productId: 2 },
            { userId: 3, productId: 3 },
            { userId: 2, productId: 4 },
            { userId: 4, productId: 5 },
            { userId: 4, productId: 6 },
            { userId: 2, productId: 7 },
            { userId: 5, productId: 8 },
            { userId: 6, productId: 9 },
            { userId: 7, productId: 10 },
            { userId: 2, productId: 10 },
            { userId: 5, productId: 11 },
            { userId: 4, productId: 12 },
            { userId: 6, productId: 13 },
            { userId: 2, productId: 13 },
        ]
    });
  },
};
