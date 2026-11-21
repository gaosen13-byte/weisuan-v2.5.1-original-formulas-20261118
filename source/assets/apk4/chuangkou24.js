mui.init({swipeBack: false
,gestureConfig: {tap:true,doubletap:true,longtap:true,hold:true,release:true}});

var 标题栏1 = new 标题栏("标题栏1",null,标题栏1_右侧图标被单击,标题栏1_左侧图标被单击);
var 导航栏1 = new 导航栏("导航栏1",导航栏1_项目被单击,null,null);
var 按钮组2 = new 按钮组("按钮组2",按钮组2_被单击);
var 按钮组1 = new 按钮组("按钮组1",按钮组1_被单击);
var 按钮1 = new 按钮("按钮1",按钮1_被单击,null,null);
var 标签1 = new 标签("标签1",null);
var 对话框1 = new 对话框("对话框1",对话框1_信息框被单击,对话框1_询问框被单击,对话框1_输入框被单击);
var 对话框2 = new 对话框("对话框2",null,null,对话框2_输入框被单击);
var 正则1 = new 正则("正则1");
var indexedDB数据库1 = new indexedDB数据库("indexedDB数据库1",null,null,null,null,null);
if(mui.os.plus){
    mui.plusReady(function() {
        自定义公式_创建完毕();
        document.getElementsByClassName("mui-content")[0].style.display="";
    });
}else{
    window.onload=function(){ 
        自定义公式_创建完毕();
        document.getElementsByClassName("mui-content")[0].style.display="";
    }
}
window.addEventListener("customEvent",function(event){自定义公式_切换完毕(event.detail.param);});

	var CC=0;
	var DD=0;
    var EE=0;
	var du=0;
	var fen=0;
	var l="";
    var miao=0;
    var YY = new Array();
	var y = new Array();
    var ZZ=0;
	var 修改公式=0;
	var 公式 = new Array();
	var 公式结果 = new Array();
	var 结果 = new Array();
	var 公式数量;
	var 公式名称1;
	var bq;
	var 计算公式 = new Array();
	var 标签 = new Array();
    var 公式文本 = new Array();
    var gs = new Array();
    var jg = new Array();
    var 小数点=0;
	var 计次=0;
	var 计次1=0;
	var 计次2=0;
	var 小数点="15";

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

function 自定义公式_切换完毕(附加参数){
	if(读写设置.读取设置("自由模式")=="使用公式" ){
	标题栏1.置标题(窗口操作.取当前页面参数("a"));
	}
	if(读写设置.读取设置("自由模式")=="创建公式" ){
	标题栏1.置标题("创建模式");
	}
	if(读写设置.读取设置("自由模式")=="修改公式" ){
	标题栏1.置标题("修改模式");
	}

	IndexedDB数据库1.创建数据表("mydata1", "id integer primary key autoIncrement, name text, sex text, bq text");

	if(读写设置.读取设置("自由模式")=="使用公式" ){
	按钮组1.置可视(true);
	按钮1.置可视(false);
	}else{
	按钮组1.置可视(false);
	按钮1.置可视(true);
	}

	if(读写设置.读取设置("自由模式")=="使用公式" ){
    按钮组2.置样式(0,"mui-btn mui-btn-danger");
	按钮组2.置样式(1,"mui-btn mui-btn-success");
	按钮组2.置标题(0,"返回目录");
	按钮组2.置标题(1,"修改公式");
	l=窗口操作.取当前页面参数("b");
	传入公式(窗口操作.取当前页面参数("a"),窗口操作.取当前页面参数("b"),窗口操作.取当前页面参数("c"));
	}

	if(读写设置.读取设置("自由模式")=="修改公式"  ){
    对话框1.弹出提示("请设置变量名");
	按钮组2.置样式(0,"mui-btn mui-btn-danger");
	按钮组2.置样式(1,"mui-btn mui-btn-success");
	按钮组2.置标题(0,"取消修改");
	按钮组2.置标题(1,"说 明");
	l=窗口操作.取当前页面参数("b");
	传入公式(窗口操作.取当前页面参数("a"),窗口操作.取当前页面参数("b"),窗口操作.取当前页面参数("c"));
	}

	if(读写设置.读取设置("自由模式")=="创建公式" ){
	对话框1.弹出提示("请设置变量名");
	按钮组2.置标题(0,"取消创建");
	按钮组2.置标题(1,"说 明");
	按钮组2.置样式(0,"mui-btn mui-btn-danger");
	按钮组2.置样式(1,"mui-btn mui-btn-success");
	l=窗口操作.取当前页面参数("b");
	传入公式("",窗口操作.取当前页面参数("b"),"");
	}

}

