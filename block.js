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
 	blockFn:function(){
 		var _host=window.location.host;
 		var _bing,_google;
		if(_host.indexOf('bing.com')>=0){
			_bing=true;
			_google=false;
		}else{
			_bing=false;
			_google=true;
		}
		if (_bing) {
			var _baiduRes=document.getElementsByTagName('cite');
			for (let i = 0; i < _baiduRes.length; i++) {
				if (_baiduRes[i].innerHTML.indexOf('baidu')>=0||_baiduRes[i].innerText.indexOf('baidu')>=0) {
					if (_bing) {
					this.bingDoit(_baiduRes[i],'li')
					}else{

					this.ggDoit(_baiduRes[i],'g')
					}
					i=i-1;
				}
			}

		}else{
			// document.addEventListener("DOMNodeInserted",function(e) {
			// 	console.log(_google)
			// });
			// Firefox和Chrome早期版本中带有前缀
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

			// 选择目标节点
			var target = document.body;
			 
			// 创建观察者对象
			
			var observer = new MutationObserver(function(mutations) {
				
					mutations.forEach(function(mutation) {
						if (mutation.addedNodes && (mutation.addedNodes.length > 0)) {
						var _res=mutation.target.getElementsByClassName('g');
						if (_res&&_res.length>0) {
							for (var i = 0; i < _res.length; i++) {
								var _html=_res[i].querySelector('cite').innerHTML
								if (_html.indexOf('baidu')) {
									_res[i].innerHTML="<p style='font-size:12px;border:1px solid #eee;'>已为您屏蔽一条来自百度的垃圾信息！</p>";
								}
							}

						}
					}
					// var node = mutation.target.querySelector("cite");
					// if (node) {
					// 	console.log(node.innerHTML)
					// }
					}); 
				
			     
			});

			var config = { 
				childList: true,
				subtree: true
			 }

			 // var regex = /<a.*?>[^<]*<\/a>/;
			 var regex = /baidu.com$/;

			 /* Traverse 'rootNode' and its descendants and modify '<a>' tags */
			 // function modifyLinks(rootNode) {
			 //     var nodes = [rootNode];
			 //     while (nodes.length > 0) {
			 //         var node = nodes.shift();
			 //         if (node.tagName == "A") {
			 //             /* Modify the '<a>' element */
			 //             node.innerHTML = "~~" + node.innerHTML + "~~";
			 //         } else {
			 //              If the current node has children, queue them for further
			 //              * processing, ignoring any '<script>' tags. 
			 //             [].slice.call(node.children).forEach(function(childNode) {
			 //                 if (childNode.tagName != "SCRIPT") {
			 //                     nodes.push(childNode);
			 //                 }
			 //             });
			 //         }
			 //     }
			 // }

			 /* Observer1: Looks for 'div.search' */
			 // var observer1 = new MutationObserver(function(mutations) {
			 // 	console.log(mutations);
			 //     /* For each MutationRecord in 'mutations'... */
			 //     mutations.forEach(function(mutation) {
			 //         /* ...if nodes have beed added... */
			 //         if (mutation.addedNodes && (mutation.addedNodes.length > 0)) {
			 //             /* ...look for 'div#search' */
			 //             var node = mutation.target.querySelector("div.g");
			 //             if (node) {
			 //             	node.innerHTML="<p style='font-size:12px;border:1px solid #eee;'>已为您屏蔽一条来自百度的垃圾信息！</p>";
			 //                 /* 'div#search' found; stop observer 1 and start observer 2 */
			 //                 // observer1.disconnect();
			 //                 // observer2.observe(node, config);
			 //                 if (regex.test(node.innerHTML)) {
			 //                     /* Modify any '<a>' elements already in the current node */
			 //                     // modifyLinks(node);
			 //                     node.setAttribute('style','backgroud:#ff4a53;')
			 //                 }
			 //                 return true;
			 //             }
			 //         }
			 //     });
			 // });

			observer.observe(target, config);
			// observer.disconnect();
		}
 	},
 	bingDoit:function(a,b){
 		let _node=a;
 		let _b=b.toUpperCase();
 		// $(a).closest('li').hide();
 		while(_node.nodeName!=_b){
 			_node=_node.parentNode
 			if (_node.nodeName==_b) {
 				_node.innerHTML="<p style='font-size:12px;border:1px solid #eee;'>已为您屏蔽一条来自百度的垃圾信息！</p>"
 			}
 		}
 	}
 }
 main.init();