    function 音乐播放器(name,event1,event2){   
        //name表示组件在被创建时的名称，event表示组件拥有的事件
        //如果组件有多个事件，可以在后面继续填写这些事件名称
        //例如：function 音乐播放器(name,event1,event2,event3){
        
		
		//注意：在工程数据-设置-属性中,添加了用于创建组件的HTML代码
		
		
        //组件内部属性，仅供组件内部使用：
        this.名称 = name;
        
        //组件命令：
        this.显示控制条 = function (){
            var myAuto = document.getElementById(this.名称);
			myAuto.setAttribute("controls","controls");
        } 

        //组件命令：
        this.隐藏控制条 = function (){
            var myAuto = document.getElementById(this.名称);
			myAuto.removeAttribute("controls");
        } 
        
        //组件命令：
        this.置循环播放 = function (value){
            var myAuto = document.getElementById(this.名称);
			if(value==true){
				myAuto.setAttribute("loop","loop");
			}else{
				myAuto.removeAttribute("loop");
			}
        } 

        //组件命令：
        this.置音乐路径 = function (value){
            var myAuto = document.getElementById(this.名称);
			myAuto.setAttribute("src",value);
        } 
        
        //组件命令：
        this.播放 = function (){
    		var myAuto = document.getElementById(this.名称);
    		myAuto.play();
        } 
        
        //组件命令：
        this.暂停 = function (){
    		var myAuto = document.getElementById(this.名称);
    		myAuto.pause();
        } 
        
        //组件命令：
        this.取音乐时长 = function (){
    		var myAuto = document.getElementById(this.名称);
    		return myAuto.duration;
        } 		

        //组件命令：
        this.取现行播放时间 = function (){
    		var myAuto = document.getElementById(this.名称);
    		return myAuto.currentTime;
        }

        //组件命令：
        this.置现行播放时间 = function (value){
    		var myAuto = document.getElementById(this.名称);
    		myAuto.currentTime = value;
        }
		
        //组件事件
        if(event1!=null){
 			document.getElementById(this.名称).addEventListener("timeupdate", function () {
                event1();//播放时间改变
            });       	
        }
		
        //组件事件
        if(event2!=null){
 			document.getElementById(this.名称).addEventListener("ended", function () {
                event2();//播放完毕
            });       	
        }		
		
    }