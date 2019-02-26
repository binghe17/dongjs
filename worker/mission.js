let result = ''
let char = 'a'
let i = 0

setInterval(() => {
	result += char
	postMessage(result)

	if (i++ > 5) close()
}, 100)

this.onmessage = ({ data }) => {
	if (data === 'close') this.close()
}
