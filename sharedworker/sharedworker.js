let id, ports;
id = 0;
ports = new Set();


// 广播，向所有port们发送数据。
function broadcast(myport, m) {
	ports.forEach(port => {
		try {
			if (myport !== port) port.postMessage(m)
		} catch (err) {
			myport.postMessage(err.stack)
		}
	})
}

// sharedWorker
addEventListener('connect', (e) => {
	let port;
	try {
		port = e.source;// e.ports[0] 是客户端 SharedWorker 实例
		// port = e.ports[0]
		// port.postMessage({portsLength: e.ports.length})
		port.start()// 必须执行后，才可以接受message事件。
		// port.postMessage(JSON.stringify(Object.getOwnPropertyNames(this)))// IndexedDB, XMLHttpRequest

		port.id = ++id// 生成ID序号
		ports.add(port)


		port.postMessage({ connect: port.id })


		port.addEventListener('message', systemChat)
		port.addEventListener('message', userChat)


		function systemChat(e) {
			let { data } = e

			// 主页面onbeforeunload，手动发送自己断开，模拟close事件
			if (/^offline/.test(data)) {
				ports.delete(port)
				broadcast(port, { offline: port.id })
			} else if (data === 'ports') {
				port.postMessage(ports.size)
			} else if (data === 'ids') {
				port.postMessage(Array.from(ports).map(e => e.id))
			} else {
				// broadcast(port, { message: data })
			}
		}

		function userChat(e) {
			let { data } = e// {id, msg}

			if (data !== null && typeof data === 'object') {
				let { id, msg } = data

				let type = typeof id
				if(type==='number') {
					let targetPort = Array.from(ports).filter(port => port.id === id)[0]
					targetPort.postMessage({ id: port.id, msg })
				}else if(type==='string'){
					if(id==='broadcast') {
						broadcast(port, msg)
					}
				}

			}
		}


		port.addEventListener('messageerror', (e) => port.postMessage(e))// 未知事件
		port.addEventListener('error', (e) => port.postMessage(e))// 未知事件
		// port.addEventListener('close', (e) => { broadcast(port, { offline: port.id }) })// 没有close事件

		broadcast(port, { otherconnect: port.id })



		// 可以导入外部脚本，使用indexedDB进行本地保存。
		// importScripts('/lib/localforage.js')
		// let db = localforage.createInstance({name:'test', storeName:'sharedWorkerTest'})
		// db.setItem('id', port.id)

		// 测试内容
		port.postMessage({ portsLength: e.ports.length })// 1
		// port.postMessage(e.source===e.ports[0])// true
		// port.postMessage(typeof importScripts);// 'function' 可以导入外部js文件
		// port.send(Object.getOwnPropertyNames(port))
		// port.postMessage(port.id)
		// port.postMessage(typeof port.send)
		// port.postMessage(port.id)

	} catch (err) {
		port.postMessage(['warning', err.stack]);
	}
});
