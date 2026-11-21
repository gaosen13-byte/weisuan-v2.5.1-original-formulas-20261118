function 画板加强(name,event1,event2,event3,event4){   
        //name表示组件在被创建时的名称，event表示组件拥有的事件
        //如果组件有多个事件，可以在后面继续填写这些事件名称
        //例如：function 画板加强(name,event1,event2,event3){
        
        //组件内部属性，仅供组件内部使用：
        this.名称 = name;
		
        //组件命令：
        this.置画板尺寸 = function (w,h){
			var c=document.getElementById(this.名称);
			c.style.width = w;
			c.style.height = h;
		}		

        //组件命令：
        this.置画布尺寸 = function (w,h){
			var c=document.getElementById(this.名称);
			c.setAttribute("width",w);
			c.setAttribute("height",h);
		}
		
        //组件命令：
        this.置画笔颜色 = function (r,g,b,a){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");		
			ctx.strokeStyle = "rgba("+r+","+g+","+b+","+a+")";	
		}

        //组件命令：
        this.置画笔颜色2 = function (color){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");		
			ctx.strokeStyle = color;	
		}

        //组件命令：
        this.置填充颜色 = function (r,g,b,a){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");	
			ctx.fillStyle = "rgba("+r+","+g+","+b+","+a+")";			
		}

        //组件命令：
        this.置填充颜色2 = function (color){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");	
			ctx.fillStyle = color;			
		}

        //组件命令：
        this.置画笔宽度 = function (value){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");		
			ctx.lineWidth = value;	
		}
		
		//组件命令：
        this.准备涂鸦 = function (x,y){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			ctx.beginPath();
			ctx.moveTo(x,y);
        } 
		
		//组件命令：
        this.进行涂鸦 = function (x,y){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			ctx.lineTo(x,y);
			ctx.stroke();
        } 
		
		//组件命令：
        this.结束涂鸦 = function (){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			ctx.closePath();
        } 
        
        //组件命令：
        this.画圆弧 = function (x,y,r,startAngle,endAngle,counterclockwise,fill){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			ctx.beginPath();
			ctx.arc(x,y,r,startAngle*Math.PI/180,endAngle*Math.PI/180,counterclockwise);
			if(fill){
				ctx.fill();
			}else{
				ctx.stroke();
			}
			ctx.closePath();
        } 
        
        //组件命令：
        this.画直线 = function (x1,y1,x2,y2){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			//ctx.beginPath();
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2);
			ctx.stroke();
			//ctx.closePath();
        }  

        //组件命令：
        this.画多边形 = function (x,y,n,r,fill){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			var i,ang;
            ang = Math.PI*2/n //旋转的角度
            ctx.save();//保存状态
            //ctx.fillStyle ="rgba(255,0,0,.3)";//填充红色，半透明
            //ctx.strokeStyle ="hsl(120,50%,50%)";//填充绿色
            //ctx.lineWidth = 1;//设置线宽
            ctx.translate(x, y);//原点移到x,y处，即要画的多边形中心
            ctx.moveTo(0, -r);//据中心r距离处画点
            ctx.beginPath();
            for(i = 0;i < n; i ++){
                ctx.rotate(ang)//旋转
                ctx.lineTo(0, -r);//据中心r距离处连线
            }
            ctx.closePath();
            ctx.stroke();
			if(fill){
            	ctx.fill();
			}
            ctx.restore();//返回原始状态
        }
 
        //组件命令：
        this.画矩形 = function (x,y,w,h,fill){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			if(fill){
				ctx.fillRect(x,y,w,h);
			}else{
				ctx.strokeRect(x,y,w,h);
			}
        }  

        //组件命令：
        this.清除矩形 = function (x,y,w,h){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			ctx.clearRect(x,y,w,h);
        } 

        //组件命令：
        this.移动画布 = function (x,y){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			ctx.translate(x,y);
        } 

        //组件命令：
        this.旋转画布 = function (angle){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			ctx.rotate(angle*Math.PI/180);
        } 

        //组件命令：
        this.缩放画布 = function (w,h){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			ctx.scale(w,h);
        } 

        //组件命令：
        this.置字体 = function (font){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			ctx.font = font;
        } 

        //组件命令：
        this.置对齐方式 = function (style){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			ctx.textAlign = style;
        } 

        //组件命令：
        this.画文字 = function (text,x,y,fill){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			if(fill){
				ctx.fillText(text,x,y);
			}else{
				ctx.strokeText(text,x,y);
			}
        }  
		
		
		
             //组件命令：
             //str:要绘制的字符串
             //canvas:canvas对象
             //initX:绘制字符串起始x坐标
             //initY:绘制字符串起始y坐标
             //lineHeight:字行高，自己定义个值即可
   
    this.画文字1 = function canvasTextAutoLine(str,initX,endX,initY,lineHeight){
    var c=document.getElementById(this.名称);
    var ctx=c.getContext("2d");
    var lineWidth = 0;
    var canvasWidth = endX; //c.width
    var lastSubStrIndex= 0; 
    for(let i=0;i<str.length;i++){ 
        lineWidth+=ctx.measureText(str[i]).width; 
    if(lineWidth>canvasWidth-initX){//减去initX,防止边界出现的问题
        ctx.fillText(str.substring(lastSubStrIndex,i),initX,initY);
	    initY+=lineHeight;
        lineWidth=0;
        lastSubStrIndex=i;  
	    } 
        if(i==str.length-1){
            ctx.fillText(str.substring(lastSubStrIndex,i+1),initX,initY);
		}
		}
        }
		
		
		
		
        //组件命令：
        this.取文字宽度 = function (text){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			return ctx.measureText(text).width;
        }

        //组件命令：
        this.画图片 = function (imgPath,x,y){
			var c = document.getElementById(this.名称);
			var ctx = c.getContext("2d");		
			var img = new Image();
			img.crossOrigin = ""; 
			img.src = imgPath;
            img.onload = function(){ 
			    ctx.drawImage(img,x,y);
			}
        } 

        //组件命令：
        this.画图片2 = function (imgPath,x,y,w,h){
			var c = document.getElementById(this.名称);
			var ctx = c.getContext("2d");		
			var img = new Image();
			img.crossOrigin = ""; 
			img.src = imgPath;
            img.onload = function(){ 
			    ctx.drawImage(img,x,y,w,h);
			}
        } 

        //组件命令：
        this.画图片3 = function (imgPath,x,y,w,h,sx,sy,sw,sh){
			var c = document.getElementById(this.名称);
			var ctx = c.getContext("2d");		
			var img = new Image();
			img.crossOrigin = ""; 
			img.src = imgPath;
            img.onload = function(){ 
			    ctx.drawImage(img,x,y,w,h,sx,sy,sw,sh);
			}
        } 

        //组件命令：
        this.保存画面 = function (){
			var c = document.getElementById(this.名称);
			var data = c.toDataURL("image/png");  
			return data;  
        } 

        //组件命令：
        this.保存画面到本地 = function (image,imageName){//判断是电脑还是APP里运行 自动保存图片
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

        //组件命令：
        this.取坐标颜色 = function (x,y){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			return ctx.getImageData(x,y,1,1).data;
        }

        //组件命令：
        this.取坐标颜色2 = function (x,y){
			var c=document.getElementById(this.名称);
			var ctx=c.getContext("2d");
			var color = ctx.getImageData(x,y,1,1).data;
			var R = color[0].toString(16);
			if(R.length<2){
				R="0"+R
			}
			var G = color[1].toString(16);
			if(G.length<2){
				G="0"+G
			}
			var B = color[2].toString(16);
			if(B.length<2){
				B="0"+B
			}						
			return "#"+R+G+B;
        }

        //组件事件
		function event_b(result,imagePath){
        	if(event4!=null){
 			   	event4(result,imagePath); //触发组件的保存完毕事件   	
        	}
		}
        
        //组件命令：
        this.置可视 = function (value){
            if(value==true){
                var div = document.getElementById(this.名称);
                div.style.display="";//显示，也可以设置为block	                
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
        
        //组件事件
        if(event1!=null){
 			document.getElementById(this.名称).addEventListener("tap", function () {
                event1();//触发组件的被单击事件
            });       	
        }
		
        //组件事件
        if(event2!=null){
 			document.getElementById(this.名称).addEventListener("mousedown", function (e) {
                event2(1,e.pageX,e.pageY);//触发组件的鼠标操作事件：鼠标按下
            }); 
 			document.getElementById(this.名称).addEventListener("mousemove", function (e) {
                event2(2,e.pageX,e.pageY);//触发组件的鼠标操作事件：鼠标移动
            }); 			 
 			document.getElementById(this.名称).addEventListener("mouseup", function (e) {
                event2(3,e.pageX,e.pageY);//触发组件的鼠标操作事件：鼠标弹起
            }); 			     	
        }		
		
        //组件事件
        if(event3!=null){
 			document.getElementById(this.名称).addEventListener("touchstart", function (e) {
                event3(1,e.touches[0].pageX,e.touches[0].pageY);//触发组件的触屏操作事件：触屏按下
            },false);  
 			document.getElementById(this.名称).addEventListener("touchmove", function (e) {
                event3(2,e.touches[0].pageX,e.touches[0].pageY);//触发组件的触屏操作事件：触屏移动
            },false); 	
 			document.getElementById(this.名称).addEventListener("touchend", function (e) {
                event3(3,e.changedTouches[0].pageX,e.changedTouches[0].pageY);//触发组件的触屏操作事件：触屏弹起
            },false); 					     	
        }		
}