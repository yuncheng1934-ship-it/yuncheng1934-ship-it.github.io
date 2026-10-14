"""Restore versioned portfolio images before a GitHub Pages build."""
import hashlib
import io
import json
import zipfile
from pathlib import Path

root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / 'asset-pack/manifest.json').read_text(encoding='utf-8'))
archive = b''.join((root / 'asset-pack' / name).read_bytes() for name in manifest['parts'])
if hashlib.sha256(archive).hexdigest() != manifest['sha256']:
    raise ValueError('Asset archive checksum mismatch')
with zipfile.ZipFile(io.BytesIO(archive)) as pack:
    for entry in pack.infolist():
        if not (root / entry.filename).resolve().is_relative_to(root / 'public'):
            raise ValueError('Asset entry outside public directory')
    pack.extractall(root)
print(f"Restored {manifest['files']} portfolio image files")