function 自定义公式_创建完毕(){

	if(读写设置.读取设置("自由模式")=="使用公式" ){
	标题栏1.置标题(窗口操作.取当前页面参数("a"));
	}
	if(读写设置.读取设置("自由模式")=="创建公式" ){
	标题栏1.置标题("创建模式");
	}
	if(读写设置.读取设置("自由模式")=="修改公式" ){
	标题栏1.置标题("修改模式");
	}
	标签1.置标题("1、小数点设置为保留:"+读写设置.读取设置("小数点")+"位小数。<br>2、如需更改请前往自定义公式界面修改。");
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

	按钮组1.置标题(0,"说明");
	按钮组1.置标题(1,"计算");
	按钮组1.置标题(2,"清空");
    按钮组1.置样式(0,"mui-btn mui-btn-primary mui-btn-outlined");
	按钮组1.置样式(2,"mui-btn mui-btn-primary mui-btn-outlined");
	窗口操作.置组件外边距("按钮组2","10px","5px","10px","5px");

	IndexedDB数据库1.创建数据表("mydata1", "id integer primary key autoIncrement, name text, sex text, bq text");

	if(读写设置.读取设置("自由模式")=="使用公式" ){
	按钮组1.置可视(true);
	按钮1.置可视(false);
	}else{
	按钮组1.置可视(false);
	按钮1.置可视(true);
	}

	if(读写设置.读取设置("自由模式")=="使用公式" ){
    按钮组2.置样式(0,"mui-btn mui-btn-danger");
	按钮组2.置样式(1,"mui-btn mui-btn-success");
	按钮组2.置标题(0,"返回目录");
	按钮组2.置标题(1,"修改公式");
	l=窗口操作.取当前页面参数("b");
	传入公式(窗口操作.取当前页面参数("a"),窗口操作.取当前页面参数("b"),窗口操作.取当前页面参数("c"));
	}

	if(读写设置.读取设置("自由模式")=="修改公式"  ){
    对话框1.弹出提示("请设置变量名");
	按钮组2.置样式(0,"mui-btn mui-btn-danger");
	按钮组2.置样式(1,"mui-btn mui-btn-success");
	按钮组2.置标题(0,"取消修改");
	按钮组2.置标题(1,"说 明");
	l=窗口操作.取当前页面参数("b");
	传入公式(窗口操作.取当前页面参数("a"),窗口操作.取当前页面参数("b"),窗口操作.取当前页面参数("c"));
	}

	if(读写设置.读取设置("自由模式")=="创建公式" ){
	对话框1.弹出提示("请设置变量名");
	按钮组2.置标题(0,"取消创建");
	按钮组2.置标题(1,"说 明");
	按钮组2.置样式(0,"mui-btn mui-btn-danger");
	按钮组2.置样式(1,"mui-btn mui-btn-success");
	l=窗口操作.取当前页面参数("b");
	传入公式("",窗口操作.取当前页面参数("b"),"");
	}

}


