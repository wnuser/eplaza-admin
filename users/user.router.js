const {
    createUser,
    getUserById,
    getUsers,
    deleteUser,
    updateUser,
    login,
} = require('./user.controller')
const express = require('express')
const router = express.Router()
const { checkToken } = require('../auth/token_validation')

router.post('/', createUser)
router.get('/', checkToken, getUsers)
router.get('/:id', checkToken, getUserById)
router.patch('/', checkToken, updateUser)
router.delete('/', checkToken, deleteUser)

module.exports = router
