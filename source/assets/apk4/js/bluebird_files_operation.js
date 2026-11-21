function 文件操作(name,event1,event2,event3,event4,event5,event6){   
        //name表示组件在被创建时的名称，event表示组件拥有的事件
        //如果组件有多个事件，可以在后面继续填写这些事件名称
        //例如：function 文件操作(name,event1,event2,event3){
        
        //组件内部属性，仅供组件内部使用：
        this.名称 = name;
        
        //组件命令：
        this.创建文件 = function (路径目录,文件名称){
			plus.io.resolveLocalFileSystemURL(路径目录, function( entry ) {
				entry.getFile(文件名称,{create: true},function(writer){
					if(event1!=null){
						event1(true,路径目录+文件名称);
					}
				}, function ( e ) {
					if(event1!=null){
						event1(false,e.message);
					}					
				});
			}, function (e) {
					if(event1!=null){
						event1(false,e.message);
					}
			});
        } 
        
        //组件命令：
        this.写入文件 = function (文件路径,写入内容){
			plus.io.resolveLocalFileSystemURL(文件路径, function( entry ) {
				entry.createWriter( function ( writer ) {
					writer.seek(writer.length);
					writer.write(写入内容);
					if(event2!=null){
						event2(true,文件路径);
					}
				}, function ( e ) {
					if(event2!=null){
						event2(false,e.message);
					}	
				});
			}, function (e) {
					if(event2!=null){
						event2(false,e.message);
					}
			});         
        }  

		//组件命令：
		this.读取文件 = function (文件路径){
			plus.io.resolveLocalFileSystemURL(文件路径, function( entry ) {
				entry.file( function(file){
					var fileReader = new plus.io.FileReader();
					fileReader.readAsText(file, "utf-8");
					fileReader.onloadend = function(evt) {
						if(event3!=null){
							event3(true,evt.target.result,file);
						}						
					}
				} );
			}, function ( e ) {
				if(event3!=null){
					event3(false,e.message,null);
				}					
			});
        }       
		
		//组件命令：
		this.删除文件 = function (文件路径){
			plus.io.resolveLocalFileSystemURL(文件路径, function( entry ) {
				entry.remove(function(entry){
					if(event4!=null){
						event4(true,文件路径);
					}					
				}, function ( e ) {
					if(event4!=null){
						event4(false,e.message);
					}	
				});
			}, function (e) {
					if(event4!=null){
						event4(false,e.message);
					}
			});
        }

		//组件命令：
		this.取修改时间 = function (文件路径){
			plus.io.resolveLocalFileSystemURL(文件路径, function( entry ) {
				entry.getMetadata( function ( metadata ) {
					if(event5!=null){
						event5(true,"" + metadata.modificationTime);
					}
				}, function (e) {
					if(event5!=null){
						event5(false,"");
					}
				});
			}, function (e) {
					if(event5!=null){
						event5(false,"");
					}
			});
        }	

		//组件命令：
		this.取文件大小 = function (文件路径){
			plus.io.resolveLocalFileSystemURL(文件路径, function( entry ) {
				entry.getMetadata( function ( metadata ) {
					if(event6!=null){
						event6(true,metadata.size);
					}
				}, function (e) {
					if(event6!=null){
						event6(false,-1);
					}
				} );
			}, function (e) {
					if(event6!=null){
						event6(false,-1);
					}
			});
        }	

		//组件命令：
		this.打开文件 = function (文件路径){
			plus.runtime.openFile(文件路径);
        }	

}