const subscriptionBilling = require('../models/SubscriptionBilling')
const subscriptionPlans = require('../models/subscriptionPlans')
const date = require('date-and-time')

const purchaseSubscription = (req, res) => {
    const data = req.body
    let planDays = false

    const now = new Date()
    date.format(now, 'DD-MM-YYYY')

    console.log('now', now)

    res.send('Hello..........!')
    exit

    const start_date = new Date() // delete the dot and everything after;
    const end_date = start_date.setDate(start_date.getDate() + planDays)

    // const =  start_date.toISOString().
    // replace(/T/, ' ').      // replace T with a space
    // replace(/\..+/, '')

    // const testStart = date.format(start_date,'YYYY/MM/DD HH:mm:ss')

    console.log(
        'testStart',
        'testStart',
        start_date,
        'start_date',
        end_date,
        'end_date'
    )

    const planDetails = subscriptionPlans
        .findAll({
            where: {
                id: data.plan_id,
            },
        })
        .then((planResponse) => {
            planDays = planResponse[0].duration
        })
        .catch((planErrorResponse) => {
            return res.status(400).json({
                success: false,
                error: planErrorResponse.errors,
                message: 'Something went wrong',
            })
        })

    try {
        const saveData = subscriptionBilling
            .create(data)
            .then((response) => {
                // logic to prepare data based on coming refrence to save in vendor subscription

                const subscriptionData = {}
                const billing_id = response.id

                const start_date = new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Calcutta',
                })

                // const start_date = new Date();
                // const end_date   = start_date.setDate(start_date.getDate() + planDays);

                console.log(start_date, 'start_date', 'end_date', 'end_date')

                // console.log('response', response)
                return res.status(200).json({
                    success: true,
                    message: 'Subscription purchased successfully',
                    response: response,
                })
            })
            .catch((error) => {
                console.log('error', error)
                return res.status(400).json({
                    success: false,
                    message: 'Something went wrong',
                    error: error.errors,
                })
            })
    } catch (errorData) {
        console.log(errorData, 'catch error')

        return res.status(400).json({
            success: false,
            error: errorData,
            message: 'Something went wrong',
        })
    }
}

module.exports = {
    purchaseSubscription,
}
