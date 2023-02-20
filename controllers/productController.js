const productModel = require('../models/Products')
const constants = require('../constants/constants')
const multer = require('multer')
const path = require('path')
const { stringify } = require('querystring')
var fs = require('fs')

const addProduct = (req, res) => {
    const data = req.body

    // console.log('all files', req.files

    if (!('image_1' in req.files)) {
        return res.status(422).json({
            message: 'Please choose first image of product',
            success: false,
        })
    }

    if (!('image_2' in req.files)) {
        return res.status(422).json({
            message: 'Please choose Second image of product',
            success: false,
        })
    }

    if (!('image_3' in req.files)) {
        return res.status(422).json({
            message: 'Please choose third image of product',
            success: false,
        })
    }

    data.image_1 = Date.now() + '-' + req.files.image_1.name
    data.image_2 = Date.now() + '-' + req.files.image_2.name
    data.image_3 = Date.now() + '-' + req.files.image_3.name

    // uploading image 1
    const image1Path = path.join(
        __dirname,
        '../public/images/products/' + data.image_1
    )

    req.files.image_1.mv(image1Path, function (err) {
        if (err) return res.status(422).send(err)
    })

    // uploading image 2
    const image2Path = path.join(
        __dirname,
        '../public/images/products/' + data.image_2
    )

    req.files.image_2.mv(image2Path, function (err) {
        if (err) return res.status(422).send(err)
    })

    // uploading image 3
    const image3Path = path.join(
        __dirname,
        '../public/images/products/' + data.image_3
    )

    req.files.image_3.mv(image3Path, function (err) {
        if (err) return res.status(422).send(err)
    })

    const saveProduct = productModel
        .create(data)
        .then((successResponse) => {
            return res.status(200).json({
                data: successResponse,
                success: true,
                message: 'Product created successfully',
            })
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                message: 'Something went wrong',
                error: error.message,
            })
        })
}

module.exports = {
    addProduct,
}
