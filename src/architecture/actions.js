import {mergeObj} from '../core/object';

/**
 * Each initialized object will have separate actions registry
 */
var ActionsRaw = function(o){
	this.actions = {};

	this.register = function(acId, fn){
		this.actions[acId] = this.actions[acId] || [];
		this.actions[acId].push(fn);
	};

	this.execute = function(acId, args){
		this.actions[acId].forEach(function(fn){
			fn(args);
		});
	};
	// debugger;
	return this;

	// ALT:
	// return mergeObj({}, o, {
	// 	register: function(acId, fn){
	// 		var acRegArr = this.actions[acId] || [];
	// 		acRegArr.push(fn);
	// 	},
	// 	execute: function(acId){
	// 		this.actions[acId].forEach(function(fn){
	// 			fn();
	// 		});
	// 	},
	// });
};

// Convenience fnc
var Actions = function(o){
	return ActionsRaw.call(o);
};

export default Actions;

// EXAMPLE
// MIXINS
// const pipe = (op1, op2) => (arg) => op2(op1(arg));
// var ThumbNailViewAction = pipe(ThumbNailView, Actions);
