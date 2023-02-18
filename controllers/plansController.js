const SubscriptionPlans = require('../models/SubscriptionPlans')
const constants = require('../constants/constants')

const allPlans = (req, res) => {
    const plans = SubscriptionPlans.findAll({
        where: {
            status: constants.subscription_status.active,
        },
    })
        .then((data) => {
            return res.status(200).json({
                data,
                message: 'Plans data found',
                success: true,
            })
        })
        .catch((error) => {
            return res.status(400).json({
                error: error.message,
                success: false,
            })
        })
}

module.exports = {
    allPlans,
}
