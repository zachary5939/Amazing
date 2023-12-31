"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Ratings";
    await queryInterface.bulkInsert(
      options,
      [
        {
          userId: 2,
          productId: 1,
          rating: 5,
          text: "My favorite laptop to code on! It's so quick!",
          timestamp: new Date(),
        },
        {
          userId: 1,
          productId: 1,
          rating: 5,
          text: "This laptop is great for coding!",
          timestamp: new Date(),
        },
        {
          userId: 7,
          productId: 1,
          rating: 1,
          text: "It can't play PC games. Therefore, it's terrible!",
          timestamp: new Date(),
        },
        {
          userId: 2,
          productId: 2,
          rating: 5,
          text: "Love my Nintendo Switch OLED! The screen is fantastic.",
          timestamp: new Date(),
        },
        {
          userId: 4,
          productId: 2,
          rating: 5,
          text: "Nintendo peaked with the Switch OLED.",
          timestamp: new Date(),
        },
        {
          userId: 3,
          productId: 3,
          rating: 5,
          text: "The PlayStation 5 is a beast of a console. Amazing graphics!",
          timestamp: new Date(),
        },
        {
          userId: 4,
          productId: 4,
          rating: 4,
          text: "The Xbox Series X is super fast and has a great game library.",
          timestamp: new Date(),
        },
        {
          userId: 5,
          productId: 5,
          rating: 5,
          text: "Airpods Pro sound quality is top-notch. Noise cancellation is impressive.",
          timestamp: new Date(),
        },
        {
          userId: 6,
          productId: 6,
          rating: 3,
          text: "This OLED TV burnt in the TV channels logo a bit too quickly.",
          timestamp: new Date(),
        },
        {
          userId: 6,
          productId: 6,
          rating: 5,
          text: "LG C3 Series OLED TV is stunning. The picture quality is amazing.",
          timestamp: new Date(),
        },
        {
          userId: 7,
          productId: 2,
          rating: 5,
          text: "Another contender for one of the greatest games of all time.",
          timestamp: new Date(),
        },
        {
          userId: 7,
          productId: 7,
          rating: 5,
          text: "Zelda: Tears of the Kingdom is an epic adventure! Must-play for fans.",
          timestamp: new Date(),
        },
        {
          userId: 8,
          productId: 8,
          rating: 5,
          text: "Super Mario Odyssey is a masterpiece. So much fun!",
          timestamp: new Date(),
        },
        {
          userId: 1,
          productId: 9,
          rating: 2,
          text: "I wasn't a fan of the ending..",
          timestamp: new Date(),
        },
        {
          userId: 4,
          productId: 9,
          rating: 5,
          text: "Bayonetta 3 is action-packed and visually stunning.",
          timestamp: new Date(),
        },
        {
          userId: 3,
          productId: 10,
          rating: 5,
          text: "Spider-Man: Miles Morales Ultimate Edition is a must-have for Spidey fans.",
          timestamp: new Date(),
        },
        {
          userId: 2,
          productId: 11,
          rating: 5,
          text: "The best game of all time!",
          timestamp: new Date(),
        },
        {
          userId: 5,
          productId: 11,
          rating: 5,
          text: "Persona 5 Royal is an RPG masterpiece with a gripping story.",
          timestamp: new Date(),
        },
        {
          userId: 8,
          productId: 12,
          rating: 4,
          text: "Excited for the Super Mario Bros. Movie! Great for family movie night.",
          timestamp: new Date(),
        },
        {
          userId: 2,
          productId: 13,
          rating: 5,
          text: "This is my favorite Kid Cudi album!",
          timestamp: new Date(),
        },
        {
          userId: 5,
          productId: 13,
          rating: 2,
          text: "Kid Cudi's debut album is unique but not my style.",
          timestamp: new Date(),
        },
        {
          userId: 2,
          productId: 14,
          rating: 5,
          text: "Howl's Moving Castle is one of my favorite movies!",
          timestamp: new Date(),
        },
        {
          userId: 5,
          productId: 15,
          rating: 5,
          text: "Spider-Man: Across the Spider-Verse is a visual delight!",
          timestamp: new Date(),
        },
        {
          userId: 6,
          productId: 16,
          rating: 4,
          text: "The Keurig K-Mini makes my mornings easier.",
          timestamp: new Date(),
        },
        {
          userId: 7,
          productId: 17,
          rating: 5,
          text: "The American US Flag looks great outside my home.",
          timestamp: new Date(),
        },
        {
          userId: 1,
          productId: 18,
          rating: 5,
          text: "Samsung Refrigerator is spacious and efficient.",
          timestamp: new Date(),
        },
        {
          userId: 3,
          productId: 19,
          rating: 4,
          text: "Samsung Jet Vacuum keeps my floors clean!",
          timestamp: new Date(),
        },
        {
          userId: 7,
          productId: 20,
          rating: 5,
          text: "iRobot Roomba i4 EVO is a lifesaver for busy households.",
          timestamp: new Date(),
        },
        {
          userId: 4,
          productId: 21,
          rating: 4,
          text: "OLANLY Bathroom Rug Mat is soft and absorbent.",
          timestamp: new Date(),
        },
        {
          userId: 3,
          productId: 22,
          rating: 5,
          text: "Live Laugh Love Throw Pillow adds a cozy touch to my home.",
          timestamp: new Date(),
        },
        {
          userId: 1,
          productId: 23,
          rating: 5,
          text: "Cheez Its are my favorite snack!",
          timestamp: new Date(),
        },
        {
          userId: 2,
          productId: 24,
          rating: 4,
          text: "Goldfish crackers are a classic, great for snacking.",
          timestamp: new Date(),
        },
        {
          userId: 5,
          productId: 25,
          rating: 5,
          text: "GT's Kombucha Gingerade is refreshing and healthy.",
          timestamp: new Date(),
        },
        {
          userId: 6,
          productId: 26,
          rating: 4,
          text: "SKITTLES Sour Summer Candy is a fun treat for gatherings.",
          timestamp: new Date(),
        },
        {
          userId: 8,
          productId: 27,
          rating: 5,
          text: "Peets Coffee Dark Roast K-Cups have a rich flavor.",
          timestamp: new Date(),
        },
        {
          userId: 4,
          productId: 28,
          rating: 3,
          text: "Maruchan Ramen Chicken flavor is okay, not exceptional.",
          timestamp: new Date(),
        },
        {
          userId: 2,
          productId: 29,
          rating: 5,
          text: "Green Seedless Grapes are a healthy snack choice.",
          timestamp: new Date(),
        },
        {
          userId: 4,
          productId: 29,
          rating: 2,
          text: "These arrived moldy. I ate them anyways!",
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
        { userId: 2, productId: 1 },
        { userId: 1, productId: 1 },
        { userId: 7, productId: 1 },
        { userId: 2, productId: 2 },
        { userId: 4, productId: 2 },
        { userId: 3, productId: 3 },
        { userId: 4, productId: 4 },
        { userId: 5, productId: 5 },
        { userId: 6, productId: 6 },
        { userId: 6, productId: 6 },
        { userId: 7, productId: 2 },
        { userId: 7, productId: 7 },
        { userId: 8, productId: 8 },
        { userId: 1, productId: 9 },
        { userId: 4, productId: 9 },
        { userId: 3, productId: 10 },
        { userId: 2, productId: 11 },
        { userId: 5, productId: 11 },
        { userId: 8, productId: 12 },
        { userId: 2, productId: 13 },
        { userId: 5, productId: 13 },
        { userId: 2, productId: 14 },
        { userId: 5, productId: 15 },
        { userId: 6, productId: 16 },
        { userId: 7, productId: 17 },
        { userId: 1, productId: 18 },
        { userId: 3, productId: 19 },
        { userId: 7, productId: 20 },
        { userId: 4, productId: 21 },
        { userId: 3, productId: 22 },
        { userId: 1, productId: 23 },
        { userId: 2, productId: 24 },
        { userId: 5, productId: 25 },
        { userId: 6, productId: 26 },
        { userId: 8, productId: 27 },
        { userId: 4, productId: 28 },
        { userId: 2, productId: 29 },
        { userId: 4, productId: 29 },
      ],
    });
  },
};
