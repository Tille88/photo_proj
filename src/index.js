// import model from './components/imageViewer/imageViewModel';
// import view from './components/imageViewer/view';
// import controller from './components/imageViewer/controller';
import fileNameArr from './data_read_in/file_name_arr';
import thumbNails from './components/thumbnailViewer/thumbnailView';
import ImageViewer from './components/imageViewer/ImageViewer';
import './style/main.css';

// Turn this into main controller...
// And hook up with events/actions

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

// selectElementArr('.thumbnail-view');
// TODO: make object for loadqueue
// Create "n:th" fucntion and pipe and throttle function => functional
// Pass in functions and listeners functionality from model?
// Can extend this through model?
