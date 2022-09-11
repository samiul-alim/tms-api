const Sequelize = require('sequelize');
const User = require('./User');
const sequelize = require('../../config/database');

const tableName = 'members';

const Member = sequelize.define('Member', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, { tableName });

// eslint-disable-next-line
Member.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

Member.belongsTo(User, { onDelete: 'CASCADE', foreignKey: { key: 'id', name: 'userId', allowNull: false } });

module.exports = Member;
