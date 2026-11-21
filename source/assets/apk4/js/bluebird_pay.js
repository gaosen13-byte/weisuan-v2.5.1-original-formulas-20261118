    function 云支付(name,event1,event2){   
        //name表示组件在被创建时的名称，event表示组件拥有的事件
        //如果组件有多个事件，可以在后面继续填写这些事件名称
        //例如：function 云支付(name,event1,event2,event3){
        	
		//开发文档参考：http://ask.dcloud.net.cn/article/499
		
        //组件内部属性，仅供组件内部使用：
        this.名称 = name;
		var showWaiting = null;//等待框,转圈圈的
		var wxChannel = null; // 微信支付
		var aliChannel = null; //支付宝支付
		var lastOrderNo = ""; // 最近一次下单的微信商户订单号
        //组件命令：
        this.取订单号 = function (){
            return lastOrderNo; // 最近一次下单的微信商户订单号（尚无下单记录时返回空字符串）
        }
        this.检测支付通道 = function (){
			plus.payment.getChannels(function(s) {
				var alipay = false;
				var wxpay = false;
				for (var i = 0; i < s.length; i++) {
					if(s[i].serviceReady){
						if(s[i].id=="alipay"){
							alipay = true;
							aliChannel = s[i];
						}else if(s[i].id=="wxpay"){
							wxpay = true;
							wxChannel = s[i];
						}
					}
				}
				event_a(true,alipay,wxpay);
			}, function(e) {
				event_a(false,false,false);
			});
        }
        
       
        //组件事件
		function event_a(结果,支付宝,微信支付){
       		if(event1!=null){
 				event1(结果,支付宝,微信支付);       	
        	}
		}
		
        //组件命令：
        this.开始支付 = function (bcChannel,url) {	
			if(showWaiting){
			    return;
			}
			showWaiting = plus.nativeUI.showWaiting();//显示等待框
			if(bcChannel==1) {//支付宝支付
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function() {
					switch(xhr.readyState) {
						case 4:
							if(xhr.status == 200) {
								//alert(xhr.responseText + "这是支付宝需要的参数类型");
								plus.payment.request(aliChannel, xhr.responseText, function(result) {
									showWaiting.close();
									showWaiting = null;
									/*plus.nativeUI.alert("支付成功！", function() {
										//back();
									});*/
									event_c(result);//支付成功
								}, function(error) {
									//plus.nativeUI.alert("支付失败：" + error.code);
									showWaiting.close();
									showWaiting = null;
									event_d(error);//支付失败
								});
							} else {
								//alert("获取订单信息失败！");
								showWaiting.close();
								showWaiting = null;
								event_d({"code":0,"message":"获取预支付订单信息失败"});
							}
							break;
						default:
						    /*showWaiting.close();
						    showWaiting = null;
						    event_d({"code":0,"message":"获取预支付订单信息失败"});*/
							break;
					}
				}
				xhr.open('GET', url);
				xhr.send();
			} else {
				//微信支付
				// 从服务器请求支付订单 
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function() {
					switch(xhr.readyState) {
						case 4:
							if(xhr.status == 200) {
								var jsonStr = JSON.parse(xhr.responseText);
								lastOrderNo = jsonStr.out_trade_no || "";// 记录本次下单的商户订单号
								//console.log(xhr.responseText);
								//alert(xhr.responseText);
								var myData = {
									retcode: 0, //5+必备参数
									retmsg: "ok", //5+必备参数
									appid: jsonStr.appid,
									noncestr: jsonStr.noncestr,
									package: "Sign=WXPay",
									partnerid: jsonStr.partnerid,
									prepayid: jsonStr.prepayid,
									timestamp: jsonStr.timestamp,
									sign: jsonStr.sign
								}
								//alert("开始支付");
								plus.payment.request(wxChannel, myData, function(result) {
									showWaiting.close();
									showWaiting = null;
									/*plus.nativeUI.alert("支付成功！", function() {
										//back();
									});*/
									//alert("支付成功");
									event_c(result);//支付成功
								}, function(error) {
									showWaiting.close();
									showWaiting = null;
									//plus.nativeUI.alert("支付失败：" + error.code);
									//console.log(JSON.stringify(error));
									//alert("支付失败");
									event_d(error);//支付失败
								});
							} else {
								showWaiting.close();
								showWaiting = null;
								//plus.nativeUI.alert("获取预支付订单信息失败");
								//alert("获取预支付订单信息失败1");
								event_d({"code":0,"message":"获取预支付订单信息失败"});
							}
							break;
						default:
						    /*showWaiting.close();
						    showWaiting = null;
							alert("获取预支付订单信息失败2");
							event_d({"code":0,"message":"获取预支付订单信息失败"});*/
							break;
					}
				}
				xhr.open('GET', url);
				xhr.send();
			}
		}
        
		//组件事件
		function event_c(返回信息){//支付成功
			if(event2!=null){
				if(lastOrderNo != ""){
					try{ 返回信息.order_no = lastOrderNo; }catch(e){ 返回信息 = {order_no:lastOrderNo}; }
				}
				event2(true,返回信息);//支付完毕
			}
		}
		
		//组件事件
		function event_d(返回信息){//支付失败
			if(event2!=null){
				event2(false,返回信息);//支付完毕
			}			
		}
		
    }