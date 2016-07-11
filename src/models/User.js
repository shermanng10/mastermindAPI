import  {Mastermind}  from './Mastermind'

class User {
	constructor(options = {}){
		this.userId = options.userID
		this.game = new Mastermind(options.game) || new Mastermind()
	}

	getUserID(){
		return this.userId
	}

	getUserGame(){
		return this.game
	}

	setUserGame(game){
		return this.game = game
	}
	
	static fromObj(obj){
		return new User(obj)
	}
}

module.exports = {User}