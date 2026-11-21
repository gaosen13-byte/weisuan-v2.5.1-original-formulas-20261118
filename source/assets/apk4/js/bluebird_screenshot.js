function 屏幕截图加强(name,event1,event2){   
        //name表示组件在被创建时的名称，event表示组件拥有的事件
        //如果组件有多个事件，可以在后面继续填写这些事件名称
        //例如：function 屏幕截图加强(name,event1,event2,event3){
        
        //组件内部属性，仅供组件内部使用：
        //this.名称 = name;
		
		//注意：js资源中导入了一个html2canvas.js
        
        //组件命令：
        this.截取窗口 = function (){
            html2canvas(document.getElementsByTagName("body"), {
                allowTaint: false,
                taintTest: false,
				background: "#ffffff",
                onrendered: function(canvas) {
					var dataUrl = canvas.toDataURL();
					event_a(dataUrl);
				}
			});            
        } 
        
        //组件命令：
        this.截取组件 = function (id){
            html2canvas(document.getElementById(id), {
                allowTaint: false,
                taintTest: false,
				background: "#ffffff",
                onrendered: function(canvas) {
					var dataUrl = canvas.toDataURL();
					event_a(dataUrl);
				}
			});	
        }  
       
        //组件事件
		function event_a(image){
        	if(event1!=null){
 			   	event1(image); //截图完毕   	
        	}
		}
		
        //组件命令：
        this.保存截图 = function (image,imageName){			//判断是电脑还是APP里运行 自动保存图片
			 if(mui.os.plus){
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
            }else{
               var img = image
               var link = document.createElement('a');
               link.href = img;
               link.download = imageName
               link.click();
            }
		}		

        //组件事件
		function event_b(result,imagePath){
        	if(event2!=null){
 			   	event2(result,imagePath); //保存完毕   	
        	}
		}		
		
}