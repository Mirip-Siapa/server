const User = require('../models/User')
const { compare, hash } = require('../helpers/bcrypt')
const { sign} = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    let { name, email, password } = req.body
    password = hash(password)
    User.create({ name, email, password })
      .then(user => {
        let payload = {
          id: user._id
        }
        let token = sign(payload)
        res.status(201).json({ token, username: user.name })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        console.log(user, 'aaaaaa');
        if (user && compare(password, user.password)) {
          
          let payload = {
              id: user._id
          }
          let token = sign(payload)
          res.status(200).json({ token, username: user.name })
        } else {
            next({
              status: 400,
              message: `Invalid Email/Password`
            })
          }
        })
        .catch(next)
  }
}

module.exports = UserController

module.exports = UserController