mui.init({swipeBack: false
,gestureConfig: {tap:true,doubletap:true,longtap:true,hold:true,release:true}});

var 标题栏1 = new 标题栏("标题栏1",null,标题栏1_右侧图标被单击,标题栏1_左侧图标被单击);
var 导航栏1 = new 导航栏("导航栏1",导航栏1_项目被单击,null,null);
var 按钮1 = new 按钮("按钮1",按钮1_被单击,null,null);
var 按钮组13 = new 按钮组("按钮组13",按钮组13_被单击);
var 按钮组1 = new 按钮组("按钮组1",按钮组1_被单击);
var 按钮组2 = new 按钮组("按钮组2",按钮组2_被单击);
var 按钮组3 = new 按钮组("按钮组3",按钮组3_被单击);
var 按钮组4 = new 按钮组("按钮组4",按钮组4_被单击);
var 按钮组5 = new 按钮组("按钮组5",按钮组5_被单击);
var 按钮组6 = new 按钮组("按钮组6",按钮组6_被单击);
var 按钮组7 = new 按钮组("按钮组7",按钮组7_被单击);
var 按钮组8 = new 按钮组("按钮组8",按钮组8_被单击);
var 按钮组9 = new 按钮组("按钮组9",按钮组9_被单击);
var 按钮组10 = new 按钮组("按钮组10",按钮组10_被单击);
var 按钮组11 = new 按钮组("按钮组11",按钮组11_被单击);
var 按钮组12 = new 按钮组("按钮组12",按钮组12_被单击);
var 按钮2 = new 按钮("按钮2",按钮2_被单击,null,null);
var 对话框1 = new 对话框("对话框1",null,null,null);
if(mui.os.plus){
    mui.plusReady(function() {
        其他计算_创建完毕();
        document.getElementsByClassName("mui-content")[0].style.display="";
    });
}else{
    window.onload=function(){ 
        其他计算_创建完毕();
        document.getElementsByClassName("mui-content")[0].style.display="";
    }
}

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

function 其他计算_创建完毕(){

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

}

function 按钮组1_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	if(按钮索引==0 ){
		窗口操作.切换窗口("chuangkou7.html?a=1","");
		}else{
		窗口操作.切换窗口("chuangkou7.html?a=2","");
	}
}
function 按钮组2_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	if(按钮索引==0 ){
		窗口操作.切换窗口("chuangkou10.html?a=3","");
		}else{
		窗口操作.切换窗口("chuangkou10.html?a=2","");
	}
}
function 按钮组3_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	if(按钮索引==0 ){
		窗口操作.切换窗口("chuangkou8.html","");
		}else{
		窗口操作.切换窗口("chuangkou11.html?a=1","");
	}
}
function 按钮组4_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	if(按钮索引==0 ){
		窗口操作.切换窗口("chuangkou9.html","");
		}else{
		窗口操作.切换窗口("chuangkou11.html?a=2","");
	}
}
function 按钮组5_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	if(按钮索引==0 ){
		窗口操作.切换窗口("chuangkou1.html?a=3","");
		}else{
		窗口操作.切换窗口("chuangkou10.html?a=4","");
	}
}
function 按钮组6_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	if(按钮索引==0 ){
		窗口操作.切换窗口("chuangkou16.html","");
		}else{
		窗口操作.切换窗口("chuangkou22.html","");
	}
}
function 按钮组7_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	if(按钮索引==0 ){
		窗口操作.切换窗口("chuangkou10.html?a=1","");
		}else{
		窗口操作.切换窗口("chuangkou1.html?a=4","");
	}
}
function 按钮组8_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	if(按钮索引==0 ){
		读写设置.保存设置("x",0);
	    读写设置.保存设置("y",0);
		窗口操作.切换窗口("chuangkou19.html?a=1","");
		}else{
		窗口操作.切换窗口("chuangkou13.html","");
	}
}
function 按钮组9_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	if(按钮索引==0 ){
		窗口操作.切换窗口("chuangkou15.html","");
		}else{
		窗口操作.切换窗口("chuangkou17.html","");
	}
}
function 按钮组10_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	if(按钮索引==0 ){
		窗口操作.切换窗口("chuangkou1.html?a=1","");
		}else{
		窗口操作.切换窗口("chuangkou14.html","");
	}
}
function 按钮组11_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	if(按钮索引==0 ){
		窗口操作.切换窗口("chuangkou7.html?a=3","");
		}else{
		窗口操作.切换窗口("chuangkou18.html","");
	}
}

function 按钮组12_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	if(按钮索引==0 ){
		窗口操作.切换窗口("chuangkou21.html","");
		}else{
		窗口操作.切换窗口("chuangkou12.html","");
	}
}

function 按钮组13_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	if(按钮索引==0 ){
		窗口操作.切换窗口("chuangkou37.html","");
		}else{
		窗口操作.切换窗口("chuangkou36.html","");
	}
}

function 按钮2_被单击(){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	窗口操作.切换窗口("chuangkou33.html?a=2","");
}


function 按钮1_被单击(){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	窗口操作.切换窗口("chuangkou23.html","");
}