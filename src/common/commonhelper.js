import React, {
	StyleSheet,
	Dimensions,
	PixelRatio
} from "react-native";
import Parser from 'react-native-html-parser';
import SQLite from '../common/sqlitedal';
import DomParser from 'react-native-html-parser';

var sqlLite = new SQLite();

export default class CommonHelper {

	constructor() {
		console.disableYellowBox = true;
	}

	xmlToList(xml) {
		let doc = new Parser.DOMParser().parseFromString(xml, 'text/xml');
		let list = doc.getElementsByTagName('item');
		let result = [];
		console.log(list);
		for(let i = 0; i < list.length; i++) {
			if(list[i] && list[i].getElementsByTagName('title')[0] && list[i].getElementsByTagName('link')[0]) {

				result.push({
					title: list[i].getElementsByTagName('title')[0].textContent,
					link: list[i].getElementsByTagName('link')[0].textContent,
					pubdate: this.formatDateTime(list[i].getElementsByTagName('pubDate')[0].textContent),
					desc: this.removehtml(list[i].getElementsByTagName('description')[0]?list[i].getElementsByTagName('description')[0].textContent:list[i].getElementsByTagName('title')[0].textContent)
				})
			}

		}

		return result;
	}

	removehtml(str) {
		return str.replace(/<[^>]+>/g, "");
	}

	fetchdata(url,cb) {
		console.log('服务端执行');
		fetch(url, {
				method: 'get',
				headers: {
					'Accept': 'application/text',
					'Content-Type': 'application/text',
				}
			}).then((response) => response.text())
			.then((responseText) => {
				let list = this.xmlToList(responseText);
				new Promise(function(resolve, reject) {
					list.forEach(function(value, index, arrary) {
						sqlLite.InsertArtilce(value);
					})
						resolve();
				}).then(()=>{
					cb();
					console.log('循环插入完成');
				})

			})
	}

//日期标准时间转换为 yyyy-mm-dd hh:mm
	 formatDateTime (str) {  
		 var date = new Date(str);
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    return y + '-' + m + '-' + d+' '+h+':'+minute;  
};  


}
