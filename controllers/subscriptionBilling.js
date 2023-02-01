const subscriptionBilling = require('../models/subscriptionBilling')

const purchaseSubscription = (req, res) => {
    const data = req.body
    console.log('data', data)

    try {
        const saveData = subscriptionBilling
            .create(data)
            .then((response) => {
                console.log('response', response)
                return res.status(200).json({
                    success: true,
                    message: 'Subscription purchased successfully',
                    response: response,
                })
            })
            .then((error) => {
                // console.log('error', error)

                // return res.status(400).json({
                //     success: false,
                //     message: 'something went wrong',
                //     error: error,
                // })
                return res.status(400).json(error[0])
            })
    } catch (errorData) {
        console.log(errorData, 'catch error')
        return res.status(400).json(errorData)
    }
}

module.exports = {
    purchaseSubscription,
}
