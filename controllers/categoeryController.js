
const categoryModel = require('../models/category')
const constants     = require('../constants/constants')
const multer        = require('multer')
const path          = require('path') 
const { stringify } = require('querystring')
var fs              = require('fs');


const getAllCategories  =  async (req, res) => {
     
    const data = await categoryModel.findAll({
        where: {
          status: constants.category_status.active
        }
      }).then( (data) => {
          console.log(data, 'success');
          return res.status(200).json(data);
      }).catch((error) => {
          return res.status(400).json(error);
      }) ;

}

const createCategory = async (req, res) => {
    const data = req.body;
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(422).json('No files were uploaded.');
    }

    if(req.files.image.mimetype != 'image/jpeg'){
        return res.status(422).json('Please select a image.');
    }

    let fileName = Date.now() + '-' + req.files.image.name;

    const uploadPath = path.join(__dirname,'../public/images/category/' + fileName);
    
    data.image = fileName;

    req.files.image.mv(uploadPath, function(err) {
        if (err)
            return res.status(422).send(err);          
    });

    const saveCategory = await categoryModel.create(data).then(function(data){

        let successResponse = {data, message:"Category create successfully"}; 
        console.log('success', data);
            return res.status(200).json(successResponse);

    }).catch(function(error){
        console.log('Error', error);
            return res.status(422).json(error.errors);

    });

}

const updateCategory = async (req, res) => {
    const data = req.body;

    const getCategory = await categoryModel.findOne({
        where: {
            id: data.categoryId,  
            status: constants.category_status.active
        },
        raw: true
    }).then( (data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return res.status(400).json(error);
    }) ;

    if(req.files){

        if(req.files.image.mimetype != 'image/jpeg'){
            return res.status(422).json('Please select a image.');
        }
    
        let fileName = Date.now() + '-' + req.files.image.name;
        data.image = fileName 
        const uploadPath = path.join(__dirname,'../public/images/category/' + fileName);
        
        data.image = fileName;
    
        req.files.image.mv(uploadPath, function(err) {
            if (err)
                return res.status(422).send(err);          
        });

        //Delete existing file
        const filePath = path.join(__dirname,'../public/images/category/' + getCategory.image);
        fs.stat(filePath, function (err, stats) {
            if (err) {
                return res.status(422).json(err);
            }
        
            fs.unlink(filePath,function(err){
                if(err) return res.status(422).json(err);
            });  
        });
    }

    const updateCategory = await categoryModel.update(data, {
        where: {
          id: data.categoryId
        }
      })
      .then(function(data){

        let successResponse = {data, message:"Category Update successfully"}; 
        console.log('success', data);
            return res.status(200).json(successResponse);

    }).catch(function(error){
        console.log('Error', error);
            return res.status(422).json(error.errors);

    });

}

const deleteCategory = async (req, res) => {
    const data = req.body.categoryId

    const getCategory = await categoryModel.findOne({
        where: {
            id: data,  
            status: constants.category_status.active
        },
        raw: true
    }).then( (data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return res.status(400).json(error);
    });

    const deleteCategory = await categoryModel.destroy({
        where: {
          id: data
        }
      })
      .then(function(data){
        //Delete existing file
        const filePath = path.join(__dirname,'../public/images/category/' + getCategory.image);
        fs.stat(filePath, function (err, stats) {
            if (err) {
                return res.status(422).json(err);
            }
        
            fs.unlink(filePath,function(err){
                if(err) return res.status(422).json(err);
            });  
        });
        let successResponse = {data, message:"Category Delete successfully"}; 
        console.log('success', data);
            return res.status(200).json(successResponse);

    }).catch(function(error){
        console.log('Error', error);
            return res.status(422).json(error.errors);

    });
}



module.exports = {
    getAllCategories, createCategory, updateCategory, deleteCategory
}