var mergeObj = function(target){
	var args = [].slice.call(arguments, 1);
	args.forEach(function(src) {
		for(var prop in src){
			if ({}.hasOwnProperty.call(src, prop)){
				target[prop] = src[prop];
			}
		}
	});
	return target;
};



export {mergeObj};
