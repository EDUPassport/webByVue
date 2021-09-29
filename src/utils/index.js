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
            content = Math.floor(limit / 2592000) + " months ago";
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
