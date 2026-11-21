mui.init({swipeBack: false
,gestureConfig: {tap:true,doubletap:true,longtap:true,hold:true,release:true}});

var 标题栏1 = new 标题栏("标题栏1",null,标题栏1_右侧图标被单击,标题栏1_左侧图标被单击);
var 导航栏1 = new 导航栏("导航栏1",导航栏1_项目被单击,null,null);
var 按钮组1 = new 按钮组("按钮组1",按钮组1_被单击);
var 按钮1 = new 按钮("按钮1",null,按钮1_被按下,null);
var 对话框1 = new 对话框("对话框1",null,对话框1_询问框被单击,对话框1_输入框被单击);
var 剪贴板1 = new 剪贴板("剪贴板1");
var indexedDB数据库1 = new indexedDB数据库("indexedDB数据库1",null,null,null,null,null);
if(mui.os.plus){
    mui.plusReady(function() {
        创建公式_创建完毕();
        document.getElementsByClassName("mui-content")[0].style.display="";
    });
}else{
    window.onload=function(){ 
        创建公式_创建完毕();
        document.getElementsByClassName("mui-content")[0].style.display="";
    }
}
window.addEventListener("customEvent",function(event){创建公式_切换完毕(event.detail.param);});

	var 公式名称="";
	var 公式="";
	var 名称="";
	var 模式="";
	var 公式数量=0;
	var 小数点;
	var 数据库内公式="";
function 导航栏1_项目被单击(项目标题,目标名称){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	if(目标名称 != "chuangkou3.html" ){
	窗口操作.切换窗口(目标名称+"?a=2","");
	}
	if(项目标题=="弧垂<br>测控" ){
	窗口操作.切换窗口("chuangkou3.html?a=10","");
	}
	if(项目标题=="弧垂<br>检查"  ){
	窗口操作.切换窗口("chuangkou3.html?a=20","");
	}
}

function 标题栏1_右侧图标被单击(){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	窗口操作.切换窗口("chuangkou20.html?a=2","");
}

function 标题栏1_左侧图标被单击(){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	窗口操作.切换窗口("index.html?a=2","");
}

function 创建公式_切换完毕(附加参数){
	var div = document.getElementById("form");
    var Objs = div.childNodes;
    for (var i = Objs.length - 1; i >= 0; i--) {div.removeChild(Objs[i]);}
	IndexedDB数据库1.创建数据表("mydata1", "id integer primary key autoIncrement, name text, sex text, bq text");
}

function 创建公式_创建完毕(){
	标题栏1.置左侧图标("mui-icon","mui-icon-home");
	标题栏1.置右侧图标("mui-icon","mui-icon-camera");
	导航栏1.添加项目("", "", "复测<br>计算", "chuangkou1.html", 0);
	导航栏1.添加项目("", "", "分坑<br>计算", "chuangkou2.html", 0);
	导航栏1.添加项目("", "", "弧垂<br>测控", "chuangkou3.html", 0);
	导航栏1.添加项目("", "", "弧垂<br>检查", "chuangkou3.html", 0);
	导航栏1.添加项目("", "", "样板<br>校正", "chuangkou4.html", 0);
	导航栏1.添加项目("", "", "其他<br>计算", "chuangkou6.html", 0);
	导航栏1.添加项目("", "", "注册<br>登录", "chuangkou5.html", 0);
	导航栏1.添加完毕();
	导航栏1.置项目激活状态(0,false);
	导航栏1.置项目激活状态(1,false);
	导航栏1.置项目激活状态(2,false);
	导航栏1.置项目激活状态(3,false);
	导航栏1.置项目激活状态(4,false);
	导航栏1.置项目激活状态(5,true);
	导航栏1.置项目激活状态(6,false);
	窗口操作.置组件外边距("按钮组1","10px","5px","5px","5px");
	按钮组1.置标题(0,"删除全部");
	按钮组1.置标题(1,"创建公式");
	按钮组1.置样式(0,"mui-btn mui-btn-danger");
	按钮组1.置样式(1,"mui-btn mui-btn-success");
	窗口操作.置组件外边距("按钮1","0px","5px","10px","5px");

	if(读写设置.读取设置("小数点")!="undefined" ){
	小数点=读写设置.读取设置("小数点");
	}else{
	小数点=读写设置.保存设置("小数点",15);
	}
	按钮1.置标题("请设置小数---目前保留"+小数点+"位");

    IndexedDB数据库1.创建数据表("mydata1", "id integer primary key autoIncrement, name text, sex text, bq text");

	var div = document.getElementById("form");
    var Objs = div.childNodes;
    for (var i = Objs.length - 1; i >= 0; i--) {div.removeChild(Objs[i]);}
	if(窗口操作.是否在APP内运行()==false ){
	IndexedDB数据库1.查询数据("mydata1");
	}
}

