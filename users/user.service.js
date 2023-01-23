const pool = require('../config/sqldb')

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into users (first_name, last_name, email, password, mobile, user_type) values(?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.mobile,
                data.user_type,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getUsers: (callBack = () => {
        pool.query(`select * from users`, [], (error, result, fields) => {
            if (error) {
                console.log(error)
                callBack(error)
            }

            return callBack(null, result)
        })
    }),

    getUsersByUserId: (id, callBack) => {
        pool.query(
            `select * from users where id = ?`,
            [id],
            (error, result, fields) => {
                if (error) {
                    callBack(error)
                }

                return callBack(null, result[0])
            }
        )
    },

    updateUser: (data, callBack) => {
        pool.query(
            `update users set first_name=?, last_name=?,  mobile=? where id=?`,
            [data.first_name, data.last_name, data.email, data.id],
            (error, result, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, result[0])
            }
        )
    },

    deleteUser: (data, callBack) => {
        pool.query(
            `delete from users where id=?`,
            [data.id],
            (error, result, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, result[0])
            }
        )
    },

    getUserByEmail: (email, callBack) => {
        pool.query(
            `select * from users where email=?`,
            [email],
            (error, result, fields) => {
                if (error) {
                    console.log(error)
                    callBack(error)
                }

                return callBack(null, result[0])
            }
        )
    },
}
