var range = function(start, end, step){
	step = step || (end > start) ? 1 : -1;
	var res = [];
	var cur = start;
	var increase = step > 0;
	while(increase ? cur <= end : cur >= end){
		res.push(cur);
		cur += step;
	}
	return res;
};

// NOTE: side effects, by reference
var pushArr = function(arr, arr2){
	arr.push.apply(arr, arr2);
};


export {range, pushArr};
