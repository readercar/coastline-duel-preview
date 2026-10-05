"""Package the local mockup as a self-contained conversation preview."""
import base64
import io
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent
PROJECT = ROOT.parents[2]
OUTPUT = Path('/Users/dhlee/.codex/visualizations/2026/10/03/01a10219-daa4-76e3-bba8-5aa175a7b036/pastel-flat-ui.html')


def data(path: Path, mime: str) -> str:
    return f'data:{mime};base64,' + base64.b64encode(path.read_bytes()).decode('ascii')


assets = {'battle': data(ROOT / 'assets/battle-preview.webp', 'image/webp')}
for kind in ('icons', 'faces'):
    for source in sorted((PROJECT / 'assets/resources/ui/crumble' / kind).glob('*.png')):
        image = Image.open(source)
        image.thumbnail((80, 80), Image.Resampling.NEAREST)
        output = io.BytesIO()
        image.save(output, format='WEBP', quality=92, method=6)
        assets[f'{kind}/{source.stem}'] = 'data:image/webp;base64,' + base64.b64encode(output.getvalue()).decode('ascii')

logo = Image.open(PROJECT / 'assets/resources/branding/tt-softs-ci.png')
logo.thumbnail((180, 100), Image.Resampling.LANCZOS)
output = io.BytesIO()
logo.save(output, format='PNG')
assets['ci'] = 'data:image/png;base64,' + base64.b64encode(output.getvalue()).decode('ascii')

css = (ROOT / 'style.css').read_text().replace('body{margin:0;background:#f2f4f1}', '')
css = css.replace('assets/RixYeoljeongdo-Preview.woff2', data(ROOT / 'assets/RixYeoljeongdo-Preview.woff2', 'font/woff2'))
fragment = (ROOT / 'inline.template.html').read_text()
fragment = fragment.replace('<style data-pu-style></style>', '<style>\n' + css + '\n</style>')
fragment = fragment.replace('<script data-pu-assets></script>', '<script>\nconst PASTEL_ASSETS = ' + json.dumps(assets) + ';\n</script>')
fragment = fragment.replace('<script data-pu-copy></script>', '<script>\n' + (ROOT / 'copy.js').read_text() + '\n</script>')
fragment = fragment.replace('<script data-pu-script></script>', '<script>\n' + (ROOT / 'mockup.js').read_text() + '\n</script>')
assert len(fragment.encode('utf-8')) < 1_000_000
assert '<html' not in fragment and '<body' not in fragment and '<!doctype' not in fragment.lower()
assert '\\"' not in fragment and '\\n' not in fragment
OUTPUT.write_text(fragment)
print(f'Inline preview: {OUTPUT} ({OUTPUT.stat().st_size:,} bytes)')
