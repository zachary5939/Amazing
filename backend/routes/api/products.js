const router = require("express").Router();
const { Product, Category } = require("../../db/models");
const { Op } = require("sequelize");

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

module.exports = router;
