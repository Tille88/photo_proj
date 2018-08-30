// import model from './components/imageViewer/imageViewModel';
// import view from './components/imageViewer/view';
// import controller from './components/imageViewer/controller';
import fileNameArr from './data_read_in/file_name_arr';
import thumbNails from './components/thumbnailViewer/thumbnailView';
import ImageViewer from './components/imageViewer/imageViewer';
import './style/main.css';

var initViews = function(){
	// Init thumbnails view
	thumbNails({
		selector: '.thumbnail-view',
		preview: '.current-sel'}).init();
	// Init imageViewer view
	ImageViewer({
		data: fileNameArr.map(function(el) {
			return {
				'fileName': "./assets/prev/" + el + ".png",
				'loaded': false,
				'fileType': (~el.search("bw") + 1) ? "cl" : "bw",
			};
		}),
	}).init();
};

window.addEventListener('load', initViews, false);

// Create "n:th/once" fucntion and pipe and throttle function => functional