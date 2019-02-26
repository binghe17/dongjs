
let o={
	name:'module',
	version:Date.now()
};


importScripts('sha256.js');


console.log(shake_256('jinxidong', 16));