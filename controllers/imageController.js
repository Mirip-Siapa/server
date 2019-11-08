const Image = require('../models/Image')
const axios = require('axios')
const clarifaiAPI = require('../apis/clarifaiAPI')
const gcsDelete = require('../middlewares/gcsdelete')

class ImageController{
  
  static uploadImage(req, res, next){
    const url = req.file.cloudStoragePublicUrl
    axios({
      method: 'post',
      data: {
        "inputs": [
          {
            "data": {
              "image": {
                "url": `${url}`
              }
            }
          }
        ]
      },
      url: 'https://api.clarifai.com/v2/models/e466caa0619f444ab97497640cefc4dc/outputs',
      headers: {
        Authorization: `Key ${process.env.CLARIFAI_API_KEY}`
      }
    })
      .then(({ data })=>{
        const name = data.outputs[0].data.regions[0].data.concepts[0].name
        const value = data.outputs[0].data.regions[0].data.concepts[0].value
        const url = data.outputs[0].input.data.image.url
        const user_id = req.loggedUser.id
        
        return Image.create({ name, value, url, user_id})
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static getAllImageUser(req, res, next){
    const user_id = req.loggedUser.id
    console.log('masuuuk')
    Image.find({user_id})
      .populate('user_id', '-password')
      .sort({createdAt: 'desc'})
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findData(req, res, next){
    Image.find()
      .populate('user_id', '-password')
      .sort({createdAt: 'desc'})
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static deleteImage(req, res, next){
    let id = req.params.id
    Image.findById(id)
      .then(result => { 
        gcsDelete(result.url)
        return Image.findByIdAndDelete(id)
      })
      .then( () => {
        res.status(200).json('Image Deleted')
      })
      .catch(next)
  }

}

module.exports = ImageController