const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/sqldb") ;

const Category = sequelize.define('category', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull:true
    // allowNull defaults to true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull:true
    // allowNull defaults to true
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  timestamps: true,
  tableName: 'category'

});

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = Category;