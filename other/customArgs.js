// 个性化参数
function customArgs(...args) {
    let len = args.length
    let action, type, method
    if (len === 1) {
        [action] = args
        console.log({ action })
    } else if (len === 2) {
        [type, action] = args
        console.log({ type, action })
    } else if (len === 3) {
        [type, method, action] = args
        console.log({ type, method, action })
    }
  
    // log({action, type, method})
}

customArgs('copy')
customArgs('sys', 'copy')
customArgs('sys', 'soft', 'copy')


// {action: "copy"}
// {type: "sys", action: "copy"}
// {type: "sys", method: "soft", action: "copy"}
