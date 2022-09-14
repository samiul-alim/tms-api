const Member = require('../models/Member');
const { validationResult } = require('express-validator');

const MemberController = () => {
  const addMember = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { body, userId } = req;
      await Member.create({ name: body.name, userId });
      return res.status(201).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getAllMembers = async (req, res) => {
    try {
      const { userId } = req;
      const members = await Member.findAll({ where: { userId } });
      return res.status(200).json({ members });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getMemberById = async (req, res) => {
    try {
      const { params: { id }, userId } = req;
      const member = await Member.findOne({ where: { id, userId } });
      if (!member) {
        return res.status(400).json({ msg: 'Member not found' });
      }
      return res.status(200).json({ member });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const updateMemberById = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { params: { id }, userId, body: { name } } = req;
      const [updated] = await Member.update({ name }, {
        where: { id, userId },
      });
      return updated === 0 ? res.status(404).json({ success: false, msg: 'Member not found' }) : res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const deleteMemberById = async (req, res) => {
    try {
      const { params: { id }, userId } = req;
      const deleted = await Member.destroy({ where: { id, userId } });
      return deleted === 0 ? res.status(404).json({ success: false, msg: 'Member not found' }) : res.status(204).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    addMember,
    getMemberById,
    getAllMembers,
    updateMemberById,
    deleteMemberById,
  };
};

module.exports = MemberController;
