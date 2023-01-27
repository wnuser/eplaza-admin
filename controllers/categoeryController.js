
const categoryModel = require('../models/category')
const constants = require('../constants/constants')

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

module.exports = {
    getAllCategories
}