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
    res.status(401).json({ msg: 'login needed' })
  }
}

function authorization(req, res, next){
  const _id = req.params.id
  const user_id = req.loggedUser.id
  Image.findOne({ _id, user_id })
    .then(data => {
      if (data) {
        next ()
      } else {
        next({
          status: 403,
          message: `Not Your Account`
        })
      }
    })
    .catch(next)
}

module.exports = {
  authentication,
  authorization
}