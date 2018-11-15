/*
* @Author: kirito
* @Date:   2018-11-14 18:37:11
* @Last Modified by:   kirito
* @Last Modified time: 2018-11-15 11:04:12
*/
'use strict';

//网络数据请求功能
var _mm = {
	//利用ajax与后台数据交互
	request : function(param){
		var _this = this;
		$.ajax({
			type 	 :  param.method || 'get',
			url		 :  param.url	 || '',
			dataType :  param.type   || 'json',
			//传过去的数值
			data     :  param.data 	 || '',
			success	 :  function(res){
				//0为请求成功
				if (0 === res.status) {
					//param的success是否为function，为function则会返回信息和数据
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				//10为没有登录状态，需要强制登录
				else if(10 === res.status){
					_this.doLogin();
				}
				//1为错误情况
				else if (1 === res.status) {
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error	 : 	function(err){
				typeof param.error === 'function' && param.error(err.statusText);

			}
		});
		//跳转页面,统一网络处理
		doLogin : funciton(){
			window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
		}
	}
};