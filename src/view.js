
var view = (function(doc, win){

	var imageViewer = doc.createElement('canvas');
	imageViewer.width = 1440;
	imageViewer.height = 900;
	var viewCtx = imageViewer.getContext("2d");

	var init = function(){
		doc.body.appendChild(imageViewer);
	};

	// win.addEventListener('load', init, false);
	return {
		viewCtx: viewCtx,
		canvas: imageViewer,
		init: init,
	};
}(document, window));


export default view;
