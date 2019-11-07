const router = require('express').Router()
const ImageController = require('../controllers/imageController')
const {authentication} = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authentication')
const gcs = require('../middlewares/gcs')
const multer = require('../middlewares/multer')

// router.use(authentication)
router.get('/search/:search', ImageController.search)
router.post('/clarifai', ImageController.clarifai)

router.post('/', authentication, multer.single('img'), gcs, ImageController.uploadImage)

module.exports = router