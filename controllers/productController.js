const productModel = require('../models/Products')
const categoryModel = require('../models/category')
const subcategoryModel = require('../models/subCategories')
const globalDeliveryTimesModel = require('../models/globalDeliveryTimes')
const constants = require('../constants/constants')
const multer = require('multer')
const path = require('path')
const { stringify } = require('querystring')
var fs = require('fs')

const updateProduct = (req, res) => {
    const requestData = req.body

    if (req.files) {
        // Update previous images with respect to new uploaded images in the form
    }
    const productId = requestData.id
    delete requestData.id

    // res.send(requestData);
    // exit

    // getting product details
    const getProductDetails = productModel
        .findAll({
            where: {
                id: productId,
            },
        })
        .then((data) => {
            if (Object.keys(data).length === 0) {
                res.status(400).json({
                    data,
                    message: 'Product not found!',
                    success: false,
                })
            }
        })
        .catch((error) => {
            res.status(400).json({
                error: error.message,
                message: 'Something went wrong',
                success: false,
            })
        })

    // updating produt details
    const updateProduct = productModel
        .update(
            { requestData },
            {
                where: {
                    id: productId,
                },
            }
        )
        .then((data) => {
            res.status(200).json({
                data,
                message: 'Product updated successfully',
                success: true,
            })
        })
        .catch((error) => {
            res.status(400).json({
                error: error.message,
                message: 'Somethig went wrong',
                success: false,
            })
        })
}

const singleProdcut = (req, res) => {
    const productId = req.params.id

    try {
        const getProduct = productModel
            .findAll({
                where: {
                    id: productId,
                },
                include: [
                    {
                        model: categoryModel,
                    },
                    {
                        model: subcategoryModel,
                    },
                    {
                        model: globalDeliveryTimesModel,
                    },
                ],
            })
            .then((data) => {
                if (Object.keys(data).length === 0) {
                    return res.status(400).json({
                        data,
                        message: 'No Product found!',
                        success: false,
                    })
                } else {
                    return res.status(200).json({
                        data,
                        message: 'Product details retreive successfully',
                        success: true,
                    })
                }
            })
            .catch((error) => {
                return res.status(500).json({
                    error: error.message,
                    success: false,
                    message: 'Something went wrong',
                })
            })
    } catch (error) {
        return res.status(400).json({
            error: error.message,
            success: false,
            message: 'Something went wrong',
        })
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id

    const deleteProduct = await productModel
        .destroy({
            where: {
                id: productId,
            },
        })
        .then((data) => {
            res.status(200).json({
                data,
                message: 'Product deleted successfully',
                success: true,
            })
        })
        .catch((error) => {
            res.status(400).json({
                error: error.message,
                success: false,
                message: 'Something went wrong',
            })
        })
}

const productList = async (req, res) => {
    // res.send('Coming here...........!')

    const vendorId = req.params.vendorId
    // console.log(vendorId, 'tttt')

    const productList = await productModel
        .findAll({
            where: {
                vendor_id: vendorId,
            },
            include: [
                {
                    model: categoryModel,
                },
                {
                    model: subcategoryModel,
                },
                {
                    model: globalDeliveryTimesModel,
                },
            ],
        })
        .then((data) => {
            return res.status(200).json({
                data,
                success: true,
            })
        })
        .catch((error) => {
            return res.status(400).json({
                error: error.message,
                success: false,
                message: 'Something went wrong',
            })
        })
}

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
    productList,
    deleteProduct,
    singleProdcut,
    updateProduct,
}
