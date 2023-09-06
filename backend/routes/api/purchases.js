const router = require("express").Router();
const { Cart, Product, Purchases, Purchase, User } = require('../../db/models');
const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler");

// Get all purchases for a user
//{{url}}/purchases?userId=1
router.get('/', asyncHandler(async (req, res) => {
    const { userId } = req.query;

    // Validate user ID if necessary
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const purchases = await Purchase.findAll({
      where: {
        userId
      },
      include: [
        {
          model: Product,
          as: 'product',
        },
        {
          model: User,
          as: 'user'
        }
      ],
    });

    if (!purchases.length) {
      return res.status(404).json({ message: 'No purchases found' });
    }

    res.json(purchases);
  }));

module.exports = router;
