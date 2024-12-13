const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// backend/app.js
const routes = require('./routes');

// Imports information about the environment from config index.js file.
const { environment } = require('./config');
const isProduction = environment === 'production';

// Initialize the Express application:
// creates the app object
const app = express();

// Prints information about rewuest and responces..
app.use(morgan('dev'));

// Read cookies from rewuest
// <cookie-parser> middleware for parsing cookies
app.use(cookieParser());
// <express.json> middleware for parsing JSON bodies of requests 
// with Content-Type of "application/json"
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }
  
  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );
  
  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

//   !ALWAYS AT BOTTOM
  app.use(routes); // Connect all the routes

  module.exports = app;