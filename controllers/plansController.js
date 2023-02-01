const subscriptionPlans = require('../models/subscriptionPlans')
const constants = require('../constants/constants')

const allPlans = (req, res) => {
    const plans = subscriptionPlans
        .findAll({
            where: {
                status: constants.subscription_status.active,
            },
        })
        .then((data) => {
            return res.status(200).json(data)
        })
        .catch((error) => {
            return res.status(400).json(error)
        })
}

module.exports = {
    allPlans,
}
