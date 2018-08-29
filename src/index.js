// import model from './components/imageViewer/imageViewModel';
// import view from './components/imageViewer/view';
// import controller from './components/imageViewer/controller';
import fileNameArr from './data_read_in/file_name_arr';
import './style/main.css';

import thumbNails from './components/thumbnailViewer/thumbnailModel';
import imageViewer from './components/imageViewer/imageViewView';

// Turn this into main controller...
// And hook up with events/actions

var initViews = function(){
	// Init thumbnails view
	thumbNails({
		selector: '.thumbnail-view',
		preview: '.current-sel'}).init();

	// Init imageViewer view
	imageViewer({}).init();

};

window.addEventListener('load', initViews, false);



// selectElementArr('.thumbnail-view');
// TODO: make object for loadqueue
// Create "n:th" fucntion and pipe and throttle function => functional
// Pass in functions and listeners functionality from model?
// Can extend this through model?