// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  // your code here
  	// should use document.body, element.childNodes, and element.classList
	if(arguments[1] === undefined){
		var result = [];
	} else {
		var result = arguments[1];
	}
	if(arguments[2] === undefined){
		var childList = document.body.childNodes;
	} else {
		var childList = arguments[2].childNodes;
	}
	if(arguments[3] === undefined){
		var inRecursion = false;
	} else {
		var inRecursion = arguments[3]
	}
	
	// check if body itself has class name of (classNmae)
	if(!inRecursion){
		if(document.body.className === className){
			result.push(document.body);
		}
	}


	for(var i=0; i<childList.length; i++){
		var temp = childList[i];
		if(temp.classList !== undefined){
			if((temp.classList).contains(className)){
				result.push(temp);
			}
		}
		if(temp.childNodes.length){
			getElementsByClassName(className, result, temp, true);
		}
	}
	return result;
};