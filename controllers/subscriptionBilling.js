const SubscriptionBilling = require('../models/SubscriptionBilling')
const SubscriptionPlans = require('../models/SubscriptionPlans')
const VendorSubscriptionModel = require('../models/VendorSubscription')

const date = require('date-and-time')

const purchaseSubscription = async (req, res) => {
    const data = req.body
    let planDays = false

    const date = new Date()
    const startDate = date.toISOString().split('T')[0]
    const currentTime = date.toLocaleTimeString()

    const planDetails = await SubscriptionPlans.findAll({
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
                error: planErrorResponse.message,
                message: 'Something went wrong',
            })
        })

    const endDate = date.setDate(date.getDate() + 90)
    const formattedEndDate = new Date(endDate).toISOString().split('T')[0]
    data.purchase_date = startDate
    data.purchase_time = currentTime

    try {
        const saveData = await SubscriptionBilling.create(data)
            .then(async (response) => {
                // logic to prepare data based on coming refrence to save in vendor subscription
                const subscriptionData = {}
                subscriptionData.billing_id = response.id
                subscriptionData.vendor_id = data.vendor_id
                subscriptionData.plan_id = data.plan_id
                subscriptionData.start_date = startDate
                subscriptionData.end_date = formattedEndDate

                const saveVendorSubscription =
                    await VendorSubscriptionModel.create(subscriptionData)
                        .then(async (successResponse) => {
                            const latestId = successResponse.id
                            const purchaseDetails =
                                await VendorSubscriptionModel.findAll({
                                    where: {
                                        id: latestId,
                                    },
                                    include: [
                                        {
                                            model: SubscriptionPlans,
                                        },
                                        {
                                            model: SubscriptionBilling,
                                        },
                                    ],
                                })
                                    .then((purchaseDetails) => {
                                        return res.status(201).json({
                                            success: true,
                                            message:
                                                'Subscription purchased successfully',
                                            data: purchaseDetails,
                                        })
                                    })
                                    .catch((errorPurchase) => {
                                        return res.status(400).json({
                                            success: false,
                                            message: 'Something went wrong1',
                                            error: errorPurchase.message,
                                        })
                                    })
                        })
                        .catch((errorResponse) => {
                            return res.status(400).json({
                                success: false,
                                message: 'Something went wrong1',
                                error: errorResponse.message,
                            })
                        })
            })
            .catch((error) => {
                return res.status(400).json({
                    success: false,
                    message: 'Something went wrong2',
                    error: error.message,
                })
            })
    } catch (errorData) {
        return res.status(400).json({
            success: false,
            error: errorData.message,
            message: 'Something went wrong3',
        })
    }
}

module.exports = {
    purchaseSubscription,
}
