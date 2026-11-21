mui.init({swipeBack: false
,gestureConfig: {tap:true,doubletap:true,longtap:true,hold:true,release:true}});

var 标题栏1 = new 标题栏("标题栏1",null,标题栏1_右侧图标被单击,标题栏1_左侧图标被单击);
var 导航栏1 = new 导航栏("导航栏1",导航栏1_项目被单击,null,null);
var 对话框1 = new 对话框("对话框1",对话框1_信息框被单击,null,null);
var 云支付1 = new 云支付("云支付1",云支付1_检测完毕,云支付1_支付完毕);
var 网络操作1 = new 网络操作("网络操作1",网络操作1_发送完毕);
var 网络操作2 = new 网络操作("网络操作2",网络操作2_发送完毕);
var 弹出面板1 = new 弹出面板("弹出面板1",null,弹出面板1_被隐藏);
var 二维码1 = new 二维码("二维码1",null);
var 时钟1 = new 时钟("时钟1",时钟1_周期事件);
var 支付状态 = 0;   /* 0=未支付 1=已支付 2=超时/取消 */
var 二维码定时 = 0;
var 订单号 = new Array();
var 二维码 = new Array();
var 屏幕截图加强1 = new 屏幕截图加强("屏幕截图加强1",屏幕截图加强1_截图完毕,null);
if(mui.os.plus){
    mui.plusReady(function() {牵引力计算_创建完毕();});
}else{
    window.onload=function(){牵引力计算_创建完毕();}
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

function 牵引力计算_创建完毕(){
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
	计算器初始化();   /* 打开页面即初始化计算器：填入默认参数、按杆塔数量生成完整表格（结果 3 列初始为“–”，滑动走板进度条实时显示结果） */
	if(文本操作.取文本长度(读写设置.读取设置("限时"))<1 ){
	读写设置.保存设置("限时",公用模块.当前时间戳());
	}else if(文本操作.取文本长度(读写设置.读取设置("限时"))>1 && 公用模块.到数值(读写设置.读取设置("限时"))<公用模块.当前时间戳() ){
	读写设置.保存设置("限时",公用模块.当前时间戳());
	}
	// 免费工程工具：移除原版余额/注册门控。
	
	if (true){
		authed = true;   /* 授权通过：允许点击【计算】按钮后显示结果（进入页面不自动计算） */
	}else{
	    authed = false;   /* 未登录/登录失败/使用时间到期：进入页面不弹窗，点击【计算】按钮时按页面1对话框方式弹出提示 */
	}
	弹出面板1.初始化(""+窗口操作.取窗口宽度()/2-110+"px","325px","220px","260px");   /* 云支付：弹出面板初始化（移动到底部，二维码/提示已预置在面板内，支付时显示） */
	if(窗口操作.是否在APP内运行()==true ){
		云支付1.检测支付通道();   /* APP 内运行：检测微信/支付宝支付通道（检测失败由回调弹提示） */
	}
}

function 对话框1_信息框被单击(){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
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

/* 默认示例数据 = 张力场 + N1~N50 + 牵引场；默认杆塔数量：桌面端 12 基、移动端 8 基（k=走板至牵引场） */
var g = 9.80665;   /* 重力加速度：固定标准值 9.80665 m/s²，界面不可修改，*/
var DEF = {
  wKg: 2.604, w0Kg: 2.8, m: 4, eps: 1.015, n: (window.innerWidth > 560 ? 10 : 8), TT: 2.15, k: 0,   /* 制动张力 TT 单位：吨 t（2.15 t ≈ 21084 N，2.15×9.80665×1000 N）；n 桌面 12 基 / 移动 8 基，k 随后修正为 n+1 */
  towers: [
    { name: '张力场', type: '张力场',   J: 1071,   li: 99 },{ name: '1',   type: 'N1',  J: 1072, li: 118 },
    { name: '2',   type: 'N2',  J: 1073, li: 474 },{ name: '3',   type: 'N3',  J: 1074, li: 521 },
    { name: '4',   type: 'N4', J: 1075, li: 615 },{ name: '5',   type: 'N5', J: 1086, li: 621 },
    { name: '6',   type: 'N6', J: 1097, li: 622 },{ name: '7',   type: 'N7', J: 1108, li: 800 },
    { name: '8',   type: 'N8', J: 1119, li: 615 },{ name: '9',   type: 'N9', J: 1130, li: 599 },
    { name: '10',  type: 'N10', J: 1141, li: 325 },{ name: '11',  type: 'N11', J: 1130, li: 426 },
    { name: '12',  type: 'N12', J: 1119, li: 466 },{ name: '13',  type: 'N13', J: 1108, li: 263 },
    { name: '14',  type: 'N14', J: 1097, li: 221 },{ name: '15',  type: 'N15',  J: 1086, li: 99 },
    { name: '16',  type: 'N16',  J: 1075, li: 145 },{ name: '17',  type: 'N17',  J: 1064, li: 375 },
    { name: '18',  type: 'N18',  J: 1053, li: 249 },{ name: '19',  type: 'N19',  J: 1042, li: 371 },
    { name: '20',  type: 'N20',  J: 1031, li: 225 },{ name: '21',  type: 'N21',  J: 1072, li: 118 },
	{ name: '22',  type: 'N22',  J: 1073, li: 474 },{ name: '23',  type: 'N23',  J: 1074, li: 521 },
	{ name: '24',  type: 'N24', J: 1075, li: 615 },{ name: '25',  type: 'N25', J: 1086, li: 621 },
	{ name: '26',  type: 'N26', J: 1097, li: 622 },{ name: '27',  type: 'N27', J: 1108, li: 800 },
	{ name: '28',  type: 'N28', J: 1119, li: 615 },{ name: '29',  type: 'N29', J: 1130, li: 599 },
	{ name: '30',  type: 'N30', J: 1141, li: 325 },{ name: '31',  type: 'N31', J: 1130, li: 426 },
	{ name: '32',  type: 'N32', J: 1119, li: 466 },{ name: '33',  type: 'N33', J: 1108, li: 263 },
	{ name: '34',  type: 'N34', J: 1097, li: 221 },{ name: '35',  type: 'N35',  J: 1086, li: 99 },
	{ name: '36',  type: 'N36',  J: 1075, li: 145 },{ name: '37',  type: 'N37',  J: 1064, li: 375 },
	{ name: '38',  type: 'N38',  J: 1053, li: 249 },{ name: '39',  type: 'N39',  J: 1042, li: 371 },
	{ name: '40',  type: 'N40',  J: 1031, li: 225 },{ name: '41',  type: 'N41', J: 1130, li: 426 },
	{ name: '42',  type: 'N42', J: 1119, li: 466 },{ name: '43',  type: 'N43', J: 1108, li: 263 },
	{ name: '44',  type: 'N44', J: 1097, li: 221 },{ name: '45',  type: 'N45',  J: 1086, li: 99 },
	{ name: '46',  type: 'N46',  J: 1075, li: 145 },{ name: '47',  type: 'N47',  J: 1064, li: 375 },
	{ name: '48',  type: 'N48',  J: 1053, li: 249 },{ name: '49',  type: 'N49',  J: 1042, li: 371 },
	{ name: '50',  type: 'N50',  J: 1031, li: 225 },{ name: '牵引场', type: '牵引场',  J: 1020,  li: 75 }
  ]
};
DEF.k = DEF.n + 1;   /* 走板进度条默认拉至牵引场（k = 杆塔数量 + 1） */

var S = {wKg: null, w0Kg: null, m: null, eps: null, n: DEF.n, TT: null, k: DEF.k, towers: makeEmptyTowers()};  /* 运行时状态：进入页面仅杆塔数量保留默认值，其余参数为空、塔数据高程/档距为空；点【重置】才填充默认示例数据并计算，点【计算】按钮才计算结果 */
var computed = false;   /* 是否已计算：true 才显示结果 3 列与动态牵引力（点击【计算】按钮或【重置】置 true） */
var authed = false;   /* 授权状态：解锁码校验通过后才允许计算并显示结果；未登录/登录失败/使用时间到期时为 false，点计算也不显示结果（进入页面时已弹提示） */

function makeTowers() {
  return DEF.towers.map(function (t) { return { name: t.name, type: t.type, J: t.J, li: (t.li === null || t.li === undefined) ? null : t.li }; });   /* 保留默认档距，刷新/重置后自动填充 */
}

function makeEmptyTowers() {   /* 进入页面时的空塔数据：仅保留塔号/类型，挂点高程与下一档距留空，由【重置】填充示例值 */
  return DEF.towers.map(function (t) { return { name: t.name, type: t.type, J: null, li: null }; });
}

function num(el) { return el.value === '' || el.value === null ? null : parseFloat(el.value); }
function cleanNum(v, integer) {   /* 输入清洗：integer 仅数字（整数）；否则保留数字/小数点/负号，只保留第一个小数点 */
  if (integer) { return v.replace(/[^\d]/g, ''); }
  v = v.replace(/[^\d.\-]/g, '');
  var i = v.indexOf('.');
  if (i >= 0) { v = v.slice(0, i) + '.' + v.slice(i + 1).replace(/\./g, ''); }   /* 只保留第一个小数点 */
  return v;
}
function fv(n) {   /* 高差显示：整数不补零，有小数时保留 2 位（如 1、-11、1.50、-11.25） */
  if (n === null || isNaN(n)) { return '–'; }
  var r = Math.round(n * 100) / 100;
  return (r % 1 === 0) ? String(r) : r.toFixed(2);
}

function compute() {   /* 核心算法：按 V1.0 公式链计算动态牵引力与逐塔牵引力（单位 N） */
  var j = Math.min(S.k, (S.n === null ? DEF.n : S.n) + 1);   /* ② 走板位置 j = min(k, n+1)：进度条塔号与上限（n+1）取小 */
  var missing = S.wKg === null || S.w0Kg === null || S.m === null || S.eps === null || S.n === null || S.TT === null;   /* 任一参数缺失 → 不计算（重力加速度固定 9.80665，不参与缺省判断） */
  var w = S.wKg * g, w0 = S.w0Kg * g;   /* ① 自重换算：kg/m × 重力加速度 → N/m */
  var TTn = S.TT === null ? null : S.TT * g * 1000;   /* ① 制动张力换算：界面/默认值以吨为单位输入 → ×g×1000 转为 N（2.88 t ≈ 28243 N） */
  var nv = S.n === null ? DEF.n : S.n;   /* n 缺失时回退示例值，仅用于表格参与范围 */
  var rows = [], S1 = 0, S2 = 0, mil = (S.towers[0].li === null || S.towers[0].li === undefined) ? 0 : S.towers[0].li, i, N, dh, s, t, U, W, X, Y, Z;   /* Σ₁(导线)/Σ₂(牵引绳) 累加器；mil 累计里程(m)，从张力场档距起（首行固定显示 0） */
  if (S.n === null) { return { j: j, rows: [], S1: 0, S2: 0, Q: 0, V: 0, AA: 0, Tp: 0, Tp0: null, t: 0 }; }   /* 杆塔数量为空：表格清空，直接返回空结果 */
  for (i = 1; i <= nv + 1; i++) {   /* 逐塔遍历：i = 塔序号 1…n，末行 i = n+1 为牵引机位（表格共 n+2 行） */
    N = i;
    var tw = (i === nv + 1) ? S.towers[S.towers.length - 1] : S.towers[i];   /* 末行取固定牵引场塔位（V1.0 牵引机行） */
    var twPrev = (i === nv + 1) ? S.towers[nv] : S.towers[i - 1];   /* 末行高差 = 牵引场高程 − 最后一座杆塔高程 */
    dh = (tw.J === null || twPrev.J === null) ? 0 : (tw.J - twPrev.J);   /* ③ 逐塔高差 Δh = 当前塔 J − 前塔 J；高程缺失按 0 容错 */
    mil += (N <= nv) && (tw.li !== null && tw.li !== undefined) ? tw.li : 0;   /* 累计里程逐档累加（m）；末行牵引场档距不参与 */
    s = j - (i - 1);
    t = s > 0 ? Math.pow(S.eps, s) : 0;   /* ④ Σ₁ 权重 ε^(j−i+1)：仅走板已到达塔位（s>0）计入 */
    U = t * dh;   /* ④ Σ₁ 单塔项 = 权重 × 该行真实高差 Δhᵢ（末行=牵引场−最后塔，与 V1.0 牵引机行 T 列一致） */
    W = S.n - N + 1;
    X = Math.pow(S.eps, W);   /* ⑤ Σ₂ 权重 ε^(n−i+1) */
    Y = N > S.k ? 1 : 0;   /* 未勾选（N>k）行档距计入 Σ₂，保证结果连续 */
    Z = i >= 2 ? X * Y * dh : 0;   /* 张力场行（i=1）不参与 Σ₂ */
    S1 += U; S2 += Z;
    var Tp_i = null, S1i = null;
    if (!missing && N <= nv + 1) {   /* ⑨ 逐塔牵引力：走板到达第 N 号塔（j=N）的三项求和；参数缺失不显示 */
      var Qi_ = S.m * Math.pow(S.eps, N) * Math.pow(S.eps, nv - N) * TTn;   /* 第一项：张力机出口预张力（TTn 为换算为 N 的制动张力） */
      S1i = 0; var t2, dh2, s2;
      for (t2 = 1; t2 <= N && t2 <= 51; t2++) {   /* 复刻 Σ₁：以 ε^(N−t+1) 权重逐档累计（每塔真实高差，末行=牵引场；高程缺失按 0） */
        var tA = (t2 === nv + 1) ? S.towers[S.towers.length - 1] : S.towers[t2];
        var tB = (t2 === nv + 1) ? S.towers[nv] : S.towers[t2 - 1];
        dh2 = (tA.J === null || tB.J === null) ? 0 : (tA.J - tB.J);
        s2 = N - (t2 - 1);
        if (s2 > 0) { S1i += Math.pow(S.eps, s2) * dh2; }}
      Tp_i = Qi_ + S.m * w * Math.pow(S.eps, nv - N) * S1i + w0 * S2;   /* ⑥ 三项之和：Q + V + AA */
    }
    rows.push({ ti: (i === nv + 1) ? S.towers.length - 1 : i, N: N, name: tw.name, type: tw.type, J: tw.J,
      li: tw.li, mil: mil, dh: dh, s: s, U: U, W: W, X: X, Y: Y, Z: Z, Tp: Tp_i, S1i: S1i, active: N <= nv + 1, passed: N <= S.k });
  }
  if (!missing) {   /* 逐塔牵引力列：每行 = 走板到达第 N 号塔（j=N）时的完整动态牵引力，为固定轨迹，不随进度条 k 变化；塔 k 行恰与主结果一致 */
    for (i = 0; i < rows.length; i++) {
      if (rows[i].Tp !== null) {
        var N2 = rows[i].N, S2N = 0, u2, dhU, tUA, tUB;
        for (u2 = 2; u2 <= nv + 1; u2++) {   /* 该行口径的 Σ₂：走板在 N 时，N 之后（i>N）的塔段计入（与主循环同口径，末行权重 ε₀⁰=1 计入） */
          if (u2 > N2) {
            tUA = (u2 === nv + 1) ? S.towers[S.towers.length - 1] : S.towers[u2];
            tUB = (u2 === nv + 1) ? S.towers[nv] : S.towers[u2 - 1];
            dhU = (tUA.J === null || tUB.J === null) ? 0 : (tUA.J - tUB.J);
            S2N += Math.pow(S.eps, S.n - u2 + 1) * dhU;
          }
        }
        rows[i].Tp = S.m * Math.pow(S.eps, N2) * Math.pow(S.eps, nv - N2) * TTn
          + S.m * w * Math.pow(S.eps, nv - N2) * rows[i].S1i + w0 * S2N;
      }
    }
  }
  if (missing) { return { j: j, rows: rows, S1: 0, S2: 0, Q: 0, V: 0, AA: 0, Tp: 0, Tp0: null, t: 0 }; }   /* 任一参数无数据：不计算，动态牵引力 0 */
  var Q = S.m * Math.pow(S.eps, j) * Math.pow(S.eps, S.n - j) * TTn;   /* ⑥ 第一项：张力机出口预张力（TTn 为换算为 N 的制动张力） */
  var V = S.m * w * Math.pow(S.eps, S.n - j) * S1;   /* ⑥ 第二项：导线自重沿程累计 */
  var AA = w0 * S2;   /* ⑥ 第三项：牵引绳自重累计 */
  var Tp = Q + V + AA;   /* ⑦ 动态牵引力（N） */
  var S2all = 0;   /* ⑧ 张力场行固定口径：走板未出发（j=0）时全线均为牵引绳段，Σ₂ 全行累计（Y 全 1），不随进度条 k 变化 */
  for (var i2 = 2; i2 <= nv + 1; i2++) {
    var tX = (i2 === nv + 1) ? S.towers[S.towers.length - 1] : S.towers[i2];
    var tY = (i2 === nv + 1) ? S.towers[nv] : S.towers[i2 - 1];
    var dhX = (tX.J === null || tY.J === null) ? 0 : (tX.J - tY.J);
    S2all += Math.pow(S.eps, S.n - i2 + 1) * dhX;
  }
  var Tp0 = S.m * Math.pow(S.eps, nv) * TTn + w0 * S2all;   /* ⑧ 张力场行（走板未出发，j=0）：Σ₁=0；Σ₂ 全线累计，固定值不随 k 变化（TTn 为换算为 N 的制动张力） */
  return { j: j, rows: rows, S1: S1, S2: S2, Q: Q, V: V, AA: AA, Tp: Tp, Tp0: Tp0, t: Tp / g / 1000 };   /* ⑦ 结果换算：t = Tp ÷ g ÷ 1000（吨） */
}

function esc(s) { return String(s === null || s === undefined ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }   /* HTML 转义，防止塔号等输入注入标签 */
function render() {   /* 完整重绘：按杆塔数量生成全部行（完整表格，不再隐藏 N>k 行）；结果 3 列仅在实时计算后显示 */
  var r = compute(), i, row, html = '', tr, t0 = S.towers[0];
  if (S.n === null) {   /* 杆塔数量为空：表格清空不显示任何数据 */
    document.getElementById('tbl-body').innerHTML = '';
  } else {
    /* 张力场行（行0）：不参与 U/Z 累加，仅提供 Δh₁ 的 J 基准；挂点高程 J 直接输入 */
    tr = '<tr>'   /* 张力场行：不高亮显示 */
      + '<td><span class="tick-wrap"><span class="tick">✓</span><input data-i="0" data-f="type" value="张力场" disabled></span></td>'   /* ✓ 移入塔号输入框内左侧 */
      + '<td><input data-i="0" data-f="J" type="text" inputmode="decimal" value="' + (t0.J === null ? '' : t0.J) + '" placeholder="–"></td>'   /* 挂点高程：显示实际数值，不补 .00 */
      + '<td><input data-i="0" data-f="li" type="text" inputmode="decimal" value="' + (t0.li === null || t0.li === undefined ? '' : t0.li) + '" placeholder="–"></td>'   /* 档距：显示实际数值，不补 .00 */
      + '<td class="c-mil auto">' + (computed ? '0' : '–') + '</td>'   /* 累计里程第一行（张力场）固定 0，第二行起从张力场开始累加 */
      + '<td class="c-dh auto">' + (computed ? '0' : '–') + '</td>'
      + '<td class="c-tp auto">' + (computed && r.Tp0 !== null && r.Tp0 !== undefined ? (r.Tp0 / g / 1000).toFixed(2) : '–') + '</td>'
      + '</tr>';
    html += tr;
    for (i = 0; i < r.rows.length; i++) {   /* 全部行完整显示（不再隐藏 N>k 的行） */
      row = r.rows[i];
      var passed = row.passed ? ' passed' : '';
      tr = '<tr class="' + passed + '">';
      var tv = (row.N === r.rows.length) ? '牵引场' : row.type;   /* 末行（牵引机位）塔号输入框也显示 牵引场 */
      tr += '<td><span class="tick-wrap">' + (row.passed ? '<span class="tick">✓</span>' : '') + '<input data-i="' + row.ti + '" data-f="type" value="' + esc(tv) + '"' + (row.N === r.rows.length ? ' disabled' : '') + '></span></td>';   /* ✓ 显示在塔号输入框内左侧 */
      tr += '<td><input data-i="' + row.ti + '" data-f="J" type="text" inputmode="decimal" value="' + (row.J === null ? '' : row.J) + '" placeholder="–"></td>';   /* 挂点高程：显示实际数值，不补 .00 */
      var isEnd = (row.N === r.rows.length);
      tr += '<td><input data-i="' + row.ti + '" data-f="li" type="text" inputmode="decimal" value="' + (isEnd ? '' : (row.li === null || row.li === undefined ? '' : row.li)) + '" placeholder="' + (isEnd ? '总里程→' : '–') + '"' + (isEnd ? ' disabled' : '') + '></td>';   /* 档距：显示实际数值，不补 .00；末行牵引场档距始终为空、禁用，提示 总里程 → */
      tr += '<td class="c-mil auto">' + (computed ? (row.mil / 1000).toFixed(3) : '–') + '</td>';   /* 累计里程（km，3 位小数，从张力场开始累加） */
      tr += '<td class="c-dh auto">' + (computed ? fv(row.dh) : '–') + '</td>';
      tr += '<td class="c-tp auto">' + (computed && row.Tp !== null && row.Tp !== undefined ? (row.Tp / g / 1000).toFixed(2) : '–') + '</td>';
      tr += '</tr>';
      html += tr;    }
    document.getElementById('tbl-body').innerHTML = html;
  }
  document.getElementById('r-t').textContent = computed ? (r.t.toFixed(2) + ' t') : '–';
  var nv2 = S.n === null ? DEF.n : S.n;
  document.getElementById('k-range').max = nv2 + 1;   /* k 上限随杆塔数量联动 */
  if (S.k > nv2 + 1) { S.k = nv2 + 1; }
  document.getElementById('k-range').value = S.k;
  var kt = (S.towers[S.k] && S.towers[S.k].type) ? S.towers[S.k].type : '';
  if (S.k >= nv2 + 1) { document.getElementById('k-lbl').textContent = '牵引场'; }
  else { document.getElementById('k-lbl').innerHTML = '<b>' + (kt || S.k) + '</b> '; }
}

function clearResultsInPlace() {   /* 塔数据修改后：就地清空结果 3 列与动态牵引力（不重建表格，保持输入焦点），等待点击底部【计算】按钮 */
  var trs = document.querySelectorAll('#tbl-body tr'), i;
  for (i = 0; i < trs.length; i++) {
    trs[i].children[3].textContent = '–';
    trs[i].children[4].textContent = '–';
    trs[i].children[5].textContent = '–';
  }
  document.getElementById('r-t').textContent = '–';
}

function fillFields() {   /* 打开页面 / 重置时填入默认参数值；输入过程中不覆盖，保证可输入小数点、0 等中间态（进入页面仅杆塔数量有值，其余为空） */
  document.getElementById('p-w').value = S.wKg === null ? '' : S.wKg;
  document.getElementById('p-w0').value = S.w0Kg === null ? '' : S.w0Kg;
  document.getElementById('p-m').value = S.m === null ? '' : S.m;
  document.getElementById('p-eps').value = S.eps === null ? '' : S.eps;
  document.getElementById('p-n').value = S.n === null ? '' : S.n;
  document.getElementById('p-tt').value = S.TT === null ? '' : S.TT;
}

function bind() {
  document.getElementById('btn-print').textContent = (window.innerWidth > 560) ? '打印' : '截图';   /* 桌面端按钮为“打印”，移动端为“截图” ， 摩擦系数（导线/牵引绳统一输入）；重力加速度内部固定 9.80665，不绑定输入事件 */
  var ids = { 'p-w': 'wKg', 'p-w0': 'w0Kg', 'p-m': 'm', 'p-eps': 'eps', 'p-n': 'n', 'p-tt': 'TT' };
  Object.keys(ids).forEach(function (id) {
    document.getElementById(id).addEventListener('input', function () {
      this.value = cleanNum(this.value, id === 'p-n' || id === 'p-m');   /* 杆塔数量/导线根数：仅整数；米重/摩擦系数/制动张力：任意有效数值含小数（只保留第一个小数点）；均限制中英文等其他输入 */
      var v = num(this);
      if (id === 'p-n') {
        if (v !== null) {
          v = Math.max(1, Math.min(50, v));   /* 杆塔数量：输入 0 自动显示 1，最大限制 50 */
          if (this.value !== String(v)) { this.value = String(v); }   /* clamp 后即时显示（0→1、>50→50） */
          S.k = v + 1;   /* 进度条自动拉到最右边（牵引场） */
        } else { S.k = DEF.n + 1; }   /* 清空时进度条也自动拉到最右边 */
      }
      S[ids[id]] = v;   /* 任意数值（含 0/小数/负数）均保留；仅缺值 null 不计算、结果 0t */
      computed = false;   /* 参数修改后不再实时计算：清空结果，等待点击底部【计算】按钮 */
      render();
    });
  });
  document.getElementById('k-range').addEventListener('input', function () {   /* 滑动走板进度条：计算后结果不清空，动态牵引力按当前塔号实时更新；未计算（含未授权）时结果保持 '–' */
    S.k = parseInt(this.value, 10) || 20;
    render();   /* 已计算：结果 3 列（里程/高差/逐塔牵引力）与 k 无关保持不变，主结果 r-t 按 j=min(k,n+1) 重算；未计算：'–' 不变，仅走板 ✓ 与塔号标签随 k 更新 */
  });
  document.getElementById('tbl-body').addEventListener('input', function (e) {
    var inp = e.target;
    if (!inp.dataset || !inp.dataset.i) { return; }
    var idx = parseInt(inp.dataset.i, 10), f = inp.dataset.f;
    if (f === 'type') { S.towers[idx].type = inp.value; }
    else {
      var v = num(inp);
      if (v === null || isNaN(v)) { S.towers[idx][f] = null; }
      else { S.towers[idx][f] = v; }
    }
    computed = false;   /* 塔数据修改后不再实时计算：就地清空结果 3 列与动态牵引力（不重建表格，保持输入焦点），等待点击底部【计算】按钮 */
    clearResultsInPlace();
  });
  document.getElementById('btn-calc').addEventListener('click', function () {   /* 底部【计算】按钮：白名单账号可直接计算无需付费；其他遵循授权门，授权通过先校验参数再发起支付，支付成功回调才计算结果 */
    /* 白名单账号（参考27页）：wx/wx1/wx2/wx3/wx4 任一等于 unionid，可直接计算无需付费 */
    if(读写设置.读取设置("wx")==读写设置.读取设置("unionid") || 读写设置.读取设置("wx1")==读写设置.读取设置("unionid") || 读写设置.读取设置("wx2")==读写设置.读取设置("unionid") || 读写设置.读取设置("wx3")==读写设置.读取设置("unionid") || 读写设置.读取设置("wx4")==读写设置.读取设置("unionid") ){
      if (S.wKg == null || S.w0Kg == null || S.m == null || S.eps == null || S.TT == null) {   /* 白名单：仍校验参数有效性，无效则提示不计算 */
        对话框1.弹出提示("请先填写参数，或点击「重置」填入示例数据");
        return;
      }
      var 有塔数据0 = S.towers.some(function (t) { return t.li !== null && t.li !== undefined; });
      if (!有塔数据0) {
        对话框1.弹出提示("请先填写塔数据（挂点高程/档距），或点击「重置」填入示例数据");
        return;
      }
      计算器计算();   /* 白名单：直接计算结果，无需付费 */
      return;
    }
    if (!authed) {   /* 未登录/登录失败/使用时间到期：按页面1对话框方式弹出提示，不计算结果（现有显示保持不变） */
      对话框1.信息框(读写设置.读取设置("登录"),"");
      return;
    }
    if (S.wKg == null || S.w0Kg == null || S.m == null || S.eps == null || S.TT == null) {   /* 支付前校验：参数未填则不发起支付 */
      对话框1.弹出提示("请先填写参数，或点击「重置」填入示例数据");
      return;
    }
    var 有塔数据 = S.towers.some(function (t) { return t.li !== null && t.li !== undefined; });   /* 至少一行塔挂点高程/档距 */
    if (!有塔数据) {
      对话框1.弹出提示("请先填写塔数据（挂点高程/档距），或点击「重置」填入示例数据");
      return;
    }
    发起支付();   /* 授权通过 + 数据有效：拉起微信支付（APP内）或弹出二维码（浏览器） */
  });
  document.getElementById('btn-clear').addEventListener('click', function () {
    document.querySelectorAll('.grid-params .param input').forEach(function (inp) { inp.value = ''; });   /* 顶部参数清空 */
    S.wKg = null; S.w0Kg = null; S.m = null; S.eps = null; S.TT = null;   /* 参数状态置空（S.n 保留：表格默认保持 张力场 + 默认基（桌面 12 基/移动 8 基） + 牵引场 行数） */
    S.towers.forEach(function (t) { t.J = null; t.li = null; });   /* 只清挂点高程/档距数据，保留塔号行名（张力场/牵引场/N1~N50），表格保持 12 行 */
    S.k = DEF.n + 1;   /* 进度条自动拉到最右边 */
    computed = false;
    render();
  });
  var doReset = function () {
    S.wKg = DEF.wKg; S.w0Kg = DEF.w0Kg; S.m = DEF.m; S.eps = DEF.eps;
    S.n = DEF.n; S.TT = DEF.TT; S.k = DEF.k;   /* 重力加速度固定 9.80665，无需重置 */
    S.towers = makeTowers();   /* 重置：恢复示例塔数据（含默认挂点高程/档距） */
    computed = true;   /* 重置：填充默认值并计算结果（重置不遵循授权门，始终显示） */
    fillFields();   /* 重置：填入默认参数值 */
    render();
  };
  document.getElementById('btn-reset').addEventListener('click', function () {document.getElementById('mask').style.display = 'flex';  });
  document.getElementById('modal-ok').addEventListener('click', function () {document.getElementById('mask').style.display = 'none';doReset();});
  document.getElementById('modal-cancel').addEventListener('click', function () {document.getElementById('mask').style.display = 'none';  });
  document.getElementById('mask').addEventListener('click', function (e) {if (e.target === this) { this.style.display = 'none'; }  });
  document.getElementById('btn-help').addEventListener('click', function () {document.getElementById('help-mask').style.display = 'flex';  });
  document.getElementById('help-close').addEventListener('click', function () {document.getElementById('help-mask').style.display = 'none';  });
  document.getElementById('help-mask').addEventListener('click', function (e) {if (e.target === this) { this.style.display = 'none'; }  });
  document.getElementById('btn-print').addEventListener('click', function () {
    document.getElementById('print-head').innerHTML = '计算成果来自于“电力测量计算器” <br> <span class="ph-t">牵引力计算</span>';   /* 打印页眉标题（innerHTML 使 <br> 换行生效；第二行“牵引力计算”放大到 25px） */
    if (window.innerWidth > 560) {   /* 桌面端：打印 */
      var oldTitle = document.title;
      document.title = '';   /* 打印页眉 / 另存 PDF 标题：替换 file:/// 路径 */
      window.print();
      document.title = oldTitle;
    } else {   /* 移动端：截图（截取内容卡片 #shot-card + 页眉，排版/字体与页面显示一致，不含标题栏/导航栏/按钮），页眉临时移入卡片顶部（截图后恢复原位）；html2canvas 旧版不支持 CSS grid，参数区临时切换为浮动 3 列布局 */
      var ph = document.getElementById('print-head');
      document.getElementById('shot-card').insertBefore(ph, document.getElementById('shot-card').firstChild);
      var g = document.querySelector('.grid-params');
      g.setAttribute('data-orig-display', g.style.display);
      g.style.display = 'block';
      var ps = g.querySelectorAll('.param');
      for (var i = 0; i < ps.length; i++) {
        ps[i].setAttribute('data-orig-float', ps[i].style.cssFloat);
        ps[i].setAttribute('data-orig-width', ps[i].style.width);
        ps[i].style.cssFloat = 'left';
        ps[i].style.width = '33.33%';
        ps[i].style.boxSizing = 'border-box';
      }
      document.body.classList.add('print-shot');
      屏幕截图加强1.截取组件("shot-card");
    }
  });
}

function 屏幕截图加强1_截图完毕(image){   /* 移动端截图完成：恢复页面样式/参数区布局/页眉位置并保存/下载图片 */
  document.body.classList.remove('print-shot');   /* 移除截图样式，恢复屏幕显示 */
  var ph = document.getElementById('print-head');   /* 页眉移回 .wrap 内原位置（卡片之前） */
  if (ph.parentNode.id === 'shot-card') {document.querySelector('.wrap').insertBefore(ph, document.getElementById('shot-card'));}
  var g = document.querySelector('.grid-params');   /* 恢复参数区 grid 布局 */
  g.style.display = g.getAttribute('data-orig-display') || '';
  var ps = g.querySelectorAll('.param');
  for (var i = 0; i < ps.length; i++) {
    ps[i].style.cssFloat = ps[i].getAttribute('data-orig-float') || '';
    ps[i].style.width = ps[i].getAttribute('data-orig-width') || '';
    ps[i].style.boxSizing = '';}
  屏幕截图加强1.保存截图(image,"牵引力计算表.png");   /* APP 内保存相册；浏览器内触发下载 */
  对话框1.弹出提示("截图完成，请前往相册查看");
}

function 计算器初始化() {fillFields();render();bind();}   /* 打开页面：仅填入默认杆塔数量、按数量生成空白表格（高程/档距为空，结果 3 列 '–'）、绑定事件；点击【计算】按钮或【重置】才计算 */
function 计算器计算() {computed = true;render();}   /* 计算：置 computed 并重绘结果 3 列与动态牵引力（支付成功回调调用） */

/* ---------- 云支付（参考 chuangkou27：APP 内拉起微信支付 / 浏览器弹出二维码轮询） ---------- */
function 发起支付(){
  var 价格 = 读写设置.读取设置("36fl");
  if(文本操作.取文本长度(价格)<1){ 价格 = "20"; }   /* 默认 20 元/次，可在设置中修改 36fl */
  价格 = 公用模块.到数值(价格);
  if(!(价格>0)){ 对话框1.弹出提示("请先在「设置」中配置支付金额（36fl）"); return; }
  var goods = "牵引力计算费"+价格+"元";
  var payUrl = "https://www.dlcl.xyz/pay/index.php?total="+价格+"&goods="+goods;
  if(窗口操作.是否在APP内运行()==true ){
    云支付1.开始支付(2, payUrl);   /* APP 内：拉起微信支付 */
  }else{
    var url地址 = payUrl+"&tradetype=NATIVE&product_id="+公用模块.取随机数值(16.16);   /* 浏览器：请求二维码链接 */
    网络操作1.发送网络请求(url地址,"get","text","",5000);
  }
}

function 支付成功处理(){
  支付状态 = 0;
  计算器计算();   /* 支付完成回调 ok：显示计算结果 */
}

function 云支付1_检测完毕(检测结果,支付宝,微信支付){
  if(检测结果==false ){ 对话框1.信息框("支付通道检测失败"); }
}

function 云支付1_支付完毕(支付结果,返回信息){
  if(支付结果==true ){
    支付成功处理();
  }else{
    对话框1.信息框("支付失败"+(返回信息&&返回信息.message?"："+返回信息.message:""),"");
  }
}

function 网络操作1_发送完毕(发送结果,返回信息){
  if(发送结果==true ){
    二维码 = 文本操作.取指定文本(返回信息,"pr=","\",\"");
    订单号 = 文本操作.取指定文本(返回信息,"out_trade_no\":\"","\"");
    二维码1.生成二维码("weixin://wxpay/bizpayurl?pr="+二维码[0],200,"#000000","#ffffff");
    弹出面板1.显示();
    时钟1.开始执行(1000,true);
  }else{
    对话框1.弹出提示("网络不佳请重试");
    时钟1.停止执行();
    弹出面板1.隐藏();
  }
}

function 时钟1_周期事件(){
  var queryUrl = "https://www.dlcl.xyz/pay/query.php?out_trade_no="+订单号[0];
  网络操作2.发送网络请求(queryUrl,"get","text","",5000);
}

function 网络操作2_发送完毕(发送结果,返回信息){
  if(发送结果==true ){
    if(返回信息=="ok" ){
      支付状态 = 1;
      弹出面板1.隐藏();   /* 触发 弹出面板1_被隐藏 → 支付成功处理 */
    }else{
      二维码定时 = 二维码定时+1;
      if(二维码定时==600 ){   /* 10 分钟未支付：超时关闭 */
        支付状态 = 2;
        弹出面板1.隐藏();
      }
    }
  }
}

function 弹出面板1_被隐藏(){
  时钟1.停止执行();
  二维码定时 = 0;
  if(支付状态==1 ){
    对话框1.弹出提示("支付成功");
    支付成功处理();
  }else if(支付状态==2 ){
    对话框1.弹出提示("支付超时，未完成支付，请重新计算");
  }else{
    对话框1.弹出提示("未完成支付，已取消");
  }
}