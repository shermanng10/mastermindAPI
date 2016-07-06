import {InvalidInput} from '../libs/Exceptions'

let _color = new WeakMap()
export default class Peg {
	constructor(color){
		_color.set(this, this._validate_color(color))
	}

	getColor(){
		return _color.get(this)
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