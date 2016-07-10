 import {InvalidInput} from './Exceptions'

 let validations = (function(validations){
 	return {
 		validColors: function(){
 			return ["red", "blue", "green", "yellow", "purple", "teal"]
 		},

	 	validateColors: function(rowArray){
			let validColors = this.validColors()
			for (let i = 0; i < rowArray.length; i++){
				if (!(validColors.indexOf(rowArray[i]) > -1)){
					throw new InvalidInput('Not a valid color.git st')
				}
			}
			return rowArray
		},

		validateRowLength: function(rowArray){
			if (rowArray.length != 4){
				throw new InvalidInput('You need to have four pegs per row.')
			} else { 
				return rowArray
			}
		},

		validateGuess: function(rowArray){
			this.validateColors(rowArray)
			this.validateRowLength(rowArray)
		}
	}
})();

module.exports = {validations}
