const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/sqldb") ;

const SubCategories = sequelize.define('sub_categories', {
  // Model attributes are defined here
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull:false
    // allowNull defaults to true
  },
  image: {
    type: DataTypes.STRING,
    allowNull:true
    // allowNull defaults to true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
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
});

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = SubCategories;