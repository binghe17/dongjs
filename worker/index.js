let { log, warn } = console

// let opt = {
// 	type: 'classic',
// 	// type: 'module',// es6 import from mode
// 	name: 'test-worker-' + Date.now()
// }

// let w = new Worker('worker.js', opt);// 每次new的时候，会访问服务器的worker.js文件

// // events
// // w.onmessage = function  fn1(){}
// // w.onmessage = function  fn2(){}// renew
// w.addEventListener('message', function (e) {
// 	log('main.worker.onmessage:', e.data);
// })
// // w.removeEventListener('message', fn)

// w.addEventListener('error', function (e) {
// 	log('main.worker.onerror: %s line %s col %s', e.filename, e.lineno, e.colno);
// });

// w.addEventListener('close', function (e) {
// 	log('main.worker.onclose:', e);
// });


// var a = [];
// w.postMessage('main --> worker', a);








// // 5秒后关闭worker
// setTimeout(function () {
// 	log('main.worker.terminate()');
// 	w.terminate();// 令worker进程强制结束
// }, 5000);









// // 与worker无关，这里侦听网络连接状态。
// addEventListener('online', function (e) {
// 	log('main.worker.ononline', e);
// });

// addEventListener('offline', function (e) {
// 	log('main.worker.onoffline', e);
// });






// 使用缓存
let w1 = cacheWorker('w1', function () {
	postMessage(123123123)
	// postMessage(()=>{})
	// throw new Error('e')
	onmessage = function({data:e}){
		console.log(name, e)
		// close()
	}
}, {
	message(e){
		log(e)
	},
	error(e){
		log('error', e)
	},
	messageerror(e){
		log('merr', e)
	}
})
w1.postMessage('lalala..')


let w2 = cacheWorker('w2', 'onmessage=({data})=>{console.log(name, data)}')
w2.postMessage('hahaha!!')
// w2.terminate()// 这里比postMessage要快