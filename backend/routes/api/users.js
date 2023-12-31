// backend/routes/api/users.js
const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up also added firstName lastName
router.post("", validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  console.log('Data before User.create:', { email, username, hashedPassword, firstName, lastName });
  try {
    const user = await User.create({ email, username, hashedPassword, firstName, lastName });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser,
    });
  } catch (error) {
    console.error('Error during user creation:', error);
    if (error.name === 'SequelizeUniqueConstraintError' && error.fields && error.fields.includes('username')) {
      return res.status(400).json({ errors: { username: ['Username is already taken.'] } });
    }
    return res.status(500).json({ error: error.message });
  }
});


module.exports = router;
