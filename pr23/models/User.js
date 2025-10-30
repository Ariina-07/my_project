const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  }
}, {
  tableName: 'users', 
  hooks: {
    beforeCreate: async (user) => {
      user.password_hash = await bcrypt.hash(user.password_hash, 10);
    }
  }
});

User.prototype.checkPassword = function(password) {
  return bcrypt.compare(password, this.password_hash);
};

module.exports = User;