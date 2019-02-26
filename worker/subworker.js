let {log} = console

importScripts('sha256.js')

onmessage = ({data})=>{

	log('$$$$$$$$$$ origin data:', data)
	log('$$$$$$$$$$ sha256 data:', sha256(data))
}


