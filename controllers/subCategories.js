const subCategoryModel = require('../models/subCategories')
const constants = require('../constants/constants')
const path = require('path')
var fs = require('fs')

const getSubCategories = async (req, res) => {
    const categoryId = req.params.categoryId

    const data = await subCategoryModel
        .findAll({
            where: {
                status: constants.category_status.active,
                category_id: categoryId,
            },
        })
        .then((data) => {
            if (Object.keys(data).length === 0) {
                return res.status(401).json({
                    data,
                    message: 'Subcategory not found',
                    success: true,
                })
            }
            return res.status(200).json({
                data,
                message: 'Subcategory found',
                success: true,
            })
        })
        .catch((error) => {
            return res.status(400).json({
                data: '',
                error: error.message,
                message: 'Something went wrong',
                success: false,
            })
        })
}

const createSubCategory = async (req, res) => {
    const data = req.body

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(422).json('No files were uploaded.')
    }

    if (req.files.image.mimetype != 'image/jpeg') {
        return res.status(422).json('Please select a image.')
    }

    let fileName = Date.now() + '-' + req.files.image.name

    const uploadPath = path.join(
        __dirname,
        '../public/images/sub-category/' + fileName
    )

    data.image = fileName

    req.files.image.mv(uploadPath, function (err) {
        if (err) return res.status(422).send(err)
    })

    const saveSubCategory = await subCategoryModel
        .create(data)
        .then(function (data) {
            let successResponse = {
                data,
                message: 'Sub-category create successfully',
            }
            console.log('success', data)
            return res.status(200).json(successResponse)
        })
        .catch(function (error) {
            console.log('Error', error)
            return res.status(422).json(error.errors)
        })
}

const updateSubCategory = async (req, res) => {
    const data = req.body

    const getSubCategory = await subCategoryModel
        .findOne({
            where: {
                id: data.subCategoryId,
                status: constants.category_status.active,
            },
            raw: true,
        })
        .then((data) => {
            console.log(data)
            return data
        })
        .catch((error) => {
            return res.status(400).json(error)
        })

    if (req.files) {
        if (req.files.image.mimetype != 'image/jpeg') {
            return res.status(422).json('Please select a image.')
        }

        let fileName = Date.now() + '-' + req.files.image.name
        data.image = fileName
        const uploadPath = path.join(
            __dirname,
            '../public/images/sub-category/' + fileName
        )

        data.image = fileName

        req.files.image.mv(uploadPath, function (err) {
            if (err) return res.status(422).send(err)
        })

        //Delete existing file
        const filePath = path.join(
            __dirname,
            '../public/images/sub-category/' + getSubCategory.image
        )
        fs.stat(filePath, function (err, stats) {
            if (err) {
                return res.status(422).json(err)
            }

            fs.unlink(filePath, function (err) {
                if (err) return res.status(422).json(err)
            })
        })
    }

    const updateCategory = await subCategoryModel
        .update(data, {
            where: {
                id: data.subCategoryId,
            },
        })
        .then(function (data) {
            let successResponse = {
                data,
                message: 'Sub-category Update successfully',
            }
            console.log('success', data)
            return res.status(200).json(successResponse)
        })
        .catch(function (error) {
            console.log('Error', error)
            return res.status(422).json(error.errors)
        })
}

const deleteSubCategory = async (req, res) => {
    const data = req.body.subCategoryId

    const getSubCategory = await subCategoryModel
        .findOne({
            where: {
                id: data,
                status: constants.category_status.active,
            },
            raw: true,
        })
        .then((data) => {
            console.log(data)
            return data
        })
        .catch((error) => {
            return res.status(400).json(error)
        })

    const deleteSubCategory = await subCategoryModel
        .destroy({
            where: {
                id: data,
            },
        })
        .then(function (data) {
            //Delete existing file
            const filePath = path.join(
                __dirname,
                '../public/images/sub-category/' + getSubCategory.image
            )
            fs.stat(filePath, function (err, stats) {
                if (err) {
                    return res.status(422).json(err)
                }

                fs.unlink(filePath, function (err) {
                    if (err) return res.status(422).json(err)
                })
            })
            let successResponse = {
                data,
                message: 'Sub-category Delete successfully',
            }
            console.log('success', data)
            return res.status(200).json(successResponse)
        })
        .catch(function (error) {
            console.log('Error', error)
            return res.status(422).json(error.errors)
        })
}

module.exports = {
    getSubCategories,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
}
