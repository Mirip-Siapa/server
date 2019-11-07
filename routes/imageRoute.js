const router = require('express').Router()
const ImageController = require('../controllers/imageController')
const {authentication} = require('../middlewares/authentication')

// router.use(authentication)
router.get('/search/:search', ImageController.search)
router.post('/clarifai', ImageController.clarifai)

module.exports = router