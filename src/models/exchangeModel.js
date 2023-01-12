const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const exchangeSchema = sequelize.define(
  'exchange',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = exchangeSchema;
