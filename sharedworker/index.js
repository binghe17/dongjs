/*
new SharedWorker(url,opt)时， 必须在<script src>外部js文件中使用。
在chrome中，打开多个页面后关闭chrome程序，再启动chrome时，之前浏览过的多个页面自动打开，却不会正常运行sharedWorker。

 */
let log = (...a)=>{
	console.log(...a)
	let c = document.createElement('div')
	c.textContent = JSON.stringify(a)
	document.body.appendChild(c)
}

let sw, port, opt;

// 同域名下多个页面共享数据和传输
// sw.js?v=1.0 （由于location.search的不同，会打开不同的共享工作区域命名空间）

// opt = { name: '好名字', type: 'module' }// type默认值为'classic'
sw = new SharedWorker('sharedworker.js', opt);
// sw.onerror = (...e)=> log('sw.onerror', ...e)


port = sw.port;
// port.addEventListener('messageerror', log)
// port.addEventListener('error', log)
// port.addEventListener('close', log)// 改写了原来的port.close，所以可以侦听close事件。
port.addEventListener('message', function (e) {
	let { data } = e

	log('main.port.onmessage>', data)
});
port.start()// 必须执行后，才可以接受message事件。


window.onbeforeunload = ()=>{
	localStorage.setItem('lasttime-before', new Date().toLocaleString())// 同步执行
	port.postMessage('offline-before')// 等待异步执行
	// return 'wait'
}

// window.onunload = function(){
// 	localStorage.setItem('lasttime', new Date().toLocaleString())// 同步执行
// 	port.postMessage('offline')// 不会等待异步执行
// }


// 与 worker.terminate() 相同，关闭自己
// setTimeout(()=>port.close(), 1000)


// window.addEventListener('beforeunload',(e)=>{
// 	port.postMessage('offline-beforeunload')
// })




// 与后台协议的交互数据
// function chat(id, msg) {
// 	port.postMessage({id, msg})
// }

// function broadcast(msg){
// 	chat('broadcast', msg)
// }

