"""Generate display-only WebP variants. Source images are never overwritten."""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
OUTPUT = PUBLIC / 'optimized'
OUTPUT.mkdir(exist_ok=True)
manifest = {}
original_bytes = preview_bytes = 0
paths = [PUBLIC / 'hero-girl-desk-v2.png', PUBLIC / 'profile-shiyuncheng.png']
paths += sorted((PUBLIC / 'works').rglob('*.webp'))
paths += sorted((PUBLIC / 'works').rglob('*v2.jpg'))
for path in paths:
    with Image.open(path) as source:
        source = ImageOps.exif_transpose(source)
        width, height = source.size
        sizes = [1536] if path.name.startswith('hero-') else [480, 768] if path.name.startswith('profile-') else [480, 960]
        variants = []
        for maximum in sizes:
            target = min(width, maximum)
            if any(v['width'] == target for v in variants):
                continue
            digest = hashlib.sha256(path.read_bytes() + f'webp-v1-{target}-84'.encode()).hexdigest()[:20]
            output = OUTPUT / f'{digest}.webp'
            picture = source.copy()
            picture.thumbnail((target, round(height * target / width)), Image.Resampling.LANCZOS)
            if picture.mode not in ('RGB', 'RGBA'):
                picture = picture.convert('RGBA' if 'transparency' in picture.info else 'RGB')
            if not output.exists():
                picture.save(output, 'WEBP', quality=84, method=6)
            variants.append({'src': '/optimized/' + output.name, 'width': picture.width})
        key = '/' + path.relative_to(PUBLIC).as_posix()
        manifest[key] = {'width': width, 'height': height, 'variants': variants}
        original_bytes += path.stat().st_size
        preview_bytes += (PUBLIC / variants[-1]['src'].lstrip('/')).stat().st_size
(ROOT / 'src' / 'image-variants.json').write_text(json.dumps(manifest, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print(json.dumps({'images': len(manifest), 'originalBytes': original_bytes, 'displayBytes': preview_bytes, 'savedPercent': round(100 * (1 - preview_bytes / original_bytes), 1)}))
