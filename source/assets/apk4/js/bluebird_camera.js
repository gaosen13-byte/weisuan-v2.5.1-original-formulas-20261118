    function 摄像头(name,event1,event2){   
        //name表示组件在被创建时的名称，event表示组件拥有的事件
        //如果组件有多个事件，可以在后面继续填写这些事件名称
        //例如：function 摄像头(name,event1,event2,event3){
        
        //组件内部属性，仅供组件内部使用：
        this.图片地址 = name;
        
        //组件命令：
        this.开始拍照 = function (){
		    var cmr = plus.camera.getCamera();
		    var res = cmr.supportedImageResolutions[0];
		    var fmt = cmr.supportedImageFormats[0];
		    cmr.captureImage( function( path ){
					plus.gallery.save(path, function () {
						//保存图片到相册
					});
					var path2=plus.io.convertLocalFileSystemURL(path);
					if(event1!=null){
						event1(true,path2);//触发拍照完毕事件
					}
		        },
		        function( error ) {
					if(event1!=null){
						event1(false,error.message);//触发拍照完毕事件
					}					
		        },
		        {resolution:res,format:fmt}
		    );
        } 
        
        //组件命令：
        this.开始录像 = function (){
			var cmr = plus.camera.getCamera();
			var res = cmr.supportedVideoResolutions[0];
			var fmt = cmr.supportedVideoFormats[0];
			cmr.startVideoCapture( function( path ){
     	       	plus.gallery.save(path, function () {
					//保存视频到相册
				});
			   	var path2=plus.io.convertLocalFileSystemURL(path);
					if(event2!=null){
						event2(true,path2);//触发录像完毕事件
					}
     		   },
   		     function( error ) {
					if(event2!=null){
						event2(false,error.message);//触发录像完毕事件
					}	
   		     },
   			     {resolution:res,format:fmt}
		    );
        }  
 
        //组件命令：
        this.取相对路径 = function (path){
			return plus.io.convertAbsoluteFileSystem(path);
		}      

    }