import {InvalidInput} from '../libs/Exceptions'

export default class Peg {
	constructor(color){
		this.color = this._validate_color(color)
	}

	_validate_color(color){
		let validColors = ["red", "blue", "green", "yellow", "orange", "white"]
		if (!(validColors.indexOf(color) > -1)){
			throw new InvalidInput('Not a valid color')
		}
		else {
			return color
		}
	}
}