import {InvalidInput} from '../libs/Exceptions'

let _pegs = new WeakMap()
let _type = new WeakMap()
export default class Row {
	constructor(pegArray, type){
		_pegs.set(this, this._validatePegLength(pegArray))
		_type.set(this, this._validateRowType(type))
	}

	_validatePegLength(pegArray){
		if (pegArray.length != 4){
			throw new InvalidInput('You need to have four pegs per row')
		}
	}

	_validateRowType(rowType){
		let validTypes = ["guess", "code", "key"]
		if (!(validTypes.indexOf(rowType) > -1)){
			throw new InvalidInput('Not a valid color')
		} else {
			return rowType
		}
	}

	getPegs(){
		return _pegs.get(this)
	}

	getType(){
		return _type.get(this)
	}
}