const { createUser, otpVerification } = require('../controllers/userController')
const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoeryController')
const {
    getSubCategories,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
} = require('../controllers/subCategories')
const { allPlans } = require('../controllers/plansController')
const { login } = require('../controllers/authController')
const {
    purchaseSubscription,
    getSubscriptionDetails,
} = require('../controllers/subscriptionBilling')
const { updateShopDetails } = require('../controllers/shopController')

const express = require('express')
const router = express.Router()

// auth routes
router.post('/login', login)

router.post('/test', (req, res) => {
    res.send('Coming here...!')
})

//user routes
router.post('/register', createUser)
router.post('/check/otp', otpVerification)

// subscription
router.get('/plans', allPlans)
router.post('/purchase/plan', purchaseSubscription)
router.get('/subscrioption/:vendorId', getSubscriptionDetails)

//category routes
router.get('/get/categories', getAllCategories)
router.post('/create/category', createCategory)
router.patch('/update/category', updateCategory)
router.delete('/delete/category', deleteCategory)

//sub categories routes
router.get('/get/subcategories/:categoryId', getSubCategories)
router.post('/create/sub-category', createSubCategory)
router.patch('/update/sub-category', updateSubCategory)
router.delete('/delete/sub-category', deleteSubCategory)

// update shop details
router.post('/update/shop', updateShopDetails)

//product crud apis for vendor

module.exports = router
