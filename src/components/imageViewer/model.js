import fileNameArr from '../../data_read_in/file_name_arr';
import ImageLoadQueue from './ImageLoadQueue';

export default (function(){
	var imgData = ImageLoadQueue({
		'data': fileNameArr.map(function(el) {
			return {
				'fileName': "./assets/prev/" + el + ".png",
				'loaded': false,
				'fileType': (~el.search("bw") + 1) ? "cl" : "bw",
			}
		})
	});
	imgData.init();


	return {
		imgData: imgData,
	};
}());


// export default model;