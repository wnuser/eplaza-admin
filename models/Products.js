const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/sqldb')
const categoryModel = require('./category')
const subCategoryModel = require('./subCategories')
const userModel = require('./users')
const globalDeliveryTimesModel = require('./globalDeliveryTimes')

const Products = sequelize.define(
    'products',
    {
        // Model attributes are defined here
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: categoryModel,
                key: 'id',
            },
        },
        sub_category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: subCategoryModel,
                key: 'id',
            },
            // allowNull defaults to true
        },
        vendor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: userModel,
                key: 'id',
            },
            // allowNull defaults to true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            // allowNull defaults to true
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            // allowNull defaults to true
        },
        offer_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            // allowNull defaults to true
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // allowNull defaults to true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            // allowNull defaults to true
        },
        shipping_policy: {
            type: DataTypes.TEXT,
            allowNull: true,
            // allowNull defaults to true
        },
        refund_policy: {
            type: DataTypes.TEXT,
            allowNull: true,
            // allowNull defaults to true
        },
        is_cancel_enabled: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '0-NOT_ENABLED,1-ENABLED',
        },
        is_return_enabled: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '0-NOT_ENABLED,1-ENABLED',
        },
        is_exchange_enabled: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '0-NOT_ENABLED,1-ENABLED',
        },
        image_1: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_2: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_3: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        timestamps: true,
        tableName: 'products',
    }
)

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
Products.belongsTo(categoryModel, {
    foreignKey: {
        name: 'category_id',
    },
})

Products.belongsTo(subCategoryModel, {
    foreignKey: {
        name: 'sub_category_id',
    },
})

Products.belongsTo(globalDeliveryTimesModel, {
    foreignKey: {
        name: 'shipping_policy',
    },
})

module.exports = Products
