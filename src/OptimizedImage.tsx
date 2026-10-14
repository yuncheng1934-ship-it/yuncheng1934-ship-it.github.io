import type { ImgHTMLAttributes } from 'react'
import imageVariants from './image-variants.json'

type Variant = { width: number; height: number; variants: { src: string; width: number }[] }
const variants = imageVariants as Record<string, Variant>

export function OptimizedImage({ src, loading = 'lazy', sizes = '(max-width: 640px) 90vw, (max-width: 1200px) 45vw, 600px', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const image = src ? variants[src] : undefined
  const list = image?.variants
  return <img {...props} src={list?.[list.length - 1].src || src}
    srcSet={list && list.length > 1 ? list.map(item => `${item.src} ${item.width}w`).join(', ') : undefined}
    sizes={list && list.length > 1 ? sizes : undefined}
    width={image?.width} height={image?.height} loading={loading} decoding="async" data-full-src={src} />
}
