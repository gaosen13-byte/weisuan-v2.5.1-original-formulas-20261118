/* ==================== 窗口框架（标题栏 / 导航栏） ==================== */
mui.init({swipeBack: false
,gestureConfig: {tap:true,doubletap:true,longtap:true,hold:true,release:true}});

var 标题栏1 = new 标题栏("标题栏1",null,标题栏1_右侧图标被单击,标题栏1_左侧图标被单击);
var 导航栏1 = new 导航栏("导航栏1",导航栏1_项目被单击,null,null);
var 对话框1 = new 对话框("对话框1",对话框1_信息框被单击,null,null);
var 云支付1 = new 云支付("云支付1",云支付1_检测完毕,云支付1_支付完毕);
var 网络操作1 = new 网络操作("网络操作1",网络操作1_发送完毕);
var 网络操作2 = new 网络操作("网络操作2",网络操作2_发送完毕);
var 弹出面板1 = new 弹出面板("弹出面板1",null,弹出面板1_被隐藏);
var 二维码1 = new window.二维码("二维码1",null);   /* 显式引用全局构造函数（makeqrcode.js），避免混淆加密（间接 eval 严格模式）下 var 遮蔽导致不可构造 */
var 时钟1 = new 时钟("时钟1",时钟1_周期事件);
var 支付状态 = 0;   /* 0=未支付 1=已支付 2=超时/取消 */
var 二维码定时 = 0;
var 订单号 = new Array();
var 二维码 = new Array();
var authed = false;   /* 授权状态：解锁码校验通过后才允许点击【开始计算】出结果；未授权时点开始计算弹提示（页面1对话框方式），重置不遵循授权门始终计算 */
if(mui.os.plus){
    mui.plusReady(function() {钢筋配置计算_创建完毕();});
}else{
    window.onload=function(){钢筋配置计算_创建完毕();}
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

function 对话框1_信息框被单击(){
	if(窗口操作.是否在APP内运行()==true ){
	窗口操作.执行代码("index.html","音乐播放器1.播放()");
	公用模块.设备振动(读写设置.读取设置("振动"));
	}
}

function 钢筋配置计算_创建完毕(){
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
	if(文本操作.取文本长度(读写设置.读取设置("限时"))<1 ){
		读写设置.保存设置("限时",公用模块.当前时间戳());
	}else if(文本操作.取文本长度(读写设置.读取设置("限时"))>1 && 公用模块.到数值(读写设置.读取设置("限时"))<公用模块.当前时间戳() ){
		读写设置.保存设置("限时",公用模块.当前时间戳());
	}
	// 免费工程工具：移除原版余额/注册门控。
	if (true){
		authed = true;   /* 授权通过：允许点击【开始计算】按钮后显示结果 */
	}else{
	    authed = false;   /* 未登录/登录失败/使用时间到期：进入页面不弹窗，点击【开始计算】按钮时按页面1对话框方式弹出提示 */
	}
	钢筋配置初始化();   /* 初始化输入表、事件绑定与布局 */
	弹出面板1.初始化(""+窗口操作.取窗口宽度()/2-110+"px","325px","220px","260px");   /* 云支付：弹出面板初始化（移动到底部，二维码/提示已预置在面板内，支付时显示） */
	if(窗口操作.是否在APP内运行()==true ){
		云支付1.检测支付通道();   /* APP 内运行：检测微信/支付宝支付通道（检测失败由回调弹提示） */
	}
}

/* ==================== 求解核心（纯函数，可独立测试） ==================== */
// ====SOLVER-BEGIN====

/* 段料拆解：把一根成品需求拆为若干段料（含搭接损耗），每段 <= 原材料最大长度
   搭接长度×2：焊接/搭接时两侧各占一段，单接头占用 2×搭接长度；
   限制接头数量 = 必须设置的接头数：需求超长时正好拆为 接头数+1 段；
   拆段采用"长短交错"（大段优先贴近原材料整长，其余段自然递减），
   不再尽量等分——长段可整根利用、短段聚合成整根，减少废料 */
function segmentDemand(d, LsMax){
  var Ld = d.Ld, La = (d.La || 0) * 2, J = (d.J == null ? 0 : d.J);
  if(Ld <= LsMax) return {feasible:true, n:1, S:Ld, segs:[{len:Ld, cnt:1}]};
  if(LsMax <= La) return {feasible:false, reason:'原料长度mm不大于搭接占用(2×' + (d.La||0) + '=' + La + 'mm)，无法搭接'};
  var n = J + 1;
  var S = Ld + J * La;
  if(n * LsMax < S) return {feasible:false, reason:'接头数不足：' + J + '个接头最多提供' + (n * LsMax) + 'mm，需' + S + 'mm，请增加接头数量'};
  /* 长短交错拆段：每轮取"不超过原料整长、且给其余段留足最小空间"的最大长度，剩余自然递减 */
  var segs = [];
  var rem = S;
  var minSeg = Math.min(LsMax, Math.max(300, Math.floor(S / n / 3)));   /* 最小段料：约 1/3 均分值或 300mm，防过碎 */
  var i, kk, maxTake, take;
  for(i = 0; i < n; i++){
    kk = n - i;
    if(kk === 1){
      take = rem;
    }else{
      maxTake = rem - (kk - 1) * minSeg;
      take = Math.min(LsMax, maxTake);
      if(take < minSeg) take = Math.min(rem, minSeg);
    }
    segs.push({len: take, cnt: 1});
    rem -= take;
  }
  /* 合并同长段并降序排列（显示与求解更紧凑） */
  var map = new Map();
  for(i = 0; i < segs.length; i++){
    var sl = segs[i].len;
    map.set(sl, (map.get(sl) || 0) + segs[i].cnt);
  }
  segs = [];
  map.forEach(function(cnt, len){ segs.push({len: len, cnt: cnt}); });
  segs.sort(function(a, b){ return b.len - a.len; });
  return {feasible:true, n:n, S:S, segs:segs};
}

/* 尾料局部最优填充：在剩余空间内选 1–3 件段料（可同长多件）使填充最大 */
function bestFill(space, pool){
  if(space <= 0 || !pool.length) return null;
  var best = {fill:0, combo:[]};
  var i, j, k, a, b, c, total;
  for(i = 0; i < pool.length; i++){
    a = pool[i];
    if(a.len > space || a.len <= best.fill) continue;
    if(a.cnt >= 1) best = {fill:a.len, combo:[{len:a.len, cnt:1}]};
  }
  for(i = 0; i < pool.length; i++) for(j = 0; j < pool.length; j++){
    a = pool[i]; b = pool[j];
    total = a.len + b.len;
    if(total > space || total <= best.fill) continue;
    if(a.len === b.len){ if(a.cnt >= 2) best = {fill:total, combo:[{len:a.len, cnt:2}]}; }
    else if(a.cnt >= 1 && b.cnt >= 1) best = {fill:total, combo:[{len:a.len, cnt:1},{len:b.len, cnt:1}]};
  }
  for(i = 0; i < pool.length; i++) for(j = i; j < pool.length; j++) for(k = j; k < pool.length; k++){
    a = pool[i]; b = pool[j]; c = pool[k];
    total = a.len + b.len + c.len;
    if(total > space || total <= best.fill) continue;
    var m = new Map(); m.set(a.len,(m.get(a.len)||0)+1); m.set(b.len,(m.get(b.len)||0)+1); m.set(c.len,(m.get(c.len)||0)+1);
    var ok = true, combo = [];
    m.forEach(function(cnt,len){
      var p = null; for(var t = 0; t < pool.length; t++){ if(pool[t].len === len){ p = pool[t]; break; } }
      if(!p || p.cnt < cnt){ ok = false; } else combo.push({len:len, cnt:cnt});
    });
    if(ok) best = {fill:total, combo:combo};
  }
  return best.fill > 0 ? best : null;
}

/* 定价子问题：为单根原材料生成一个"高价值"裁切方案列 */
function genPattern(Ls, rem, price){
  var cands = [], used = new Map();
  rem.forEach(function(cnt, len){
    if(len <= Ls && cnt > 0) cands.push({len:len, cnt:cnt, ratio:price.get(len)/len});
  });
  if(!cands.length) return null;
  cands.sort(function(x,y){ return (y.ratio - x.ratio) || (y.len - x.len); });
  var space = Ls, items = [], i, c, k;
  for(i = 0; i < cands.length; i++){
    c = cands[i];
    k = Math.min(c.cnt, Math.floor(space / c.len));
    if(k > 0){ items.push({len:c.len, cnt:k}); space -= k * c.len; used.set(c.len, k); }
    if(space <= 0) break;
  }
  /* 尾料填充 */
  var pool = [];
  rem.forEach(function(cnt, len){
    var remain = cnt - (used.get(len) || 0);
    if(remain > 0 && len <= space) pool.push({len:len, cnt:remain});
  });
  pool.sort(function(x,y){ return y.len - x.len; });
  if(pool.length > 14) pool = pool.slice(0, 14);
  var tail = bestFill(space, pool);
  if(tail){
    for(i = 0; i < tail.combo.length; i++){
      var it = tail.combo[i], ex = null;
      for(var t = 0; t < items.length; t++){ if(items[t].len === it.len){ ex = items[t]; break; } }
      if(ex) ex.cnt += it.cnt; else items.push({len:it.len, cnt:it.cnt});
      space -= it.len * it.cnt;
    }
  }
  if(!items.length) return null;
  var fill = Ls - space;
  var value = 0;
  for(i = 0; i < items.length; i++) value += (price.get(items[i].len) || items[i].len) * items[i].cnt;
  return {items:items, fill:fill, value:value};
}

/* 最长适配优先(FFD)兜底放置 */
function ffdPlace(segs, barTypes, barRem){
  var placed = [], unmet = [], rem = new Map();
  segs.forEach(function(s){ rem.set(s.len, s.cnt); });
  var types = barTypes.filter(function(b){ return (barRem.get(b.Ls) || 0) > 0; })
    .sort(function(a,b){ return b.Ls - a.Ls; });
  for(var ti = 0; ti < types.length; ti++){
    var bt = types[ti], avail = barRem.get(bt.Ls);
    while(avail > 0 && rem.size > 0){
      var lens = []; rem.forEach(function(c,len){ lens.push(len); });
      lens.sort(function(a,b){ return b - a; });
      var space = bt.Ls, items = [], i, len, k;
      for(i = 0; i < lens.length; i++){
        len = lens[i];
        if(len > space) continue;
        k = Math.min(rem.get(len), Math.floor(space / len));
        if(k > 0){ items.push({len:len, cnt:k}); space -= k * len; }
        if(space <= 0) break;
      }
      if(!items.length) break;
      for(i = 0; i < items.length; i++){
        var r = rem.get(items[i].len) - items[i].cnt;
        if(r <= 0) rem.delete(items[i].len); else rem.set(items[i].len, r);
      }
      placed.push({Ls:bt.Ls, items:items, bars:1});
      avail--; barRem.set(bt.Ls, avail);
    }
  }
  rem.forEach(function(cnt, len){ if(cnt > 0) unmet.push({len:len, cnt:cnt}); });
  return {placed:placed, unmet:unmet};
}

/* 汇总统计 */
function stats(patterns){
  var barUsedMap = new Map(), material = 0, waste = 0, wastePieces = 0, usedBars = 0, i, p, fill, w;
  for(i = 0; i < patterns.length; i++){
    p = patterns[i];
    fill = 0;
    for(var t = 0; t < p.items.length; t++) fill += p.items[t].len * p.items[t].cnt;
    material += fill * p.bars; usedBars += p.bars;
    w = p.Ls - fill;
    if(w > 0) wastePieces += p.bars;
    waste += w * p.bars;
    barUsedMap.set(p.Ls, (barUsedMap.get(p.Ls) || 0) + p.bars);
  }
  var barUsed = [];
  barUsedMap.forEach(function(cnt, Ls){ barUsed.push({Ls:Ls, cnt:cnt}); });
  return {material:material, waste:waste, wastePieces:wastePieces, usedBars:usedBars, barUsed:barUsed};
}

/* 求解切割：列生成(启发式) + FFD 兜底。usePure=true 时仅纯 FFD */
function solveCutting(segments, barTypes, usePure){
  var rem = new Map(), initTotals = new Map(), i;
  segments.forEach(function(s){ if(s.cnt > 0){ rem.set(s.len, s.cnt); initTotals.set(s.len, s.cnt); } });
  var patterns = [];
  if(rem.size === 0) return {patterns:[], usedBars:0, material:0, waste:0, wastePieces:0, unmet:[], barUsed:[]};
  var price = new Map(); rem.forEach(function(c, len){ price.set(len, len); });
  var barRem = new Map(); barTypes.forEach(function(b){ barRem.set(b.Ls, b.avail); });

  if(!usePure){
    var guardMax = Math.min(2000, 120 + rem.size * 40);
    var guard = 0;
    while(rem.size > 0 && guard < guardMax){
      guard++;
      var best = null;
      for(i = 0; i < barTypes.length; i++){
        var bt = barTypes[i], avail = barRem.get(bt.Ls) || 0;
        if(avail === 0) continue;
        var pat = genPattern(bt.Ls, rem, price);
        if(!pat) continue;
        var score = pat.fill / bt.Ls + 1e-7 * pat.value;
        if(!best || score > best.score) best = {Ls:bt.Ls, items:pat.items, score:score};
      }
      if(!best) break;
      var q = Infinity, t;
      for(t = 0; t < best.items.length; t++){
        var r = rem.get(best.items[t].len) || 0;
        q = Math.min(q, Math.floor(r / best.items[t].cnt));
      }
      var availB = barRem.get(best.Ls);
      if(availB !== Infinity) q = Math.min(q, availB);
      if(!(q >= 1)) break;
      for(t = 0; t < best.items.length; t++){
        var nr = rem.get(best.items[t].len) - best.items[t].cnt * q;
        if(nr <= 0) rem.delete(best.items[t].len); else rem.set(best.items[t].len, nr);
      }
      barRem.set(best.Ls, availB === Infinity ? Infinity : availB - q);
      patterns.push({Ls:best.Ls, items:best.items, bars:q});
      /* 更新影子价格：按稀缺度提价 */
      var iter = rem.entries();
      for(var e = iter.next(); !e.done; e = iter.next()){
        var len = e.value[0], c = e.value[1], init = initTotals.get(len) || 1;
        price.set(len, len * (1 + 0.7 * Math.min(1, c / init)));
      }
    }
  }
  /* FFD 兜底剩余段料 */
  var leftover = [];
  rem.forEach(function(cnt, len){ leftover.push({len:len, cnt:cnt}); });
  var ffd = ffdPlace(leftover, barTypes, barRem);
  for(i = 0; i < ffd.placed.length; i++) patterns.push(ffd.placed[i]);
  var st = stats(patterns);
  return {patterns:patterns, usedBars:st.usedBars, material:st.material, waste:st.waste,
          wastePieces:st.wastePieces, unmet:ffd.unmet, barUsed:st.barUsed};
}

/* 最大余数法：把整数 total 按份额分配 */
function allocLargestRemainder(total, shares){
  if(!shares.length || !(total > 0)) return shares.map(function(){ return 0; });
  var n = shares.length, sum = shares.reduce(function(a,b){ return a + b; }, 0) || 1;
  var exact = shares.map(function(s){ return total * s / sum; });
  var floor = exact.map(Math.floor);
  var rem = total - floor.reduce(function(a,b){ return a + b; }, 0);
  var order = exact.map(function(e, i){ return {i:i, f:e - Math.floor(e)}; })
    .sort(function(a,b){ return b.f - a.f; });
  for(var k = 0; k < rem; k++) floor[order[k % order.length].i]++;
  return floor;
}

/* 行级分摊：废弃按占用材料比例分配 */
function allocateRows(rows, totalWaste, wastePieces, buyCnt){
  var matRows = rows.filter(function(r){ return r.feasible; });
  if(!matRows.length) return;
  var totalMat = matRows.reduce(function(a, r){ return a + r.material; }, 0) || 1;
  var shares = matRows.map(function(r){ return r.material / totalMat; });
  var wl = allocLargestRemainder(totalWaste, shares);
  var wc = allocLargestRemainder(wastePieces, shares);
  matRows.forEach(function(r, i){ r.wasteLen = wl[i]; r.wasteCnt = wc[i]; if(buyCnt) r.buyCnt = buyCnt[i]; });
}

/* 段料归属标注：把每个裁切方案里的段料按需匹配到需求行（长度相同可互换，
   按顺序贪心匹配，供排料表显示"切成什么、给第几行用"）。仅展示用途，不影响求解结果。 */
function annotatePatterns(patterns, rows){
  var need = new Map(); /* len -> [{row, cnt}] 该长度段料还欠哪些行 */
  rows.forEach(function(r){
    if(!r.feasible || !r.segs) return;
    r.segs.forEach(function(s){
      var total = s.cnt * r.Nd;
      if(!need.has(s.len)) need.set(s.len, []);
      need.get(s.len).push({row:r.row, cnt:total});
    });
  });
  patterns.forEach(function(p){
    (p.items || []).forEach(function(it){
      var arr = need.get(it.len) || [], rem = it.cnt, use = [];
      for(var i = 0; i < arr.length && rem > 0; i++){
        var a = arr[i];
        if(a.cnt <= 0) continue;
        var take = Math.min(rem, a.cnt);
        use.push({row:a.row, cnt:take});
        a.cnt -= take; rem -= take;
      }
      it.use = use;
    });
  });
}

/* 正算：一组（同直径） */
function solveForwardGroup(group){
  var LsMax = 0, i, t;
  group.bars.forEach(function(b){ if(b.Ls > LsMax) LsMax = b.Ls; });
  var rows = [], segMap = new Map(), totalMaterial = 0;
  for(i = 0; i < group.demands.length; i++){
    var d = group.demands[i], seg = segmentDemand(d, LsMax);
    if(!seg.feasible){ rows.push({row:d.row, dia:d.dia, Ld:d.Ld, Nd:d.Nd, J:d.J, La:d.La, feasible:false, reason:seg.reason}); continue; }
    var mat = seg.S * d.Nd;
    totalMaterial += mat;
    for(t = 0; t < seg.segs.length; t++){
      var s = seg.segs[t];
      segMap.set(s.len, (segMap.get(s.len) || 0) + s.cnt * d.Nd);
    }
    rows.push({row:d.row, dia:d.dia, Ld:d.Ld, Nd:d.Nd, J:d.J, La:d.La, feasible:true,
               n:seg.n, S:seg.S, segs:seg.segs, material:mat});
  }
  var segments = [];
  segMap.forEach(function(cnt, len){ segments.push({len:len, cnt:cnt}); });
  var stockTotal = 0;
  group.bars.forEach(function(b){ stockTotal += b.Ls * b.cnt; });
  var shortage = stockTotal < totalMaterial ? totalMaterial - stockTotal : 0;
  var barTypes = group.bars.map(function(b){ return {Ls:b.Ls, avail:b.cnt}; });
  var r1 = solveCutting(segments, barTypes, false);
  var r2 = solveCutting(segments, barTypes, true);
  /* 择优：未满足少者优先，其次废料少 */
  var u1 = r1.unmet.reduce(function(a,u){ return a + u.cnt; }, 0);
  var u2 = r2.unmet.reduce(function(a,u){ return a + u.cnt; }, 0);
  var cut = (u2 < u1 || (u2 === u1 && r2.waste < r1.waste)) ? r2 : r1;
  var unmetTotal = cut.unmet.reduce(function(a,u){ return a + u.cnt; }, 0);
  annotatePatterns(cut.patterns, rows);
  allocateRows(rows, cut.waste, cut.wastePieces, null);
  return {bars:group.bars, rows:rows, segments:segments, stockTotal:stockTotal,
          material:totalMaterial, shortage:shortage, cut:cut, unmetTotal:unmetTotal,
          infeasible:rows.filter(function(r){ return !r.feasible; })};
}

/* 反算：一组，评估某一购买长度 */
function evaluateReverse(demands, Lp){
  var rows = [], segMap = new Map(), totalMaterial = 0, i, t;
  for(i = 0; i < demands.length; i++){
    var d = demands[i], seg = segmentDemand(d, Lp);
    if(!seg.feasible) return {feasible:false, reason:'购买长度 ' + Lp + 'mm 下行 ' + d.row + ' 无法满足：' + seg.reason};
    var mat = seg.S * d.Nd;
    totalMaterial += mat;
    for(t = 0; t < seg.segs.length; t++){
      var s = seg.segs[t];
      segMap.set(s.len, (segMap.get(s.len) || 0) + s.cnt * d.Nd);
    }
    rows.push({row:d.row, dia:d.dia, Ld:d.Ld, Nd:d.Nd, J:d.J, La:d.La, feasible:true,
               n:seg.n, S:seg.S, segs:seg.segs, material:mat});
  }
  var segments = [];
  segMap.forEach(function(cnt, len){ segments.push({len:len, cnt:cnt}); });
  var cut = solveCutting(segments, [{Ls:Lp, avail:Infinity}], false);
  annotatePatterns(cut.patterns, rows);
  return {feasible:true, buyLen:Lp, usedBars:cut.usedBars, totalWaste:cut.waste,
          rows:rows, segments:segments, material:totalMaterial, totalMaterial:totalMaterial, cut:cut};
}

/* 反算：购买长度候选集 */
function genCandidates(demands, minLp){
  var LdMax = 0, i;
  demands.forEach(function(d){ if(d.Ld > LdMax) LdMax = d.Ld; });
  var hi = Math.max(16000, LdMax + 2000);
  var totalPieces = demands.reduce(function(a, d){ return a + d.Nd; }, 0);
  var step = totalPieces > 3000 ? 1000 : 500;
  var set = new Set([6000, 7500, 9000, 10000, 10500, 11000, 11700, 12000, 13500, 15000]);
  demands.forEach(function(d){ set.add(d.Ld); });
  for(var v = 4000; v <= hi; v += step) set.add(v);
  var arr = [];
  set.forEach(function(v){ if(v >= minLp) arr.push(v); });
  arr.sort(function(a,b){ return a - b; });
  return arr;
}

/* 反算：整组求解，返回最优购买方案。fixedLens=null 时自动优化；否则按给定候选长度逐档评估 */
function solveReverseGroup(demands, fixedLens){
  var minLp = 1;
  demands.forEach(function(d){
    var J = d.J || 0, La = d.La || 0, Ld = d.Ld, need;
    if(J <= 0) need = Ld;
    else if(Ld <= 2 * La) need = Ld;
    else need = Math.ceil((Ld + 2 * J * La) / (J + 1));
    if(need > minLp) minLp = need;
  });
  var i, t, rejected = [], fixedMode = !!(fixedLens && fixedLens.length);

  if(fixedMode){
    var usable = [];
    fixedLens.forEach(function(Lp){
      if(Lp < minLp){ rejected.push({Lp:Lp, reason:'低于最短可裁长度 ' + minLp + ' mm'}); return; }
      usable.push(Lp);
    });
    if(!usable.length) return {best:null, minLp:minLp, rejected:rejected};
    var maxLp = usable[usable.length - 1];
    /* 拆段（2×搭接、J+1 段）——与正算同口径，LsMax 取最大可用选项 */
    var rows = [], segMap = new Map(), totalMaterial = 0;
    for(i = 0; i < demands.length; i++){
      var d = demands[i], seg = segmentDemand(d, maxLp);
      if(!seg.feasible){ rows.push({row:d.row, dia:d.dia, Ld:d.Ld, Nd:d.Nd, J:d.J, La:d.La, feasible:false, reason:seg.reason}); continue; }
      var mat = seg.S * d.Nd;
      totalMaterial += mat;
      for(t = 0; t < seg.segs.length; t++){
        var s = seg.segs[t];
        segMap.set(s.len, (segMap.get(s.len) || 0) + s.cnt * d.Nd);
      }
      rows.push({row:d.row, dia:d.dia, Ld:d.Ld, Nd:d.Nd, J:d.J, La:d.La, feasible:true,
                 n:seg.n, S:seg.S, segs:seg.segs, material:mat});
    }
    var segments = [];
    segMap.forEach(function(cnt, len){ segments.push({len:len, cnt:cnt}); });
    /* 组合购买：所有已输入选项均可作为购买长度，数量不限 */
    var barTypes = usable.map(function(Lp){ return {Ls:Lp, avail:Infinity}; });
    var c1 = solveCutting(segments, barTypes, false);
    var c2 = solveCutting(segments, barTypes, true);
    var u1 = c1.unmet.reduce(function(a, u){ return a + u.cnt; }, 0);
    var u2 = c2.unmet.reduce(function(a, u){ return a + u.cnt; }, 0);
    var cutMix = (u2 < u1 || (u2 === u1 && c2.waste < c1.waste)) ? c2 : c1;
    annotatePatterns(cutMix.patterns, rows);
    var mix = cutMix.barUsed.slice().sort(function(a, b){ return b.cnt - a.cnt || a.Ls - b.Ls; });
    /* 单一长度最优（参考） */
    var singleBest = null, singleTop = [];
    usable.forEach(function(Lp){
      var r = evaluateReverse(demands, Lp);
      if(!r.feasible) return;
      singleTop.push({Lp:Lp, waste:r.totalWaste, bars:r.usedBars});
      if(!singleBest || r.totalWaste < singleBest.totalWaste || (r.totalWaste === singleBest.totalWaste && r.usedBars < singleBest.usedBars))
        singleBest = r;
    });
    singleTop.sort(function(a, b){ return a.waste - b.waste || a.bars - b.bars; });
    /* 推荐：组合与单一取废料少者（同废料比根数，再相同取单一更简单） */
    var primary = 'single';
    if(singleBest){
      if(cutMix.waste < singleBest.totalWaste || (cutMix.waste === singleBest.totalWaste && cutMix.usedBars < singleBest.usedBars))
        primary = 'mix';
    }else{
      primary = 'mix';
    }
    var useCut = (primary === 'mix') ? cutMix : singleBest.cut;
    var usedBars = useCut.usedBars, totalWaste = useCut.waste;
    var shares = rows.filter(function(r){ return r.feasible; }).map(function(r){ return r.material; });
    var bc = allocLargestRemainder(usedBars, shares);
    rows.filter(function(r){ return r.feasible; }).forEach(function(r, idx){ r.buyCnt = bc[idx]; });
    allocateRows(rows, totalWaste, useCut.wastePieces, null);
    var best = {
      rows: rows, segments: segments, material: totalMaterial, cut: useCut,
      usedBars: usedBars, totalWaste: totalWaste,
      buyLen: (primary === 'mix' && mix.length) ? mix[0].Ls : (singleBest ? singleBest.buyLen : usable[0]),
      mix: mix, primary: primary, fixedMode: true,
      singleBest: singleBest ? {buyLen:singleBest.buyLen, usedBars:singleBest.usedBars, totalWaste:singleBest.totalWaste} : null,
      topCands: singleTop, rejected: rejected,
      infeasible: rows.filter(function(r){ return !r.feasible; })
    };
    return {best:best, minLp:minLp, rejected:rejected};
  }

  /* ---- 自动优化（全部未填固定长度）：常见定尺 4m/6m/9m 组合购买，废料最少 ---- */
  var COMMON_STOCK = [4000, 6000, 9000];
  var subsets = [[4000],[6000],[9000],[4000,6000],[4000,9000],[6000,9000],[4000,6000,9000]];
  var best = null, topCands = [], bestMix = null, mixReason = null;
  var si, s, usable2, maxLp2, rows2, segMap2, totalMaterial2, segments2, barTypes2, c2, u2, cutMix, mix2, feasibleAll;
  for(si = 0; si < subsets.length; si++){
    s = subsets[si];
    usable2 = [];
    for(t = 0; t < s.length; t++) if(s[t] >= minLp) usable2.push(s[t]);
    if(!usable2.length) continue;
    maxLp2 = usable2[usable2.length - 1];
    rows2 = []; segMap2 = new Map(); totalMaterial2 = 0; feasibleAll = true;
    for(i = 0; i < demands.length; i++){
      var d2 = demands[i], seg2 = segmentDemand(d2, maxLp2);
      if(!seg2.feasible){ feasibleAll = false; break; }
      var mat2 = seg2.S * d2.Nd;
      totalMaterial2 += mat2;
      for(t = 0; t < seg2.segs.length; t++){
        var s22 = seg2.segs[t];
        segMap2.set(s22.len, (segMap2.get(s22.len) || 0) + s22.cnt * d2.Nd);
      }
      rows2.push({row:d2.row, dia:d2.dia, Ld:d2.Ld, Nd:d2.Nd, J:d2.J, La:d2.La, feasible:true,
                  n:seg2.n, S:seg2.S, segs:seg2.segs, material:mat2});
    }
    if(!feasibleAll) continue;
    segments2 = [];
    segMap2.forEach(function(cnt, len){ segments2.push({len:len, cnt:cnt}); });
    barTypes2 = usable2.map(function(Lp){ return {Ls:Lp, avail:Infinity}; });
    c2 = solveCutting(segments2, barTypes2, false);
    if(c2.unmet.length) continue;   /* 该定尺组合不可行 */
    cutMix = c2;
    mix2 = cutMix.barUsed.slice().sort(function(a, b){ return b.cnt - a.cnt || a.Ls - b.Ls; });
    if(!bestMix || cutMix.waste < bestMix.cut.waste ||
       (cutMix.waste === bestMix.cut.waste && (cutMix.usedBars < bestMix.cut.usedBars ||
        (cutMix.usedBars === bestMix.cut.usedBars && mix2.length < bestMix.mix.length)))){
      annotatePatterns(cutMix.patterns, rows2);
      bestMix = {rows: rows2, segments: segments2, material: totalMaterial2, cut: cutMix, mix: mix2};
    }
  }
  if(bestMix){
    var bm = bestMix;
    var shares2 = bm.rows.filter(function(r){ return r.feasible; }).map(function(r){ return r.material; });
    var bc2 = allocLargestRemainder(bm.cut.usedBars, shares2);
    bm.rows.filter(function(r){ return r.feasible; }).forEach(function(r, idx){ r.buyCnt = bc2[idx]; });
    allocateRows(bm.rows, bm.cut.waste, bm.cut.wastePieces, null);
    best = {
      rows: bm.rows, segments: bm.segments, material: bm.material, cut: bm.cut,
      usedBars: bm.cut.usedBars, totalWaste: bm.cut.waste,
      buyLen: bm.mix.length ? bm.mix[0].Ls : COMMON_STOCK[COMMON_STOCK.length - 1],
      mix: bm.mix, primary: 'mix', fixedMode: false, autoMix: true,
      topCands: [], rejected: rejected,
      infeasible: bm.rows.filter(function(r){ return !r.feasible; })
    };
    return {best:best, minLp:minLp, rejected:rejected};
  }
  /* ---- 兜底：常见定尺(4m/6m/9m)组合均不可行（需求超过 9m 定尺范围）→ 单一长度自动优化 ---- */
  var candidates = genCandidates(demands, minLp);
  for(i = 0; i < candidates.length; i++){
    var r = evaluateReverse(demands, candidates[i]);
    if(!r.feasible) continue;
    topCands.push({Lp:candidates[i], waste:r.totalWaste, bars:r.usedBars});
    if(!best || r.totalWaste < best.totalWaste || (r.totalWaste === best.totalWaste && r.usedBars < best.usedBars))
      best = r;
  }
  if(best){
    var lo = Math.max(1, best.buyLen - 1200), hi = best.buyLen + 1200;
    for(var v = lo; v <= hi; v += 50){
      if(v < minLp || v === best.buyLen) continue;
      var r2 = evaluateReverse(demands, v);
      if(!r2.feasible) continue;
      topCands.push({Lp:v, waste:r2.totalWaste, bars:r2.usedBars});
      if(r2.totalWaste < best.totalWaste || (r2.totalWaste === best.totalWaste && r2.usedBars < best.usedBars))
        best = r2;
    }
  }
  if(best){
    var shares3 = best.rows.filter(function(r){ return r.feasible; }).map(function(r){ return r.material; });
    var bc3 = allocLargestRemainder(best.usedBars, shares3);
    best.rows.filter(function(r){ return r.feasible; }).forEach(function(r, idx){ r.buyCnt = bc3[idx]; });
    allocateRows(best.rows, best.totalWaste, best.cut.wastePieces, null);
    topCands.sort(function(a, b){ return a.waste - b.waste || a.bars - b.bars; });
    best.topCands = topCands.slice(0, 5);
    best.autoMix = false;
    best.mixReason = mixReason || '常见定尺(4m/6m/9m)组合均不可行，已按单一长度自动优化';
  }
  return {best:best, minLp:minLp, rejected:rejected};
}
// ====SOLVER-END====

/* ==================== UI 层 ==================== */
var COLS = {
  fwd: [
    {key:'dia', label:'直径 ⌀', w:7, in:true},
    {key:'knownLen', label:'已知长度', unit:'mm', w:10, in:true},
    {key:'knownCnt', label:'已知数量', unit:'根', w:9, in:true},
    {key:'joint', label:'限制接头', unit:'个', w:9, in:true},
    {key:'lap', label:'搭接长度', unit:'mm', w:9, in:true},
    {key:'reqLen', label:'需求长度', unit:'mm', w:10, in:true},
    {key:'reqCnt', label:'需求数量', unit:'根', w:9, in:true}
  ],
  rev: [
    {key:'dia', label:'直径 ⌀', w:8, in:true},
    {key:'reqLen', label:'需求长度', unit:'mm', w:12, in:true},
    {key:'reqCnt', label:'需求数量', unit:'根', w:11, in:true},
    {key:'joint', label:'限制接头', unit:'个', w:11, in:true},
    {key:'lap', label:'搭接长度', unit:'mm', w:11, in:true}
  ]
};
var COMMON_KEYS = ['dia','reqLen','reqCnt','joint','lap'];
/* 重置示例数据：同一直径、同一搭接长度，其余字段各不相同，用于验证计算结果 */
var DEMO = {
  fwd: [
    {dia:'12', knownLen:'9000', knownCnt:'12', joint:'0', lap:'120', reqLen:'6000',  reqCnt:'8'},
    {dia:'12', knownLen:'7500', knownCnt:'8',  joint:'1', lap:'120', reqLen:'15000', reqCnt:'4'},
    {dia:'12', knownLen:'12000',knownCnt:'6',  joint:'2', lap:'120', reqLen:'12000', reqCnt:'4'},
    {dia:'12', knownLen:'10500',knownCnt:'3',  joint:'1', lap:'120', reqLen:'4500',  reqCnt:'10'},
    {dia:'12', knownLen:'6000', knownCnt:'10', joint:'0', lap:'120', reqLen:'5000',  reqCnt:'8'}
  ],
  rev: [
    {dia:'12', reqLen:'6000',  reqCnt:'8',  joint:'0', lap:'120'},
    {dia:'12', reqLen:'8000',  reqCnt:'6',  joint:'1', lap:'120'},
    {dia:'12', reqLen:'12000', reqCnt:'4',  joint:'2', lap:'120'},
    {dia:'12', reqLen:'4500',  reqCnt:'10', joint:'1', lap:'120'},
    {dia:'12', reqLen:'5000',  reqCnt:'8',  joint:'2', lap:'120'}
  ]
};
var state = {mode:'fwd', rows:[], results:null, weld:'double'};
var $ = function(id){ return document.getElementById(id); };

function fmt(n){
  if(n === null || n === undefined || !isFinite(n)) return '—';
  return String(Math.round(n));
}
/* 米单位（mm → m，保留至多 2 位小数、去尾零） */
function fmtM(n){
  if(n === null || n === undefined || !isFinite(n)) return '—';
  var v = Math.round(n / 1000 * 100) / 100;
  return String(v);
}

/* 国标电弧焊搭接长度（JGJ 18-2012）：单面焊=10d、双面焊=5d；直径非法返回 null */
function stdLap(diaStr, mode){
  var d = Number(String(diaStr == null ? '' : diaStr).replace(/[,\s]/g, ''));
  if(!isFinite(d) || d <= 0) return null;
  return Math.round(d * (mode === 'double' ? 5 : 10));
}

/* ---------- 渲染 ---------- */
function render(){
  var cols = COLS[state.mode], i, j;
  var hr = $('headRow'); hr.innerHTML = '';
  cols.forEach(function(c){
    var th = document.createElement('th');
    th.className = c.out ? 'out' : '';
    th.style.width = c.w + '%';
    th.innerHTML = c.label + (c.unit ? '<span class="unit">' + c.unit + '</span>' : '');
    hr.appendChild(th);
  });
  var tb = $('tbody'); tb.innerHTML = '';
  for(i = 0; i < state.rows.length; i++){
    var tr = document.createElement('tr');
    cols.forEach(function(c){
      var td = document.createElement('td');
      td.className = c.in ? 'in' : 'out';
      var inp = document.createElement('input');
      inp.type = 'text';
      inp.dataset.row = i; inp.dataset.key = c.key;
      if(c.in){
        inp.inputMode = (c.key === 'dia') ? 'text' : 'decimal';
        inp.autocomplete = 'off';
        inp.value = state.rows[i][c.key] || '';
      }else{
        inp.readOnly = true;
        inp.value = '';
        td.classList.add('out');
      }
      td.appendChild(inp);
      tr.appendChild(td);
    });
    tb.appendChild(tr);
  }
  renderPlan();
  layoutMiddle();
}


/* 中部高度分配：表格内容自适应、上限剩余50%；排料表始终占满剩余高度，
   两者合计铺满中部（按钮固定屏幕底部，不留空白）。
   无结果时排料表显示提示占位，同样铺满。
   MUI 环境：顶部标题栏(mui-bar-nav) + 底部导航栏(mui-bar-tab) + 开始计算按钮(.btnbar) 高度从可用高度扣除 */
function layoutMiddle(){
  var tw = $('tableWrap'), pl = $('plan');
  if(!tw || !pl) return;
  var headerEl = document.querySelector('.mui-bar-nav');
  var headerH = headerEl ? (headerEl.offsetHeight || 0) : 0;
  var footerEl = document.querySelector('.mui-bar-tab');
  var footerH = footerEl ? (footerEl.offsetHeight || 0) : 0;
  var btnEl = document.querySelector('.btnbar');
  var btnH = btnEl ? (btnEl.offsetHeight || 0) : 0;
  var other = 0;
  /* 顶部工具栏（模式/行数/焊接/固定长度）占据的高度也要从可用高度中扣除 */
  var tbEl = document.querySelector('.toolbar');
  if(tbEl) other += tbEl.offsetHeight || 0;
  var viewH = window.innerHeight || document.documentElement.clientHeight || 0;
  var avail = Math.max(120, viewH - headerH - footerH - btnH - other - 6); /* 减 tableWrap 上下边距4 + plan 上边距2 */
  var cap = avail / 2;
  var tbl = tw.querySelector('table');
  var tC = tbl ? tbl.offsetHeight : (tw.scrollHeight || 0); /* 内容自然高度，不受容器固定高度影响 */
  var pHidden = pl.classList.contains('hidden');
  var tH, pH;
  if(pHidden){
    tH = avail;
    pH = 0;
  }else{
    tH = Math.min(tC, cap);
    pH = avail - tH;
  }
  tw.style.height = Math.max(1, Math.round(tH)) + 'px';
  pl.style.height = Math.max(1, Math.round(pH)) + 'px';
}

/* 购买计算购买长度显示：组合购买时显示各档搭配，单一长度显示该长度 */
function purchaseLenText(g){
  if(g && (g.fixedMode || g.autoMix) && g.primary === 'mix' && g.mix && g.mix.length > 1)
    return g.mix.map(function(m){ return fmt(m.Ls); }).join('/');
  return (g && g.buyLen) ? fmt(g.buyLen) : '—';
}

function fillResults(){
  var inputs = $('tbody').querySelectorAll('input[data-key]');
  Array.prototype.forEach.call(inputs, function(inp){
    var key = inp.dataset.key;
    if(!COLS[state.mode].some(function(c){ return c.key === key && c.out; })) return;
    var rowNum = +inp.dataset.row + 1;
    var g = state.results && state.results.groups.find(function(x){ return x.groupKey === state.rows[+inp.dataset.row]._groupKey; });
    var rowRes = g && g.rows.find(function(x){ return x.row === rowNum; });
    if(!rowRes || !rowRes.feasible){
      inp.value = '—';
      inp.title = rowRes && rowRes.reason ? rowRes.reason : '';
      return;
    }
    var v = null;
    if(key === 'cutLen') v = rowRes.material;
    else if(key === 'cutCnt') v = rowRes.Nd;
    else if(key === 'wasteLen') v = rowRes.wasteLen;
    else if(key === 'wasteCnt') v = rowRes.wasteCnt;
    else if(key === 'buyLen'){ inp.value = purchaseLenText(g); inp.title = ''; return; }
    else if(key === 'buyCnt') v = rowRes.buyCnt;
    inp.value = (v === null || v === undefined) ? '—' : fmt(v);
    inp.title = '';
  });
  Array.prototype.forEach.call($('tbody').children, function(tr, i){
    var g = state.results && state.results.groups.find(function(x){ return x.groupKey === state.rows[i]._groupKey; });
    var rr = g && g.rows.find(function(x){ return x.row === i + 1; });
    tr.classList.toggle('invalid-row', !!(rr && !rr.feasible));
  });
}

/* ---------- 方案 ---------- */
function renderPlan(){
  var el = $('plan');
  if(!state.results){
    el.classList.remove('hidden');
    el.innerHTML = '<div class="plan-empty">「开始计算」后，此处显示排料方案表。</div>';
    return;
  }
  var r = state.results, html = '<h3>计算结果（排料表方案）</h3>';
  r.groups.forEach(function(g, gi){
    html += '<div class="plan-block">';
    html += '<h3><span class="idx">' + (gi + 1) + '</span>直径 <span class="dia-mark">⌀</span>' + esc(g.dia) + '</h3>';
    if(state.mode === 'fwd'){
      html += '<div class="meta">原材料：' + g.bars.map(function(b){ return fmtM(b.Ls) + 'm×' + b.cnt + '根'; }).join('；')
        + '　实际使用：' + g.cut.usedBars + ' 根' + (g.cut.usedBars < g.stockBars ? '（剩余 ' + (g.stockBars - g.cut.usedBars) + ' 根）' : '') + '</div>';
    }else{
      if(g.noSolution){
        html += '<div class="meta" style="color:var(--err);">无可行购买方案：请提高接头限制或填写更长固定长度。</div>';
        html += '</div>';
        return;
      }
      if(g.fixedMode || g.autoMix){
        var mixTxt = (g.mix && g.mix.length)
          ? g.mix.map(function(m){ return fmtM(m.Ls) + 'm × ' + m.cnt + '根'; }).join(' ＋ ')
          : (g.buyLen ? fmtM(g.buyLen) + 'm × ' + g.usedBars + '根' : '');
        html += '<div class="meta">购买方案（' + (g.fixedMode ? '推荐' : '自动优化：4m/6m/9m 常见定尺组合') + '）：<b>' + mixTxt + '</b>，共 <b>' + g.usedBars + ' 根</b>；废料 ' + fmtM(g.totalWaste) + ' m</div>';
        if(g.autoMix && g.mixReason) html += '<div class="plan-note" style="color:var(--warn);">' + esc(g.mixReason) + '</div>';
      }else{
        html += '<div class="meta">购买方案：<b>' + fmtM(g.buyLen) + ' m × ' + g.usedBars + ' 根</b>，废料 ' + fmtM(g.totalWaste) + ' m（自动优化）</div>';
      }
    }
    /* 需求与结果明细：剪裁=需求/下料/段料构成；购买=购买长度(型号)/数量 */
    if(state.mode === 'rev'){
      html += '<table class="plan-table"><colgroup><col style="width:22%"><col style="width:40%"><col style="width:38%"></colgroup><tr><th>购买直径</th><th>购买长度(mm)</th><th>购买数量(根)</th></tr>';
      var pu = (g.cut && g.cut.barUsed && g.cut.barUsed.length) ? g.cut.barUsed : [{Ls:g.buyLen, cnt:g.usedBars}];
      pu.forEach(function(m){
        html += '<tr><td>' + fmt(g.dia) + '</td><td>' + fmt(m.Ls) + '</td><td>' + fmt(m.cnt) + '</td></tr>';
      });
      html += '</table>';
    }else{
      html += '<table class="plan-table"><colgroup><col style="width:10%"><col style="width:18%"><col style="width:14%"><col style="width:58%"></colgroup><tr><th>序号</th><th>需求长度mm</th><th>需求数量</th><th>段料构成</th></tr>';
      g.rows.forEach(function(row){
        if(!row.feasible){
          html += '<tr><td>' + row.row + '</td><td colspan="3" style="color:var(--err);text-align:left;">' + esc(row.reason) + '</td></tr>';
          return;
        }
        html += '<tr><td>' + row.row + '</td><td>' + fmt(row.Ld) + '</td><td>' + fmt(row.Nd) + '</td>'
          + '<td>' + row.segs.map(function(s){ return fmt(s.len) + '×' + s.cnt; }).join(' + ')
          + '</td></tr>';
      });
      html += '</table>';
    }
    /* 排料表：每根原材料怎么切 */
    html += '<div style="margin-top:10px;font-size:13px;color:var(--accent-deep);font-weight:600;">裁切方案</div>';
    html += '<table class="plan-table"><colgroup><col style="width:22%"><col style="width:36%"><col style="width:14%"><col style="width:28%"></colgroup><tr><th>原料长度mm</th><th>切割方案</th><th>切割数量</th><th>本方案废料</th></tr>';
    g.cut.patterns.forEach(function(p){
      var fill = p.items.reduce(function(a, it){ return a + it.len * it.cnt; }, 0);
      html += '<tr><td>' + fmt(p.Ls) + '</td><td>'
        + p.items.map(function(it){
          var t = fmt(it.len) + '×' + it.cnt;
          if(it.use && it.use.length){
            t += '（' + it.use.map(function(u){ return '第' + u.row + '行' + (u.cnt > 1 ? '×' + u.cnt : ''); }).join('、') + '）';
          }
          return t;
        }).join(' ＋ ')
        + '</td><td>' + p.bars + '</td><td>' + (Math.round(p.Ls - fill) <= 0 ? '0' : fmt(p.Ls - fill) + '×' + p.bars) + '</td></tr>';
    });
    html += '<tr><td colspan="2" style="background:var(--head-bg);font-weight:600;">组汇总（共切 ' + g.cut.usedBars + ' 根）</td><td style="background:var(--head-bg);font-weight:600;">' + g.cut.usedBars + '</td>'
      + '<td style="background:var(--head-bg);font-weight:600;">下料 ' + fmtM(g.material) + 'm<br>废料 ' + fmtM(g.cut.waste) + 'm（' + (g.material + g.cut.waste > 0 ? (100 * g.cut.waste / (g.material + g.cut.waste)).toFixed(2) + '%' : '0%') + '）</td></tr>';
    html += '</table>';
    if(g.shortage > 0){
      html += '<div class="plan-note" style="color:var(--err);">原材料总长不足：缺口约 ' + fmt(g.shortage) + ' mm，未满足段料 ' + g.cut.unmet.map(function(u){ return fmt(u.len) + 'mm×' + u.cnt; }).join('、') + '，请补充原材料或调整需求。</div>';
    }
    if(g.infeasible && g.infeasible.length){
      html += '<div class="plan-note" style="color:var(--warn);">该组有 ' + g.infeasible.length + ' 行需求无法满足（接头限制不足），已排除出优化，请调整接头数量或改用更长原材料。</div>';
    }
    html += '</div>';
  });
  html += '<div class="plan-note">注：裁切长度已含搭接损耗(搭接两侧各占一段)</div>';
  el.innerHTML = html;
  el.classList.remove('hidden');
}

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* ---------- 数据读取与校验 ---------- */
function readRows(){
  var errors = [], warns = [], data = [], used = false;
  var inCols = COLS[state.mode].filter(function(c){ return c.in; });
  var optKeys = (state.mode === 'fwd') ? ['joint','lap','knownCnt'] : ['joint','lap'];
  state.rows.forEach(function(row, i){
    var vals = {};
    inCols.forEach(function(c){ vals[c.key] = (row[c.key] || '').trim(); });
    var any = inCols.some(function(c){ return vals[c.key] !== ''; });
    if(!any) return;
    used = true;
    var required = inCols.filter(function(c){ return optKeys.indexOf(c.key) < 0; });
    var emptyFields = required.filter(function(c){ return vals[c.key] === ''; });
    if(emptyFields.length){
      errors.push('第' + (i + 1) + '行缺少：' + emptyFields.map(function(c){ return colLabel(c.key); }).join('、'));
      return;
    }
    var diaStr = vals.dia.trim();
    var diaNum = Number(diaStr.replace(/[,\s]/g,''));
    var diaKey = isFinite(diaNum) ? String(diaNum) : diaStr;
    if(isFinite(diaNum) && diaNum <= 0){ errors.push('第' + (i + 1) + '行直径无效'); return; }
    var num = {};
    inCols.forEach(function(c){
      if(c.key === 'dia') return;
      var s = vals[c.key];
      if(s === ''){ num[c.key] = 0; return; }
      var n = Number(s.replace(/[,\s]/g,''));
      num[c.key] = isFinite(n) ? n : NaN;
    });
    var bad = inCols.filter(function(c){ return c.key !== 'dia' && !isFinite(num[c.key]); });
    if(bad.length){ errors.push('第' + (i + 1) + '行数字无效：' + bad.map(function(c){ return colLabel(c.key); }).join('、')); return; }
    ['knownLen','lap','reqLen'].forEach(function(k){
      if(k in num && num[k] !== 0 && num[k] !== Math.round(num[k])) warns.push('第' + (i + 1) + '行' + colLabel(k) + '含小数，已按四舍五入至 1mm 计算');
    });
    if(num.reqLen <= 0){ errors.push('第' + (i + 1) + '行需求长度必须大于 0'); return; }
    if(num.reqCnt < 1 || !Number.isInteger(num.reqCnt)){ errors.push('第' + (i + 1) + '行需求数量必须为≥1的整数'); return; }
    if(state.mode === 'fwd'){
      if(num.knownLen <= 0){ errors.push('第' + (i + 1) + '行已知长度必须大于 0'); return; }
      if(num.knownCnt < 0 || !Number.isInteger(num.knownCnt)){ errors.push('第' + (i + 1) + '行已知数量必须为≥0的整数'); return; }
    }
    if(num.joint < 0 || !Number.isInteger(num.joint)){ errors.push('第' + (i + 1) + '行限制接头数量必须为≥0的整数'); return; }
    if(num.lap < 0){ errors.push('第' + (i + 1) + '行搭接长度不能为负'); return; }
    data.push({
      row: i + 1, dia: diaKey,
      Ld: Math.round(num.reqLen), Nd: num.reqCnt,
      J: num.joint, La: Math.round(num.lap),
      knownLen: Math.round(num.knownLen), knownCnt: num.knownCnt
    });
  });
  return {ok: errors.length === 0, errors: errors, warns: warns, data: data, used: used};
}

function colLabel(key){
  var c = COLS[state.mode].find(function(x){ return x.key === key; });
  return c ? c.label : key;
}

/* 按直径分组 */
function groupByDia(data){
  var map = new Map();
  data.forEach(function(d){
    var key = d.dia;
    if(!map.has(key)) map.set(key, {key:key, demands:[], bars:[]});
    var g = map.get(key);
    g.demands.push({row:d.row, dia:key, Ld:d.Ld, Nd:d.Nd, J:d.J, La:d.La});
    if(state.mode === 'fwd'){
      var found = g.bars.find(function(b){ return b.Ls === d.knownLen; });
      if(found) found.cnt += d.knownCnt; else g.bars.push({Ls:d.knownLen, cnt:d.knownCnt});
    }
  });
  return Array.from(map.values());
}

/* ---------- 计算 ---------- */
function onCalc(){
  var parsed = readRows();
  if(!parsed.ok){ toast(parsed.errors[0] + (parsed.errors.length > 1 ? '（共' + parsed.errors.length + '处错误）' : ''), 'err'); return; }
  if(!parsed.used){ toast('请至少填写一行数据', 'err'); return; }
  if(state.mode === 'fwd'){
    var totalStock = parsed.data.reduce(function(a, d){ return a + d.knownCnt; }, 0);
    if(totalStock <= 0){ toast('请填写已知数量（原材料根数）', 'err'); return; }
  }
  var fixedLens = null;
  if(state.mode === 'rev'){
    var arr = [], bad = null;
    Array.prototype.forEach.call(document.querySelectorAll('.fixed-len-input'), function(inp){
      var v = inp.value.trim();
      if(!v) return;
      var n = Math.round(Number(v.replace(/[,\s]/g,'')));
      if(!isFinite(n) || n <= 0){ bad = v; return; }
      if(arr.indexOf(n) < 0) arr.push(n);
    });
    if(bad !== null){ toast('固定购买长度无效：' + bad, 'err'); return; }
    fixedLens = arr.length ? arr.sort(function(a,b){ return a - b; }) : null;
  }
  var groups = groupByDia(parsed.data);
  if(groups.length === 0){ toast('没有有效数据', 'err'); return; }
  var rowGroup = {};
  groups.forEach(function(g){ g.demands.forEach(function(d){ rowGroup[d.row] = g.key; }); });
  var warnings = [];
  parsed.warns.forEach(function(w){ warnings.push({type:'warn', msg:w}); });
  $('btnCalc').disabled = true;
  $('btnCalc').textContent = '计算中…';
  setTimeout(function(){
    var resGroups = [];
    try{
      groups.forEach(function(g){
        if(state.mode === 'fwd'){
          var res = solveForwardGroup({bars:g.bars, demands:g.demands});
          res.groupKey = g.key; res.dia = g.key;
          res.stockBars = g.bars.reduce(function(a,b){ return a + b.cnt; }, 0);
          if(res.shortage > 0) warnings.push({type:'err', msg:'直径 ' + g.key + '：原材料不足，缺口约 ' + fmt(res.shortage) + 'mm'});
          if(res.infeasible.length) warnings.push({type:'warn', msg:'直径 ' + g.key + '：' + res.infeasible.length + ' 行需求接头不足，已排除'});
          resGroups.push(res);
        }else{
          var res2 = solveReverseGroup(g.demands, fixedLens);
          if(!res2.best){
            warnings.push({type:'err', msg:'直径 ' + g.key + '：指定购买长度均不可行（请提高接头限制或填写更长固定长度）'});
            resGroups.push({groupKey:g.key, dia:g.key, noSolution:true, fixedMode:!!(fixedLens && fixedLens.length), fixedLens: fixedLens ? fixedLens.slice() : null, rejected: res2.rejected || [], rows:[], cut:{patterns:[], usedBars:0, waste:0, unmet:[]},
              material:0, infeasible:[], buyLen:null, usedBars:0, topCands:[]});
            return;
          }
          var b = res2.best;
          b.groupKey = g.key; b.dia = g.key;
          b.fixedMode = !!(fixedLens && fixedLens.length);
          b.fixedLens = fixedLens ? fixedLens.slice() : null;
          b.rejected = res2.rejected || [];
          resGroups.push(b);
        }
      });
    }catch(e){
      toast('计算失败：' + e.message, 'err');
      $('btnCalc').disabled = false;
      $('btnCalc').textContent = '开始计算';
      return;
    }
    state.results = {groups: resGroups, warnings: warnings, fixedLens: fixedLens};
    state.rows.forEach(function(row, i){ row._groupKey = rowGroup[i + 1] || null; });
    fillResults();
    renderPlan();
    markChosenFixed();
    layoutMiddle();
    $('btnDownload').disabled = false;
    $('btnCalc').disabled = false;
    $('btnCalc').textContent = '开始计算';
    对话框1.弹出提示("计算完成");
  }, 30);
}

/* ---------- 云支付（参考 chuangkou27：APP 内拉起微信支付 / 浏览器弹出二维码轮询） ---------- */
function 发起支付(){
  var 价格 = 读写设置.读取设置("37fl");
  if(文本操作.取文本长度(价格)<1){ 价格 = "10"; }   /* 默认 10 元/次，可在设置中修改 37fl */
  价格 = 公用模块.到数值(价格);
  if(!(价格>0)){ 对话框1.弹出提示("请先在「设置」中配置支付金额（37fl）"); return; }
  var goods = "钢筋配置计算费"+价格+"元";
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
  onCalc();   /* 支付完成回调 ok：显示计算结果 */
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

/* 标记被选为最优的固定购买长度档位（绿色高亮），并更新提示文字 */
function markChosenFixed(){
  var chosen = [];
  if(state.results){
    state.results.groups.forEach(function(g){
      if(!g.fixedMode || g.noSolution) return;
      var lens = [];
      if(g.primary === 'mix' && g.mix && g.mix.length) g.mix.forEach(function(m){ lens.push(m.Ls); });
      else if(g.buyLen) lens.push(g.buyLen);
      lens.forEach(function(n){ if(chosen.indexOf(n) < 0) chosen.push(n); });
    });
  }
  Array.prototype.forEach.call(document.querySelectorAll('.fixed-len-input'), function(inp){
    var v = Math.round(Number((inp.value || '').replace(/[,\s]/g, '')));
    var hit = chosen.length > 0 && isFinite(v) && chosen.indexOf(v) >= 0;
    inp.classList.toggle('fixed-chosen', hit);
    inp.title = hit ? '本档被选为最优购买长度' : '';
  });
}

/* ---------- 清空结果 ---------- */
function clearResults(){
  if(!state.results) return;
  state.results = null;
  state.rows.forEach(function(r){ delete r._groupKey; });
  fillResults();
  renderPlan();
  markChosenFixed();
  layoutMiddle();
  $('btnDownload').disabled = true;
}

/* ==================== 下载报告：横向 Word 文档（.docx：已知表 + 计算结果方案） ==================== */
/* ---- ZIP store 打包（docx 即 zip 容器） ---- */
function crc32(u8){
  var table = crc32.table;
  if(!table){
    table = crc32.table = [];
    for(var i = 0; i < 256; i++){
      var c = i;
      for(var j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      table[i] = c >>> 0;
    }
  }
  var crc = 0xFFFFFFFF;
  for(var k = 0; k < u8.length; k++) crc = table[(crc ^ u8[k]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}
function u8(s){ return new TextEncoder().encode(s); }
function zipStore(entries){
  var local = [], central = [], offset = 0;
  entries.forEach(function(e){
    var nameU = u8(e.name), data = e.data, crc = crc32(data);
    var lh = new Uint8Array(30 + nameU.length), dv = new DataView(lh.buffer);
    dv.setUint32(0, 0x04034b50, true); dv.setUint16(4, 20, true); dv.setUint16(6, 0, true);
    dv.setUint16(8, 0, true); dv.setUint16(10, 0, true); dv.setUint16(12, 0, true);
    dv.setUint32(14, crc, true); dv.setUint32(18, data.length, true); dv.setUint32(22, data.length, true);
    dv.setUint16(26, nameU.length, true); dv.setUint16(28, 0, true);
    lh.set(nameU, 30);
    local.push(lh, data);
    var ch = new Uint8Array(46 + nameU.length), cv = new DataView(ch.buffer);
    cv.setUint32(0, 0x02014b50, true); cv.setUint16(4, 20, true); cv.setUint16(6, 20, true);
    cv.setUint16(8, 0, true); cv.setUint16(10, 0, true); cv.setUint16(12, 0, true);
    cv.setUint16(14, 0, true); cv.setUint32(16, crc, true); cv.setUint32(20, data.length, true);
    cv.setUint32(24, data.length, true); cv.setUint16(28, nameU.length, true);
    cv.setUint16(30, 0, true); cv.setUint16(32, 0, true); cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true); cv.setUint32(38, 0, true); cv.setUint32(42, offset, true);
    ch.set(nameU, 46);
    central.push(ch);
    offset += lh.length + data.length;
  });
  var cdSize = central.reduce(function(a, b){ return a + b.length; }, 0);
  var eocd = new Uint8Array(22), ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true); ev.setUint16(4, 0, true); ev.setUint16(6, 0, true);
  ev.setUint16(8, entries.length, true); ev.setUint16(10, entries.length, true);
  ev.setUint32(12, cdSize, true); ev.setUint32(16, offset, true); ev.setUint16(20, 0, true);
  var parts = local.concat(central, [eocd]);
  var total = parts.reduce(function(a, b){ return a + b.length; }, 0);
  var out = new Uint8Array(total), p = 0;
  parts.forEach(function(b){ out.set(b, p); p += b.length; });
  return out;
}
/* ---- WordprocessingML 片段生成 ---- */
function wfont(sz, bold){
  return '<w:rPr><w:rFonts w:ascii="Calibri" w:eastAsia="微软雅黑" w:hAnsi="Calibri"/>'
    + (bold ? '<w:b/>' : '') + '<w:sz w:val="' + sz + '"/><w:szCs w:val="' + sz + '"/></w:rPr>';
}
function wrun(text, sz, bold){
  return '<w:r>' + wfont(sz, bold) + '<w:t xml:space="preserve">' + esc(text) + '</w:t></w:r>';
}
function wpara(text, sz, bold, before){
  var pr = '<w:spacing w:after="40"' + (before ? ' w:before="120"' : '') + '/>';
  return '<w:p><w:pPr>' + pr + '</w:pPr>' + (text == null ? '' : wrun(text, sz, bold)) + '</w:p>';
}
function wcell(text, width, bold, fill, span){
  return '<w:tc><w:tcPr><w:tcW w:w="' + width + '" w:type="dxa"/>'
    + (span > 1 ? '<w:gridSpan w:val="' + span + '"/>' : '')
    + (fill ? '<w:shd w:val="clear" w:color="auto" w:fill="' + fill + '"/>' : '')
    + '<w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="0"/></w:pPr>'
    + wrun(text == null ? '' : text, 18, bold) + '</w:p></w:tc>';
}
function wtable(headers, rows, widths){
  var sum = widths.reduce(function(a, b){ return a + b; }, 0);
  var border = ['top','left','bottom','right','insideH','insideV'].map(function(e){
    return '<w:' + e + ' w:val="single" w:sz="4" w:color="8EA9DB"/>';
  }).join('');
  return '<w:tbl><w:tblPr><w:tblW w:w="' + sum + '" w:type="dxa"/><w:tblBorders>' + border + '</w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr>'
    + '<w:tblGrid>' + widths.map(function(w){ return '<w:gridCol w:w="' + w + '"/>'; }).join('') + '</w:tblGrid>'
    + '<w:tr>' + headers.map(function(h, i){ return wcell(h, widths[i], true, 'D9E2F3'); }).join('') + '</w:tr>'
    + rows.map(function(rr){ return '<w:tr>' + rr.map(function(c, i){
        var span = 1, txt = c;
        if(c instanceof Array){ txt = c[0]; span = c[1] || 1; }
        var w = 0, k;
        for(k = 0; k < span && i + k < widths.length; k++) w += widths[i + k];
        return wcell(txt, w, false, null, span);
      }).join('') + '</w:tr>'; }).join('')
    + '</w:tbl>';
}
function buildDocx(){
  if(!state.results) return null;
  var X = [], now = new Date();
  X.push('<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:before="80" w:after="120"/></w:pPr>' + wrun('钢筋配料计算报告', 36, true) + '</w:p>');
  X.push(wpara('计算成果来自 "电力测量计算器" --> 生成时间：' + now.toLocaleString('zh-CN') + '　计算模式：' + (state.mode === 'fwd' ? '裁料计算（按已有原材料计算最省料裁切方案）' : '购买计算（优化购买长度与数量，计算最省料购买方案）') , 18, false, false));
  X.push(wpara('焊接方式：' + (state.weld === 'double' ? '双面焊（搭接长度 = 5×直径）' : '单面焊（搭接长度 = 10×直径）') + '（国标 JGJ 18-2012 电弧焊搭接）', 18, false, false));
  X.push(wpara('精度：1mm（输入含小数按四舍五入）。搭接长度在输入直径或切换焊接方式后自动按国标或输入值计算。', 18, false, false));
  X.push(wpara('一、算法推理方法', 28, true, true));
  ['1) 分组：按直径分组，同直径各行的原材料与需求合并为同一优化问题。',
   '2) 段料拆解：需求长度超过原材料时，按"限制接头数量"设置接头，成品拆为 接头数+1 段；',
   '3) 搭接时两侧各占一段，单件下料 = 需求长度 + 接头数 × 2 × 搭接长度；段料按长短交错拆解（大段贴近整根、短段聚合补位），且每段不超过原料长度mm。',
   '4) 兜底：剩余段料以最长适配优先放入剩余原材料，并与结果比较取更优。'
  ].forEach(function(t){ X.push(wpara(t, 20, false, false)); });
  X.push(wpara('二、已知数据表', 28, true, true));
  if(state.mode === 'fwd'){
    var w1 = [900, 1400, 2300, 2100, 1900, 2100, 2300, 2100];
    var r1 = state.rows.map(function(r, i){
      return [i + 1, r.dia || '', r.knownLen || '', r.knownCnt || '', r.joint || '', r.lap || '', r.reqLen || '', r.reqCnt || ''];
    });
    X.push(wtable(['序号','直径','已知长度(mm)','已知数量(根)','限制接头','搭接长度(mm)','需求长度(mm)','需求数量(根)'], r1, w1));
  }else{
    var w2 = [1100, 2000, 3300, 3000, 2600, 3000];
    var r2 = state.rows.map(function(r, i){
      return [i + 1, r.dia || '', r.reqLen || '', r.reqCnt || '', r.joint || '', r.lap || ''];
    });
    X.push(wtable(['序号','直径','需求长度(mm)','需求数量(根)','限制接头','搭接长度(mm)'], r2, w2));
    X.push(wpara('固定购买长度：' + (state.results.fixedLens && state.results.fixedLens.length ? state.results.fixedLens.join('、') + 'mm' : '（未填，自动优化）'), 20, false, false));
  }
  X.push(wpara('三、计算结果（排料表方案）', 28, true, true));
  state.results.groups.forEach(function(g, gi){
    X.push(wpara((gi + 1) + '. 直径 ⌀' + g.dia , 24, true, true));
    if(g.noSolution){
      X.push(wpara('无可行购买方案：请提高接头限制或填写更长固定长度。', 20, false, false));
      return;
    }
    if(state.mode === 'fwd'){
      X.push(wpara('原材料：' + g.bars.map(function(b){ return fmt(b.Ls) + 'mm×' + b.cnt + '根'; }).join('；') + '实际使用：' + g.cut.usedBars + '根' + (g.cut.usedBars < g.stockBars ? '（剩余' + (g.stockBars - g.cut.usedBars) + '根）' : ''), 20, false, false));
    }else{
      if(g.fixedMode || g.autoMix){
        if(g.mix && g.mix.length) X.push(wpara((g.autoMix ? '常见定尺组合购买方案：' : '组合购买方案：') + g.mix.map(function(m){ return fmt(m.Ls) + 'mm×' + m.cnt + ' 根'; }).join('＋') + '，共 ' + g.usedBars + '根' + (g.primary === 'mix' ? '（废' + fmt(g.totalWaste) + 'mm）' : ''), 20, false, false));
        if(g.singleBest && g.singleBest.buyLen) X.push(wpara('单一长度参考：' + fmt(g.singleBest.buyLen) + 'mm×' + g.singleBest.usedBars + ' 根（废' + fmt(g.singleBest.totalWaste) + 'mm）' + (g.primary === 'single' ? '（推荐）' : ''), 20, false, false));
        if(g.autoMix){
          X.push(wpara('最优购买方案：' + g.mix.map(function(m){ return fmt(m.Ls) + 'mm×' + m.cnt + ' 根'; }).join('＋') + '，共 ' + g.usedBars + ' 根（自动优化：4m/6m/9m 常见定尺中废料最少的组合）', 20, true, false));
          if(g.mixReason) X.push(wpara('说明：' + g.mixReason, 18, false, false));
        }else{
          X.push(wpara('最优购买长度：' + fmt(g.buyLen) + ' mm，购买 ' + fmt(g.usedBars) + ' 根（从已输入的 ' + ((g.fixedLens || []).length) + ' 档固定长度中配置）', 20, true, false));
        }
        var cmp = [];
        (g.topCands || []).forEach(function(c){ cmp.push(fmt(c.Lp) + 'mm（废' + fmt(c.waste) + 'mm/' + c.bars + '根）'); });
        (g.rejected || []).forEach(function(c){ cmp.push(fmt(c.Lp) + 'mm（不可用：' + c.reason + '）'); });
        if(cmp.length) X.push(wpara('已输入选项逐档评估：' + cmp.join('；'), 18, false, false));
      }else{
        X.push(wpara('最优购买长度：' + fmt(g.buyLen) + ' mm，购买 ' + fmt(g.usedBars) + ' 根（自动优化）', 20, true, false));
      }
    }
    if(state.mode === 'rev'){
      var w3r = [4500, 6100, 4500];
      var pu2 = (g.cut && g.cut.barUsed && g.cut.barUsed.length) ? g.cut.barUsed : [{Ls:g.buyLen, cnt:g.usedBars}];
      var r3r = pu2.map(function(m){ return [fmt(g.dia), fmt(m.Ls), fmt(m.cnt)]; });
      X.push(wpara('购买方案明细（型号/长度/数量）：', 20, true, false));
      X.push(wtable(['购买直径','购买长度(mm)','购买数量(根)'], r3r, w3r));
    }else{
      var w3 = [2300, 4500, 2300, 6000];
      var r3 = g.rows.map(function(row){
        if(!row.feasible) return [row.row, '无法满足：' + row.reason, '', ''];
        return [row.row, fmt(row.Ld), fmt(row.Nd),
          row.segs.map(function(s){return fmt(s.len) + '×' + s.cnt; }).join('+')];
      });
      X.push(wpara('需求与裁切明细：', 20, true, false));
      X.push(wtable(['序号','需求长度mm','需求数量','段料构成'], r3, w3));
    }
    var w4 = [2600, 6400, 1600, 2400];
    var r4 = g.cut.patterns.map(function(p){
      var fill = p.items.reduce(function(a, it){return a + it.len * it.cnt; }, 0);
      var cutTxt = p.items.map(function(it){
        var t = fmt(it.len) + '×' + it.cnt;
        if(it.use && it.use.length) t += '（' + it.use.map(function(u){return '第' + u.row + '行' + (u.cnt > 1 ? '×' + u.cnt : ''); }).join('、') + '）';
        return t;
      }).join('＋');
      var rem = p.Ls - fill;
      return [fmt(p.Ls), cutTxt, p.bars, (Math.round(rem) <= 0 ? '0' : fmt(rem) + '×' + p.bars)];
    });
    r4.push([['组汇总（共切 ' + g.cut.usedBars + ' 根）', 2], g.cut.usedBars, '下料 ' + fmt(g.material) + 'mm；废料 ' + fmt(g.cut.waste) + 'mm（' + (g.material + g.cut.waste > 0 ? (100 * g.cut.waste / (g.material + g.cut.waste)).toFixed(2) + '%' : '0%') + '）']);
    X.push(wpara('裁切方案：', 20, true, false));
    X.push(wtable(['原料长度mm','切割方案','切割数量','本方案废料'], r4, w4));
    if(g.shortage > 0) X.push(wpara('提示：原材料总长不足，缺口约 ' + fmt(g.shortage) + 'mm，未满足段料：' + g.cut.unmet.map(function(u){ return fmt(u.len) + 'mm×' + u.cnt; }).join('、') + '，请补充原材料或调整需求。', 18, false, false));
    if(g.infeasible && g.infeasible.length) X.push(wpara('提示：该组有 ' + g.infeasible.length + ' 行需求因接头限制不足被排除，请调整接头数量或改用更长原材料。', 18, false, false));
  });
  var tp = 0, tm = 0, tw = 0, tb2 = 0;
  state.results.groups.forEach(function(g){
    g.rows.forEach(function(x){ if(x.feasible){ tp += x.Nd; tm += x.material; tw += x.wasteLen; } });
    tb2 += g.cut.usedBars;
  });
  X.push(wpara('四、总体汇总', 28, true, true));
  X.push(wpara('需求件数合计：' + fmt(tp) + '　下料总长合计（含搭接）：' + fmt(tm) + ' mm　废弃总长合计：' + fmt(tw) + ' mm（' + (tm + tw > 0 ? (100 * tw / (tm + tw)).toFixed(2) + '%' : '0%') + '）　使用原材料合计：' + fmt(tb2) + ' 根', 20, false, false));
  X.push(wpara('五、注意事项', 28, true, true));
  X.push(wpara('裁切长度已包含搭接损耗（每个接头按 2×搭接长度计入，搭接两侧各占一段）', 18, false, false));
  X.push(wpara('废料按各需求占用材料计算；段料长短交错拆解，现场可按实际下料微调', 18, false, false));
  X.push(wpara('"段料→第N行"为归属的示例匹配，同长度段料可互换使用', 18, false, false));
  X.push(wpara('裁料计算存在原材料不足或接头不足时，请补充材料或调整接头限制后重新计算', 18, false, false));
  /* A4 横向页面 */
  X.push('<w:sectPr><w:pgSz w:w="16838" w:h="11906" w:orient="landscape"/><w:pgMar w:top="1134" w:right="850" w:bottom="1134" w:left="850" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr>');
  var doc = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
    + '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
    + '<w:body>' + X.join('') + '</w:body></w:document>';
  var ct = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
    + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
    + '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
    + '<Default Extension="xml" ContentType="application/xml"/>'
    + '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
    + '</Types>';
  var rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
    + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
    + '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'
    + '</Relationships>';
  var docRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
    + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
    + '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
    + '</Relationships>';
  var styles = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
    + '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
    + '<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:eastAsia="微软雅黑" w:hAnsi="Calibri"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></w:rPrDefault>'
    + '<w:pPrDefault><w:pPr><w:spacing w:after="60" w:line="260" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>'
    + '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>';
  return zipStore([
    {name:'[Content_Types].xml', data:u8(ct)},
    {name:'_rels/.rels', data:u8(rels)},
    {name:'word/document.xml', data:u8(doc)},
    {name:'word/_rels/document.xml.rels', data:u8(docRels)},
    {name:'word/styles.xml', data:u8(styles)}
  ]);
}

function downloadReport(){
  var bin = buildDocx();
  if(!bin){ toast('请先点击"开始计算"生成结果', 'warn'); return; }
  var blob = new Blob([bin], {type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
  var a = document.createElement('a');
  var d = new Date();
  var pad = function(x){ return (x < 10 ? '0' : '') + x; };
  var name = '钢筋配料计算报告_' + d.getFullYear() + pad(d.getMonth()+1) + pad(d.getDate()) + '_' + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds()) + '.docx';
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500);
  toast('报告已下载', 'ok');
}

/* ---------- Toast ---------- */
function toast(msg, type){
  var wrap = $('toastWrap');
  var el = document.createElement('div');
  el.className = 'toast' + (type ? ' ' + type : '');
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(function(){ el.style.opacity = '0'; el.style.transition = 'opacity .4s'; }, 3200);
  setTimeout(function(){ el.remove(); }, 3700);
}

/* ---------- 事件绑定 ---------- */
function bindEvents(){
  $('btnModeToggle').addEventListener('click', function(){ switchMode(state.mode === 'fwd' ? 'rev' : 'fwd'); });   /* 计算模式切换按钮：点击在 裁料计算/购买计算 间切换 */
  $('btnWeldToggle').addEventListener('click', function(){ setWeld(state.weld === 'double' ? 'single' : 'double'); });   /* 焊接方式切换按钮：点击在 双面焊5d / 单面焊10d 间切换 */
  $('btnDownload').addEventListener('click', downloadReport);
  $('btnHelp').addEventListener('click', function(){ $('helpMask').classList.remove('hidden'); });
  function doReset(){   /* 重置示例数据（确认后执行，与 37 页一致：先弹确认框） */
    var demo = DEMO[state.mode];
    state.rows = demo.map(function(d){ return Object.assign({}, d); });
    /* 重置示例时搭接长度按当前焊接方式填充国标标准值（双面焊5d / 单面焊10d） */
    state.rows.forEach(function(r){
      var std = stdLap(r.dia, state.weld);
      if(std !== null) r.lap = String(std);
    });
    $('rowCount').value = demo.length;
    Array.prototype.forEach.call(document.querySelectorAll('.fixed-len-input'), function(inp){ inp.value = ''; });
    clearResults();
    render();
    onCalc();
  }
  $('btnReset').addEventListener('click', function(){ $('resetMask').style.display = 'flex'; });   /* 重置：弹出确认框，确认后才重置（与 37 页一致） */
  $('resetOk').addEventListener('click', function(){ $('resetMask').style.display = 'none'; doReset(); });
  $('resetCancel').addEventListener('click', function(){ $('resetMask').style.display = 'none'; });
  $('resetMask').addEventListener('click', function(e){ if(e.target === this) this.style.display = 'none'; });
  $('btnHelpClose').addEventListener('click', function(){ $('helpMask').classList.add('hidden'); });
  $('helpMask').addEventListener('click', function(e){ if(e.target === this) this.classList.add('hidden'); });
  $('btnCalc').addEventListener('click', function(){   /* 开始计算：白名单账号可直接计算无需付费；其他遵循授权门，授权通过先校验数据再发起支付，支付成功回调才计算结果 */
    /* 白名单账号（参考27页）：wx/wx1/wx2/wx3/wx4 任一等于 unionid，可直接计算无需付费 */
    if(读写设置.读取设置("wx")==读写设置.读取设置("unionid") || 读写设置.读取设置("wx1")==读写设置.读取设置("unionid") || 读写设置.读取设置("wx2")==读写设置.读取设置("unionid") || 读写设置.读取设置("wx3")==读写设置.读取设置("unionid") || 读写设置.读取设置("wx4")==读写设置.读取设置("unionid") ){
      var p0 = readRows();   /* 白名单：仍校验数据有效性，无效则提示不计算 */
      if(!p0.ok){ toast(p0.errors[0] + (p0.errors.length > 1 ? '（共' + p0.errors.length + '处错误）' : ''), 'err'); return; }
      if(!p0.used){ toast('请至少填写一行数据', 'err'); return; }
      if(state.mode === 'fwd'){
        var total0 = p0.data.reduce(function(a, d){ return a + d.knownCnt; }, 0);
        if(total0 <= 0){ toast('请填写已知数量（原材料根数）', 'err'); return; }
      }
      onCalc();   /* 白名单：直接计算结果，无需付费 */
      return;
    }
    if(!authed){   /* 未登录/登录失败/使用时间到期：按页面1对话框方式弹出提示，不计算 */
      对话框1.信息框(读写设置.读取设置("登录"),"");
      return;
    }
    var parsed = readRows();   /* 支付前先校验数据，避免支付完成后才发现输入无效 */
    if(!parsed.ok){ toast(parsed.errors[0] + (parsed.errors.length > 1 ? '（共' + parsed.errors.length + '处错误）' : ''), 'err'); return; }
    if(!parsed.used){ toast('请至少填写一行数据', 'err'); return; }
    if(state.mode === 'fwd'){
      var totalStock = parsed.data.reduce(function(a, d){ return a + d.knownCnt; }, 0);
      if(totalStock <= 0){ toast('请填写已知数量（原材料根数）', 'err'); return; }
    }
    发起支付();   /* 授权通过 + 数据有效：拉起微信支付（APP内）或弹出二维码（浏览器） */
  });
  $('btnClear').addEventListener('click', function(){   /* 清空：清除表格内容所有数据 + 输入框中所有数据 + 计算结果 */
    state.rows.forEach(function(r){
      Object.keys(r).forEach(function(k){ delete r[k]; });   /* 每行数据全部清空（保留行数与表结构） */
    });
    $('rowCount').value = '';   /* 表格行数输入框清空 */
    Array.prototype.forEach.call(document.querySelectorAll('.fixed-len-input'), function(inp){ inp.value = ''; });   /* 固定购买长度 5 档输入框清空 */
    clearResults();   /* 清空计算结果（结果列 + 方案区） */
    render();
  });
  window.addEventListener('resize', layoutMiddle);
  $('rowCount').addEventListener('change', function(){
    var n = parseInt(this.value, 10);
    if(!isFinite(n)) n = 6;
    n = Math.max(1, Math.min(100, n));
    this.value = n;
    while(state.rows.length < n) state.rows.push({});
    state.rows.length = n;
    clearResults();
    render();
  });
  Array.prototype.forEach.call(document.querySelectorAll('.fixed-len-input'), function(inp){ inp.addEventListener('input', clearResults); });
  $('tbody').addEventListener('input', function(e){
    var inp = e.target;
    if(inp.tagName !== 'INPUT' || !inp.dataset.key) return;
    var r = state.rows[+inp.dataset.row];
    var key = inp.dataset.key;
    if(COLS[state.mode].some(function(c){ return c.key === key && c.out; })) return;
    r[key] = inp.value;
    if(key === 'dia'){
      /* 输入/修改直径后，搭接长度自动按国标显示标准值（单面10d/双面5d，无条件跟随直径） */
      var std = stdLap(inp.value, state.weld);
      if(std !== null){
        r.lap = String(std);
        var lapInp = $('tbody').querySelector('input[data-row="' + inp.dataset.row + '"][data-key="lap"]');
        if(lapInp) lapInp.value = r.lap;
      }
    }
    clearResults();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') $('helpMask').classList.add('hidden');
  });
}

function switchMode(mode){
  if(state.mode === mode) return;
  state.mode = mode;
  state.rows.forEach(function(r){
    Object.keys(r).forEach(function(k){
      if(COMMON_KEYS.indexOf(k) < 0) delete r[k];
    });
  });
  var btn = $('btnModeToggle');
  btn.textContent = (mode === 'fwd') ? '裁料' : '购买';   /* 合并按钮：显示当前模式 */
  btn.classList.add('active');   /* 单按钮始终高亮表示当前模式 */
  $('fixedLenWrap').classList.toggle('hidden', mode === 'fwd');
  clearResults();
  render();
}

/* 切换焊接方式（单面焊10d / 双面焊5d）：单按钮点击切换，文案显示当前模式；已填直径的行，搭接长度无条件更新为对应标准值 */
function setWeld(mode){
  if(state.weld === mode) return;
  state.weld = mode;
  var btn = $('btnWeldToggle');
  btn.textContent = (mode === 'double') ? '双面焊' : '单面焊';   /* 合并按钮：显示当前模式 */
  btn.classList.toggle('active', mode === 'double');   /* 双面焊：实心（蓝底白字） */
  btn.classList.toggle('hollow', mode === 'single');   /* 单面焊：空心（蓝边白底蓝字） */
  state.rows.forEach(function(r){
    var std = stdLap(r.dia, mode);
    if(std === null) return;
    r.lap = String(std);
    var lapInp = $('tbody').querySelector('input[data-row="' + state.rows.indexOf(r) + '"][data-key="lap"]');
    if(lapInp) lapInp.value = r.lap;
  });
  clearResults();
  render();
}

/* ---------- 初始化 ---------- */
function 钢筋配置初始化(){
  var n = 6;
  for(var i = 0; i < n; i++) state.rows.push({});
  bindEvents();
  render();
  /* 首帧布局稳定后再校准一次中部高度（字体/布局就绪后测量更准） */
  setTimeout(layoutMiddle, 0);
  window.addEventListener('load', layoutMiddle);
}