const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/sqldb')

const SubscriptionBilling = sequelize.define(
    'subscription_billing',
    {
        // Model attributes are defined here
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        plan_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // allowNull defaults to true
        },
        purchased_date: {
            type: DataTypes.STRING,
            allowNull: false,
            // allowNull defaults to true
        },
        start_date: {
            type: DataTypes.STRING,
            allowNull: false,
            // allowNull defaults to true
        },
        end_date: {
            type: DataTypes.STRING,
            allowNull: false,
            // allowNull defaults to true
        },
        total_billing_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            // allowNull defaults to true
        },
        plan_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            // allowNull defaults to true
        },
        off: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // allowNull defaults to true
        },
    },
    {
        // Other model options go here
        timestamps: true,
    }
)

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = SubscriptionBilling
