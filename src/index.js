// import model from './components/imageViewer/imageViewModel';
// import view from './components/imageViewer/view';
// import controller from './components/imageViewer/controller';
import fileNameArr from './data_read_in/file_name_arr';
import thumbNails from './components/thumbnailViewer/thumbnailView';
import ImageViewer from './components/imageViewer/imageViewer';
import dispEnum from './components/imageViewer/displayEnum';
import transitionsEnum from './transitions/transitionsEnum';
import './style/main.css';
import {range} from './core/array';

var imageData = fileNameArr.map(function(el, i, arr){
	var clCheck = (~el.search("bw") + 1);
	return {
		'fileName': "./assets/1280w/" + el + ".jpg",
		'loaded': false,
		'fileType': clCheck ? "cl" : "bw",
		'display':
		(~[0, arr.length-1, arr.length-2].indexOf(i)) ? dispEnum.SINGLE_FULL :
			(clCheck || ~[1].concat(range(56, 58)).indexOf(i)) ? dispEnum.SINGLE_RG :
				(i%2 ===0) ? dispEnum.DOUBLE_LF : dispEnum.DOUBLE_RG,
		'transition': (i === 0) ? transitionsEnum.SVG_CLIP_PATH :
			clCheck ? transitionsEnum.DELAUNAY :
				transitionsEnum.SVG_EDGE_DETECT,
	};
});

// console.log(TBR);

var initViews = function(){
	// Init thumbnails view
	thumbNails({
		// selector: '.thumbnail-view',
		selector: '.flexbox-thumbnails',
		preview: '.curr-sel-background',
		container: '.container',
		// preview: '.current-sel-img',
	}).init();
	// Init imageViewer view
	ImageViewer({
		// data: fileNameArr.map(function(el) {
		// 	return {
		// 		'fileName': "./assets/480w/" + el + ".jpg",
		// 		'loaded': false,
		// 		'fileType': (~el.search("bw") + 1) ? "cl" : "bw",
		// 	};
		// }),
		data: imageData,
	}).init();
};

window.addEventListener('load', initViews, false);

// Create "n:th/once" fucntion and pipe and throttle function => functional