mui.init({swipeBack: false
,gestureConfig: {tap:true,doubletap:true,longtap:true,hold:true,release:true}});

var 标题栏1 = new 标题栏("标题栏1",null,标题栏1_右侧图标被单击,标题栏1_左侧图标被单击);
var 导航栏1 = new 导航栏("导航栏1",导航栏1_项目被单击,null,null);
var 按钮组1 = new 按钮组("按钮组1",按钮组1_被单击);
var 按钮组6 = new 按钮组("按钮组6",按钮组6_被单击);
var 按钮组5 = new 按钮组("按钮组5",按钮组5_被单击);
var 加强表格1 = new 加强表格("加强表格1",加强表格1_单元格被单击,加强表格1_导入完毕,加强表格1_导出完毕);
var 按钮组3 = new 按钮组("按钮组3",按钮组3_被单击);
var 按钮组4 = new 按钮组("按钮组4",按钮组4_被单击);
var 标签1 = new 标签("标签1",null);
var 图片框1 = new 图片框("图片框1",null);
var 对话框1 = new 对话框("对话框1",对话框1_信息框被单击,null,null);
var 文件选择器1 = new 文件选择器("文件选择器1",文件选择器1_选择完毕,null,null);
if(mui.os.plus){
    mui.plusReady(function() {
        设计弧垂转施工弧垂_创建完毕();
        document.getElementsByClassName("mui-content")[0].style.display="";
    });
}else{
    window.onload=function(){ 
        设计弧垂转施工弧垂_创建完毕();
        document.getElementsByClassName("mui-content")[0].style.display="";
    }
}

	var SS= 0;
	var K= 0;
	var X= 0;
	var A= 0;
	var B= 0;
	var C= 0;
	var D= 0;
	var JG= 0;
	var 行号=  0;
	var 列号=  0;
	var 取行列数=  0;
	var 行内容 = new Array();
	var 选中行 = new Array();
	var 未选中行 = new Array();
	var 弧垂系数 = new Array();
    var 初始行数;
	var 存储内容 = new Array();
	var 存储内容1= "";
	var 弧垂计算结果= "";
	var 弧垂计算表= "";
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

