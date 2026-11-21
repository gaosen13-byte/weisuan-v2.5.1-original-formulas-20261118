function 进度条(name){   
        //name表示组件在被创建时的名称，event表示组件拥有的事件
        //如果组件有多个事件，可以在后面继续填写这些事件名称
        //例如：function 进度条(name,event1,event2,event3){
        
        //组件内部属性，仅供组件内部使用：
        this.名称 = name;
        
        //组件命令：
        this.置进度 = function (value){
            mui("#"+this.名称).progressbar().setProgress(value);
			document.getElementById(this.名称).setAttribute("data-progress",value);
        } 
        
        //组件命令：
        this.取进度 = function (){
           return Number(document.getElementById(this.名称).getAttribute("data-progress"));
        }  

        //组件命令：
        this.置颜色 = function (color1,color2){
			var p = document.getElementById(this.名称);
			p.style.background=color1;
			var s = p.getElementsByTagName("span")[0];
			s.style.background=color2;
        } 

        //组件命令：
        this.置无限循环 = function (){
			mui("#"+this.名称).progressbar().setProgress(0);
			var p = document.getElementById(this.名称);
			p.classList.remove("mui-progressbar-in");
			p.classList.add("mui-progressbar-infinite");
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

}