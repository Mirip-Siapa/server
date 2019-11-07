const {sign, verify} = require('../helpers/jwt')
const {hash, compare} = require('../helpers/bcrypt')
const Image = require('../models/Image')

function authentication(req, res, next){
  try{
    const token = req.headers.access_token
    const loggedUser = verify(token)
    req.loggedUser = loggedUser
    next()
  }
  catch{
    res.status(401).json({msg: 'login needed'})
  }
}

function authorization(req, res, next){
  const _id = req.params.id
  Image.findOne({_id})
    .then(image=>{
      if(image.user_id == _id){
        next()
      }
      else{
        res.status(403).json('Not Authorized')
      }
    })
    .then(next)
}

module.exports = {
  authentication,
  authorization
}