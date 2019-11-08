const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
  
  name: {
    type: String
  },
  value: {
    type: String
  }, 
  url:{
    type:String
  },
  user_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'User'
  } 
}, {timestamps: true})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image