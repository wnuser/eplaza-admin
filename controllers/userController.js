const userModel = require('../models/users')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')
var passwordValidator = require('password-validator')
const otpGenerator = require('otp-generator')

var schema = new passwordValidator()

// Add properties to it
schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(['Passw0rd', 'Password123']) // Blacklist these values

const createUser = async (req, res) => {
    const data = req.body
    const password = data.password

    let response = schema.validate(password.trim(), { details: true })
    if (Object.keys(response).length != 0) {
        return res.status(421).json(response)
    }

    const salt = genSaltSync(10)
    data.password = hashSync(data.password, salt)

    let otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    })
    data.register_otp = '222222'

    const saveUser = await userModel
        .create(data)
        .then(function (data) {
            let successResponse = {
                data,
                message: 'User registered successfully',
                success: true,
            }
            return res.status(200).json(successResponse)
        })
        .catch(function (error) {
            let errorResponse = {
                data: '',
                message: 'Something went wrong!',
                success: false,
                error: error.errors,
            }
            return res.status(422).json(errorResponse)
        })
}

const otpVerification = async (req, res) => {
    const data = req.body
    const otp = data.otp
    const userId = data.user_id

    try {
        const result = await userModel
            .findAll({
                where: {
                    id: userId,
                    register_otp: otp,
                },
            })
            .then((data) => {
                let response = {}
                if (Object.keys(data).length === 0) {
                    response = {
                        data,
                        message: 'Invalid otp or user_id',
                        success: true,
                    }
                    return res.status(401).json(response)
                } else {
                    response = {
                        data,
                        message: 'OTP verified successfully!',
                        success: true,
                    }
                    return res.status(200).json(response)
                }
            })
            .catch((Error) => {
                console.log(Error, 'error')

                let ErrorResponse = {
                    data: Error,
                    message: 'Something went wrong',
                    success: false,
                    error: Error.message,
                }
                return res.status(400).json(ErrorResponse)
            })
    } catch (error) {
        return res.status(400).json({
            message: 'Something went wrong nn',
            error: error.message,
        })
    }
}

module.exports = {
    createUser,
    otpVerification,
}
