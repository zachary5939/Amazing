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


// Finalize a user's cart and transfer the cart items to the purchases table
router.post('/finalize', asyncHandler(async (req, res) => {
  const { userId } = req.body;

  // Validate user ID if necessary
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  // Fetch the user's cart items
  const cartItems = await Cart.findAll({
    where: {
      userId: userId
    },
    include: {
      model: Product,
      as: 'product',
    },
  });

  // Check if the cart is empty
  if (!cartItems.length) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  // For each cart item, create a corresponding purchase record
  for (let cartItem of cartItems) {
    const { productId, quantity } = cartItem;
    const totalPrice = cartItem.product.price * quantity;

    await Purchase.create({
      userId,
      productId,
      quantity,
      totalPrice,
      purchaseDate: new Date()
    });

    await cartItem.destroy();
  }

  res.status(200).json({ message: 'Cart finalized and purchases created' });
}));

module.exports = router;
