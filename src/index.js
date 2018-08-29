import model from './model';
import view from './view';
import controller from './controller';
import './style/main.css';

import thumbNails from './components/thumbnailViewer/thumbnailModel';


window.addEventListener('load', thumbNails({
	selector: '.thumbnail-view',
	preview: '.current-sel'}).init(), false);

// selectElementArr('.thumbnail-view');
// TODO: make object for loadqueue
// Create "n:th" fucntion and pipe and throttle function => functional
// Pass in functions and listeners functionality from model?
// Can extend this through model?