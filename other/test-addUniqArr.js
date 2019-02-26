
let arr = [4,6,2,5,,,2,,2]
console.log(arr) //[ 4, 6, 2, 5, <2 empty items>, 2, <1 empty item>, 2 ]

//-----------
function addUniqArr(arr,aes=1,...item){
    let set = new Set(arr)
    item.forEach(e=>set.add(e))
    arr = Array.from(set)
    arr.sort((a,b)=>{
        return aes * (a>b? 1 : a<b? -1 : 0)
    })
    return arr;
}
a=addUniqArr(arr,1, 7)
console.log(a); //[ 2, 4, 5, 6, 7, undefined ]


//------------ 
function arr_slice(arr, num) {
    return arr.filter(e=>e<num)
}
console.log(arr_slice(a, 6)) //[ 2, 4, 5 ]


//-------------
function arr_delItem(arr, num=undefined) {
    return arr.filter(e=>e!=num)
}
console.log(arr_delItem(arr)) //[ 4, 6, 2, 5, 2, 2 ]


//-------------
let v = 2 
let result = arr.reduce((r,e,i,a)=>{
    if(e === v) r.push(i)
    return r
}, [])
console.log(result) //index : [ 2, 6, 8 ]



// filter
// map
// reduce
// forEach
// every
// some

//https://es6.ruanyifeng.com/
