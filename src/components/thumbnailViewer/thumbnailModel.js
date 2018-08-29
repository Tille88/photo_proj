var mergeObj = function(target){
	var args = [].slice.call(arguments, 1);
	args.forEach(function(src) {
		for(var prop in src){
			if ({}.hasOwnProperty.call(src, prop)){
				target[prop] = src[prop];
			}
		}
	});
	return target;
};

var selectEl = function(queryString){
	return document.querySelector(queryString);
};

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
		[].forEach.call(this.data.children, function(el, i){
			el.addEventListener('click', function() {
				self.setIdx(i);
			}, false);
			el.addEventListener('mouseover', function() {
				self.setCurrPreview(el);
			}, false);
		});
	},
};

// Set delegate... and have function which creates this...
var ThumbNailModel = function(options){
	return mergeObj(Object.create(ThumbNailPrototype), publicVersion(options));
};

export default ThumbNailModel;