function 按钮组1_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}

	计次=0;
	var inputs = document.querySelectorAll("input");
	while(计次 < inputs.length){
    var input=document.getElementsByTagName("input")[计次];
	input.blur();
	计次=计次+1;
	}
	窗口操作.滚动到顶部();
	if(按钮索引==0 ){
    对话框1.信息框("说明","1.修改标题后将自动保存标题\n2.修改公式后标题需重新修改\n3.标题未输入设变量名为标题");
	}

	if(按钮索引==1 ){
	document.getElementById("编辑框2").value="";

	if(文本操作.取文本长度(读写设置.读取设置("限时"))<1 ){
	读写设置.保存设置("限时",公用模块.当前时间戳());
	}else if(文本操作.取文本长度(读写设置.读取设置("限时"))>1 && 公用模块.到数值(读写设置.读取设置("限时"))<公用模块.当前时间戳() ){
	读写设置.保存设置("限时",公用模块.当前时间戳());
	}
	// 免费工程工具：移除原版余额/注册门控。
    if (true){

	var inputa = document.querySelectorAll("input");
	for (i = 0; i < inputa.length ; i++){
	if (document.getElementsByTagName("input")[i].value==""){
	document.getElementsByTagName("input")[i].value=0}}

	y=窗口操作.取当前页面参数("b");
	y=文本操作.子文本替换(y,"×","*");
	y=文本操作.子文本替换(y,"÷","/");
	y=文本操作.子文本替换(y,"\\^","**");
	y=文本操作.子文本替换(y,"Abs","公用模块.取绝对值");
	y=文本操作.子文本替换(y,"asin","公用模块.反正弦");
	y=文本操作.子文本替换(y,"acos","公用模块.反余弦");
	y=文本操作.子文本替换(y,"atan","公用模块.反正切");
	y=文本操作.子文本替换(y,"sin","公用模块.求正弦");
	y=文本操作.子文本替换(y,"cos","公用模块.求余弦");
	y=文本操作.子文本替换(y,"tan","公用模块.求正切");
	y=文本操作.子文本替换(y,"2√","公用模块.求平方根");
	y=文本操作.子文本替换(y,"3√","公用模块.开3次方根");
	y=文本操作.子文本替换(y,"π","公用模块.圆周率()");
    y=文本操作.子文本替换(y,"or"," || ");
	y=文本操作.子文本替换(y,"and"," && ");
    y=文本操作.子文本替换(y,"≠"," != ");
	y=文本操作.子文本替换(y,"if\\(","(");
	y=文本操作.子文本替换(y,"\\)\\{",")?(");
	y=文本操作.子文本替换(y,"\\}else\\{","):(");
    y=文本操作.子文本替换(y,"\\}",")");
	if(文本操作.寻找文本(y,",",0)>-1 ){
    y=文本操作.分割文本(y,",");
	}else{
	y=[y];
	}

	计次1=0;
	while(计次1 < 数组操作.取成员数(y)){
	计次=0;
	while(计次 < 数组操作.取成员数(dvi)){
	var inputs = document.getElementById(dvi[计次]).getElementsByTagName("input");
	if(inputs.length > 1 ){
	YY=数学操作.表达式计算(数学操作.到数值(inputs[0].value)+数学操作.到数值(inputs[1].value)/60+数学操作.到数值(inputs[2].value)/3600);
	}else{
	YY=数学操作.表达式计算(数学操作.到数值(inputs[0].value));
	}
	var c = new RegExp("(?<![a-zA-Z])"+dvi[计次]+"(?![a-zA-Z])","g");
	y[计次1] = y[计次1].replace(c,YY);
	计次=计次+1;
	}
	计次1=计次1+1;
	}

	计次=0;
	while(计次 < 数组操作.取成员数(y)){
	计次1=0;
	k=文本操作.寻找文本(y[计次],"if(");
	while(计次1 < 1){
	if(k==-1 ){
	计算公式=文本操作.分割文本(y[计次],"=");
	结果[计次]=计算公式[计次1];
	}else{
	结果[计次]=文本操作.取文本左边(y[计次],k-1);
	}
	计次1=计次1+1;
	}
	计次=计次+1;
	}

    p="";计次=0;
	while(计次 < 数组操作.取成员数(y)){
	jg[计次]=数学操作.四舍五入(eval(y[计次]),数学操作.到数值(读写设置.读取设置("小数点")));
	p=p+结果[计次]+"="+jg[计次]+"\n";
	计次=计次+1;
	}
	document.getElementById("编辑框2").value="结果：\n"+p;
	}else{
	对话框1.信息框(读写设置.读取设置("登录"),"");
	}
	}


	if(按钮索引==2 ){
    var inputs = document.querySelectorAll("input");
	计次=0;
	while(计次 < inputs.length){
	document.getElementsByTagName("input")[计次].value="";
	计次=计次+1;
	}
	document.getElementById("编辑框2").value="结果：";
	}

}


