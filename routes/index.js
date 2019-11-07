const router = require('express').Router()
const userRoute = require('./userRoute')
const imageRoute = require('./imageRoute')

router.use('/users', userRoute)
router.use('/img', imageRoute)

module.exports = router