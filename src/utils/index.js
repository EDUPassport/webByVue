export const ymdFormat = (time, language) => {
    let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"];
    let monthArrCn = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

    let year = time.getFullYear();
    let month = monthArr[time.getMonth()];
    let day = time.getDate();

    if (language == 'zh-CN') {
        month = monthArrCn[time.getMonth()];
    }
    return month + ' ' + day + ', ' + year;
}

export const ymdFormatTimestamp = (time, language) => {
    let t = new Date(time * 1000)
    let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"];
    let monthArrCn = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

    let year = t.getFullYear();
    let month = monthArr[t.getMonth()];
    let day = t.getDate();

    if (language == 'zh-CN') {
        month = monthArrCn[t.getMonth()];
    }
    return month + ' ' + day + ', ' + year;
}

export const howLong = (createtime, languageValue) => {
    let now = Date.parse(new Date()) / 1000;
    let limit = now - createtime;
    let content = "";
    let isEnglish = languageValue == 'en-US' ? true : false;
    if (limit < 60) {
        if (isEnglish) {
            content = "a moment ago";
        } else {
            content = "刚刚";
        }
    } else if (limit >= 60 && limit < 3600) {
        if (isEnglish) {
            content = Math.floor(limit / 60) + " mins ago";
        } else {
            content = Math.floor(limit / 60) + " 分钟前";
        }

    } else if (limit >= 3600 && limit < 86400) {
        if (isEnglish) {
            content = Math.floor(limit / 3600) + " hours ago";
        } else {
            content = Math.floor(limit / 3600) + " 小时前";
        }
    } else if (limit >= 86400 && limit < 2592000) {
        if (isEnglish) {
            if (Math.floor(limit / 86400) === 1) {
                content = "1 Day ago";
            } else {
                content = Math.floor(limit / 86400) + " Days Ago";
            }

        } else {
            content = Math.floor(limit / 86400) + " 天前";
        }

    } else if (limit >= 2592000 && limit < 31104000) {
        if (isEnglish) {
            if(Math.floor(limit / 2592000) == 1){
                content = Math.floor(limit / 2592000) + " month ago";
            }else{
                content = Math.floor(limit / 2592000) + " months ago";
            }

        } else {
            content = Math.floor(limit / 2592000) + " 个月前";
        }

    } else {
        if (isEnglish) {
            content = "";
        } else {
            content = "";
        }

    }
    // console.log(content)
    return content;
}

export const isPhone = ()=>{
    return (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))
}

export const randomString= ()=>{
    let len = 32;
    let chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
    let maxPos = chars.length;
    let character = '';
    for(let i=0;i<len;i++){
        character+=chars.charAt(Math.floor(Math.random()*maxPos))
    }
    return character;
}

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export const accAdd = (arg1, arg2) => {
    let r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        let cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export const accSub = (arg1, arg2) =>{
    let r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
export const accMul = (arg1, arg2)=> {
    let m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {console.log(e)}
    try {
        m += s2.split(".")[1].length;
    } catch (e) {console.log(e)}
    return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
    );
}

/**
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
export const accDiv = (arg1, arg2) =>{
    let t1 = 0,
        t2 = 0,
        r1,
        r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    } catch (e) {console.log(e)}
    try {
        t2 = arg2.toString().split(".")[1].length;
    } catch (e) {console.log(e)}

    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);

}