function 传入公式(x,y,z){

	document.form.innerHTML = "";
	document.getElementById("编辑框1").value="";
	document.getElementById("编辑框2").value="";
	CC=0;DD=0;ZZ=0;

	y=文本操作.子文本替换(y,"×","*");
	y=文本操作.子文本替换(y,"÷","/");
	if(文本操作.寻找文本(y,",",0)>-1 ){
    公式=文本操作.分割文本(y,",");
	}else{
	公式=[y];
	}

	document.getElementById("编辑框1").rows=数组操作.取成员数(公式)+1;
	document.getElementById("编辑框2").rows=数组操作.取成员数(公式)+1;
	公式数量="";window.dvi = [];

    计次=0;
	while(计次 < 数组操作.取成员数(公式)){
	计次1=0;
	公式数量=公式数量+公式[计次]+"\n";
	k=文本操作.寻找文本(公式[计次],"if(");
	while(计次1 < 1){
	if(k==-1 ){
	计算公式=文本操作.分割文本(公式[计次],"=");
	jg[计次]=计算公式[计次1];
	gs[计次]=计算公式[计次1+1];
	}else{
	jg[计次]=文本操作.取文本左边(公式[计次],k-1);
	gs[计次]=文本操作.取文本右边(公式[计次],文本操作.取文本长度(公式[计次])-k);
	}
	计次1=计次1+1;
	}
	计次=计次+1;
	}

	document.getElementById("编辑框1").value="公式：\n"+文本操作.子文本替换(文本操作.子文本替换(公式数量,"\\*","×"),"\\/","÷");
	document.getElementById("编辑框2").value="结果：\n";

	计次=0;
	while(计次 < 数组操作.取成员数(gs)){
	var r = new RegExp("π|3√|2√|\\^|\\+|\\-|\\*|\\/|≠|=|if|else|and|or|\\<|\\>|\\{|\\}|Abs|tan|atan|acos|cos|sin|asin|\\(|\\)|([\\d.\.]*\\d+)","g"); //
	var b = gs[计次].replace(r,",");
        b=文本操作.分割文本(b,",");
	计次1=0;
	while(计次1 < 数组操作.取成员数(gs)){
	计次2=0;
	while(计次2 < 数组操作.取成员数(b)){
	if(b[计次2]==jg[计次1] ){
	var c = new RegExp("(?<![a-zA-Z])"+b[计次2]+"(?![a-zA-Z])","g"); //
	gs[计次] = gs[计次].replace(c,"("+gs[计次1]+")");
	}
	计次2=计次2+1;
	}
	计次1=计次1+1;
	}
	计次=计次+1;
	}

    var r = new RegExp("\\+|\\-|\\*|\\/|\\(|\\)|\\{|\\}|\\<|≠|=|\\>","g"); //
	a=gs+"";
	var a1 = a.replace(r,",");
	var r1 = new RegExp("π|3√|2√|\\^|if|else|and|or|\\{|\\}|\\<|≠|=|\\>|Abs|tan|atan|acos|cos|sin|asin|([\\d.\.]*\\d+)","g"); //
	var a2=文本操作.分割文本(a1.replace(r1,""),",");
	for (var i = 0; i < a2.length; i++) {
    if (dvi.indexOf(a2[i]) == -1){
	if (a2[i]!="") {
	dvi.push(a2[i]) }}}


	if(z != "" && 读写设置.读取设置("自由模式")!="修改公式" ){
	if(文本操作.寻找文本(z,",",0)>-1 ){
    标签=文本操作.分割文本(z,",");
	}else{
	标签=[z];
	}
	}else{
	标签=dvi;
	}

    for (i = 0; i < dvi.length; i++){
	界面(dvi[i],标签[i])}

}

