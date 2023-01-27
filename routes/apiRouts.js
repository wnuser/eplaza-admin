const { createUser, otpVerification} = require("../controllers/userController")
const { getAllCategories } = require('../controllers/categoeryController')
const { getSubCategories } = require('../controllers/subCategories')
const { allPlans } = require('../controllers/plansController')
const { login } = require('../controllers/authController')

const express = require('express')
const router = express.Router()

// auth routes
router.post('/login', login)

//user routes
router.post('/register', createUser)
router.post('/check/otp', otpVerification)

//category routes 
router.get('/get/categories', getAllCategories)

//sub categories routes
router.get('/get/subcategories/:categoryId', getSubCategories)

// subscription
router.get('/plans', allPlans)

module.exports = router;