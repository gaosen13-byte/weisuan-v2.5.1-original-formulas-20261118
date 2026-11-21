    function Gps(name,Position){   
        //name表示组件在被创建时的名称，event表示组件拥有的事件
        //如果组件有多个事件，可以在后面继续填写这些事件名称
        //例如：function Gps(name,event1,event2,event3){
        
        //组件内部属性，仅供组件内部使用：
        this.名称 = name;
        this.vue = null;
        //组件命令：
        this.获取位置信息 = function (){
            //plus.geolocation.getCurrentPosition(Positions);
            plus.geolocation.getCurrentPosition(function(p){
                Positions(p);
            }, function(e){
                Positions(null);
            } );
        } 
        
        //组件命令：
        this.监听位置变化 = function (){
           //this.vue = plus.geolocation.watchPosition(Positions);
            this.vue = plus.geolocation.watchPosition(function(p){
                Positions(p);
            }, function(e){
                Positions(null);
            } );           
        }  
        //组件命令：
        this.取消监听位置变化 = function (){
           plus.geolocation.clearWatch(this.vue);
        }  		
		
        //组件事件
		function Positions(e){
			if(Position != null){
                if(e!=null){
                    Position(e.coords.latitude,e.coords.longitude);//经度,纬度
			 	}else{
                    Position("","");
			 	}
			}
		}
		
    }