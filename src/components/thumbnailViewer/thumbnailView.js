import {mergeObj} from '../../core/object';
import {selectEl} from '../../core/dom';
import MessageCenter from '../../architecture/MessageCenter';

// FOR PUBLIC INSTANCE...
var publicVersion = function(options){
	options = options || {};
	return {
		data: selectEl(options.selector),
		currIdx: options.currIdx || 0,
		currPreview: selectEl(options.preview),
		hoverEl: null,
	};
};

// FOR PUBLIC SHARED...
var ThumbNailPrototype = {
	setIdx: function(idx){
		this.currIdx = idx;
		MessageCenter().fire('set-id', idx);
	},
	setCurrPreview: function(el){
		var currPrev = this.currPreview;
		var elClone = el.cloneNode();
		if(currPrev.children.length){
			currPrev.removeChild(currPrev.children[0]);
		}
		currPrev.appendChild(elClone);
	},
	// Everything usually in constructor for init()
	init: function(){
		var self = this;
		this.registerMessages();
		[].forEach.call(this.data.children, function(el, i){
			el.addEventListener('click', function() {
				self.setIdx(i);
			}, false);
			el.addEventListener('mouseover', function() {
				self.setCurrPreview(el);
			}, false);
		});
	},
	registerMessages: function(){
		// if(this.actions){
		// this.register('set-id', function(idx){ console.log(idx); });
		// }
		MessageCenter().register('set-id', function(idx){
			this.setCurrPreview(this.data.children[idx]);
		}.bind(this));
	},
};

// Set delegate... and have function which creates this...
var ThumbNailView = function(options){
	// return mergeObj(Object.create(ThumbNailPrototype), publicVersion(options));
	return mergeObj(Object.create(ThumbNailPrototype), publicVersion(options));
};

// MIXINS
// const pipe = (op1, op2) => (arg) => op2(op1(arg));
// var ThumbNailViewAction = pipe(ThumbNailView, Actions);

export default ThumbNailView;
// export default ThumbNailViewAction;

