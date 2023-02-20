const globalDeliveryTimeModel = require('../models/globalDeliveryTimes')
const constants = require('../constants/constants')

const allAvailableTimes = (req, res) => {
    const allData = globalDeliveryTimeModel
        .findAll()
        .then((data) => {
            return res.status(200).json({
                data: data,
                success: true,
            })
            // console.log('data', data)
        })
        .catch((error) => {
            return res.status(400).json({
                error: error.message,
                success: false,
            })
            // console.log(error.message, 'error')
        })
}

module.exports = {
    allAvailableTimes,
}
