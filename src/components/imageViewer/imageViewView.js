
import imageViewModel from './imageViewModel';
import {mergeObj} from '../../core/object';
import fileNameArr from '../../data_read_in/file_name_arr';

// FOR PUBLIC INSTANCE...
var publicVersion = function(options){
	options = options || {};
	return {
		view: options.data || document.createElement('canvas'),
		// bufferIdxFnc: options.bufferIdxFnc || this.bufferIdxFnc,
		// inMemoryCanvas: document.createElement('canvas'),
		model: imageViewModel({
			'data': fileNameArr.map(function(el) {
				return {
					'fileName': "./assets/prev/" + el + ".png",
					'loaded': false,
					'fileType': (~el.search("bw") + 1) ? "cl" : "bw",
				};
			}),
		}).init(),
		canvas: document.createElement('canvas'),
	};
};

// FOR PUBLIC SHARED...
var PrototypePublic = {
	init: function(){
		// this.bufferIdxFnc();
		this.model.setIdx(0);
		this.canvas.width = 1440;
		this.canvas.height = 900;
		this.viewCtx = this.canvas.getContext("2d");
		// this.viewCtx.putImageData(imgData, 0, 0);
		document.body.appendChild(this.canvas);
		this.initEventListeners.call(this);
	},
	initEventListeners: function(){
		// refactor to this-call instead of window
		this.canvas.addEventListener('click', function(e){
			var rect = e.target.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var side = (x < rect.width/2) ? "left": "right";
			if(side == "left"){
				this.model.setIdx(this.model.getIdx() - 1);
			} else{
				this.model.setIdx(this.model.getIdx() + 1);
			}
			var imgData = this.model.data[this.model.getIdx()].imageData;
			this.viewCtx.putImageData(imgData, 0, 0);
		}.bind(this));
	},
};


// Set delegate... and have function which creates this...
// Can have model initialized here?
var imageLoadView = function(options){
	return mergeObj(
		Object.create(PrototypePublic),
		publicVersion(options)
	);
};

export default imageLoadView;
