const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/sqldb") ;

const SubscriptionPlan = sequelize.define('subscription_plans', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull:false
    // allowNull defaults to true
  },
  off: {
    type: DataTypes.INTEGER,
    allowNull:false
    // allowNull defaults to true
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
    // allowNull defaults to true
  },
  is_delivery: {
    type: DataTypes.TINYINT,
    allowNull: false
    // allowNull defaults to true
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  timestamps: true,
});

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = SubscriptionPlan;