var displayEnum = {
	SINGLE_FULL: 0,
	SINGLE_RG: 1,
	DOUBLE_LF: 2,
	DOUBLE_RG: 3,
};

displayEnum.reverse = Object.keys(displayEnum).reduce(function(acc, propName){
	acc[displayEnum[propName]] = propName;
	return acc;
}, {});

export default displayEnum;
