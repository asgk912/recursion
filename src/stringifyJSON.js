// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	// case of null returns
	if(obj === undefined || obj === Function || obj === null){
		return 'null';
	}

	//if inputted obj is array/object
	if(typeof obj === 'object'){
		// if inputted obj is array
		if(Array.isArray(obj)){
			var temp = [];

			for(var i=0; i<obj.length; i++){
    			temp.push(stringifyJSON(obj[i]));
			};

			return '[' + temp.join(',') + ']';
		// if inputted obj is array
		} else {
			var temp = [];
			
			for(var key in obj){
				if(obj[key] === undefined || typeof obj[key] === 'function'){
					continue;
				} else {
					temp.push('"' + key + '":' + stringifyJSON(obj[key]));
				}
			};

			return '{' + temp.join(',') + '}';
		}	
	} else {
		// handle when it is a string
		if(typeof obj === 'string'){
			return '"' + obj + '"';
		// handle when it is a number or boolean
		} else {
			return obj.toString();
		}
	}
};
