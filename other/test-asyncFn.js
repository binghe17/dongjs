let {log} = console


async function asyncFn(){
	log('start')
	let v
	v = await new Promise((y,n)=>{
		setTimeout(()=>{
			y('结果A')
		},1000)
	})

	console.log(1, v)
	console.log(2, v)
	
	
	let v2 = await new Promise((y,n)=>{
		setTimeout(()=>{
			y('结果B')
		}, 500)
	})
	log(3, v2)
	log('end')

	return {v, v2}
}



asyncFn().then(v=>log(v))

