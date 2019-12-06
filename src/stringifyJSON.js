// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	// your code goes here
	if(arguments[1] === undefined){
		var returnValue = '';
	} else {
		var returnValue = arguments[1];
	}
	if(arguments[2] === undefined){
		var dived = false;
	} else {
		var dived = arguments[2];
	}

	// case of null returns
	if(obj === undefined || obj === Function || obj === null){
		return returnValue + 'null';
	}

	//if inputted obj is array/object
	if(typeof obj === 'object'){
		var keyArray = Object.keys(obj);
		// if it is empty return empty array/object
		if(keyArray.length === 0){
			if(Array.isArray(obj)){
				return returnValue + '[]'
			} else {
				return returnValue + '{}'
			}
		} else {
			for(var key in obj){
				// add appropriate opening bracket at appropriate position
				if(key === keyArray[0] && Array.isArray(obj) && !dived){
					returnValue = '[' + returnValue;
				} else if(key === keyArray[0] && !Array.isArray(obj) && !dived){
					returnValue = '{' + returnValue;
				} else if(key === keyArray[0] && Array.isArray(obj) && dived){
					returnValue = returnValue + '[';
				} else if(key === keyArray[0] && !Array.isArray(obj) && dived){
					returnValue = returnValue + '{';
				}
				
				if((key === 'undefined' && obj[key] === undefined) ||
					(key === 'functions' && typeof obj[key] === 'function')){
					if(key !== keyArray[keyArray.length-1]){
						continue;
					} else {
						if(Array.isArray(obj)){
							return returnValue+']';
						} else {
							return returnValue+'}';
						}
					}
				}

				// check if current obj[key] is object again
				if(typeof obj[key] === 'object' && obj[key] !== null){
					if(Array.isArray(obj)){
						returnValue = stringifyJSON(obj[key], returnValue, true);	
					} else {
						returnValue = stringifyJSON(key, returnValue, true);
						returnValue += ':'; 
						returnValue = stringifyJSON(obj[key], returnValue, true);
					}

					// add appropriate comma or closing bracket
					if(key !== keyArray[keyArray.length-1]){
						returnValue += ',';
					} else {
						if(Array.isArray(obj)){
							returnValue += ']'
						} else {
							returnValue += '}'
						}
					}
				} else {
					if(Array.isArray(obj)){
						returnValue = stringifyJSON(obj[key], returnValue);
						if(key !== keyArray[keyArray.length-1]){
							returnValue += ',';
						} else {
							returnValue += ']'
						}
					} else {
						returnValue = stringifyJSON(key, returnValue);
						returnValue += ':'; 
						returnValue = stringifyJSON(obj[key], returnValue);
						if(key !== keyArray[keyArray.length-1]){
							returnValue += ',';
						} else {
							returnValue += '}'
						}
					}
				}
			}
			return returnValue;
		}
	} else {
		if(typeof obj === 'string'){
			return returnValue + '"' + obj + '"';
		} else {
			return returnValue + obj.toString();
		}
	}
};
