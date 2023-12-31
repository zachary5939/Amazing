const router = require("express").Router();
const { Product, Category, Rating, User, Purchases } = require("../../db/models");
const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth.js");
const { handleValidationErrors } = require("../../utils/validation.js");

//get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//search products.
router.get('/search', async (req, res) => {
  const searchQuery = req.query.name;
  let operator = Op.like;
  let transformedSearchQuery = searchQuery.toLowerCase(); // Default for SQLite

  // Check if we are in production (using Postgres)
  if (process.env.NODE_ENV === "production") {
    operator = Op.iLike; // Use iLike for Postgres
    transformedSearchQuery = searchQuery; // Keep the query as is for Postgres
  }

  try {
    const products = await Product.findAll({
      where: {
        name: {
          [operator]: `%${transformedSearchQuery}%`
        }
      }
    });

    if (!products.length) {
      return res.status(404).json({ error: 'No products found' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// //search products. NOTE: iLike is case-insensitive for postgres ONLY!! it will not work on localhost.
// router.get('/search', async (req, res) => {
//   const searchQuery = req.query.name;

//   try {
//     const products = await Product.findAll({
//       where: {
//         name: {
//           [Op.iLike]: `%${searchQuery}%`
//         }
//       }
//     });

//     if (!products.length) {
//       return res.status(404).json({ error: 'No products found' });
//     }

//     res.json(products);
//   } catch (error) {
//     console.error('Error searching products:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Get a product by ID
router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//get products by category
router.get("/category/:categoryId", async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const validCategoryIds = [1, 2, 3, 4];

  try {
    if (!validCategoryIds.includes(parseInt(categoryId))) {
      return res.status(404).json({ message: "Category does not exist" });
    }

    const products = await Product.findAll({
      where: {
        categoryId: categoryId,
      },
      include: {
        model: Category,
        as: 'category',
        attributes: ["id", "name"],
      },
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:productId/ratings", asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const ratings = await Rating.findAll({
      where: {
          productId: productId,
      },
      include: [
          { model: Product, as: "product" },
          {
              model: User,
              as: "user",
              attributes: ["id", "username", "firstName", "lastName"]
          },
      ]
  });

  res.json(ratings);
}));


module.exports = router;
