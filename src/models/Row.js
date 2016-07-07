import {InvalidInput} from '../libs/Exceptions'

export default const Row = (function() {	
	const _pegs = new WeakMap()
	const _type = new WeakMap()
	class Row {
		constructor(pegArray, type){
			_pegs.set(this, this._validatePegLength(pegArray))
			_type.set(this, this._validateRowType(type))
		}

		_validatePegLength(pegArray){
			if (pegArray.length != 4){
				throw new InvalidInput('You need to have four pegs per row')
			} else { 
				return pegArray
			}
		}

		_validateRowType(rowType){
			let validTypes = ["guess", "code", "key"]
			if (!(validTypes.indexOf(rowType) > -1)){
				throw new InvalidInput('Not a valid row type')
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

		toJSON(){
			return {
				pegs: this.getPegs(),
				type: this.getType(),
    		}
		}
	}
	return Row;
}());