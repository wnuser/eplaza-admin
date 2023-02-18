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
        purchase_date: {
            type: DataTypes.DATE,
            allowNull: false,
            // allowNull defaults to true
        },
        purchase_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        plan_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            // allowNull defaults to true
        },
        discount_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        total_billing_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        timestamps: true,
        tableName: 'subscription_billing',
    }
)

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = SubscriptionBilling
