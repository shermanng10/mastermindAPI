import express from 'express'
var router = express.Router()

router.get('/', (req, res, next) => {
  res.json({info: 'list of scores here'})
})

module.exports = router