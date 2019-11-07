const Image = require('../models/Image')

class ImageController{
  
  static uploadImage(req, res, next){
    const url = req.file.cloudStoragePublicUrl
  }

  static getAllImage(req, res, next){
    const userId = req.loggedUser.id
    Image.findById(id)
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

}

module.exports = ImageController