function 界面(dvi,标签){

	if(文本操作.取文本长度(标签)>0 ){
	标签=标签;
	}else{
	标签=dvi;
	}

	var div = document.createElement("div");
	div.style="height:41px";
	div.id =dvi;
	document.form.appendChild(div);

	var spana = document.createElement("span");
    spana.type = "button";
	spana.className = "toggle";
	spana.appendChild(document.createTextNode(标签));
    spana.onclick=function(){d(this.id,dvi)}
	spana.style="display:inline-block";
	spana.style.width ="35%";
	spana.id = "span"+CC;
	document.form.appendChild(spana);

	var inputa=document.createElement("input");
	inputa.id = "input"+CC;
	inputa.type="number";
	inputa.style.width ="49%";
	document.form.appendChild(inputa);

	var buttona = document.createElement("span");
	buttona.id = dvi;
	buttona.className = "toggle";
	buttona.appendChild(document.createTextNode("转 换"));
    buttona.onclick=function(){zh(dvi)}
	buttona.style="text-align:center;display:inline-block;color:#DD524D;font-size:14px";
	buttona.style.width ="10%";
	document.form.appendChild(buttona);

	CC=CC+1;
    DD=DD+1;

	div.appendChild(spana);
	div.appendChild(inputa);
	div.appendChild(buttona);

}

function d(a,d){t=a;b=d;对话框2.输入框("请输入标题名称","","取消","确定")}
function 对话框2_输入框被单击(按钮索引,输入内容){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}

	if(按钮索引==1 ){
	var a = document.getElementById(b).id;
	if(文本操作.取文本长度(输入内容)>0 ){
    document.getElementById(t).innerHTML=输入内容+"-"+a;
	}else{
	document.getElementById(t).innerHTML=a;
	}

    计次=0;
	bq="";
	while(计次 < 数组操作.取成员数(dvi)){
	var inputs = document.getElementById(dvi[计次]).getElementsByTagName("span");
    bq=bq+inputs[0].innerHTML+",";
	计次=计次+1;
	}
	修改公式=0;
	IndexedDB数据库1.修改数据("mydata1","bq='" + bq + "'","name='"+窗口操作.取当前页面参数("a") + "'");
	}

}

function zh(d){t=d;

	var inputs = document.getElementById(t).getElementsByTagName("input");
	var spans = document.getElementById(t).getElementsByTagName("span");

	if(inputs.length > 1 ){
    var sz=数学操作.表达式计算(数学操作.到数值(inputs[0].value)+数学操作.到数值(inputs[1].value)/60+数学操作.到数值(inputs[2].value)/3600);
	inputs[0].style.width ="49%";
	inputs[0].value=sz;
	inputs[1].parentNode.removeChild(inputs[1]);
	inputs[1].parentNode.removeChild(inputs[1]);
	spans[1].parentNode.removeChild(spans[1]);
	spans[1].parentNode.removeChild(spans[1]);
	spans[1].parentNode.removeChild(spans[1]);
	}else{
    var sz=inputs[0].value;
	inputs[0].style.width ="15%";
	spans[1].parentNode.removeChild(spans[1]);

	var spand = document.createElement("span");
    spand.className = "toggle";
    spand.appendChild(document.createTextNode("°"));
    spand.style="display:inline-block";
	spand.style.width ="2%";
	spand.id = "span"+数学操作.表达式计算(CC+1);
	document.getElementById(t).appendChild(spand);

	var inputd=document.createElement("input");
	inputd.id = "input"+数学操作.表达式计算(CC+1);
	inputd.type="number";
	inputd.style.width ="15%";
	document.getElementById(t).appendChild(inputd);

    var spane = document.createElement("span");
    spane.className = "toggle";
    spane.appendChild(document.createTextNode("′"));
    spane.style="display:inline-block";
	spane.style.width ="2%";
	spane.id = "span"+数学操作.表达式计算(CC+2);
	document.getElementById(t).appendChild(spane);

	var inpute=document.createElement("input");
	inpute.type="number";
	inpute.style.width ="15%";
	inpute.id = "input"+数学操作.表达式计算(CC+2);
	document.getElementById(t).appendChild(inpute);

    var spanf = document.createElement("span");
    spanf.className = "toggle";
    spanf.appendChild(document.createTextNode("″"));
    spanf.style="display:inline-block";
	spanf.style.width ="2%";
	spanf.id = "span"+数学操作.表达式计算(CC+3);
	document.getElementById(t).appendChild(spanf);

	inputs[0].value=数学操作.取整数(数学操作.到数值(sz));
	inputs[1].value=数学操作.取整数((数学操作.到数值(sz)-数学操作.取整数(数学操作.到数值(sz)))*60);
	inputs[2].value=(((数学操作.到数值(sz)-数学操作.取整数(数学操作.到数值(sz)))*60-数学操作.取整数((数学操作.到数值(sz)-数学操作.取整数(数学操作.到数值(sz)))*60))*60);

	var buttona = document.createElement("span");
	buttona.id = t;
	buttona.className = "toggle";
	buttona.appendChild(document.createTextNode("转 换"));
    buttona.onclick=function(){zh(this.id)}
	buttona.style="text-align:center;display:inline-block;color:#DD524D;font-size:14px";
	buttona.style.width ="10%";
	document.getElementById(d).appendChild(buttona);

	}
	}

