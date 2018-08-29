import model from './components/imageViewer/model';
import view from './components/imageViewer/view';
import controller from './components/imageViewer/controller';
import './style/main.css';

import thumbNails from './components/thumbnailViewer/thumbnailModel';

// Turn this into main controller...
// And hook up with events/actions

var initViews = function(){
	thumbNails({
		selector: '.thumbnail-view',
		preview: '.current-sel'}).init();
};

window.addEventListener('load', initViews, false);



// selectElementArr('.thumbnail-view');
// TODO: make object for loadqueue
// Create "n:th" fucntion and pipe and throttle function => functional
// Pass in functions and listeners functionality from model?
// Can extend this through model?