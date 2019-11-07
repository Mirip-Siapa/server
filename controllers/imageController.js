const Image = require('../models/Image')
const axios = require('axios')
const clarifaiAPI = require('../apis/clarifaiAPI')

class ImageController{
  // static search(req, res, next){
  //   const {search} = req.params
  //   Image.find({name: search})
  //     .then(images=>{
  //       res.status(200).json(images)
  
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

  static clarifai(req, res, next){
    const {url} = req.body
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
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = ImageController