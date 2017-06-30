/*
 * Encoding   : UTF-8
 * Description: A chrome extension,to block the search result of Bing,which is provided by Baidu.
 *
 * @author    wellen 79704765
 *
 * @link http://www.zhongweiren.cn
 */

 var main={
 	init: function () {
 		this.blockFn();
 	},
 	replaceHtml: "<p style='font-size:12px;border:1px solid #eee;'>已为您屏蔽一条来自百度的垃圾信息！</p>",
 	blockFn:function(){
 		var _host=window.location.host;
		if(_host.indexOf('bing.com')>=0){
			var _baiduRes=document.getElementsByTagName('cite');
			for (let i = 0; i < _baiduRes.length; i++) {
				if (_baiduRes[i].innerHTML.indexOf('baidu')>=0||_baiduRes[i].innerText.indexOf('baidu')>=0) {
					this.bingDoit(_baiduRes[i],'li')
					i=i-1;
				}
			}
		}else if(_host.indexOf('google.com')>=0){
			var that=this;
			//由于google由ajax请求生成的页面，不能用DOMContentLoaded事件，需要监听页面元素变化的MutationObserver事件
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
			var target = document.body;
			// 创建观察者对象
			
			var observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if (mutation.addedNodes && (mutation.addedNodes.length > 0)) {
						var _res=document.getElementById('rso');
						if (_res) {
							var _cite=_res.getElementsByTagName('cite');
							for (var i = 0; i < _cite.length; i++) {
								if (_cite[i].innerHTML.indexOf('baidu')>=0) {
									// $(_cite[i]).closest('.g').css({'opacity':'0','height':'0'});
									$(_cite[i]).closest('.g').html(that.replaceHtml);
								}
							}
						}
					}
					}); 
				});

			var config = { 
				childList: true,
				subtree: true
			 }
			observer.observe(target, config);
		}else if(_host.indexOf('baidu.com')>=0){
			var that=this;
			var _bdRes=$('.c-showurl');
			var _bdResTb=$('.c-showurl-color');
			_bdRes.map(function () {
				if ($(this).text().indexOf('baidu')>=0) {
					$(this).closest('.c-container').html(that.replaceHtml);
				}
			})
			_bdResTb.map(function () {
				if ($(this).text().indexOf('baidu')>=0) {
					$(this).closest('.c-container').html(that.replaceHtml);
				}
			})
		}
 	},
 	bingDoit:function(a,b){
 		//此前用原生的js做bing的过滤，后来适配google的时候就引了个jq进来，所以代码有混写，先将就着用吧。
 		let _node=a;
 		let _b=b.toUpperCase();
 		while(_node.nodeName!=_b){
 			_node=_node.parentNode
 			if (_node.nodeName==_b) {
 				_node.innerHTML=this.replaceHtml;
 			}
 		}
 	}
 }
 main.init();