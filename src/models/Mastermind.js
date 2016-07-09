import {InvalidInput} from '../lib/Exceptions'
import {validations} from '../lib/Validations'
import {numElementsInSamePosition, numSameElements} from '../lib/HelperFunctions'

const Mastermind = (function(){
	const _answerRow = new WeakMap()
	const _guessRows = new WeakMap()
	const _keyRows = new WeakMap()
	const _gameWon = new WeakMap()

	class Mastermind {
		constructor(){
			_answerRow.set(this, this._randomAnswerRow())
			_guessRows.set(this, [])
			_keyRows.set(this, [])
			_gameWon.set(this, false)
		}

		_randomAnswerRow(){
			let row = []
			let validColors = validations.validColors()
			for (let i = 0; i < 4; i++){
				let rand = Math.floor(Math.random() * 4)
				row.push(validColors[rand])
			}
			return row
		}

		getGameWon(){
			return _gameWon.get(this)
		}

		setGameWon(){
			_gameWon.set(this, true)
			return true
		}

		getAnswerRow(){
			return _answerRow.get(this)
		}

		getKeyRows(){
			return _keyRows.get(this)
		}

		getGuessRows(){
			return _guessRows.get(this)
		}

		_addGuess(guessArray){
			this.getGuessRows().push(guessArray)
			return this.getGuessRows()
		}

		_addKeyRow(keyArray){
			this.getKeyRows().push(keyArray)
			return this.getKeyRows()
		}

		_calculateKeyRow(guessArray){
			let answerArray = this.getAnswerRow()
			let keyRow = []
			let numBlackKey = numElementsInSamePosition(guessArray, answerArray)
			let numWhiteKey = (numSameElements(guessArray, answerArray) - numBlackKey)
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
				return this.setGameWon()
			} else {
				this._addKeyRow(this._calculateKeyRow(guessArray))
			}
		}

		checkVictory(guessArray){
			validations.validateGuess(guessArray)
			this._addGuess(guessArray)
			if (this.getGuessRows().length >= 12 && this.getGameWon() == false){
				return false
			} 
			else if (this.getGuessRows().length <= 12 && this.getGameWon() == false){
				return this._checkGuessRow(guessArray)
			}
		}

		toJSON(){
			return {
				guessRows: this.getGuessRows(),
				keyRows: this.getKeyRows(),
				gameWon: this.getGameWon(),
    		}
		}
	}
	return Mastermind;
}());