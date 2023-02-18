const { Sequelize, DataTypes } = require('sequelize')
const dbConnection = require('../config/sqldb')
const SubscriptionBilling = require('./SubscriptionBilling')

const VendorSubscription = dbConnection.define(
    'vendor_subscriptions',
    {
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        plan_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        billing_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: SubscriptionBilling,
                key: 'id',
            },
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total_billing_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        plan_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        discount_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        total_billing_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        is_plan_expired: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        // Other model options go here
        timestamps: true,
        tableName: 'vendor_subscriptions',
    }
)

module.exports = VendorSubscription
