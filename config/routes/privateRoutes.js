const { body } = require('express-validator');

const privateRoutes = {
  'POST /members': {
    path: 'MemberController.addMember',
    middlewares: [
      body('name').notEmpty().withMessage('Name is required'),
    ],
  },
  'GET /members': 'MemberController.getAllMembers',
  'GET /members/:id': 'MemberController.getMemberById',
  'PATCH /members/:id': {
    path: 'MemberController.updateMemberById',
    middlewares: [
      body('name').notEmpty().withMessage('Name is required'),
    ],
  },
};

module.exports = privateRoutes;
