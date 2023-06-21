import {encode, decode} from 'js-base64'

/**
 * 格式化日期
 * @prama t 时间戳
 * @return str MM-dd HH:mm
 */
export function formatDate(t) {
    t = t || Date.now();
    let time = new Date(t);
    let str = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    str += '-';
    str += time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    str += ' ';
    str += time.getHours();
    str += ':';
    str += time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    return str;
}

/**
 * 距当前时间点的时长
 * @prama time 13位时间戳
 * @return str x秒 / x分钟 / x小时
 */
export function formateTime(time) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const now = new Date().getTime();
    const diffValue = now - time;

    // 计算差异时间的量级
    const secondC = diffValue / second;
    const minC = diffValue / minute;
    const hourC = diffValue / hour;
    const dayC = diffValue / day;

    if (dayC >= 1) {
        return parseInt(dayC + '') + "天";
    } else if (hourC >= 1) {
        return parseInt(hourC + '') + "小时";
    } else if (minC >= 1) {
        return parseInt(minC + '') + "分钟";
    } else if (secondC >= 1) {
        return parseInt(secondC + '') + "秒";
    } else {
        return '0秒';
    }
}

export function encodeByJsBase64(value) {
    return encodeURIComponent(encode(value))
}

export function decodeByJsBase64(value) {
    return decode(decodeURIComponent(value))
}
export function convertTo24HourForEventTime(eventDate, time) {
    let hours = parseInt(time.substring(0, 2));
    if (time.indexOf('AM') !== -1 && hours === 12) {
        time = time.replace('12', '0');
    }
    if (time.indexOf('PM') !== -1 && hours < 12) {
        time = time.replace(hours, (hours + 12));
    }
    return eventDate + ' ' + time.replace(/(AM|PM)/, '').trim() + ':00';
}

export function formatEventTimeForShow(dateStr) {
    const date = new Date(dateStr);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let suffix = hours >= 12 ? 'PM' : 'AM';
    hours = ((hours + 11) % 12 + 1);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return hours + ':' + minutes + ' ' + suffix;
}