var IndexedDB数据库1 = new indexedDB数据库("myDB",
    function(结果, 数据) {
        if((结果) ){
             console.log("创建成功");
        }else{
             console.log("创建失败");
	}
		IndexedDB数据库1.查询数据("mydata1");
    },
    function(结果, 数据) {
        if((结果) ){
             对话框1.弹出提示("添加成功");
        }else{
            对话框1.弹出提示("添加失败");
        }
    },
    function(结果) {
        if((结果) ){
            对话框1.弹出提示("删除成功");
        }else{
            对话框1.弹出提示("删除失败");
        }
    },
    function(结果, 数据) {
        if((结果) ){
            对话框1.弹出提示("修改成功");
        }else{
            对话框1.弹出提示("修改失败");
        }
    },
    function(结果, 数量, 数据) {
        if(结果 == true ){
		var 计次= 0;
		while(计次 < 数量){
			 进入(数据[计次].name, 数据[计次].sex, 数据[计次].bq);
			计次 = 计次 + 1;
		}
	}
    }
);

function 进入(名称,公式,标签){

	var div = document.createElement("div");
	div.style="height:40px;background:#FFFFFF;margin:2px 5px 0px 5px";
	div.id =名称;
	document.form.appendChild(div);

	var buttonb = document.createElement("span");
    buttonb.type = "button";
	buttonb.className = "toggle1";
	buttonb.appendChild(document.createTextNode("分享"));
    buttonb.onclick=function(){fx(公式)}
	buttonb.style="text-align:center;display:inline-block;color:#4CD964;font-size:14px;padding:10px 0px 10px 0px";
	buttonb.style.width ="15%";
	buttonb.id = "span";
	document.form.appendChild(buttonb);

	var spanb = document.createElement("span");
    spanb.type = "button";
	spanb.className = "toggle";
	spanb.appendChild(document.createTextNode(名称));
    spanb.onclick=function(){d(名称,公式,标签)}
	spanb.style="text-align:center;display:inline-block;font-size:18px;padding:10px 0px 10px 0px";
	spanb.style.width ="70%";
	spanb.id = "span";
	document.form.appendChild(spanb);

	var buttona = document.createElement("span");
    buttona.type = "button";
	buttona.className = "toggle";
	buttona.appendChild(document.createTextNode("删除"));
    buttona.onclick=function(){sc(名称)}
	buttona.style="text-align:center;display:inline-block;color:#DD524D;font-size:14px;padding:10px 0px 10px 0px";
	buttona.style.width ="15%";
	buttona.id = "span";
	document.form.appendChild(buttona);

	div.appendChild(buttona);
	div.appendChild(spanb);
	div.appendChild(buttonb);

}

function d(名称,公式,标签){
    if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	读写设置.保存设置("自由模式","使用公式");
	窗口操作.切换窗口("chuangkou24.html?a="+名称+"&b="+公式+"&c="+标签);
	}

function sc(d){a=d,模式="删除一个",对话框1.询问框("是否删除此公式？",a,"取消","确定")}
function fx(公式){剪贴板1.置剪贴板内容(公式);对话框1.弹出提示("复制公式成功！<br> 可粘贴发送给朋友！！！")}

function 对话框1_询问框被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}

	if(按钮索引==1 ){
	if(模式=="删除一个" ){
	   document.getElementById(a).remove();
	   IndexedDB数据库1.删除数据("mydata1", "name='"+a+"'");
	}
	if(模式=="删除全部" ){
	读写设置.保存设置("数据表","未创建");
	IndexedDB数据库1.删除数据("mydata1");
	var div = document.getElementById("form");
    var Objs = div.childNodes;
    for (var i = Objs.length - 1; i >= 0; i--) {div.removeChild(Objs[i]);}
	}
	}
}


function 按钮组1_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}

	if(按钮索引==0 ){
	模式="删除全部";
	对话框1.询问框("是否删除全部公式？","","取消","确定");
	}

	if(按钮索引==1 ){
	读写设置.保存设置("自由模式","创建公式");
	窗口操作.切换窗口("chuangkou25.html?a=编辑模式");
	}
}

function 按钮1_被按下(){
	对话框1.输入框("请输入保留位数","目前保留"+读写设置.读取设置("小数点")+"位小数","取消","确认");
}

function 对话框1_输入框被单击(按钮索引,输入内容){
	if(按钮索引==0 ){
	小数点=读写设置.读取设置("小数点");
	}else{
	if(输入内容>0 ){
	小数点=输入内容;
	}else{
	小数点=0;
	}
	对话框1.弹出提示("小数位数已<br>更改为 "+小数点+" 位");
	读写设置.保存设置("小数点",小数点);
	}
	按钮1.置标题("请设置小数---目前保留"+小数点+"位");
}