import ImageViewerModel from './imageViewerModel';
import {mergeObj} from '../../core/object';
import MessageCenter from '../../architecture/MessageCenter';


// FOR PUBLIC INSTANCE...
var publicVersion = function(options){
	options = options || {};
	return {
		view: document.createElement('canvas'),
		model: ImageViewerModel({
			'data': options.data,
		}).init(),
		target: options.target || document.body,
	};
};

// FOR PUBLIC SHARED...
var PrototypePublic = {
	init: function(){
		var self = this;
		this.model.setIdx(0);
		this.view.width = this.getWidthDim();
		this.view.height = 0.4 * this.view.width;
		this.viewCtx = this.view.getContext("2d");
		this.target.appendChild(this.view);
		this.initEventListeners.call(this);
		this.model.data[this.model.getIdx()].promise
			.then(
				function() {
					this.render();
				}.bind(self));
		this.registerMessages();
	},
	initEventListeners: function(){
		this.view.addEventListener('click', function(e){
			var rect = e.target.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var side = (x < rect.width/2) ? "left": "right";
			if(side == "left"){
				this.model.setIdx(this.model.getIdx() - 1);
			} else{
				this.model.setIdx(this.model.getIdx() + 1);
			}
			MessageCenter().fire('set-id', this.model.getIdx());
			this.render();
		}.bind(this));
	},
	render: function(){
		var imgData = this.model.data[this.model.getIdx()].imageData;
		// this.viewCtx.clearRect(0, 0, this.view.width, this.view.height);
    // this.viewCtx.scale(2, 2);
    // this.viewCtx.drawImage(imgData,0,0);
		this.viewCtx.putImageData(imgData, 0, 0);
	},
	registerMessages: function(){
		MessageCenter().register('set-id', function(idx){
			this.model.setIdx(idx);
			this.model.data[idx].promise.then(
				function() {
					this.render();
				}.bind(this));
		}.bind(this));
	},
	getWidthDim: function(){
		return this.target.clientWidth;
	},
};

// Set delegate... and have function which creates this...
// Can have model initialized here?
var imageViewer = function(options){
	return mergeObj(
		Object.create(PrototypePublic),
		publicVersion(options)
	);
};

export default imageViewer;
