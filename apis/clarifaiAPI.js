const axios = require('axios')

const clarifai = axios.create({
  baseURL: 'https://api.clarifai.com/v2/models/e466caa0619f444ab97497640cefc4dc/',
  headers: {
    Authorization: 'Key a2e97614d64a4cd78e19f12c521ee0d2'
  }
})

module.exports = clarifai