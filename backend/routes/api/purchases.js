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

// Delete a purchase by its ID
//{{url}}/purchases/:id
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Purchase ID is required' });
  }

  const purchase = await Purchase.findByPk(id);

  if (!purchase) {
    return res.status(404).json({ message: 'No purchase found with the provided ID' });
  }

  const timePassed = Date.now() - new Date(purchase.purchaseDate);

  if (timePassed > 5*60*1000) {
    return res.status(403).json({ message: 'Cannot cancel order after 5 minutes' });
  }

  await purchase.destroy();
  res.status(200).json({ message: 'Order cancelled successfully' });
}));

// Update quantity for a purchase by its ID
//{{url}}/purchases/:id
router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  // Validate ID and quantity
  if (!id) {
    return res.status(400).json({ message: 'Purchase ID is required' });
  }

  if (quantity === undefined || quantity <= 0) {
    return res.status(400).json({ message: 'Valid quantity is required' });
  }

  const purchase = await Purchase.findByPk(id, {
    include: {
      model: Product,
      as: 'product',
    }
  });

  if (!purchase) {
    return res.status(404).json({ message: 'No purchase found with the provided ID' });
  }

  const timePassed = Date.now() - new Date(purchase.purchaseDate);

  if (timePassed > 5*60*1000) {
    return res.status(403).json({ message: 'Cannot edit purchase after 5 minutes' });
  }

  const totalPrice = purchase.product.price * quantity;

  purchase.quantity = quantity;
  purchase.totalPrice = totalPrice;

  await purchase.save();

  res.status(200).json({ message: 'Purchase updated successfully', purchase });
}));


module.exports = router;
