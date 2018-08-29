import {pushArr} from "../../core/array";
import {mergeObj} from '../../core/object';

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
		return this;
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
			canvas.width = img.naturalWidth;
			canvas.height = img.naturalHeight;
			ctx.drawImage(img, 0, 0);
			data.imageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
			data.loaded = true;
			img.removeEventListener('load', listener);
		}
		img.addEventListener('load', listener, false);
	},
};


// Set delegate... and have function which creates this...
// Can include model here?
var ImageLoadFactory = function(options){
	return mergeObj(Object.create(PrototypePublic), publicVersion(options));
};

// Mixins? (need to use `this`)
// Privacy from delegates to own?
// Can load in all to one big object first... for public?

export default ImageLoadFactory;
