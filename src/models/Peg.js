import {InvalidInput} from '../libs/Exceptions'

let _color = new WeakMap()
export default class Peg {
	constructor(color){
		_color.set(this, this._validateColor(color))
	}

	_validateColor(color){
		let validColors = ["red", "blue", "green", "yellow", "orange", "white"]
		if (!(validColors.indexOf(color) > -1)){
			throw new InvalidInput('Not a valid color')
		} else {
			return color
		}
	}

	getColor(){
		return _color.get(this)
	}
}