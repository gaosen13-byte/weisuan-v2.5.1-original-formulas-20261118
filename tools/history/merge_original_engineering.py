from pathlib import Path
import re
import shutil

root = Path('work')
original = root / 'orig_extract' / 'assets' / 'apps' / 'com.Powercalculator' / 'www'
current = root / 'fixed_extract' / 'assets' / 'apk4'
merged = root / 'merged_apk4'

if merged.exists():
    shutil.rmtree(merged)
shutil.copytree(original, merged)

# Preserve current-tool additions that are not part of the original package.
for name in ('chidu', 'custom_formula.html'):
    src = current / name
    dst = merged / name
    if src.is_dir():
        shutil.copytree(src, dst)
    elif src.is_file():
        shutil.copy2(src, dst)

gate = re.compile(
    r'\s*if\s*\(转换操作\.到数值\(读写设置\.读取设置\("注册时间"\)\)\s*<=\s*'
    r'转换操作\.到数值\(读写设置\.读取设置\("限时"\)\)\s*\)\s*\{\s*'
    r'读写设置\.保存设置\("手机机械码"\s*,\s*""\)\s*;\s*'
    r'读写设置\.保存设置\("解锁码"\s*,\s*"123"\)\s*;\s*'
    r'读写设置\.保存设置\("登录"\s*,\s*"余额不足,请充值！"\)\s*;\s*\}', re.S)
unlock = re.compile(
    r'if\s*\(\s*读写设置\.读取设置\("解锁码"\)\s*==\s*'
    r'读写设置\.读取设置\("手机机械码"\)\s*\)')

changed = 0
for src in sorted((root / 'orig_decoded').glob('chuangkou*.js')):
    text = src.read_text(encoding='utf-8')
    patched = gate.sub('\n\t// 免费工程工具：移除原版余额/注册门控。', text)
    patched = unlock.sub('if (true)', patched)
    (merged / src.name).write_text(patched, encoding='utf-8', newline='')
    if patched != text:
        changed += 1

# Keep the current tool-library landing page and add every original page as a link.
index = (current / 'index.html').read_text(encoding='utf-8')
cards = [
    ('chuangkou4.html', '样板校正'), ('chuangkou5.html', '注册登录（原版页面）'),
    ('chuangkou6.html', '其他计算'), ('chuangkou7.html', '角钢预算'),
    ('chuangkou8.html', '弧垂插入法'), ('chuangkou9.html', '设计弧垂转施工弧垂'),
    ('chuangkou10.html', '基础方量'), ('chuangkou11.html', '模板角钢反坡'),
    ('chuangkou12.html', '正侧对面斜长计算'), ('chuangkou13.html', '单坡角度正反算'),
    ('chuangkou14.html', '坐标算角度距离'), ('chuangkou15.html', '斜面斜顶计算'),
    ('chuangkou16.html', '预抬计算'), ('chuangkou17.html', '连续上下山调整值'),
    ('chuangkou18.html', '基础订高桩计算'), ('chuangkou19.html', '基础浇筑计算'),
    ('chuangkou20.html', '原版工程入口'), ('chuangkou21.html', '基础检查'),
    ('chuangkou22.html', '转角塔位移计算'), ('chuangkou23.html', '创建公式'),
    ('chuangkou24.html', '自定义公式'), ('chuangkou25.html', '编辑公式'),
    ('chuangkou26.html', '价格计算'), ('chuangkou27.html', '单分裂引流计算'),
    ('chuangkou28.html', '双分裂引流计算'), ('chuangkou29.html', '三分裂引流计算'),
    ('chuangkou30.html', '四分裂引流计算'), ('chuangkou31.html', '六分裂引流计算'),
    ('chuangkou32.html', '八分裂引流计算'), ('chuangkou33.html', '引流计算'),
    ('chuangkou34.html', '引流辅助计算'), ('chuangkou35.html', '十分裂引流计算'),
    ('chuangkou36.html', '钢筋配置计算'), ('chuangkou37.html', '牵引力计算'),
]
extra = ''.join(f'<a class="card" href="{href}"><strong>{title}</strong><span>原版公式页面，已移除余额门控</span></a>' for href, title in cards)
marker = '    <p class="footer">'
index = index.replace(marker, '    <h2>原版完整工程页面</h2>\n    <div class="grid">' + extra + '</div>\n' + marker, 1)
(merged / 'index.html').write_text(index, encoding='utf-8', newline='')

remaining = list(merged.glob('chuangkou*.js'))
fee_remaining = sum('余额不足,请充值' in p.read_text(encoding='utf-8') for p in remaining)
print(f'merged pages={len(remaining)} patched_scripts={changed} fee_scripts_remaining={fee_remaining}')
