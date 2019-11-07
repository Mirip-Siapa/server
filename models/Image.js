const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
  user_id: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }],
  name: {
    type: String
  },
  value: {
    type: String
  }, 
  url:{
    type:String
  } 
}, {timestamps: true})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image