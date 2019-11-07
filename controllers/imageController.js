const Image = require('../models/Image')
const axios = require('axios')
const clarifaiAPI = require('../apis/clarifaiAPI')

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

  static getAllImage(req, res, next){
    const userId = req.loggedUser.id
    Image.findById(id)
      .then( data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  // static clarifai(req, res, next){
  //   const {url} = req.body
  //   axios({
  //     method: 'post',
  //     data: {
  //       "inputs": [
  //         {
  //           "data": {
  //             "image": {
  //               "url": `${url}`
  //             }
  //           }
  //         }
  //       ]
  //     },
  //     url: 'https://api.clarifai.com/v2/models/e466caa0619f444ab97497640cefc4dc/outputs',
  //     headers: {
  //       Authorization: `Key ${process.env.CLARIFAI_API_KEY}`
  //     }
  //   })
  //     .then(({ data })=>{
  //       res.status(200).json(data)
  //     })
  //     .catch(next)
  // }
}

module.exports = ImageController