const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const auditSchema = sequelize.define(
  'audit',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exchange_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    log: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = auditSchema;
