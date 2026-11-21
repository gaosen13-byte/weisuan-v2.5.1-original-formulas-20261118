const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const root = path.resolve('work/assets/assets/apk4');
const decoder = path.resolve('work/decode_js.js');
const files = fs.readdirSync(root).filter(n => /^chuangkou\d+\.js$/.test(n));
let changed = 0;
for (const name of files) {
  const src = path.join(root, name);
  const tmp = path.resolve('work', `decoded_${name}`);
  let s;
  const raw = fs.readFileSync(src, 'utf8');
  if (raw.includes('return(0,eval)(')) {
    cp.execFileSync(process.execPath, [decoder, src, tmp], { stdio: 'inherit' });
    s = fs.readFileSync(tmp, 'utf8');
  } else {
    s = raw;
  }
  const before = s;
  s = s.replace(/\s*if\s*\(转换操作\.到数值\(读写设置\.读取设置\("注册时间"\)\)\s*<=\s*转换操作\.到数值\(读写设置\.读取设置\("限时"\)\)\s*\)\s*\{\s*读写设置\.保存设置\("手机机械码"\s*,\s*""\)\s*;\s*读写设置\.保存设置\("解锁码"\s*,\s*"123"\)\s*;\s*读写设置\.保存设置\("登录"\s*,\s*"余额不足,请充值！"\)\s*;\s*\}/g, '\n\t// 免费工程工具：不再执行旧版注册/余额门控。');
  s = s.replace(/if\s*\(\s*读写设置\.读取设置\("解锁码"\)\s*==\s*读写设置\.读取设置\("手机机械码"\)\s*\)/g, 'if (true)');
  if (s === before) continue;
  fs.writeFileSync(src, s);
  changed++;
}
console.log(`patched engineering scripts: ${changed}`);
