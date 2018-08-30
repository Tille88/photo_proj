import {pushArr} from "../../core/array";
import {mergeObj} from '../../core/object';
// import Messages from '../../architecture/centralEvents';
// 	registerMessages: function(){
// 		Messages().register('set-id', function(idx){
// 			console.log("TEST");
// 			this.setIdx(idx);
// 		}.bind(this));
// 	},


// FOR PUBLIC INSTANCE...
var publicVersion = function(options){
	options = options || {};
	return {
		data: options.data || [],
		bufferQueue: [],
		currIdx: options.currIdx || 0,
		maxBuffer: options.maxBuffer || 2,
		inMemoryCanvas: document.createElement('canvas'),
	};
};

// FOR PUBLIC SHARED...
var PrototypePublic = {
	setIdx: function(idx){
		this.currIdx = idx;
		this.bufferIdxFnc();
	},
	getIdx: function(){
		return this.currIdx;
	},
	// should be private:
	clearBufferQ: function(){
		this.bufferQueue = [];
	},
	init: function(){
		this.bufferIdxFnc();
		// this.registerMessages();
		return this;
	},
	bufferIdxFnc: function(){
		var idx = this.currIdx;
		this.clearBufferQ();
		this.bufferQueue = (idx > 0) ? [idx-1] : [];
		pushArr(this.bufferQueue, [idx+2, idx+1, idx]);
		while(this.bufferQueue.length){
			var idxToLoad = this.bufferQueue.pop();
			if(!this.data[idxToLoad].loaded){
				this.imgOnLoad(idxToLoad);
			}
		}
	},
	imgOnLoad: function(idxToLoad){
		var self = this;
		var data = this.data[idxToLoad];
		data.img = new Image();
		data.img.src = data.fileName;
		data.promise = new Promise(function(resolve) {
			data.img.addEventListener("load", function imgLoadListener() {
				data.img.removeEventListener("load", imgLoadListener);
				self.imgLoadHandler(data);
				resolve();
			});
		});
	},
	imgLoadHandler: function(imgObj){
		var canvas = this.inMemoryCanvas;
		var ctx = canvas.getContext("2d");
		canvas.width = imgObj.img.naturalWidth;
		canvas.height = imgObj.img.naturalHeight;
		ctx.drawImage(imgObj.img, 0, 0);
		imgObj.imageData = ctx.getImageData(0, 0,
			imgObj.img.naturalWidth,
			imgObj.img.naturalHeight
		);
		imgObj.loaded = true;
	},
};


// Set delegate... and have function which creates this...
// Can include model here?
var ImageViewerModel = function(options){
	return mergeObj(Object.create(PrototypePublic), publicVersion(options));
};

// Mixins? (need to use `this`)
// Privacy from delegates to own?
// Can load in all to one big object first... for public?

export default ImageViewerModel;
