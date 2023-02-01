const { createUser, otpVerification } = require('../controllers/userController')
const { getAllCategories } = require('../controllers/categoeryController')
const { getSubCategories } = require('../controllers/subCategories')
const { createUser, otpVerification } = require('../controllers/userController')
const categoryController = require('../controllers/categoeryController')
const subCategories = require('../controllers/subCategories')
const { allPlans } = require('../controllers/plansController')
const { login } = require('../controllers/authController')
const { purchaseSubscription } = require('../controllers/subscriptionBilling')

const express = require('express')
const router = express.Router()

// auth routes
router.post('/login', login)

//user routes
router.post('/register', createUser)
router.post('/check/otp', otpVerification)

//category routes
router.get('/get/categories', getAllCategories)
//category routes
router.get('/get/categories', categoryController.getAllCategories)
router.post('/create/category', categoryController.createCategory)
router.patch('/update/category', categoryController.updateCategory)
router.delete('/delete/category', categoryController.deleteCategory)

//sub categories routes
router.get('/get/subcategories/:categoryId', subCategories.getSubCategories)
router.post('/create/sub-category', subCategories.createSubCategory)
router.patch('/update/sub-category', subCategories.updateSubCategory)
router.delete('/delete/sub-category', subCategories.deleteSubCategory)

// subscription
router.get('/plans', allPlans)
router.post('/purchase/plan', purchaseSubscription)

module.exports = router
