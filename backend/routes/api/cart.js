const express = require('express');
const asyncHandler = require('express-async-handler');
const { Cart, Product } = require('../../db/models');

const router = express.Router();

// Get all cart items for a user
router.get('/', asyncHandler(async (req, res) => {
  const { userId } = req.query;

  const cartItems = await Cart.findAll({
    where: {
        userId,
    },
    include: {
        model: Product,
        as: 'product',
    },
  });

  res.json(cartItems);
}));

// Add a product to the cart
router.post('/', asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;

  let cartItem = await Cart.findOne({
    where: {
      userId,
      productId,
    },
  });

  if (cartItem) {
    const newQuantity = cartItem.quantity + quantity;
    if (newQuantity > 10) {
      return res.status(400).json({ error: 'Exceeded maximum quantity' });
    }

    cartItem.quantity = newQuantity;
    await cartItem.save();
  } else {
    if (quantity > 10) {
      return res.status(400).json({ error: 'Exceeded maximum quantity' });
    }

    cartItem = await Cart.create({
      userId,
      productId,
      quantity,
    });
  }

  const updatedCartItems = await Cart.findAll({
    where: {
      userId,
    },
    include: {
      model: Product,
      as: 'product',
    },
  });

  res.json(updatedCartItems);
}));

// Update cart item quantity
router.put('/:cartItemId', asyncHandler(async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1 || quantity > 10) {
    return res.status(400).json({ error: 'Invalid quantity' });
  }

  const cartItem = await Cart.findByPk(cartItemId);

  if (cartItem) {
    cartItem.quantity = quantity;
    await cartItem.save();

    const updatedCartItems = await Cart.findAll({
      where: {
        userId: cartItem.userId
      },
      include: {
        model: Product,
        as: 'product',
      },
    });

    res.json(updatedCartItems);
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

// Remove all items from cart for a given userId
router.delete('/user/:userId', asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const cartItems = await Cart.findAll({ where: { userId } });

  if (cartItems.length) {
    await Cart.destroy({ where: { userId } });
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'No cart items found for the given user' });
  }
}));


module.exports = router;
