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

  'POST /tasks': {
    path: 'TaskController.addTask',
    middlewares: [
      body('title').notEmpty().withMessage('Title is required'),
    ],
  },
  'GET /tasks': 'TaskController.getAllTasks',
  'GET /tasks/:id': 'TaskController.getTaskById',
  'PATCH /tasks/:id': {
    path: 'TaskController.updateTaskById',
    middlewares: [
      body('title').notEmpty().withMessage('Title is required'),
    ],
  },

};

module.exports = privateRoutes;
