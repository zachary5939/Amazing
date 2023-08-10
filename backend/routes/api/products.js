const router = require("express").Router();
const { Product, Category } = require("../../db/models"); // Make sure to use the correct model names
const { Op } = require("sequelize");

const { requireAuth } = require("../../utils/auth.js");
const { handleValidationErrors } = require("../../utils/validation.js");

//get all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: Category,
    });

    if (products.length === 0) {
      return res.status(404).json({ error: "Failed to get all products" });
    }

    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Get a product by ID
router.get("/:id", async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId, {
      include: Category,
    });

    if (!product) {
      return res.status(404).json({ message: "Product does not exist" });
    }

    res.json(product);
  } catch (error) {
    next(error);
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
      include: Category,
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
});


  module.exports = router;

module.exports = router;
