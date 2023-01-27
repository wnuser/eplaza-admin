
const subCategoryModel = require('../models/subCategories')
const constants = require('../constants/constants')

const getSubCategories = async (req, res) => {
     
    const categoryId  = req.params.categoryId

    const data = await subCategoryModel.findAll({
        where: {
          status: constants.category_status.active,
          category_id:categoryId
        }
      }).then( (data) => {
        if(Object.keys(data).length === 0) {
            response = { data, message:"Subcategories not found!" }
            return res.status(401).json(response);
        }
          console.log(data, 'success');
          return res.status(200).json(data);

      }).catch((error) => {
          return res.status(400).json(error);
      }) ;
}

module.exports = {
    getSubCategories
}