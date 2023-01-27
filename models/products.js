const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/sqldb") ;

const Products = sequelize.define('products', {
  // Model attributes are defined here
  category_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sub_category_id: {
    type: DataTypes.STRING,
    allowNull:false
    // allowNull defaults to true
  },
  vendor_id: {
    type: DataTypes.STRING,
    allowNull:false
    // allowNull defaults to true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: true
    // allowNull defaults to true
  },
  discount_percentage: {
    type: DataTypes.DOUBLE,
    allowNull: true
    // allowNull defaults to true
  },
  offer_price: {
    type: DataTypes.DOUBLE,
    allowNull: false
    // allowNull defaults to true
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
    // allowNull defaults to true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
    // allowNull defaults to true
  },
  shipping_policy: {
    type: DataTypes.TEXT,
    allowNull: true
    // allowNull defaults to true
  },
  refund_policy: {
    type: DataTypes.TEXT,
    allowNull: true
    // allowNull defaults to true
  },
  cancellation_return_exchange_policy: {
    type: DataTypes.TEXT,
    allowNull: true
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  timestamps: true,
  tableName: 'products'

});

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = Products;