const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/sqldb") ;

const User = sequelize.define('users', {
  // Model attributes are defined here
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate:{
      isEmail: true,    // checks for email format (foo@bar.com)
    }

    // allowNull defaults to true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    len: [8,10],
    // allowNull defaults to true
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    len: [10,12],
    validate:{
      isNumeric: true,
      customValidator(value) {
        if (value.length < 10 || value.length> 11 ) {
          throw new Error("Mobile number cannot be less then 10 character and greater then 11 character");
        }
      },
    }

    // allowNull defaults to true
  },
  user_type: {
    type: DataTypes.TINYINT,
    allowNull: false

    // allowNull defaults to true
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
    // allowNull defaults to true
  },
  zip_code: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  social_id: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  register_otp: {
    type: DataTypes.STRING,
    allowNull: true
    // allowNull defaults to true
  },
  is_verified: {
    type: DataTypes.STRING,
    allowNull:true
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  timestamps: true,
  tableName: 'users'

});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User;