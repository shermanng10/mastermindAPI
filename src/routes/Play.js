import express from 'express'
import * as db from '../database/db'
import {Mastermind} from '../models/Mastermind'
import {User} from '../models/User'

let router = express.Router()

router.post('/', (req, res, next) => {
	let bodyUserID = req.body.userID
	let users = db.get().collection('users')
	users.findOne({userID: bodyUserID} , (err, userDoc) => {
		let user
		if (!bodyUserID) {
			return res.json('You need to supply a userID.')
		}

		if (!userDoc) { 
			user = new User({userID: bodyUserID, game: new Mastermind()})
			users.insert(JSON.parse(JSON.stringify(user)))
		} else {
			user = User.fromObj(userDoc)
		}

		let userID = user.getUserID()

		let game = Mastermind.fromObj(user.getUserGame()) || new Mastermind()
 		if (req.body.newGame == 'true') {
			users.update({userID: userID}, { $set: { game: new Mastermind() }})
		}
		if (req.body.guess){
			let guess = req.body.guess
			let guessResponse = game.checkVictory(guess.split(" "))
			users.update({userID: userID}, { $set: { game: game }})
			return res.json({guessResponse: guessResponse})
		}
	})
})

module.exports = router