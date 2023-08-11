// routes/cart.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { Cart } = require('../../db/models');

const router = express.Router();

// Add item to cart
router.post('/', asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const cartItem = await Cart.create({
    userId,
    productId,
    quantity,
  });

  res.json(cartItem);
}));


// Update cart item quantity
router.put('/:cartItemId', asyncHandler(async (req, res) => {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findByPk(cartItemId);

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.json(cartItem);
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  }));

// Remove item from cart
router.delete('/:cartItemId', asyncHandler(async (req, res) => {
    const { cartItemId } = req.params;

    const cartItem = await Cart.findByPk(cartItemId);

    if (cartItem) {
      await cartItem.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  }));



module.exports = router;
