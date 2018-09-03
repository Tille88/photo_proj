import ImageViewerModel from './imageViewerModel';
import {mergeObj} from '../../core/object';
import MessageCenter from '../../architecture/MessageCenter';
import displayEnum from './displayEnum';

var renderSwitch = {
	'SINGLE_FULL': function() {
	},
	'SINGLE_RG': function() {
		return {
			// this.
		};
	},
	'DOUBLE_LF': function() {

	},
	'DOUBLE_RG': function() {
	},
};


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
		this.view.height = 0.6 * this.view.width;
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
		// General cleanup
		// Need to check which ones to view, and render both after clearing ctx
		var v = this.view;
		var vh = v.height; var vw = v.width;
		this.viewCtx.clearRect(0, 0, vw, vh);
		var data = this.model.data[this.model.getIdx()];
		var displayType = displayEnum.reverse[data.display];
		var imgData = data.img;
		// SWITCH-LIKE FUNCTION LOGIC DEPENDING ON VIEW TYPE...
		// i) get default functions
		// ii) override if needed, can have this context
		// Render-settings, w/ defaulgs
		var rs = mergeObj({
			'rescaleDirWidth': function(viewWidth, viewHeight){
				return (this.img.height/viewHeight > this.img.width/viewWidth);
			},
			'rescaleWidth': function(viewHeight){
				return this.img.width * (viewHeight/this.img.height);
			},
			'rescaleHeight': function(viewWidth){
				return this.img.height * (viewWidth/this.img.width);
			},
			'getWOffset': function(viewWidth){
				return 0;
			},
		}, renderSwitch[displayType].call(this));
		var targW = vw; var targH = vh;
		var padW = 0; var padH = 0;
		// Call to have difference in viewport to work with for each view settings
		// var offsetW = rs.getWOffset();
		if(rs.rescaleDirWidth.call(data, vw, vh)){
			targW = rs.rescaleWidth.call(data, vh);
			padW = (vw-targW)/2;
			// Can do switch style here...
		} else{
			targH = rs.rescaleHeight.call(data, vw);
			padH = (vh-targH)/2;
		}
		this.viewCtx.drawImage(imgData, padW, padH, targW, targH);
		// this.viewCtx.drawImage(imgData, 0, 0, targW, targH);
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
