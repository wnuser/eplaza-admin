const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/sqldb')

const globalDeliveryTimes = sequelize.define(
    'global_delivery_times',
    {
        min_time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        max_time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        time_format: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '1-minut,2-hour,3-days',
        },
    },
    {
        // Other model options go here
        timestamps: true,
        tableName: 'global_delivery_times',
    }
)

module.exports = globalDeliveryTimes
