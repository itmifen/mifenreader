import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";

import SQLite from 'react-native-sqlite-storage';

var pageSize=5;
export default class SqliteDal {

	
	constructor() {
		this.db = this.GetDb();
	}

	GetDb()
	{
		db = SQLite.openDatabase("itmifen.db", "1.0", "Test Database", 200000);
		return db;
	}

	CreateAricleTable()
	{
		db.transaction((tx) => {
			tx.executeSql('create table if not exists Article(id INTEGER PRIMARY KEY,title TEXT, link text,desc text,createdate TEXT,source text,isread  INTEGER)', [], (tx, results) => {});
		});
	}

	InsertArtilce(model)
	{
		this.CreateAricleTable(); //创建表
		if (!model) {
			return 0;
		}

		this.GetArticleByTitle(model.title,(results)=>{
			let isexist=results.rows.item(0).mycount;
			console.log(isexist);
			if (isexist == 0) {
				db.transaction((tx) => {
					tx.executeSql('insert into article(title,link,desc,createdate,source,isread) values ("' + model.title + '","'+model.link+'","' + model.desc + '","'+model.pubdate+'","",0)',
					//tx.executeSql('insert into article values (?)',
					[], (tx, results) => {
						return 1;
					},(error)=>{
						console.log('error------'+error);
					});
				});
			}

		});

	}

	GetArticleList(pageindex, cb)
	{
		let sql = '';
		if (pageindex > 1) {
			
			sql = 'select * from article  order by createdate desc limit '+pageSize+' offset '+pageSize+'*(' + pageindex + '-1)'
			console.log(sql);
		} else {
			sql = 'select * from article  order by createdate desc limit '+pageSize
			console.log(sql);
		}
		db.transaction((tx) => {
			tx.executeSql(sql, [], (tx, results) => {
				cb(results);
			});
		});
	}

	GetArticleByTitle(title,cb)
	{
		db.transaction((tx) => {
			tx.executeSql('select count(*) AS mycount from article where title="' + title + '"', [], (tx, results) => {

				cb(results)
			}, (tx, error) => {
				console.log(error);
			});
		});
	}

	DeleteArticle()
	{
		db.transaction((tx) => {
			tx.executeSql('delete from article', [], (tx, results) => {
				return results;
			});
		});

	}

}
