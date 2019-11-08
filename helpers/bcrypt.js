const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(Number(process.env.SALT_BCRYPT));

function hash(password){
  return bcrypt.hashSync(password, salt)
}

function compare(password, hash){
  return bcrypt.compareSync(password, hash)
}

module.exports = {
  hash,
  compare
}