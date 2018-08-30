import {mergeObj} from '../core/object';

var messageReg;

var MessagesRaw = function(){
	if(!messageReg){
		messageReg = {};
	}
	return {messageReg: messageReg};
};

var MessagesProto = {
	register: function(evId, fn){
		this.messageReg[evId] = this.messageReg[evId] || [];
		this.messageReg[evId].push(fn);
	},
	fire: function(evId, args){
		this.messageReg[evId].forEach(function(fn){
			fn(args);
		});
	},
};

var MessageCenter = function(){
	return mergeObj(Object.create(MessagesProto), MessagesRaw());
};


export default MessageCenter;
