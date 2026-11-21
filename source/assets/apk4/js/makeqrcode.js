function 二维码(name,event){   
	//name表示组件在被创建时的名称，event表示组件拥有的事件
	//如果组件有多个事件，可以在后面继续填写这些事件名称
	//例如：function 二维码(name,event1,event2,event3){
		
		//组件内部属性，仅供组件内部使用：
		this.名称 = name;
		var qrcode = null;
		
		//组件命令：
		this.生成二维码 = function(codetxt,codesize,dark,Light){
			//设置div的宽度和高度
			var div = document.getElementById(this.名称);
			div.style.width = "" + (codesize+10) + "px";
			div.style.height = "" + (codesize+10) + "px";
			div.style.backgroundColor=Light;
			//清除之前生成的二维码
			/*var canvas = div.getElementsByTagName("canvas");
			if(canvas!=null && canvas.length>0){
				canvas[0].parentNode.removeChild(canvas[0]);
			}			
			var img = div.getElementsByTagName("img");			
			if(img!=null && img.length>0){
				img[0].parentNode.removeChild(img[0]);
			}*/
			if(qrcode!=null){
                qrcode.clear();//清除之前生成的二维码
			}
			//生成二维码
			qrcode = new QRCode(document.getElementById(this.名称), {
        		width: codesize,
        		height: codesize,
        		colorDark: dark,
        		colorLight: Light,
        		correctLevel: QRCode.CorrectLevel.L
      		});	
			qrcode.makeCode(codetxt);	
		}

		//组件命令：
		this.取二维码 = function (){
			/*有些手机不兼容
			var div = document.getElementById(this.名称);
			var img = div.getElementsByTagName("img");			
			if(img!=null && img.length>0){
				return img[0].src;
			}else{
				return "";
			}*/
			
			/*手机可以兼容
			var div = document.getElementById(this.名称);
			var canvas = div.getElementsByTagName("canvas");			
            if(canvas!=null && canvas.length>0){
                return canvas[0].toDataURL("image/png");
            }else{
                return "";
            }*/
            
			if(qrcode!=null){
                return qrcode.getCode();
			}else{
                return "";
			}		
		} 

        //组件命令：
        this.保存二维码图片 = function (image,imageName){
			var b = new plus.nativeObj.Bitmap();
			var path = plus.io.convertLocalFileSystemURL("_www/"+imageName);//将文件短路径转换成本地完整路径			
            b.loadBase64Data(image,function(){
                //console.log("创建成功");
            	b.save("_www/"+imageName,{overwrite:true},function(){
                	//console.log("保存成功");
           			plus.gallery.save("_www/"+imageName, function () {
                    	//console.log( "保存图片到相册成功" );
						event_b(true,path);
                	},function(){
                    	//console.log( "保存图片到相册失败" );
						event_b(false,path);
            		});					
            	},function(){
                	//console.log("保存失败");
					event_b(false,path);
            	});				
            },function(){
                //console.log("创建失败");
				event_b(false,path);
            });
        } 

        //组件事件
		function event_b(result,imagePath){
        	if(event!=null){
 			   	event(result,imagePath); //触发组件的保存完毕事件   	
        	}
		}

		//组件命令：
		this.置可视 = function (value){
			if(value==true){
				var div = document.getElementById(this.名称);
				div.style.display="block";//显示	                
				}else{
				var div = document.getElementById(this.名称);
				div.style.display="none"; //不占位隐藏               
			}
		} 
		
		//组件命令：
		this.置可视2 = function (value){
			if(value==true){
				var div = document.getElementById(this.名称);
				div.style.visibility="visible";//显示	                
				}else{
				var div = document.getElementById(this.名称);
				div.style.visibility="hidden"; //占位隐藏               
			}
		} 
		
	}																								