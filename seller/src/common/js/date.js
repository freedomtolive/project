export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		//匹配到几个y，就从字符串的第几位开始截取
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			//此处判断，如果匹配到的长度等于1就不需要补0，直接返回字符串(字符串是几位就返回几位的字符串);否则从在前面补上00再进行截取
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
} 
