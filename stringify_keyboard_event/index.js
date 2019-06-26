let ui = document.getElementById('shortkey')

let last = ''
let count = 0

addEventListener('keydown', (e)=>{
	e.preventDefault()

	let k = stringifyKeyboardEvent(e)

	e.ctrlKey && e.key ==='Key U'


	if(last!==k) {
		last = k
		count = 0
	}
	count++

	ui.textContent = `${k} (${count}次)`
})
