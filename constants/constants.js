// constants.js

'use strict'

let constants = {
    user_types: {
        admin: 1,
        vendor: 2,
        customer: 3,
    },

    category_status : {
        active: 1,
        inactive:0
    },

    user_status: {
        active:1,
        inactive:2
    }
}

module.exports = Object.freeze(constants)
