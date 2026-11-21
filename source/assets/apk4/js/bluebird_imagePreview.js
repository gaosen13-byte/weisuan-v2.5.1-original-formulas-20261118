function 图片预览(name,event1,event2,event3,event4){   
        //name表示组件在被创建时的名称，event表示组件拥有的事件
        //如果组件有多个事件，可以在后面继续填写这些事件名称
        //例如：function 图片预览(name,event1,event2,event3){
        
        //组件内部属性，仅供组件内部使用：
        this.名称 = name;
        
        //组件命令：
        this.初始化 = function (){
            mui.previewImage();
        	if(event1!=null){
            	document.getElementById("__MUI_PREVIEWIMAGE").addEventListener("slide", function(event) {
                	var index = event.detail.slideNumber;
                	event1(index);//图片被切换事件，返回图片索引
            	});       	
        	}	
			if(event2!=null){
				mui(".mui-slider-group").on("tap", "img", function(e) {
                	var src = this.getAttribute("src");           
					event2(src);//图片被单击事件
				}); 				
			}
            if(event3!=null){
                mui(".mui-slider-group").on("longtap", "img", function(e) {
                	var src = this.getAttribute("src");
					event3(src);//图片被长按事件
                });   	
            }
					
        } 
        
        //组件命令：
        this.添加图片框 = function (图片框名称){
			var img = document.getElementById(图片框名称);
            img.setAttribute("data-preview-src","");
			img.setAttribute("data-preview-group",this.名称);
        } 

        //组件命令：
        this.删除图片框 = function (图片框名称){
			var img = document.getElementById(图片框名称);
            img.removeAttribute("data-preview-src");
			img.removeAttribute("data-preview-group");
        } 

        //组件命令：
        this.添加图片 = function (图片索引){
			var img = document.getElementsByTagName("img")[图片索引];
            img.setAttribute("data-preview-src","");
			img.setAttribute("data-preview-group",this.名称);
        } 

        //组件命令：
        this.删除图片 = function (图片索引){
			var img = document.getElementsByTagName("img")[图片索引];
            img.removeAttribute("data-preview-src");
			img.removeAttribute("data-preview-group");
        } 

        //组件命令：
        this.取当前图片索引 = function (){
            var header = document.getElementById("__MUI_PREVIEWIMAGE").getElementsByClassName("mui-preview-header")[0];
			var indicator = header.getElementsByClassName("mui-preview-indicator");
			if(indicator.length==1){
				var temp = indicator[0].innerText.split("/");
				return Number(temp[0])-1;
			}else{
				return 0;
			}
        } 
		
		var 按钮数量 = 0;
        //组件命令：
        this.创建按钮 = function (标题){
			var button = document.createElement("button");
            button.className = "mui-btn mui-btn-success mui-pull-right";
			button.innerText=标题;
			button.style.margin="0px 5px 0px 0px";
			button.setAttribute("index",""+按钮数量);
			按钮数量 = 按钮数量 + 1;
			var header = document.getElementById("__MUI_PREVIEWIMAGE").getElementsByClassName("mui-preview-header")[0];
			header.appendChild(button);
            if(event4!=null){
                mui(".mui-preview-header").on("tap", "button",function () {
                    var index = this.getAttribute("index");
                    event4(Number(index));//按钮被单击事件，返回按钮索引
                });       	
            }
			
        } 		
		
        //组件命令：
        this.创建标签 = function (标题){
			var label = document.createElement("label");
            label.className = "mui-pull-left";
			label.innerHTML=标题;
			label.style.margin="0px 5px 0px 0px";
			label.style.color="#ffffff";
			var header = document.getElementById("__MUI_PREVIEWIMAGE").getElementsByClassName("mui-preview-header")[0];
			header.appendChild(label);			
        } 

        this.置标签标题 = function (index,title){
			var labels = document.getElementById("__MUI_PREVIEWIMAGE").getElementsByClassName("mui-preview-header")[0].getElementsByTagName("label");
            if(labels.length>index){
				labels[index].innerHTML=title;
			}
        } 
       
}