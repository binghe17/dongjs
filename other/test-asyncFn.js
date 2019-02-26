let {log} = console


// async function asyncFn(){
// 	log('start');//start
// 	let v
// 	v = await new Promise((y,n)=>{
// 		setTimeout(()=>{
// 			y('结果A');
// 		},1000)
// 	})
// 	console.log(1, v);//1 '结果A'
// 	console.log(2, v);//2 '结果A'
// 	let v2 = await new Promise((y,n)=>{
// 		setTimeout(()=>{
// 			y('结果B')
// 		}, 500)
// 	})
// 	log(3, v2);//3 '结果B'
// 	log('end');//end
// 	return {v, v2}
// }

// asyncFn().then(v=>log(v));//{ v: '结果A', v2: '结果B' }



//--------------------------

//异步转同步
// async function afn(...fs) {
// 	let s = fs.filter(f => typeof f === 'function')
// 	let f, v, m;
// 	while (f = s.shift()) {
// 		v = await new Promise((yes, no) => {
// 			m = { yes, no }
// 			Reflect.apply(f, m, [v])
// 		})
// 	}
// 	return v
// }

// // test
// {
// 	console.time('afn')
// 	let v = 10000;
// 	console.log('----ready----') //----ready----
// 	let run1 = afn(
// 		function () {
// 			setTimeout(() => {
// 				log('1111111------',v) //1111111------ 10000
// 				this.yes(v)
// 			}, 3000)
// 		},
// 		function (v) {
// 			setTimeout(() => {
// 				v = v+1;
// 				log('222222------',v) //222222------ 10001
// 				this.yes(v)
// 			}, 2000)
// 		},
// 		function (v) {
// 			setTimeout(() => {
// 				v = v+1;
// 				log('333333-----',v) //333333----- 10002
// 				this.no(v)
// 				console.timeEnd('afn') //afn: 5507.604ms
// 			}, 500)
// 		},
// 	)
// 	.then(v => log('444444------',v+1)) //not output
// 	// run1.then(v => log('555555------',v+1)) //error
// 	.catch(e=>log('Error-----', e)) //Error----- 10002
// }	



//--------------------------

//异步转同步
async function afn2(...fs) {
	let s = afn2.s;
	s.push(...fs.filter(f => typeof f === 'function'))
	if (afn2.b) {
		return Promise.resolve(true);
	}
	afn2.b = true
	let f, v, m;
	while (f = s.shift()) {
		v = await new Promise((yes, no) => {
			m = { yes, no }
			Reflect.apply(f, m, [v])
		})
	}
	afn2.b = false
	return v
}
afn2.b = false
Object.defineProperty(afn2, 's', { value: [], enumerable: true })


// test
{
	console.time('afn')

	afn2(
		function () {
			log('------start 1') //------start 1
			setTimeout(() => {
				this.yes(1)
			}, 1000)
		},
		function (v) {
			log('------start 2') //------start 2
			setTimeout(() => {
				log(v) //1
				this.yes(2)
			}, 1000)
		},
		function (v) {
			log('------start 3') //------start 3
			setTimeout(() => {
				log(v) //2
				// this.no(3)
				this.yes(3)
				
			}, 1000)
		}).then(v => log('-----',v)) //----- 5
		.catch(e => log('-----Error', e)) //-----Error 3

	setTimeout(() => {
		afn2(
			function (v){
				log('------start 4') //------start 4
				setTimeout(()=>{ 
					this.yes(4)
				},1000)
			},
			function (v){
				log('------start 5') //------start 5
				setTimeout(()=>{
					this.yes(5)
					console.timeEnd('afn') //afn: 5008.163ms
				},1000)
			},
		).then(v=>log('------ending',v)) //------ending true
	}, 3000)
}
/* 结果：（125行，使用 this.yes(3)）
------start 1
------start 2
1
------start 3
------ending true
2
------start 4
------start 5
afn: 5008.774ms
----- 5
 */

/* 结果：（124行，开启注释 this.no(3)）
------start 1
------start 2
1
------start 3
------ending true
2
-----Error 3
 */
