const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is empty"],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is empty']
  }
}, { timestamps: true })

userSchema.plugin(uniqueValidator, { message: '{PATH} already registered' });

const User = mongoose.model('User', userSchema)

module.exports = User