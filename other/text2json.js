let str = `
A
	B
		C
					D
						E
				E
				F
		G
H
		I
		J
			d=dddd
`


let rows = str.split('\n')
// 过滤空白行
rows = rows.filter(e => !/^\s*$/.test(e))

let result
let tabIndexs=[];

let path=[];
let tpath ='';
let i
let length = rows.length
if (length > 1) {
	let tab
	let table = []
	for (i = 0; i < length; i++) {
		let row = rows[i]// 当前数据
		let m = row.match(/^\t*/)
		let prevTab = (typeof tab == 'undefined')? -1 : tab;// 之前的tab
		tab = m ? m[0].length : 0
		// console.log(tab)

		m = row.match(/[^\t]+/)
		let data = m ? m[0] : ''

		let k = '', v = ''
		m = data.indexOf('=')
		if (m !== -1) {
			k = data.slice(0, m)
			v = data.slice(m + 1)
		} else {
			v = data
		}

		tabIndexs = arrUniqSort(tabIndexs, tab)
		let p ='';
		path[tab]=v;
		if(tab < prevTab) {
			path = path.slice(0,path.indexOf(v));
			path[tab]=v;
		} 
		tpath = path.slice(0,tab);
		tpath = arr_delItem(tpath);
		p = tpath.join('/');
		// table.push({ p, k, v })
		console.log('----------', {tab, prevTab, k, v, p})


		


		
	}
	console.log(result);
	// console.log(table) 


}







//-------------------------

//정렬하면서 중복추가 되지 않게 삽입
function arrUniqSort(arr,...item){
    let set = new Set(arr)
    item.forEach(e=>set.add(e))
    arr = Array.from(set)
    arr.sort((a,b)=>{
        return (a>b? 1 : a<b? -1 : 0)
    })
    return arr;
}
//나보다 작은 값들을 추출
function arr_slice(arr, num) {
    return arr.filter(e=>e<num)
}
//특정한 값을 모두 지움
function arr_delItem(arr, num=undefined) {
    return arr.filter(e=>e!=num)
}
// let arr = [4,6,2,5,2,2]
// a=arrUniqSort(arr, 7)
// console.log(a);
// console.log(arr_slice(a, 6))



function PathObject(o,d='/') {
	return new Proxy(o, {
		set(o, k, v) {
			let c = o
			let ks = k.split(d)
			k = ks.pop()
			ks.forEach(k=>{
				c = o[k]
				if(c === undefined) {
					c = {}
				}
			})
			if(c === undefined ) {
				c = {}
			}
			c[k] = v
		},
		get(o, k) {
			let c = o
			let ks = k.split(d)
			ks.some(k=>{
				c = c[k]
				return c === undefined
			})
			return c
		}
	})
}


// let o = {
// 			a:{
// 				b:'aaaaaaa'
// 			}
// 		}
// let po = new PathObject(o);
// console.log(o);//{ a: { b: 'aaaaaaa' } }
// console.log(po['a/b']);//aaaaaaa
// console.log(po['a/c/d/g']);//undefined
// po['a/d'] = 'aaaa'
// console.log(o);//{ a: { b: 'aaaaaaa', d: 'aaaa' } }

