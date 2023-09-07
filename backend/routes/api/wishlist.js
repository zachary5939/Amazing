const router = require("express").Router();
const { Cart, Product, Purchases, Purchase, User, Wishlist } = require('../../db/models');
const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler");

// Get all wishlists for a user
router.get('/', asyncHandler(async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const userWishlists = await Wishlist.findAll({
        where: { userId },
        include: [
            {
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'price', 'description', 'imageURL', 'categoryId']
            },
            ]
    });

    if (!userWishlists.length) {
        return res.status(404).json({ message: 'No wishlists found' });
    }

    res.json(userWishlists);
    }));

// Delete a product from a user's wishlist
router.delete('/', asyncHandler(async (req, res) => {
    const { userId, productId } = req.query;

    if (!userId || !productId) {
        return res.status(400).json({ error: "Both userId and productId are required as query parameters." });
    }

    const wishlistItem = await Wishlist.findOne({
        where: { userId, productId }
    });

    if (!wishlistItem) {
        return res.status(404).json({ message: "No such item found in the user's wishlist." });
    }
    await wishlistItem.destroy();

    res.status(204).end();
}));

module.exports = router;
