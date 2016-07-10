import Mastermind from './Mastermind'

const User = (function(){
	const _id = new WeakMap()
	const _game = new WeakMap()
	class User {
		constructor(options = {}){
			_id.set(this, options.userID)
			_game.set(this, options.game || new Mastermind())
		}

		getUserID(){
			return _id.get(this)
		}

		getUserGame(){
			return _game.get(this)
		}

		setUserGame(game){
			_game.set(this, game)
			return _game.get(this)
		}

		toJSON(){
			return {
				userID: this.getUserID(),
				game: this.getUserGame()
			}
		}

		static fromJSON(json){
			let obj = JSON.parse(json)
			return new User(obj)
		}
	}
	return User
}());