function 按钮组2_被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}

	if(按钮索引==0 ){
	窗口操作.切换窗口("chuangkou23.html");
	}

	if(按钮索引==1 ){
	if(读写设置.读取设置("自由模式")=="使用公式" ){
	读写设置.保存设置("自由模式","修改公式");
	计次=0;
	bq="";
	while(计次 < 数组操作.取成员数(dvi)){
	var inputs = document.getElementById(dvi[计次]).getElementsByTagName("span");
    bq=bq+inputs[0].innerHTML+",";
	计次=计次+1;
	}
	窗口操作.切换窗口("chuangkou25.html?a="+窗口操作.取当前页面参数("a")+"&b="+l+"&c="+bq);
	}else{
	对话框1.信息框("","1.点击变量标签可设置变量名\n2.完成以上编辑后保存即生效");
	}
	}
}


function 按钮1_被单击(){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}



    计次=0;
	bq="";
	while(计次 < 数组操作.取成员数(dvi)){
	var inputs = document.getElementById(dvi[计次]).getElementsByTagName("span");
    bq=bq+inputs[0].innerHTML+",";
	计次=计次+1;
	}

	if(读写设置.读取设置("自由模式")=="修改公式" ){
		对话框1.询问框("请确认是否修改","","取消","确定");
	}
	if(读写设置.读取设置("自由模式")=="创建公式" ){
	    对话框1.输入框("请输入公式名称","","取消","确定");
	}
}


function 对话框1_询问框被单击(按钮索引){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}

	if(按钮索引==1 ){
	修改公式=1;
    IndexedDB数据库1.修改数据("mydata1","sex='" + 窗口操作.取当前页面参数("b") + "',bq='" + bq + "'","name='" + 窗口操作.取当前页面参数("a") + "'");
	}
}

function 对话框1_输入框被单击(按钮索引,输入内容){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}

	if(按钮索引==1 ){
	if(输入内容 != "" ){
	公式名称1=输入内容;
	IndexedDB数据库1.查询数据("mydata1","name='公式:" + 输入内容 + "'");
	}else{
	对话框1.弹出提示("请输入公式名称");
	}
	}
}

function 对话框1_信息框被单击(){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
}

var IndexedDB数据库1 = new indexedDB数据库("myDB",
    function(结果, 数据) {
        if((结果) ){
             console.log("创建成功");
        }else{
             console.log("创建失败");
        }
    },
    function(结果, 数据) {
        if(结果 == true ){
		对话框1.弹出提示("保存成功！");
		窗口操作.切换窗口("chuangkou23.html");
	    }else{
		对话框1.弹出提示("保存失败！");
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
        if(结果 == true ){
	    if(修改公式==1  ){
		对话框1.弹出提示("修改成功！");
		读写设置.保存设置("自由模式","使用公式");
		窗口操作.切换窗口("chuangkou23.html");
	    }
	    }else{
		对话框1.弹出提示("修改失败！");
		读写设置.保存设置("自由模式","使用公式");
		窗口操作.切换窗口("chuangkou23.html");
	    }
    },
    function(结果, 数量, 数据) {
        if(结果 == true ){
		if(数量 == 0 ){
		IndexedDB数据库1.添加数据("mydata1", {"name": "公式:"+公式名称1,"sex": 窗口操作.取当前页面参数("b"),"bq": bq});
		}else{
		对话框1.信息框("公式重名","请重新设置名称");
		}
	    }
    }
);