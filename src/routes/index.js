import express from 'express'
let router = express.Router()

router.get('/', (req, res, next) => {
	res.json({ title: 'Mastermind the Game' })
})

module.exports = router