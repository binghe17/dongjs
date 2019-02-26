{
	let cache = {}
	// let cacheurljs = function cacheurljs(url, callback) {
	// 	if (cache[url]) return callback(cache[url])

	// 	let q = new XMLHttpRequest()
	// 	q.open('get', url)// 'worker.js'
	// 	q.onload = ({ target: { responseText } }) => {
	// 		let code = responseText
	// 		let blob = new Blob([code], { type: 'text/javascript' })
	// 		let objectURL = URL.createObjectURL(blob)

	// 		cache[url] = { code, blob, objectURL }
	// 		callback(cache[url])
	// 	};
	// 	q.send(null)
	// };

	let creator = function creator(name, code) {
		let blob = new Blob([code], { type: 'text/javascript' })
		let objectURL = URL.createObjectURL(blob)
		return cache[name] = { code, blob, objectURL }
	};

	let cacheFn = function cacheFn(name, fn) {
		let code;
		let fnType = typeof fn;
		if (fnType === 'function') {
			code = fn.toString()
			if(code.charCodeAt(0)===102) {
				// function (){...}
				let start = code.indexOf('{')+1
				let end = code.lastIndexOf('}')
				code = code.slice(start, end).trim()
			} else {
				// ()=>{...}    or    ()=>...    or    e=>...
				let m = code.match(/^\s*([0-9A-Za-z\$_]|\(.+?\))\s*=>\s*\{?/u);
				let start = m[0].length;
				let length = code.length;
				let end = code.charCodeAt(length-1)===125 ? -1 : length;// }
				code = code.slice(start, end).trim()
			}
		} else if (fnType === 'string') {
			code = fn.trim()
		}
		let b1 = cache[name] !== null && typeof cache[name] === 'object';
		if (b1) {
			if (cache[name].code !== code) {
				creator(name, code)
			}
		} else {
			creator(name, code)
		}
		return cache[name];
	};

	let hand = function hand(w, handle){
		let type = typeof handle
		if(handle!==null && type === 'object') {
			Object.keys(handle).forEach(k=>{
				// onmessage(MessageEvent)
				// onerror(ErrorEvent)
				// onmessageerror(MessageErrorEvent)
				if(/^(on)?(message|error|messageerror)$/.test(k)){
					if(/^on/.test(k)) k = k.slice(2)
					if(k==='message') {
						w.addEventListener(k, (e)=> Reflect.apply(handle[k], w, [e.data]) )
					}else{
						w.addEventListener(k, (e)=> Reflect.apply(handle[k], w, [e]) )
					}
				}
			})
		}else if(type==='function') {
			w.addEventListener('message', (e) => Reflect.apply(handle, w, [e.data]))
		}
	}

	let cacheWorker = function cacheWorker(name, fn, handle) {
		let cache = cacheFn(name, fn)
		let w = new Worker(cache.objectURL, {name})
		if(!handle) {
			handle = fn
		}
		hand(handle)
		return w
	}
	
	Object.defineProperty(cacheWorker, 'cache', { get() { return cache } });
	this.cacheWorker = cacheWorker;
}

/* 
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
*/