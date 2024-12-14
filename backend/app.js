const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// backend/app.js
const routes = require('./routes');
const { ValidationError } = require('sequelize');

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

//! ***** ERROR HANDLING
// ! Resource not found
// The first error handler is actually just a regular middleware. 
// It will catch any requests that don't match any of the routes defined,
// and create a server error with a status code of 404.

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// ! Sequelize error-handler
// second error handler is for catching Sequelize errors
// and formatting them before sending the error response.

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

// ! Error Formatter Error handler
// The last error handler is for formatting all the errors before returning a JSON response.
// It will include the error message, the error messages as a JSON object with key-value pairs,
// and the error stack trace (if the environment is in development) with the status code of the error message.
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});


  module.exports = app;