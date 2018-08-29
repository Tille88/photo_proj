import {pushArr} from "../../core/array";
import {mergeObj} from '../../core/object';
// var privateStore = function(){
// 	var wm = new WeakMap();
// 	return
// }
// const myWeakMap = new WeakMap();
// accessingPrivateData() {
// 	const privateData = myWeakMap.get(this); // getting the private data
// }
// Start by getting functionality, then refactor to get data privacy...

// FOR PUBLIC INSTANCE...
var publicVersion = function(options){
	options = options || {};
	return {
		data: options.data || [],
		// bufferIdxFnc: options.bufferIdxFnc || this.bufferIdxFnc,
		bufferQueue: [],
		currIdx: options.currIdx || 0,
		maxBuffer: options.maxBuffer || 2,
		inMemoryCanvas: document.createElement('canvas'),
		// inMemoryCtx: document.createElement('canvas').getContext("2d"),
	};
};

// FOR PUBLIC SHARED...
var ImageLoadPrototype = {
	setIdx: function(idx){
		this.currIdx = idx;
		this.bufferIdxFnc();
	},
	// should be private:
	clearBufferQ: function(){
		this.bufferQueue = [];
	},
	init: function(){
		this.bufferIdxFnc();
	},
	bufferIdxFnc: function(){
		// var self = this;
		var idx = this.currIdx;
		this.clearBufferQ();
		this.bufferQueue = (idx > 0) ? [idx-1] : [];
		pushArr(this.bufferQueue, [idx+2, idx+1, idx]);
		// pushArr(this.bufferQueue, [idx+1,idx]);
		while(this.bufferQueue.length){
			var idxToLoad = this.bufferQueue.pop();
			if(!this.data[idxToLoad].loaded){
				this.imgOnLoad.call(this, idxToLoad);
			}
		}
	},
	imgOnLoad: function(idxToLoad){
		var data = this.data[idxToLoad];
		var img = data.img = new Image();
		img.src = data.fileName;
		var canvas = this.inMemoryCanvas;
		var ctx = canvas.getContext("2d");
		/** Local listener, will be refactored */
		function listener(){
			canvas.width = img.naturalWidth;//img.width;
			canvas.height = img.naturalHeight;//img.height;
			ctx.drawImage(img, 0, 0);
			data.imageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
			data.loaded = true;
			img.removeEventListener('load', listener);
		}
		img.addEventListener('load', listener, false);
	}
};


// Set delegate... and have function which creates this...
var ImageLoadQueue = function(options){
	return mergeObj(Object.create(ImageLoadPrototype), publicVersion(options));
};

// Mixins? (need to use `this`)



export default ImageLoadQueue;