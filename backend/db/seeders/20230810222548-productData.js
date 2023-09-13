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
          name: "MacBook Pro 14 inch (Renewed Premium)",
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
          name: "Xbox Series X",
          description: "Xbox Series X, the fastest, most powerful Xbox ever.",
          imageUrl:
            "https://m.media-amazon.com/images/I/51ojzJk77qL._SL1500_.jpg",
          price: 499.99,
          categoryId: 1,
        },
        {
          name: "Airpods Pro (2nd Generation)",
          description: "The new Apple designed H2 chip is the force behind AirPods Pro and its advanced audio performance.",
          imageUrl:
            "https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_SL1500_.jpg",
          price: 249.99,
          categoryId: 1,
        },
        {
          name: "LG C3 Series 55-Inch Class OLED evo 4K",
          description: "Less searching, more streaming. LG OLED C3 TVs are built with the next generation of ThinQ AI and webOS.",
          imageUrl:
            "https://m.media-amazon.com/images/I/71JyE0Wf2XL._AC_SL1500_.jpg",
          price: 1899.99,
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
          name: "Super Mario Odyssey",
          description: "Join Mario on a massive, globe-trotting 3D adventure and use his incredible new abilities to collect Moons so you can power up your airship, the Odyssey, and rescue Princess Peach from Bowser’s wedding plans!",
          imageUrl: "https://m.media-amazon.com/images/I/81ADw3J2MiL._SL1500_.jpg",
          price: 59.99,
          categoryId: 2,
        },
        {
          name: "Bayonetta 3",
          description: "The witch is back and more powerful than ever!",
          imageUrl: "https://m.media-amazon.com/images/I/81TK3KyGRbL._SL1500_.jpg",
          price: 59.99,
          categoryId: 2,
        },
        {
          name: "Spider-Man: Miles Morales Ultimate Edition",
          description: "To save all of Marvel's new York, miles must take up the mantle of spider-man and own it. Includes a voucher code for Marvel's spider-man: remastered.",
          imageUrl: "https://m.media-amazon.com/images/I/71Kwo5V9QOL._SL1361_.jpg",
          price: 69.99,
          categoryId: 2,
        },
        {
          name: "Persona 5 Royal",
          description: "Don the mask of Joker and join the Phantom Thieves of Hearts. Break free from the chains of modern society and stage grand heists to infiltrate the minds of the corrupt.",
          imageUrl: "https://m.media-amazon.com/images/I/819o7LKSYsL._SL1500_.jpg",
          price: 59.99,
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
          name: "Howl's Moving Castle - Limited Edition Steelbook",
          description: "From the legendary Studio Ghibli, creators of Spirited Away, and acclaimed director Hayao Miyazaki, comes the Academy Award®-nominated fantasy adventure for the whole family.",
          imageUrl:
            "https://m.media-amazon.com/images/I/71LpO8jo8EL._SL1500_.jpg",
          price: 18.99,
          categoryId: 2,
        },
        {
          name: "Spider-Man: Across the Spider-Verse",
          description: "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
          imageUrl:
            "https://m.media-amazon.com/images/I/9139RIJAseL._SL1500_.jpg",
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
          name: "American US Flag - Vivid Color and UV Fade Resistant",
          description: "Founded in 2006, ANLEY Flags has rapidly grown from a local flagmaker in El Monte, California to a national Top-Rated brand.​",
          imageUrl:
            "https://m.media-amazon.com/images/I/71EU-vIeEhL._AC_SL1500_.jpg",
          price: 7.55,
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
          description: "It cleans hardwood, tile, and carpet floors. Clog-reducing Jet Cyclone technology keeps your filter clean by preventing the buildup of debris.",
          imageUrl:
            "https://mobileimages.lowes.com/productimages/eee5ae12-ad50-47aa-a8db-6fea0a8ae802/16677027.jpg",
          price: 899.99,
          categoryId: 3,
        },
        {
          name: "iRobot Roomba i4 EVO",
          description: "With a new mapping update, the Roomba i4 EVO robot vacuum can learn and map your home room-by-room for a cleaning experience that fits your life.",
          imageUrl:
            "https://m.media-amazon.com/images/I/91Fxo+xCydL._AC_SL1500_.jpg",
          price: 399.99,
          categoryId: 3,
        },
        {
          name: "OLANLY Luxury Bathroom Rug Mat 24x16",
          description: "Extra soft shaggy microfiber fabric helps save your floors from dripping water.",
          imageUrl:
            "https://m.media-amazon.com/images/I/81AFxaQnZXL._AC_SL1500_.jpg",
          price: 9.99,
          categoryId: 3,
        },
        {
          name: "Live Laugh Love Throw Pillow ",
          description: "Super Soft Breathable Fabric: A Grade Velvet, Fine Texture, Soft Handle, Comfortable And Elegant.",
          imageUrl:
            "https://m.media-amazon.com/images/I/61RrDEbdEOL._AC_SL1001_.jpg",
          price: 14.96,
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
          name: "GT's Kombucha, Gingerade 16 Fl Oz",
          description: "Two of Nature’s strongest forces, our organic & raw Kombucha and fresh pressed ginger, team up to cleanse and rebalance your system.",
          imageUrl: "https://m.media-amazon.com/images/I/61d5KiiDiML._SL1268_.jpg",
          price: 4.99,
          categoryId: 4,
        },
        {
          name: "SKITTLES Sour Summer Chewy Candy Bulk Assortment",
          description: "Picnics, Barbecues, and Bonfires Oh My! Summertime brings endless sweet adventures— and SKITTLES has Summertime written all over it!",
          imageUrl: "https://m.media-amazon.com/images/I/61iO-WtkoxL._SL1000_.jpg",
          price: 24.99,
          categoryId: 4,
        },
        {
          name: "Peet's Coffee, Dark Roast K-Cup Pods for Keurig Brewers",
          description: "Peet's Major Dickason's Blend Dark Roast Coffee is the roast that put Peets Coffee on the map.",
          imageUrl: "https://m.media-amazon.com/images/I/81tZmTkj28L._SL1500_.jpg",
          price: 37.99,
          categoryId: 4,
        },
        {
          name: "Maruchan Ramen Chicken",
          description: "Maruchan offers a wide variety of delicious Ramen flavors including less sodium Ramen and authentic ethnic flavor products.",
          imageUrl:
            "https://m.media-amazon.com/images/I/91xajJWygpL._SL1500_.jpg",
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
      ],
      options
    );
  },

async down (queryInterface, Sequelize) {
  options.tableName = "Products";
  await queryInterface.bulkDelete(options);
}
}
