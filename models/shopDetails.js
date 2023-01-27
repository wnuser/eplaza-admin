const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/sqldb") ;

const ShopDetails = sequelize.define('shop_details', {
  // Model attributes are defined here
  vendor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  shop_name: {
    type: DataTypes.STRING,
    allowNull:false
    // allowNull defaults to true
  },
  city: {
    type: DataTypes.STRING,
    allowNull:false
    // allowNull defaults to true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
    // allowNull defaults to true
  },
  image_1: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  image_2: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  aadhar_card_number: {
    type: DataTypes.INTEGER,
    allowNull: true
    // allowNull defaults to true
  },
  aadhar_image: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  business_type: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  turn_over: {
    type: DataTypes.TEXT,
    allowNull: true
    // allowNull defaults to true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
    // allowNull defaults to true
  },
  is_grahudhyog: {
    type: DataTypes.TINYINT,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  timestamps: true,
//   tableName: 'shop_details'

});

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = ShopDetails;