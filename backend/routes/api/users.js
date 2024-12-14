// This file will hold the resources for the route paths beginning with /api/users
// backend/routes/api/users.js
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

//! Sign up
//  add the POST /api/users route to the router 
// using an asynchronous route handler
router.post('/',async (req, res) => {
    // In the route handler, deconstruct the request body
      const { email, password, username } = req.body;
    //   then use bcrypt's hashSync function to hash the user's provided password...
    const hashedPassword = bcrypt.hashSync(password);
    // ...to be saved as the user's hashedPassword in the database.
    // Create a new User in the database 
    // with the username and email from the request body 
    // and the hashedPassword generated from bcryptjs.
      const user = await User.create({ email, username, hashedPassword });
  
      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
    //   Then, use setTokenCookie to log in the user by creating a JWT cookie 
    // with the user's non-sensitive information as its payload.
      await setTokenCookie(res, safeUser);
    //   Finally, send a JSON response containing the user's non-sensitive information.
      return res.json({
        user: safeUser
      });
    }
  );

module.exports = router;