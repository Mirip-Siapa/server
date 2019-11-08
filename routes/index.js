const router = require('express').Router()
const userRoute = require('./userRoute')
const imageRoute = require('./imageRoute')

router.use('/users', userRoute)
router.use('/images', imageRoute)

module.exports = router