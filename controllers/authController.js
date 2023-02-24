const userModel = require('../models/users')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const constants = require('../constants/constants')

const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    console.log(email, password, 'Ttttt')

    const data = await userModel
        .findAll({
            where: {
                status: constants.user_status.active,
                email: email,
            },
            raw: true,
        })
        .then((data) => {
            if (Object.keys(data).length === 0) {
                response = { data, message: 'Invalid email or password' }
                return res.status(401).json(response)
            }

            // console.log('dataaaa', data[0].email);
            const dbPassword = data[0].password

            console.log(dbPassword, 'dbPassword')

            const matchPassword = compareSync(password, dbPassword)
            if (matchPassword) {
                console.log(matchPassword, 'matchPassword')
                data.password = undefined
                const jsontoken = sign(
                    { matchPassword: data },
                    process.env.ENCRYPTION_KEY,
                    {
                        expiresIn: '1hr',
                    }
                )

                return res.status(200).json({
                    data: data[0],
                    success: true,
                    message: 'User logged in successfully',
                    token: jsontoken,
                })
            } else {
                console.log(matchPassword, 'matchPassword not ')
                return res.status(200).json({
                    success: false,
                    message: 'Invalid email or password',
                })
            }
        })
        .catch((error) => {
            return res.status(400).json(error)
        })
}

module.exports = {
    login,
}
