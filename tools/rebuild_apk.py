"""Repackage editable engineering assets with the archived Android binary shell."""
import argparse
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED, ZIP_STORED

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base', type=Path, default=ROOT / 'weisuan-v2.5.1-original-formulas.apk')
    parser.add_argument('--assets', type=Path, default=ROOT / 'source/assets/apk4')
    parser.add_argument('--output', type=Path, default=ROOT / 'build/weisuan-unsigned.apk')
    args = parser.parse_args()
    if args.output.resolve() == args.base.resolve():
        parser.error('Output must not overwrite the base APK')
    if args.output.exists():
        parser.error('Output already exists; choose a new output filename')
    if not (args.assets / 'index.html').is_file():
        parser.error('Engineering assets index.html is missing')
    files = sorted(p for p in args.assets.rglob('*') if p.is_file())
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with ZipFile(args.base) as base, ZipFile(args.output, 'w', compression=ZIP_DEFLATED) as out:
        for entry in base.infolist():
            if entry.filename.startswith(('META-INF/', 'assets/apk4/')):
                continue
            compression = ZIP_STORED if entry.filename == 'resources.arsc' else ZIP_DEFLATED
            out.writestr(entry.filename, base.read(entry.filename), compress_type=compression)
        for path in files:
            out.write(path, 'assets/apk4/' + path.relative_to(args.assets).as_posix())
    print(f'Created unsigned APK with {len(files)} engineering resource files: {args.output}')


if __name__ == '__main__':
    main()
