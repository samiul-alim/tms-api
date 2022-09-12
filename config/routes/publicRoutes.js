const { body } = require('express-validator');

const publicRoutes = {
  'POST /register': {
    path: 'UserController.register',
    middlewares: [
      body('name').notEmpty().withMessage('Name is required'),
      body('email').isEmail().withMessage('Provide a valid email'),
      body('password').notEmpty().withMessage('Password is required'),
      body('password2').notEmpty().withMessage('Password2 is required'),
    ],
  },
  'POST /login': {
    path: 'UserController.login',
    middlewares: [
      body('email').isEmail().withMessage('Provide a valid email'),
      body('password').notEmpty().withMessage('Password is required'),
    ],
  },
  'POST /validate': 'UserController.validate',
};

module.exports = publicRoutes;
