// backend/routes/api/index.js
const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");
const sessionRouter = require("./session.js");
const userRouter = require("./users");
const productsRouter = require("./products");
const cartRouter = require("./cart");
const ratingsRouter = require("./ratings");
// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", userRouter);
router.use("/products", productsRouter);
router.use("/cart", cartRouter);
router.use("/ratings", ratingsRouter);


router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
