export function loadCss(url, isCache = false) {
    let element = document.createElement('link')
    element.setAttribute('rel', 'stylesheet')
    element.setAttribute('type', 'text/css')

    if (isCache) {
        element.setAttribute('href', url + '?t=' + new Date().getTime())
    } else {
        element.setAttribute('href', url)
    }

    document.head.appendChild(element)
}


export function loadJs(jsUrl, callback, isCache = false) {
    let script = document.createElement('script')
    let head = document.head;
    script.type = 'text/javascript'
    if (isCache) {
        script.src = jsUrl + '?t=' + new Date().getTime()
    } else {
        script.src = jsUrl
    }

    if (script.addEventListener) {
        script.addEventListener('load', callback, false)
    }

    head.appendChild(script)

}

export function removeJs(jsUrl) {
    let script = Array.from(document.getElementsByTagName('script'))
        .find(script => {
            let src = script.getAttribute('src');
            return src && src.startsWith(jsUrl)
        })

    if (script) {
        script.remove()
    }

}

export function removeZohoFloat() {
    let element = Array.from(document.getElementsByClassName('zsiq_floatmain'))
    console.log(element)
    element.forEach(item => {
        item.style.display = 'none'
    })

}

export function updateWindowHeight() {
    let windowHeight = window.innerHeight;
    let html = document.querySelector(':root');
    if (windowHeight > 0 && html) {
        html.style.setProperty('--i-window-height', `${windowHeight}px`);
    }
}


/**
 *  格式化event start time and end time
 */

export const eventStartAndEndTimeFormat = (value) => {
    let arr = value.split(' ');
    let time = arr[1];
    let timeStr = time.slice(0, -3)
    return timeStr
}

export const getPercentByNowAndPrev = (now,prev)=>{
    now = parseFloat(now)
    prev = parseFloat(prev)
    if(isNaN(now) || isNaN(prev)){
        return '-'
    }

    if(prev > 0){
        return  Math.round((now - prev) / prev * 10000 ) / 100.00
    }else if(prev === 0){
        return Math.round((now - prev) * 10000 ) / 100.00
    }else{
        return 0
    }

}
export const nowValueFormat = (value)=>{
    return new Intl.NumberFormat('en-IN').format(value)
}
