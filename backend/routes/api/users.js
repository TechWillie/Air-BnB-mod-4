// This file will hold the resources for the route paths beginning with /api/users
// backend/routes/api/users.js
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/', async (req, res) => {
  const users = await User.findAll()
  return users
})


//! Sign up
//  add the POST /api/users route to the router 
// using an asynchronous route handler
router.post('/',async (req, res) => {
  console.log(`request body: ${Object.values(req.body)} == params: ${req.params}`);
  
    // In the route handler, deconstruct the request body
      const { email, password, username, firstName, lastName } = req.body;
      console.log(firstName, lastName);
      
    //   then use bcrypt's hashSync function to hash the user's provided password...
    const hashedPassword = bcrypt.hashSync(password);
    // ...to be saved as the user's hashedPassword in the database.
    // Create a new User in the database 
    // with the username and email from the request body 
    // and the hashedPassword generated from bcryptjs.
      const user = await User.create({ firstName, lastName, email, username, hashedPassword });
  console.log(user);
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
      console.log(safeUser);
      
    //   Then, use setTokenCookie to log in the user by creating a JWT cookie 
    // with the user's non-sensitive information as its payload.
      await setTokenCookie(res, safeUser);
    //   Finally, send a JSON response containing the user's non-sensitive information.
      return res.json({
        user: safeUser
      });
    }
  );


// The validateSignup middleware is composed of the check and handleValidationErrors middleware
  const validateSignup = [
    check('email')
    // It checks to see if req.body.email exists and is an emai
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
    // req.body.username is a minimum length of 4 and 
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
    // is not an emai
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
    // is not empty and has a minimum length of 6
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

module.exports = router;