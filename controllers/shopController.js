const shopDetailsModel = require('../models/shopDetails')
const constants = require('../constants/constants')
const multer = require('multer')
const path = require('path')
const { stringify } = require('querystring')
var fs = require('fs')

const updateShopDetails = (req, res) => {
    const data = req.body

    // Array of allowed files
    // const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'gif']

    if (!req.files) {
        res.status(400).json({
            message: 'Please choose images',
            success: false,
        })
    }

    if (!('image_1' in req.files)) {
        return res.status(422).json({
            message: 'Please choose first Banner Image',
            success: false,
        })
    }

    if (!('image_2' in req.files)) {
        return res.status(422).json({
            message: 'Please choose Second Banner Image',
            success: false,
        })
    }

    if (!('aadhar_image' in req.files)) {
        return res.status(422).json({
            message:
                'Please choose Aadhar Image, single image should include both side',
            success: false,
        })
    }

    let banner1Name = Date.now() + '-' + req.files.image_1.name
    let banner2Name = Date.now() + '-' + req.files.image_2.name
    let aadharName = Date.now() + '-' + req.files.aadhar_image.name

    data.image_1 = banner1Name
    data.image_2 = banner2Name
    data.aadhar_image = aadharName

    const banner1Path = path.join(
        __dirname,
        '../public/images/shops/' + banner1Name
    )

    const banner2Path = path.join(
        __dirname,
        '../public/images/shops/' + banner2Name
    )

    const aadharPath = path.join(
        __dirname,
        '../public/images/shops/' + aadharName
    )

    req.files.image_1.mv(banner1Path, function (err) {
        if (err) return res.status(422).send(err)
    })

    req.files.image_2.mv(banner2Path, function (err) {
        if (err) return res.status(422).send(err)
    })

    req.files.aadhar_image.mv(aadharPath, function (err) {
        if (err) return res.status(422).send(err)
    })

    const saveShopDetails = shopDetailsModel
        .create(data)
        .then((data) => {
            res.status(200).json({
                data,
                message: 'Shop details updated successfully',
                success: true,
            })
        })
        .catch((error) => {
            res.status(422).json({
                error: error.message,
                message: 'Something went wrong',
                success: false,
            })
        })
}

const getShopDetails = (req, res) => {
    const vendorId = req.params.vendorId

    // res.send(vendorId)

    const shopDetails = shopDetailsModel
        .findAll({
            where: {
                vendor_id: vendorId,
            },
        })
        .then((data) => {
            res.status(200).json({
                data,
                message: 'Shop details',
                success: true,
            })
        })
        .catch((error) => {
            res.status(400).json({
                error: error.message,
                message: 'Something went wrong',
                success: false,
            })
        })
}

module.exports = {
    updateShopDetails,
    getShopDetails,
}
