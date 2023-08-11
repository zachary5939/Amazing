// routes/cart.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const { Cart, Product} = require('../../db/models');

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

    cartItem.quantity += quantity;
    await cartItem.save();
  } else {

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

  try {
    const cartItem = await Cart.findByPk(cartItemId);

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.json(cartItem);
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ message: 'An error occurred while updating the cart item' });
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
