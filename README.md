# 石韵程 · AIGC 内容创作作品集

个人作品集网站，使用 React、TypeScript、Vite 和 Tailwind CSS。

## 文件结构

- `src/`：网页源码。
- `asset-pack/`：网站图片的分块素材包，发布时自动还原至 `public/`。
- `.github/workflows/pages.yml`：自动构建与 GitHub Pages 发布流程。
- `src/video-excerpts.json`：精选稿件，不包含完整 Word、Excel 原稿。

这里只包含网站源码与展示素材，不包含本地审核截图、账号配置或原项目的 Git 历史。

## 首次发布

仓库名称：`yuncheng1934-ship-it.github.io`。

上传完成后，在仓库的 Settings → Pages → Source 中选择 **GitHub Actions**。发布流程会还原图片、构建网页并发布，无需购买域名。

发布完成后的预期网址为 `https://yuncheng1934-ship-it.github.io/`；预期网址不代表部署已经成功。

## 本地开发

```powershell
pnpm install --frozen-lockfile
python scripts/unpack-assets.py
pnpm run dev
```

## 更新发布文件

```powershell
pnpm run build
```

提交更新后的 `src/` 文件，GitHub Pages 会重新发布。修改图片时需同步更新素材包及校验清单。网页使用轻量预览图，点击放大查看原图；二维码保留原图清晰度。

网站中的图片与设计作品仅用于个人作品集展示。公开访问不等于授权他人使用作品。
