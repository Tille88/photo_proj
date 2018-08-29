import model from './model';
import view from './view';


var controller = (function(mdl, view){
	var currIdx;


	window.addEventListener('load', function(){
		view.init();
		currIdx = 0;
		mdl.imgData.setIdx(currIdx);
		var imgData = mdl.imgData.data[currIdx].imageData;
		view.viewCtx.putImageData(imgData, 0, 0);
	}, false);

	view.canvas.addEventListener('click', function(e){
		var rect = e.target.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var side = (x < rect.width/2) ? "left": "right";
		if(side == "left"){
			mdl.imgData.setIdx(--currIdx);
		} else{
			mdl.imgData.setIdx(++currIdx);
		}
		var imgData = mdl.imgData.data[currIdx].imageData;
		view.viewCtx.putImageData(imgData, 0, 0);
	});

}(model, view));

export default controller;
