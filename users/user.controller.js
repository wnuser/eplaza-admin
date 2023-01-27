const {
    create,
    getUsersByUserId,
    getUsers,
    updateUser,
    deleteUser,
    getUserByEmail,
} = require('./user.service')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')

module.exports = {
    createUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        
        create(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    success: 0,
                    message: err,
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },

    getUserById: (req, res) => {
        const id = req.params.id
        getUsersByUserId(id, (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err,
                })
            }

            if (!result) {
                return res.status(200).json({
                    success: true,
                    message: 'User is not found',
                })
            }

            return res.status(200).json({
                success: 1,
                data: result,
            })
        })
    },

    getUsers: (req, res) => {
        getUsers((err, result) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    success: false,
                    message: err,
                })
            }
            return res.status(200).json({
                success: true,
                data: result,
            })
        })
    },

    updateUser: (req, res) => {
        const data = req.body
        updateUser(data, (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err,
                })
            }

            return res.status(200).json({
                success: true,
                data: result,
            })
        })
    },

    deleteUser: (req, res) => {
        const data = req.body
        deleteUser(data, (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err,
                })
            }

            return res.status(200).json({
                success: true,
                data: result,
            })
        })
    },

    login: (req, res) => {
        const data = req.body

        getUserByEmail(data.email, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    success: false,
                    message: err,
                })
            }

            if (!result) {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid email or password',
                })
            }

            const compareResponse = compareSync(data.password, result.password)
            if (compareResponse) {
                result.password = undefined
                const jsontoken = sign(
                    { compareResponse: result },
                    process.env.PASSWORD_ENCRYPTION_KEY,
                    {
                        expiresIn: '1hr',
                    }
                )

                return res.json({
                    success: true,
                    message: 'User logged in successfully',
                    token: jsontoken,
                })
            } else {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid email or password',
                })
            }
        })
    },
}