function 设计弧垂转施工弧垂_创建完毕(){
	加强表格1.初始化();
	标题栏1.置标题("设计弧垂转施工弧垂");
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

	按钮组6.置样式(0,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(1,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(2,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(3,"mui-btn mui-btn-success mui-btn-outlined");
	按钮组1.置样式(0,"mui-btn mui-btn-primary");
	按钮组6.置样式(1,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(2,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(3,"mui-btn mui-btn-danger mui-btn-outlined");
	按钮组4.置样式(1,"mui-btn mui-btn-primary");
	按钮组4.置样式(0,"mui-btn mui-btn-primary mui-btn-outlined");


	    if(读写设置.读取设置("210")<1 ){
		初始行数=10;
		读写设置.保存设置("210","10");
		}else{
		初始行数=读写设置.读取设置("210");
		}
		SS=0;
	    生成表格();

}


function 对话框1_信息框被单击(){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
}

function 按钮组1_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
    标题栏1.置标题("设计弧垂转施工弧垂");
	初始行数=读写设置.读取设置("210");
	if(按钮索引==0 ){
	按钮组1.置样式(0,"mui-btn mui-btn-primary");
	按钮组1.置样式(1,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(2,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(3,"mui-btn mui-btn-success mui-btn-outlined");
	按钮组6.置样式(0,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(1,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(2,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(3,"mui-btn mui-btn-danger mui-btn-outlined");
	SS=0;
	生成表格();
	}

	if(按钮索引==1 ){
	按钮组1.置样式(1,"mui-btn mui-btn-primary");
	按钮组1.置样式(0,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(2,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(3,"mui-btn mui-btn-success mui-btn-outlined");
	按钮组6.置样式(0,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(1,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(2,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(3,"mui-btn mui-btn-danger mui-btn-outlined");
	SS=1;
	生成表格();
	}

	if(按钮索引==2 ){
	按钮组1.置样式(2,"mui-btn mui-btn-primary");
	按钮组1.置样式(1,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(0,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(3,"mui-btn mui-btn-success mui-btn-outlined");
	按钮组6.置样式(0,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(1,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(2,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(3,"mui-btn mui-btn-danger mui-btn-outlined");
	SS=2;
	生成表格();
	}


	取行列数 = 加强表格1.取行列数();
	计次 = 0;
	while(计次 < 数组操作.取成员数(取行列数.行数)){
	加强表格1.置单元格内容(计次,取行列数.列数+1,"");
	计次 = 计次 + 1;
	}

	if(按钮索引==3 ){
	取行列数 = 加强表格1.取行列数();
	var 添加行 = new Array();
	计次=0;
	while(计次 < 取行列数.列数){
	数组操作.加入尾成员(添加行,"");
	计次 = 计次 + 1;
	}
	加强表格1.添加表项("",添加行);
	}


}

function 按钮组6_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	标题栏1.置标题("设计弧垂转施工弧垂");
	初始行数=读写设置.读取设置("210");
	if(按钮索引==0 ){
	按钮组1.置样式(0,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(1,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(2,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(3,"mui-btn mui-btn-success mui-btn-outlined");
	按钮组6.置样式(0,"mui-btn mui-btn-primary");
	按钮组6.置样式(1,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(2,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(3,"mui-btn mui-btn-danger mui-btn-outlined");
	SS=3;
	生成表格();
	}

	if(按钮索引==1 ){
	按钮组1.置样式(0,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(1,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(2,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(3,"mui-btn mui-btn-success mui-btn-outlined");
	按钮组6.置样式(1,"mui-btn mui-btn-primary");
	按钮组6.置样式(0,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(2,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(3,"mui-btn mui-btn-danger mui-btn-outlined");
	SS=4;
	生成表格();
	}

	if(按钮索引==2 ){
	按钮组1.置样式(0,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(1,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(2,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(3,"mui-btn mui-btn-success mui-btn-outlined");
	按钮组6.置样式(2,"mui-btn mui-btn-primary");
	按钮组6.置样式(1,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(0,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组6.置样式(3,"mui-btn mui-btn-danger mui-btn-outlined");
	SS=5;
	生成表格();
	}

	取行列数 = 加强表格1.取行列数();
	计次 = 0;
	while(计次 < 数组操作.取成员数(取行列数.行数)){
	加强表格1.置单元格内容(计次,取行列数.列数+1,"");
	计次 = 计次 + 1;
	}

	if(按钮索引==3 ){
	选中行 = 加强表格1.获取选中行();
	if(选中行 != "" ){
	加强表格1.删除选中行();
	}else{
	对话框1.弹出提示("请选择需要删除的行！");
	}
	}

}



function 按钮组3_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}

	if(按钮索引==0 ){
	窗口操作.切换窗口("chuangkou8.html","");
	}

	if(按钮索引==1 ){
	弧垂系数=文本操作.分割文本(读写设置.读取设置("0"),",");
	计次 = 0;
	while(计次 < 数组操作.取成员数(弧垂系数)){
	加强表格1.置单元格内容(计次+1,5,弧垂系数[计次]);
	计次 = 计次 + 1;
	}
	}

}
function 按钮组4_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}

	if(按钮索引==0 ){
    var { 行数, 列数 } = 加强表格1.取行列数();
    var totalColumns = 列数 + 1;
    for (var row = 1; row <= 行数; row++) {
    for (var col = 2; col <= totalColumns; col++) {
    加强表格1.置单元格内容(row, col, "");}}
	}



	if(按钮索引==1 ){
    if(文本操作.取文本长度(读写设置.读取设置("限时"))<1 ){
	读写设置.保存设置("限时",公用模块.当前时间戳());
	}else if(文本操作.取文本长度(读写设置.读取设置("限时"))>1 && 公用模块.到数值(读写设置.读取设置("限时"))<公用模块.当前时间戳() ){
	读写设置.保存设置("限时",公用模块.当前时间戳());
	}
	// 免费工程工具：移除原版余额/注册门控。

    if (true){

	选中行 = 加强表格1.获取选中行();
	未选中行 = 加强表格1.获取未选中行();
	取行列数 = 加强表格1.取行列数();

	if(选中行 == "" ){
    对话框1.弹出提示("请选择需要计算的行！");
	}

	读写设置.保存设置("210",取行列数.行数);

	计次 = 1;
	while(计次 <= 取行列数.行数){
	加强表格1.置单元格内容(计次,取行列数.列数+1,"");
	计次 = 计次 + 1;
	}

	计次 = 0;
	while(计次 < 数组操作.取成员数(选中行)){
	行内容 = 加强表格1.取行内容(选中行[计次]);
	计次1 = 1;
	while(计次1 < 数组操作.取成员数(行内容)){

	A=公用模块.到数值(行内容[1]);
	D=公用模块.到数值(行内容[2]);
	C=公用模块.到数值(行内容[3]);
	B=公用模块.到数值(行内容[4]);

	if(SS==0 ){
		JG=公用模块.四舍五入(C*公用模块.取次方((A/B),2)*(1+4*公用模块.取次方(C,2)*公用模块.取次方(A,2)/(3*公用模块.取次方(B,4)))/公用模块.求余弦(公用模块.反正切(D/A)),3);
	}
	if(SS==1 ){
		X=公用模块.到数值(C);
		JG=公用模块.四舍五入(X/公用模块.求余弦(公用模块.反正切(D/A))*公用模块.取次方((A/100),2),3);
	}
	if(SS==2 ){
		X=公用模块.到数值(C)/10000;
		JG=公用模块.四舍五入(X/公用模块.求余弦(公用模块.反正切(D/A))*公用模块.取次方((A/2),2),3);
	}
	if(SS==3 ){
		JG=公用模块.四舍五入(C*公用模块.取次方(A,2)*公用模块.取次方(10,-4)*(1+4/3*(公用模块.取次方(C,2))*公用模块.取次方(A,2)*公用模块.取次方(10,-8))/公用模块.求余弦(公用模块.反正切(D/A)),3);
	}
	if(SS==4 ){
		JG=公用模块.四舍五入(B*A**2/(8*C*公用模块.求余弦(公用模块.反正切(D/A))),3);
	}
	if(SS==5 ){
		X=公用模块.到数值(C)/10000;
		JG=公用模块.四舍五入((X*A**2)/(公用模块.求余弦(公用模块.反正切(D/A)))+(4*X**3*A**4)/(3*公用模块.求余弦(公用模块.反正切(D/A))),3);
	}

	JG=公用模块.表达式计算(JG);
	计次1 = 计次1 + 1;
	}
	加强表格1.置单元格内容(选中行[计次],取行列数.列数+1,JG);
	JG="";
    读写设置.保存设置("885",SS);
	读写设置.保存设置(公用模块.到文本(公用模块.表达式计算(886 + 计次)),行内容);
	计次 = 计次 + 1;
	}

	计次 = 0;
	while(计次 < 数组操作.取成员数(未选中行)){
	加强表格1.置单元格内容(未选中行[计次],取行列数.列数+1,"");
	计次 = 计次 + 1;
	}

	}else{
	对话框1.信息框(读写设置.读取设置("登录"),"");
	}
	}
}

function 文件选择器1_选择完毕(文件路径,文件对象){
	加强表格1.清空表项();
    加强表格1.导入excel(文件对象);
}


function 加强表格1_导入完毕(excel内容){
	var 计次= 0;
	var 表头 = new Array();
	while(计次 < 数组操作.取成员数(excel内容)){
		var 表项 = new Array();
		mui.each(excel内容[计次],function(索引,成员){
			if(计次 == 0 ){
				数组操作.加入尾成员(表头,索引);
			}
			数组操作.加入尾成员(表项,excel内容[计次][索引]);
		})
		if(计次 == 0 ){
			加强表格1.添加表头("#0099FF",表头);
		}
		加强表格1.添加表项("",表项);
		计次 = 计次 + 1;
	}
	标题栏1.置标题("设计弧垂转施工弧垂(导入)");
}


function 加强表格1_单元格被单击(行索引,列索引,内容){
	行号 = 行索引;
    列号 = 列索引;
}
function 按钮组5_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
	if(按钮索引==0 ){
	文件选择器1.限制类型("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
	文件选择器1.限制类型("application/vnd.ms-excel");

	文件选择器1.开始选择();
    }

    if(SS==0 ){
	弧垂计算结果="公式1弧垂计算结果";
	弧垂计算表="公式1弧垂计算表";
	}
	if(SS==1 ){
	弧垂计算结果="公式2弧垂计算结果";
	弧垂计算表="公式2弧垂计算表";
	}
	if(SS==2 ){
	弧垂计算结果="公式3弧垂计算结果";
	弧垂计算表="公式3弧垂计算表";
	}
	if(SS==3 ){
	弧垂计算结果="公式4弧垂计算结果";
	弧垂计算表="公式4弧垂计算表";
	}
	if(SS==4 ){
	弧垂计算结果="公式5弧垂计算结果";
	弧垂计算表="公式5弧垂计算表";
	}
	if(SS==5 ){
	弧垂计算结果="公式6弧垂计算结果";
	弧垂计算表="公式6弧垂计算表";
	}

    if(按钮索引==1 ){
	加强表格1.导出excel("加强表格1",弧垂计算结果,弧垂计算表+时间操作.取现行日期()+" "+时间操作.取现行时间());
    }

    if(按钮索引==2 ){
	标题栏1.置标题("设计弧垂转施工弧垂");
	对话框1.弹出提示("已关闭导入的表格,进入默认计算模式！");
	生成表格();
    }

}

function 加强表格1_导出完毕(导出结果,导出路径){
	if(导出结果 == true ){
		对话框1.信息框_原生("导出成功！","存储位置:"+导出路径,"确定");
	}else{
		对话框1.弹出提示("导出失败");
	}
}

function 生成表格(){
	加强表格1.清空表项();
	var 计次= 0;

	if(SS==0 ){
	加强表格1.添加表头("",["观测档","档距<br>m","挂点高差<br>m","代表弧垂<br>F","代表档距<br>m","弧垂计算<br>结果m"]);
	while(计次 < 初始行数){
		加强表格1.添加表项("",["N"+计次+"-N"+公用模块.表达式计算(计次+1),"","","","",""]);
		计次 = 计次 + 1;
	}
	}

	if(SS==1 ){
	加强表格1.添加表头("",["观测档","档距<br>m","挂点高差<br>m","代表弧垂<br>Fd","弧垂计算<br>结果m"]);
	while(计次 < 初始行数){
		加强表格1.添加表项("",["N"+计次+"-N"+公用模块.表达式计算(计次+1),"","","",""]);
		计次 = 计次 + 1;
	}
	}

	if(SS==2 ){
	加强表格1.添加表头("",["观测档","档距<br>m","挂点高差<br>m","代表弧垂<br>K","弧垂计算<br>结果m"]);
	while(计次 < 初始行数){
		加强表格1.添加表项("",["N"+计次+"-N"+公用模块.表达式计算(计次+1),"","","",""]);
		计次 = 计次 + 1;
	}
	}

	if(SS==3 ){
	加强表格1.添加表头("",["观测档","档距<br>m","挂点高差<br>m","代表弧垂<br>F100","弧垂计算<br>结果m"]);
	while(计次 < 初始行数){
		加强表格1.添加表项("",["N"+计次+"-N"+公用模块.表达式计算(计次+1),"","","",""]);
		计次 = 计次 + 1;
	}
	}

	if(SS==4 ){
	加强表格1.添加表头("",["观测档","档距<br>m","挂点高差<br>m","最低点<br>应力N","导线比载<br>G","弧垂计算<br>结果m"]);
	while(计次 < 初始行数){
		加强表格1.添加表项("",["N"+计次+"-N"+公用模块.表达式计算(计次+1),"","","","",""]);
		计次 = 计次 + 1;
	}
	}

	if(SS==5 ){
	加强表格1.添加表头("",["观测档","档距<br>m","挂点高差<br>m","代表弧垂<br>K","弧垂计算<br>结果m"]);
	while(计次 < 初始行数){
		加强表格1.添加表项("",["N"+计次+"-N"+公用模块.表达式计算(计次+1),"","","",""]);
		计次 = 计次 + 1;
	}
	}

	var 计次= 0;
    while(计次 < 初始行数){
    var 存储键= 公用模块.表达式计算(886+计次);
    var 存储值= 读写设置.读取设置(存储键);

    if(读写设置.读取设置("210") > 0 && 存储值 != "" && 存储值 != null ){
        存储内容 = 文本操作.分割文本(存储值, ",");
        if(存储内容.length < 数据列数 ){
            var 补足次数= 数据列数 - 存储内容.length;
            var 补足计次= 0;
            while(补足计次 < 补足次数){
                存储内容.push("0");
                补足计次 = 补足计次 + 1;
            }
        }
    }else{
        if(SS==0 || SS==4 ){
            存储内容 = ["0", "0", "0", "0", "0"];
        }else{
            存储内容 = ["0", "0", "0", "0"];
        }
    }

    var 数据列数;
    if(SS==0 || SS==4 ){
        数据列数 = 5;
    }else{
        数据列数 = 4;
    }

    var 计次1= 0;
    while(计次1 < 数据列数){
        if(存储内容 != null && 存储内容.length > 计次1 ){
            var 行索引= 计次 + 1;
            var 列索引= 计次1 + 2;
            var 单元格ID= "加强表格1-" + 行索引 + "-" + 列索引;
            var 单元格= document.getElementById(单元格ID);
            if(单元格 != null ){
                加强表格1.置单元格内容(行索引, 列索引, 存储内容[计次1]);
                }else{
                console.error("单元格不存在: " + 单元格ID);
            }
        }
        计次1 = 计次1 + 1;
    }

    计次 = 计次 + 1;
    }

}

