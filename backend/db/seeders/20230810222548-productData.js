"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Products";
    await queryInterface.bulkInsert(
      options,
      [
        {
          name: "MacBook Pro 14 inch Laptop (Renewed Premium)",
          description: "2021 Apple MacBook Pro with Apple M1 Pro Chip 10-core CPU (14-inch, 16GB RAM, 1TB SSD Storage) (QWERTY English) Silver (Renewed Premium)",
          imageUrl:
            "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6455/6455369_sd.jpg",
          price: 999.99,
          categoryId: 1,
        },
        {
          name: "Nintendo Switch OLED Model",
          description: "Play at home or on the go with a vibrant OLED screen.",
          imageUrl:
            "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6470/6470923_sd.jpg",
          price: 349.99,
          categoryId: 1,
        },
        {
          name: "PlayStation 5",
          description: "The PS5 console unleashes new gaming possibilities that you never anticipated.",
          imageUrl:
            "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6523/6523167_sd.jpg",
          price: 499.99,
          categoryId: 1,
        },
        {
          name: "The Legend of Zelda: Tears of the Kingdom",
          description: "Can you harness the power of Link’s new abilities to fight back against the malevolent forces that threaten the kingdom?",
          imageUrl: "https://i.redd.it/5272xct5rnn91.jpg",
          price: 69.99,
          categoryId: 2,
        },
        {
          name: "The Super Mario Bros. Movie",
          description: "The Super Mario Bros. Movie follows Mario and Luigi on a whirlwind adventure through Mushroom Kingdom.",
          imageUrl:
            "https://m.media-amazon.com/images/I/71zadW47V2L._AC_UF894,1000_QL80_.jpg",
          price: 29.99,
          categoryId: 2,
        },
        {
          name: "The Man on the Moon: The End of the Day -- Kid Cudi",
          description: "Man on the Moon: The End of Day is the debut studio album by American hip hop recording artist Kid Cudi.",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/thumb/2/26/ManonTheMoonTheEndofDay.jpg/220px-ManonTheMoonTheEndofDay.jpg",
          price: 29.99,
          categoryId: 2,
        },
        {
          name: "Keurig Single-Serve Coffee Makers",
          description: "The Keurig K-Mini single serve coffee maker in Black features a sleek design with matte finish.",
          imageUrl:
            "https://i5.walmartimages.com/seo/Keurig-K-Duo-Essentials-Black-Single-Serve-K-Cup-Pod-Coffee-Maker-Black_12823d58-a105-4739-9e5e-b6b4a8cba187.06b909d5b4121050b7b8aaaebbc80127.jpeg",
          price: 89.99,
          categoryId: 3,
        },
        {
          name: "Samsung - 27.4 Cu. Ft. Side-by-Side Refrigerator",
          description: "Modern Design - Fingerprint Resistant - All-Around Cooling - In-Door Ice Maker - Adjustable Top Shelf - Gallon Door Bins - Stainless Steel",
          imageUrl:
            "https://image-us.samsung.com/SamsungUS/home/home-appliances/refrigerators/french-doors/pdp/RF20HFENBSR/01_Refrigerator_French-Door_RF20HFENBSR_Front_Closed_Silver.jpg?$product-details-jpg",
          price: 1299.99,
          categoryId: 3,
        },
        {
          name: "Samsung - Jet Vacuum",
          description: " It cleans hardwood, tile, and carpet floors. Clog-reducing Jet Cyclone technology keeps your filter clean by preventing the buildup of debris.",
          imageUrl:
            "https://mobileimages.lowes.com/productimages/eee5ae12-ad50-47aa-a8db-6fea0a8ae802/16677027.jpg",
          price: 899.99,
          categoryId: 3,
        },
        {
          name: "Cheez Its",
          description: "The iconic cracker and cheese flavor you know and love.",
          imageUrl: "https://pics.walgreens.com/prodimg/435674/450.jpg",
          price: 4.99,
          categoryId: 4,
        },
        {
          name: "Goldfish",
          description: "These baked cheese snacks are made with ingredients you can feel good about, including 100% real Cheddar cheese and no artificial flavors or preservatives.",
          imageUrl: "https://pics.walgreens.com/prodimg/436411/900.jpg",
          price: 4.99,
          categoryId: 4,
        },
        {
          name: "Green Seedless Grapes",
          description: "These grapes have a firm texture and a vibrant green color. Enjoy them as a healthy snack or use as an ingredient in sweet and savory dishes.",
          imageUrl:
            "https://target.scene7.com/is/image/Target/GUEST_27ecaa50-cac2-49f8-9a9b-e59800e28d8a?wid=488&hei=488&fmt=pjpeg",
          price: 4.99,
          categoryId: 4,
        },
        {
          name: "Persona 5 Royal",
          description: "Don the mask of Joker and join the Phantom Thieves of Hearts. Break free from the chains of modern society and stage grand heists to infiltrate the minds of the corrupt.",
          imageUrl: "https://m.media-amazon.com/images/I/819o7LKSYsL._SL1500_.jpg",
          price: 59.99,
          categoryId: 2,
        },
      ],
      options
    );
  },

async down (queryInterface, Sequelize) {
  options.tableName = "Products";
  await queryInterface.bulkDelete(options);
}
}
