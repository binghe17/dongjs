let { log } = console



let o = { a: 1, b: 2, c: { d: 4 } }

let { a, b, c: { d } } = o

log(a)
log(b)
log(d)
