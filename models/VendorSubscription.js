const { Sequelize, DataTypes } = require('sequelize')
const dbConnection = require('../config/sqldb')
const SubscriptionBilling = require('./SubscriptionBilling')
const SubscriptionPlans = require('./SubscriptionPlans')

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
            references: {
                model: SubscriptionPlans,
                key: 'id',
            },
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

        is_plan_expired: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '0-NOT_EXPIRED,1-EXPIRED',
        },
    },
    {
        // Other model options go here
        timestamps: true,
        tableName: 'vendor_subscriptions',
    }
)

VendorSubscription.belongsTo(SubscriptionPlans, {
    foreignKey: {
        name: 'plan_id',
    },
})

VendorSubscription.belongsTo(SubscriptionBilling, {
    foreignKey: {
        name: 'billing_id',
    },
})

module.exports = VendorSubscription
