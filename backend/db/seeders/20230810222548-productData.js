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
          name: "MacBook Pro 14 inch Laptop",
          description: "Lorem Ipsum",
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg",
          price: 999.99,
          categoryId: 1,
        },
        {
          name: "Nintendo Switch OLED Model",
          description: "Lorem Ipsum",
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg",
          price: 349.99,
          categoryId: 1,
        },
        {
          name: "PlayStation 5",
          description: "Lorem Ipsum",
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg",
          price: 499.99,
          categoryId: 1,
        },
        {
          name: "The Legend of Zelda: Tears of the Kingdom",
          description: "Lorem Ipsum",
          imageUrl: "https://i.redd.it/5272xct5rnn91.jpg",
          price: 69.99,
          categoryId: 2,
        },
        {
          name: "The Super Mario Bros. Movie",
          description: "Lorem Ipsum",
          imageUrl:
            "https://m.media-amazon.com/images/I/71zadW47V2L._AC_UF894,1000_QL80_.jpg",
          price: 29.99,
          categoryId: 2,
        },
        {
          name: "The Man on the Moon: The End of the Day -- Kid Cudi",
          description: "Lorem Ipsum",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/thumb/2/26/ManonTheMoonTheEndofDay.jpg/220px-ManonTheMoonTheEndofDay.jpg",
          price: 29.99,
          categoryId: 2,
        },
        {
          name: "Keurig Single-Serve Coffee Makers",
          description: "Lorem Ipsum",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/en/thumb/2/26/ManonTheMoonTheEndofDay.jpg/220px-ManonTheMoonTheEndofDay.jpg",
          price: 89.99,
          categoryId: 3,
        },
        {
          name: "Samsung - 27.4 Cu. Ft. Side-by-Side Refrigerator",
          description: "Lorem Ipsum",
          imageUrl:
            "https://image-us.samsung.com/SamsungUS/home/home-appliances/refrigerators/french-doors/pdp/RF20HFENBSR/01_Refrigerator_French-Door_RF20HFENBSR_Front_Closed_Silver.jpg?$product-details-jpg",
          price: 1299.99,
          categoryId: 3,
        },
        {
          name: "Samsung - Jet Vacuum",
          description: "Lorem Ipsum",
          imageUrl:
            "https://mobileimages.lowes.com/productimages/eee5ae12-ad50-47aa-a8db-6fea0a8ae802/16677027.jpg",
          price: 899.99,
          categoryId: 3,
        },
        {
          name: "Cheez Its",
          description: "Lorem Ipsum",
          imageUrl: "https://pics.walgreens.com/prodimg/435674/450.jpg",
          price: 4.99,
          categoryId: 4,
        },
        {
          name: "Goldfish",
          description: "Lorem Ipsum",
          imageUrl: "https://pics.walgreens.com/prodimg/436411/900.jpg",
          price: 4.99,
          categoryId: 4,
        },
        {
          name: "Green Seedless Grapes",
          description: "Lorem Ipsum",
          imageUrl:
            "https://target.scene7.com/is/image/Target/GUEST_27ecaa50-cac2-49f8-9a9b-e59800e28d8a?wid=488&hei=488&fmt=pjpeg",
          price: 4.99,
          categoryId: 4,
        },
        {
          name: "Persona 5 Royal",
          description: "Lorem Ipsum",
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
