const Sequelize = require('sequelize');
const User = require('./User');
const Member = require('./Member');
const sequelize = require('../../config/database');

const tableName = 'tasks';

const Task = sequelize.define('Task', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
}, { tableName });

// eslint-disable-next-line
Task.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

Task.belongsTo(User, { onDelete: 'CASCADE', foreignKey: { key: 'id', name: 'userId', allowNull: false } });
Task.belongsTo(Member, { onDelete: 'SET NULL', foreignKey: { key: 'id', name: 'memberId', allowNull: true } });

module.exports = Task;
