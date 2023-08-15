const express = require("express");
const asyncHandler = require("express-async-handler");
const { Rating, Product, User } = require("../../db/models");

const router = express.Router();

// Get all ratings for a specific product
router.get("/product/:productId", asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const ratingsForProduct = await Rating.findAll({
        where: { productId: productId },
        include: [
            { model: Product, as: 'product' },
            { model: User, as: 'user' }
        ]
    });
    res.json(ratingsForProduct);
}));



// Get all ratings by a user
router.get("/user/:userId", asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const ratings = await Rating.findAll({
        where: { userId: userId },
        include: [
            { model: Product, as: 'product' },
            { model: User, as: 'user' }
        ]
    });
    if (ratings && ratings.length) {
        res.json(ratings);
    } else {
        res.status(404).json({ error: "No ratings found for this user" });
    }
}));

// Get rating by its ID
router.get("/:id", asyncHandler(async (req, res) => {
    const ratingId = req.params.id;
    const rating = await Rating.findByPk(ratingId, {
        include: [
            { model: Product, as: "product" },
            { model: User, as: "user" },
        ]
    });
    if (rating) {
        res.json(rating);
    } else {
        res.status(404).json({ error: "Rating not found" });
    }
}));

// Post a rating for a product
router.post("/", asyncHandler(async (req, res) => {
    const { userId, productId, rating, text } = req.body;
    const newRating = await Rating.create({
        userId: userId,
        productId: productId,
        rating: rating,
        text: text,
        timestamp: new Date()
    });
    res.status(201).json(newRating);
}));

// Edit a rating for a product
// Edit a rating for a product
router.put("/:id", asyncHandler(async (req, res) => {
    const ratingId = req.params.id;
    const { userId, productId, rating, text } = req.body;

    const existingRating = await Rating.findByPk(ratingId);

    if (existingRating) {
        await existingRating.update({ userId, productId, rating, text });

        const updatedRatingWithProduct = await Rating.findByPk(ratingId, {
            include: [
                { model: Product, as: 'product' }
            ]
        });

        res.json(updatedRatingWithProduct);
    } else {
        res.status(404).json({ error: "Rating not found" });
    }
}));


// Delete a rating for a product
router.delete("/:id", asyncHandler(async (req, res) => {
    const ratingId = req.params.id;
    const rating = await Rating.findByPk(ratingId);

    if (rating) {
        await rating.destroy();
        res.status(204).end();
    } else {
        res.status(404).json({ error: "Rating not found" });
    }
}));

module.exports = router;
