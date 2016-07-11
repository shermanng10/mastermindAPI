import {InvalidInput} from '../lib/Exceptions'
import {validations} from '../lib/Validations'
import {numElementsInSamePosition, numSameElements} from '../lib/HelperFunctions'

class Mastermind {
	constructor(options = {}){
		this.answerRow = options.answerRow || this._randomAnswerRow()
		this.guessRows = options.guessRows || []
		this.keyRows = options.keyRows || []
		this.gameWon = options.gameWon || false
	}

	_randomAnswerRow(){
		let row = []
		let validColors = validations.validColors()

		for (let i = 0; i < 4; i++){
			let rand = Math.floor(Math.random() * 6)
			row.push(validColors[rand])
		}
		return row
	}

	getGameWon(){
		return this.gameWon
	}

	setGameWon(){
		return this.gameWon = true
	}

	getAnswerRow(){
		return this.answerRow
	}

	getKeyRows(){
		return this.keyRows
	}

	getGuessRows(){
		return this.guessRows
	}

	_addGuess(guessArray){
		this.getGuessRows().push(guessArray)
		return this.getGuessRows()
	}

	_addKeyRow(keyArray){
		this.getKeyRows().push(keyArray)
	}

	_calculateKeyRow(guessArray){
		let answerArray = this.getAnswerRow()
		let keyRow = []
		let numBlackKey = numElementsInSamePosition(guessArray, answerArray)
		let numWhiteKey = (numSameElements(answerArray, guessArray) - numBlackKey)
		for (let i = 0; i < numBlackKey; i++){
			keyRow.push('black')
		}
		for (let i = 0; i < numWhiteKey; i++){
			keyRow.push('white')
		}
		return keyRow
	}

	_checkGuessRow(guessArray){
		let answerArray = this.getAnswerRow()
		if (numElementsInSamePosition(guessArray, answerArray) == 4){
			this.setGameWon()
			return 'Congrats! You were right!'
		} else {
			this._addKeyRow(this._calculateKeyRow(guessArray))
			return { guesses: this.getGuessRows(), keys: this.getKeyRows() }
		}
	}

	checkVictory(guessArray){
		if (this.getGameWon() == true){
			return "You've already won!"
		} else if (this.getGuessRows().length >= 12 && this.getGameWon() == false){
			return "You've guessed 12 times and lost!"
		} else if (this.getGuessRows().length <= 12 && this.getGameWon() == false){
			validations.validateGuess(guessArray)
			this._addGuess(guessArray)
			return this._checkGuessRow(guessArray)
		}
	}

	static fromObj(obj){
		return new Mastermind(obj)
	}
}

 module.exports = {Mastermind}

module.exports = { Mastermind }