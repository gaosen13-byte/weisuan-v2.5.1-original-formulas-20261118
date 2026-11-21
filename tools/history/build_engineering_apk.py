from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED, ZIP_STORED

base = Path('outputs/微算工程-v2.5.1-计算跳转修复版-可安装.apk')
out = Path('work/微算工程-原版公式对齐-全工程免费-unsigned.apk')
asset_root = Path('work/merged_apk4')
dex = Path('work/dexscan/classes.dex')

with ZipFile(base, 'r') as zin, ZipFile(out, 'w', ZIP_DEFLATED) as zout:
    written_assets = set()
    for info in zin.infolist():
        name = info.filename
        if name.startswith('META-INF/'):
            continue
        if name == 'classes.dex':
            data = dex.read_bytes()
        elif name.startswith('assets/apk4/'):
            p = asset_root / name[len('assets/apk4/'):]
            if p.is_file():
                data = p.read_bytes()
                written_assets.add(p.relative_to(asset_root).as_posix())
            else:
                data = zin.read(name)
        else:
            data = zin.read(name)
        zout.writestr(name, data, compress_type=ZIP_STORED if name == 'resources.arsc' else ZIP_DEFLATED)
    for p in sorted(asset_root.rglob('*')):
        if p.is_file():
            rel = p.relative_to(asset_root).as_posix()
            if rel not in written_assets:
                zout.writestr('assets/apk4/' + rel, p.read_bytes(), compress_type=ZIP_DEFLATED)
print(out)
