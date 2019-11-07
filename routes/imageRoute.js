const router = require('express').Router()
const ImageController = require('../controllers/imageController')
const multer = require('../middlewares/multer')
const gcs = require('../middlewares/gcs')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authentication')


router.post('/', authentication, multer.single('img'), gcs, ImageController.uploadImage)

module.exports = router