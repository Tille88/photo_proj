var fs = require('fs');
import { range } from "../core/array";
// var range = function(min, max, step){
// 	step = step || 1;
// 	var res = [];
// 	var cur = min;
// 	while(cur <= max){
// 		res.push(cur);
// 		cur += step;
// 	}
// 	return res;
// };

var genFilenames = function(pref, rangeArr){
	return rangeArr.map(function(el){
		var castedIdx = ""+el;
		var idxNr = (castedIdx.length === 1) ? 0+castedIdx : castedIdx;
		return pref + "_" + idxNr;
	});
};

var bw = genFilenames("bw", range(1, 32));
var cl = genFilenames("cl", range(1, 51));
var photoNameList = bw.concat(cl);

// Incorrect calling way but good enough for now...
fs.writeFile("./file_name_arr.js", "export default " + JSON.stringify(photoNameList) + ";");


export default range;
