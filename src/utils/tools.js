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

// 获取当前时间 和 前7天的时间点
export const nowDateYmd = ()=>{
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()+1;
    let day = date.getDate()

    return year + '-' + month + '-' + day;
}

// 多少天之前
export const dateYmdAgo = (value)=>{

    let now = new Date()
    let date = new Date(now.getTime() - value * 24 * 3600 * 1000)
    let year = date.getFullYear()
    let month = date.getMonth()+1;
    let day = date.getDate()
    return year + '-' + month + '-' + day;
}

export const dateYmdAndNumber = (value)=>{
    let now = new Date()
    let arr = []
    for(let i=1;i<=value;i++){
        let date = new Date(now.getTime() - i * 24 * 3600 * 1000)
        let year = date.getFullYear()
        let month = date.getMonth()+1;
        let day = date.getDate()

        let aa = year + '-' + month + '-' + day;

        arr.push([aa,0])
    }
    return arr;
}

export const nowDateYmdByTime = (value)=>{
    let date = new Date(value)
    let year = date.getFullYear()
    let month = date.getMonth()+1;
    let day = date.getDate()

    return year + '-' + month + '-' + day;
}

export const formatDateYmdHis = (dateObj)=>{

// 提取年、月、日、小时、分钟和秒
    let year = dateObj.getFullYear();
    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    let day = ('0' + dateObj.getDate()).slice(-2);
    let hours = ('0' + dateObj.getHours()).slice(-2);
    let minutes = ('0' + dateObj.getMinutes()).slice(-2);
    let seconds = ('0' + dateObj.getSeconds()).slice(-2);

  return  year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

}


