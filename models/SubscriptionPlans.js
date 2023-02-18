const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/sqldb')

const SubscriptionPlans = sequelize.define(
    'subscription_plans',
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quarterly_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            comment: 'Price for a quarter',
            // allowNull defaults to true
        },
        yearly_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            comment: 'Yearly price',
        },
        yearly_price_discount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            comment: 'Off percentage on quaterly price',
            // allowNull defaults to true
        },
        yearly_off: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            comment: 'off on yearly price',
        },
        facilities: {
            type: DataTypes.TEXT,
            allowNull: false,
            // allowNull defaults to true
        },
        is_eplaza_full_delivery: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment:
                '0-Only eplaza delivery app, 1- eplaza delivery app with delivery partners',
            // allowNull defaults to true
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '0-INACTIVE,1-ACTIVE',
            // allowNull defaults to true
        },
    },
    {
        // Other model options go here
        timestamps: true,
        table: 'subscription_plans',
    }
)

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = SubscriptionPlans
