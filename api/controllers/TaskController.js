const Task = require('../models/Task');
const { validationResult } = require('express-validator');
const Member = require('../models/Member');

const TaskController = () => {
  const addTask = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { body, userId } = req;
      await Task.create({
        title: body.title,
        description: body.description,
        memberId: body.memberId,
        userId,
      });
      return res.status(201).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getAllTasks = async (req, res) => {
    try {
      const { userId } = req;
      const tasks = await Task.findAll({ where: { userId }, include: [Member] });
      return res.status(200).json({ tasks });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getTaskById = async (req, res) => {
    try {
      const { params: { id }, userId } = req;
      const task = await Task.findOne({ where: { id, userId }, include: [Member] });
      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }
      return res.status(200).json({ task });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const updateTaskById = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { params: { id }, userId, body } = req;
      const [updated] = await Task.update({
        title: body.title,
        description: body.description,
        memberId: body.memberId,
      }, {
        where: { id, userId },
      });
      return updated === 0 ? res.status(404).json({ success: false, msg: 'Task not found' }) : res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const deleteTaskById = async (req, res) => {
    try {
      const { params: { id }, userId } = req;
      const deleted = await Task.destroy({ where: { id, userId } });
      return deleted === 0 ? res.status(404).json({ success: false, msg: 'Task not found' }) : res.status(204).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    addTask,
    getTaskById,
    getAllTasks,
    updateTaskById,
    deleteTaskById,
  };
};

module.exports = TaskController;
