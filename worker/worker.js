let { log, warn } = console


let w = this;
let i = 0;


postMessage(`worker --> main (${new Date().toLocaleString()})`);


// onerror = log
onmessage = function ({ data }) {
	// log(event);// // MessageEvent
	log(data)// MessageEvent

	postMessage(`worker --> main  (${new Date().toLocaleString()})`)

	// postMessage(data, origin)// 也许可以跨域，需测试证实
}

w.addEventListener('message', onmessage)
w.removeEventListener('message', onmessage)




// log(window)// error --> exit process
// log(self===this)// this===worker
// log(Object.getOwnPropertyNames(w))// 当前域名可用的所有引用
// log(this.name)// options.name
// log(w.origin)







// ----------------------------------------------
// worker中再开启worker，可以无限往内开启worker

function createSubworker(url, callback) {
	let dir = location.href.slice(0,location.href.lastIndexOf('/'))
	let subworker = new Worker(dir+'/'+url)
	callback(subworker)
}

createSubworker('subworker.js', (w)=>{
	w.postMessage('13718923489235623789892374981274723984')
})






// ----------------------------------------------
// 无限循环，每秒发送状态信息
setInterval(()=>{
	postMessage(['Im ok', Date.now()])// postMessage(data, origin)   origin='https://cihot.com/'
}, 1000)


// 8秒后worker自己关闭
setTimeout(function(){
	log('worker.close()');
	w.close();// 结束自己进程
},8000);


