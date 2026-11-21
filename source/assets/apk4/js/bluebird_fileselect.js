    function 文件选择器(name,event1,event2,event3){   
        //name表示组件在被创建时的名称，event表示组件拥有的事件
        //如果组件有多个事件，可以在后面继续填写这些事件名称
        //例如：function 文件选择器(name,event1,event2,event3){
        
        //组件内部属性，仅供组件内部使用：
        this.名称 = name;

        //组件命令：
        this.限制类型 = function(value){
            document.getElementById(this.名称).setAttribute("accept",value);
			//document.getElementById(this.名称).setAttribute("multiple","multiple");//多选文件
        } 
        
        //组件命令：
        this.开始选择 = function(){
            document.getElementById(this.名称).click();
        } 
               
        //组件事件
        if(event1!=null){
 			document.getElementById(this.名称).addEventListener("change", function () {
                if(this.files.length){
					event1(this.value,this.files[0]);//触发选择完毕事件
				}else{
					event1("",null);//触发选择完毕事件
				}
				this.value = null;//防止第二次选择同一个文件时不触发选择完毕事件。
            });       	
        }		

        //组件命令：
        this.读入文件 = function(file,type,encode){
       		var reader = new FileReader();  
       		reader.onload = function(){  
				if(event2!=null){
           			event2(true,this.result);//触发读入完毕事件  
				}
       		};  
			reader.onerror = function(){ 
				if(event2!=null){
           			event2(false,"");//触发读入完毕事件  
				}
       		};  			
			if(type==1){
				reader.readAsText(file,encode);  
			}else{
				reader.readAsDataURL(file);
			}            
        } 		

        //组件命令：
        this.图片转base64 = function(image){
			convertImgToBase64(image,function(数据){
				if(event3!=null){
					event3(数据);//触发转换完毕事件 
				}			
			});
		}

		function convertImgToBase64(url, callback){  
    		var canvas = document.createElement("CANVAS");   
    		var ctx = canvas.getContext("2d");   
    		var img = new Image;  
    		img.crossOrigin = "Anonymous";  
    		img.onload = function(){    
        		canvas.height = img.height;    
        		canvas.width = img.width;    
        		ctx.drawImage(img,0,0);    
        		var dataURL = canvas.toDataURL("image/png");    
        		callback.call(this, dataURL);    
        		canvas = null;   
    		};  
    		img.src = url;
		}		
		
        //组件命令：
        this.保存文本文件 = function(data, filename, encode){
    		var blob = new Blob([data], {type: "text/plain;charset="+encode}); 
			var url = window.URL.createObjectURL(blob); 
    		var anchor = document.createElement("a"); 
    		anchor.download = filename; 
    		anchor.href = url;
    		anchor.target ="_blank"; 
    		anchor.style.display = "none"; 
    		document.body.appendChild(anchor); 
    		anchor.click(); 
    		document.body.removeChild(anchor);
			window.URL.revokeObjectURL(url);
        } 		

        //组件命令：
        this.保存图片文件 = function(url, filename){
			if(url.substr(0,8)=="https://"){
				download(url, filename);
			}else if(url.substr(0,7)=="http://"){
				download(url, filename);
			}else{		
    			var anchor = document.createElement("a"); 
    			anchor.download = filename; 
    			anchor.href = url;
    			anchor.target ="_blank"; 
    			anchor.style.display = "none"; 
    			document.body.appendChild(anchor); 
    			anchor.click(); 
				document.body.removeChild(anchor);
			}
		}
		
		function download(url, filename){
			var xhr = new XMLHttpRequest();
      		xhr.open("GET", url, true);
      		xhr.responseType = "blob";
      		xhr.onload = function() {
        		if (xhr.status === 200) {
          			var blob = new Blob([xhr.response], { type: "image/jpg" });
          			var link = document.createElement("a");
          			link.href = window.URL.createObjectURL(blob);
          			link.download = filename;
          			link.click();
					window.URL.revokeObjectURL(url);
        		}
      		}; 
      		xhr.send();			
		}
		
    }