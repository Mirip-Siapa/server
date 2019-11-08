const router = require('express').Router()
const ImageController = require('../controllers/imageController')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authentication')
const gcs = require('../middlewares/gcs')
const multer = require('../middlewares/multer')

router.get('/', ImageController.findData)

router.get('/user', authentication, ImageController.getAllImageUser)
router.post('/', authentication, multer.single('img'), gcs, ImageController.uploadImage)
router.delete('/:id', authentication, authorization, ImageController.deleteImage)


module.exports = router