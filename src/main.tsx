import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { allVideos, designCategories, homeCategories, profile, videoGroups, type VideoAsset, type VideoProject } from './data'
import './styles.css'
import { OptimizedImage } from './OptimizedImage'
import { VideoExcerpts } from './VideoExcerpts'

function FitText({ text, accent, shrinkOnly = false, className = '' }: { text: string; accent?: string; shrinkOnly?: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const box = ref.current
    const line = box?.firstElementChild as HTMLElement | null
    if (!box || !line) return
    const fit = () => {
      const maximumSize = shrinkOnly ? parseFloat(getComputedStyle(box).fontSize) : Infinity
      line.style.transform = 'none'
      line.style.fontSize = '100px'
      const measured = line.getBoundingClientRect().width
      if (measured > 0) {
        line.style.fontSize = `${Math.min(maximumSize, 100 * (box.clientWidth - (shrinkOnly ? 2 : 0)) / measured)}px`
        line.style.transformOrigin = 'left center'
        line.style.transform = shrinkOnly ? 'none' : `scaleX(${box.clientWidth / line.getBoundingClientRect().width})`
      }
    }
    const observer = new ResizeObserver(fit)
    observer.observe(box)
    void document.fonts.ready.then(fit)
    fit()
    return () => observer.disconnect()
  }, [text, shrinkOnly])
  return <span className={`fit-text ${className}`} ref={ref}><span>{accent && text.startsWith(accent) ? <><em className="fit-text-accent">{accent}</em>{text.slice(accent.length)}</> : text}</span></span>
}

const detailTitles = [...designCategories.map((item) => item.title), ...allVideos.map((item) => item.title), '视频创作']
function DetailHeading({ title }: { title: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const heading = ref.current
    if (!heading) return
    const fit = () => {
      const style = getComputedStyle(heading)
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) return
      context.font = `700 48px ${style.fontFamily}`
      const longest = Math.max(...detailTitles.map((text) => context.measureText(text).width))
      heading.style.fontSize = `${Math.min(48, 48 * (heading.clientWidth - 2) / longest)}px`
    }
    const observer = new ResizeObserver(fit)
    observer.observe(heading)
    void document.fonts.ready.then(fit)
    return () => observer.disconnect()
  }, [])
  return <h1 className="single-line-title" translate="no" ref={ref}>{title}</h1>
}

type GalleryImage = { src: string; alt: string }
function ImageViewer({ route }: { route: string }) {
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [index, setIndex] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const touchStart = useRef(0)
  const close = () => setGallery([])
  const change = (delta: number) => setIndex((current) => (current + delta + gallery.length) % gallery.length)
  useEffect(() => {
    close()
    const images = Array.from(document.querySelectorAll<HTMLImageElement>('main img'))
    images.forEach((image) => {
      if (image.hasAttribute('data-no-zoom')) {
        image.classList.remove('zoomable-image')
        image.removeAttribute('tabindex')
        image.removeAttribute('role')
        image.removeAttribute('aria-label')
        image.title = '点击查看视频详情'
        return
      }
      image.classList.add('zoomable-image')
      image.tabIndex = 0
      image.setAttribute('role', 'button')
      image.setAttribute('aria-label', `放大查看：${image.alt || '作品图片'}`)
      image.title = '点击放大查看，可左右切换'
    })
    const open = (event: Event) => {
      const target = event.target
      if (!(target instanceof HTMLImageElement) || !target.closest('main') || target.hasAttribute('data-no-zoom')) return
      if (event instanceof KeyboardEvent && !['Enter', ' '].includes(event.key)) return
      event.preventDefault()
      event.stopPropagation()
      const group = target.closest('.project-grid, .materials-wrap, .category-row, .video-group, .hero-studio-visual, .about-profile-top, .contact-card-grid') || target.parentElement
      const unique = new Map<string, GalleryImage>()
      group?.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
        const source = image.dataset.fullSrc || image.src
        if (source) unique.set(source, { src: source, alt: image.alt || '作品图片' })
      })
      const items = [...unique.values()]
      if (!items.length) return
      lastFocus.current = target
      setIndex(Math.max(0, items.findIndex((image) => image.src === (target.dataset.fullSrc || target.src))))
      setGallery(items)
    }
    document.addEventListener('click', open, true)
    document.addEventListener('keydown', open, true)
    return () => {
      document.removeEventListener('click', open, true)
      document.removeEventListener('keydown', open, true)
    }
  }, [route])
  useEffect(() => {
    if (!gallery.length) return
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, .site-header, footer'))
    background.forEach((element) => { element.inert = true })
    dialogRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') { event.preventDefault(); change(-1) }
      if (event.key === 'ArrowRight') { event.preventDefault(); change(1) }
      if (event.key === 'Tab') {
        const buttons = Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>('button') || [])
        const first = buttons[0], last = buttons[buttons.length - 1]
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = oldOverflow
      background.forEach((element) => { element.inert = false })
      document.removeEventListener('keydown', onKey)
      lastFocus.current?.focus({ preventScroll: true })
    }
  }, [gallery])
  if (!gallery.length) return null
  return <div className="image-viewer" role="dialog" aria-modal="true" aria-label="图片放大查看" tabIndex={-1} ref={dialogRef}
    onClick={(event) => { if (event.target === event.currentTarget) close() }}
    onTouchStart={(event) => { touchStart.current = event.changedTouches[0].clientX }}
    onTouchEnd={(event) => { const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 50) change(delta > 0 ? -1 : 1) }}>
    <button className="viewer-close" onClick={close} aria-label="关闭图片">×</button>
    <button className="viewer-prev" onClick={() => change(-1)} aria-label="上一张图片" disabled={gallery.length < 2}>‹</button>
    <figure><img src={gallery[index].src} alt={gallery[index].alt} /><figcaption aria-live="polite">{gallery[index].alt} <span>{index + 1} / {gallery.length}</span></figcaption></figure>
    <button className="viewer-next" onClick={() => change(1)} aria-label="下一张图片" disabled={gallery.length < 2}>›</button>
  </div>
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="打开导航"><span /><span /><span /></button>
        <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="主导航">
          <a href="#/" onClick={() => setOpen(false)}>首页</a>
          <div className="nav-dropdown">
            <button type="button">作品 <span>＋</span></button>
            <div className="dropdown-panel">{homeCategories.map((item) => <a key={item.slug} href={item.href} onClick={() => setOpen(false)}>{item.title}</a>)}</div>
          </div>
          <a href="#/?section=contact" onClick={() => setOpen(false)}>联系方式</a>
        </nav>
      </div>
    </header>
  )
}

function VisualPlaceholder({ code, className = '', index }: { code: string; className?: string; index?: number }) {
  return <div className={`visual-placeholder ${className}`} aria-label="作品图片占位"><span>{code}{index ? ` ${String(index).padStart(2, '0')}` : ''}</span><em aria-hidden="true">✦</em><i>IMAGE PLACEHOLDER</i></div>
}

function Home() {
  const heroRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const hero = heroRef.current
    const image = hero?.querySelector<HTMLImageElement>('.hero-character')
    if (!hero || !image) return
    const fitCharacter = () => {
      if (window.innerWidth <= 900) {
        hero.style.removeProperty('--hero-character-scale')
        return
      }
      const ratio = image.naturalWidth && image.naturalHeight ? image.naturalWidth / image.naturalHeight : 1672 / 941
      const paintedHeight = Math.min(image.clientHeight, image.clientWidth / ratio)
      const preferredScale = window.innerWidth <= 1180 ? 1.25 : 1.43
      // Reserve headroom for the fixed header, depth projection and pointer parallax.
      if (paintedHeight) hero.style.setProperty('--hero-character-scale', String(Math.min(preferredScale, (hero.clientHeight - 104) / paintedHeight)))
    }
    const observer = new ResizeObserver(fitCharacter)
    observer.observe(hero)
    observer.observe(image)
    image.addEventListener('load', fitCharacter)
    window.addEventListener('resize', fitCharacter)
    fitCharacter()
    return () => { observer.disconnect(); image.removeEventListener('load', fitCharacter); window.removeEventListener('resize', fitCharacter) }
  }, [])

  const handleHeroPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const hero = heroRef.current
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = hero.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    hero.style.setProperty('--hero-mx', `${(x * 16).toFixed(1)}px`)
    hero.style.setProperty('--hero-my', `${(y * 12).toFixed(1)}px`)
    hero.style.setProperty('--hero-ry', `${(x * 3.2).toFixed(2)}deg`)
    hero.style.setProperty('--hero-rx', `${(y * -1.8).toFixed(2)}deg`)
  }

  const resetHeroPointer = () => {
    heroRef.current?.style.setProperty('--hero-mx', '0px')
    heroRef.current?.style.setProperty('--hero-my', '0px')
    heroRef.current?.style.setProperty('--hero-ry', '0deg')
    heroRef.current?.style.setProperty('--hero-rx', '0deg')
  }

  return (
    <>
      <Header />
      <main>
        <section
          className="hero hero-studio"
          id="top"
          ref={heroRef}
          onPointerMove={handleHeroPointerMove}
          onPointerLeave={resetHeroPointer}
          aria-labelledby="hero-title"
        >
          <div className="hero-particle-field" aria-hidden="true" />
          <div className="hero-studio-glow hero-studio-glow-a" aria-hidden="true" />
          <div className="hero-studio-inner">
            <div className="hero-studio-copy">
              <h1 id="hero-title">
                <span className="hero-title-cn"><em>用创意</em><strong>记录有趣的世界</strong></span>
              </h1>
              <div className="hero-actions">
                <a className="primary-button" href="#/?section=work">浏览我的作品 <span aria-hidden="true">↗</span></a>
                <a className="secondary-button" href="#/?section=about">关于我 <span aria-hidden="true">→</span></a>
              </div>
            </div>

            <div className="hero-studio-visual" aria-label="白绿服装女孩与猫在电脑前创作的 AIGC IP 形象">
              <figure className="hero-fragment hero-fragment-a" aria-hidden="true"><OptimizedImage src="/works/videos/ta-qing-ming-mv/cover-v2.jpg" alt="" sizes="220px" fetchPriority="low" /><figcaption>FILM / 01</figcaption></figure>
              <figure className="hero-fragment hero-fragment-b" aria-hidden="true"><OptimizedImage src="/works/videos/gui-ze-game/cover-v2.jpg" alt="" sizes="220px" fetchPriority="low" /><figcaption>GAME / 02</figcaption></figure>
              <figure className="hero-fragment hero-fragment-c" aria-hidden="true"><OptimizedImage src="/works/commercial/commercial-02.webp" alt="" sizes="220px" fetchPriority="low" /><figcaption>DESIGN / 03</figcaption></figure>
              <div className="hero-filmstrip" aria-hidden="true">
                <OptimizedImage src="/works/videos/ta-qing-ming-mv/cover-v2.jpg" alt="" sizes="100px" fetchPriority="low" />
                <OptimizedImage src="/works/videos/gui-ze-game/cover-v2.jpg" alt="" sizes="100px" fetchPriority="low" />
                <OptimizedImage src="/works/videos/moscato-tvc/cover-v2.jpg" alt="" sizes="100px" fetchPriority="low" />
                <OptimizedImage src="/works/commercial/commercial-02.webp" alt="" sizes="100px" fetchPriority="low" />
              </div>
              <div className="hero-character-wrap">
                <OptimizedImage className="hero-character" src="/hero-girl-desk-v2.png" alt="穿白绿服装的女孩托腮坐在桌前，身旁有猫和电脑" loading="eager" fetchPriority="high" />
              </div>
              <div className="hero-mark hero-mark-a" aria-hidden="true">✦</div>
              <div className="hero-mark hero-mark-b" aria-hidden="true">＋</div>
            </div>
          </div>
        </section>

        <section className="about section about-profile" id="about">
          <div className="about-profile-top">
            <div className="about-profile-copy">
              <div className="about-name-lockup">
                <h2><FitText text={profile.name} /></h2>
              </div>
              <div className="about-role-line"><FitText text="AIGC 内容创作者" accent="AIGC" /></div>
              <p className="about-fields"><FitText text="AI 视觉 × AI 视频 × 内容创作" /></p>
              <div className="about-profile-summary">
                <p><FitText text="累计拥有 8 年的内容创作与运营经验" /></p>
                <p><FitText text="近 2 年专注于 AIGC 视觉与视频的创作" /></p>
                <p><FitText text="能够独立完成创意策划、脚本与分镜" /></p>
                <p><FitText text="角色和场景资产、AI 生成及后期成片" /></p>
              </div>
            </div>
            <figure className="about-profile-photo">
              <OptimizedImage src="/profile-shiyuncheng.png" alt="石韵程个人照片" sizes="(max-width: 760px) 90vw, 420px" />
              <figcaption>AIGC CREATOR</figcaption>
            </figure>
          </div>

          <div className="about-stats" aria-label="个人创作数据">
            <div className="about-stat"><strong>8年</strong><span>内容相关创作及运营经验</span></div>
            <div className="about-stat"><strong>20+</strong><span>AI 视频创作</span></div>
            <div className="about-stat"><strong>200+</strong><span>直播运营及内容创作</span></div>
            <div className="about-stat"><strong>1500万+</strong><span>内容覆盖用户</span></div>
          </div>

          <div className="about-capabilities">
            <div className="about-capabilities-heading"><h3>核心能力</h3><span>CAPABILITIES</span></div>
            <div className="about-capability-grid">
              <article className="about-capability"><span>01</span><div><h4>创意策划</h4><p>内容方向 · 脚本拆解 · 分镜设计</p></div></article>
              <article className="about-capability"><span>02</span><div><h4>视觉资产</h4><p>角色场景 · 风格设定 · AIGC 视觉</p></div></article>
              <article className="about-capability"><span>03</span><div><h4>AI 视频制作</h4><p>镜头生成 · 视频制作 · 一致性控制</p></div></article>
              <article className="about-capability"><span>04</span><div><h4>后期成片</h4><p>视频剪辑 · 特效合成 · 商业输出</p></div></article>
            </div>
          </div>
        </section>

        <section className="work section" id="work">
          <div className="section-kicker">SELECTED CATEGORIES</div>
          <div className="work-heading"><h2>作品分类</h2><p>涵盖商业视觉、IP 与 VI、品牌标志与字体，以及 AIGC 视频完整案例。</p></div>
          <div className="category-list">
            {homeCategories.map((item) => (
              <article className="category-row" key={item.slug}>
                <div className="category-copy">
                  <p>{item.en}</p><h3 translate="no"><FitText text={item.title} shrinkOnly /></h3><div>{item.description}</div>
                  <a className="outline-button" href={item.href}>查看全部</a>
                </div>
                <div className={`category-preview preview-${item.slug} ${item.slug === 'aigc-video' ? 'category-preview-video' : ''}`}>
                  {item.previews ? (
                    <>
                      <div className="preview-media preview-large">
                        <OptimizedImage src={item.previews[0]} alt={`${item.title}作品 1`} />
                        {item.slug === 'aigc-video' && <><span className="preview-video-index">01</span><span className="preview-video-format">9:16</span><span className="preview-video-label">AIGC VIDEO PROJECT</span><span className="preview-video-play">▶</span></>}
                      </div>
                      <div className="preview-media preview-small">
                        <OptimizedImage src={item.previews[1]} alt={`${item.title}作品 2`} />
                        {item.slug === 'aigc-video' && <><span className="preview-video-index">02</span><span className="preview-video-format">16:9</span><span className="preview-video-label">AIGC VIDEO PROJECT</span><span className="preview-video-play">▶</span></>}
                      </div>
                    </>
                  ) : (
                    <>
                      <VisualPlaceholder code={item.shortCode} className="preview-large" />
                      <VisualPlaceholder code={item.shortCode} className="preview-small" />
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section contact-profile" id="contact">
          <div className="contact-profile-head">
            <div className="contact-title-block">
              <p>CONTACT ME</p>
              <h2><span>CONTACT</span><b>联系<strong>我</strong></b></h2>
            </div>
            <div className="contact-invite">
              <p>如果你喜欢我的AI内容创作，<br />欢迎随时联系我。</p>
            </div>
          </div>

          <div className="contact-info-heading"><b>CONTACT</b><strong>INFO</strong><span /></div>
          <div className="contact-card-grid">
            <article className="contact-card contact-card-wechat">
              <div className="contact-card-head"><span className="contact-card-icon" aria-hidden="true">◉</span><div><b>微信</b><small>WECHAT</small></div></div>
              <div className="contact-qr-window"><img src="/wechat-qr-shiyuncheng.jpg" alt="石韵程微信二维码" /></div>
              <p>扫码添加微信<br />欢迎交流合作</p>
            </article>
            <article className="contact-card">
              <div className="contact-card-head"><span className="contact-card-icon" aria-hidden="true">⌖</span><div><b>坐标</b><small>LOCATION</small></div></div>
              <strong>{profile.location}</strong><span className="contact-card-location">BEIJING</span>
            </article>
            <a className="contact-card" href={`tel:${profile.phone}`}>
              <div className="contact-card-head"><span className="contact-card-icon" aria-hidden="true">☎</span><div><b>手机号</b><small>PHONE</small></div></div>
              <strong>{profile.phone}</strong><i aria-hidden="true">↗</i>
            </a>
            <a className="contact-card contact-card-email" href={`mailto:${profile.email}`}>
              <div className="contact-card-head"><span className="contact-card-icon" aria-hidden="true">@</span><div><b>邮箱</b><small>EMAIL</small></div></div>
              <strong><FitText text={profile.email} shrinkOnly /></strong><i aria-hidden="true">↗</i>
            </a>
          </div>
        </section>
      </main>
      <footer><p>{profile.name} · AIGC 内容创作作品集</p><p>© 2026 · AIGC CREATIVE PORTFOLIO</p><a href="#/">回到顶部</a></footer>
    </>
  )
}

function SiteFooter() {
  return <footer><p>{profile.name} · AIGC 内容创作作品集</p><p>© 2026 · AIGC CREATIVE PORTFOLIO</p><a href="#/">返回首页</a></footer>
}

function CategoryPage({ slug }: { slug: string }) {
  const category = designCategories.find((item) => item.slug === slug)
  if (!category) return <NotFound />
  return (
    <>
      <Header />
      <main className="inner-page">
        <section className="page-title">
          <div><a className="back-button" href="#/"><span aria-hidden="true">←</span> 返回首页</a><p>DESIGN CATEGORY / {category.shortCode}</p><DetailHeading title={category.title} /></div>
          <div className="page-title-aside"><span>{category.en}</span><p>{category.description}</p></div>
        </section>
        <section className={`project-grid section-tight project-grid-${slug}`}>
          {category.projects.map((project) => (
            <article className={`project-card ratio-${project.ratio}`} key={project.id}>
              {project.image ? <OptimizedImage className="project-image" src={project.image} alt={project.name} /> : <VisualPlaceholder code={category.shortCode} className="project-image" />}
              <div className="project-meta"><div><span>{project.type}</span><h2>{project.name}</h2></div><p>{project.description}</p></div>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

function VideosPage() {
  return (
    <>
      <Header />
      <main className="inner-page video-index">
        <section className="page-title page-title-green">
          <div><a className="back-button" href="#/"><span aria-hidden="true">←</span> 返回首页</a><p>AIGC VIDEO / THREE COLLECTIONS</p><DetailHeading title="视频创作" /></div>
          <div className="page-title-aside"><span>AI VIDEO CREATION</span><p>按创作方向浏览视频项目，点击封面查看视频及创作资产。</p></div>
        </section>
        {videoGroups.map((group) => (
          <section className="video-group section-tight" key={group.id}>
            <div className="group-heading">
              <div>
                <p className="group-eyebrow">{group.subtitle}</p>
                <h2>{group.title}</h2>
              </div>
              <div className="group-meta">
                <span>{group.projects.length} 个视频</span>
                <p>{group.description}</p>
              </div>
            </div>
            <div className="video-grid">
              {group.projects.map((project, projectIndex) => (
                <a className={`video-card ratio-${project.ratio}`} href={`#/video/${project.id}`} key={project.id}>
                  <div className="video-cover-frame">
                    <OptimizedImage className="video-cover" src={project.cover} alt={`${project.title} 视频封面`} data-no-zoom="true" />
                    <div className="video-cover-shade" aria-hidden="true" />
                    <span className="video-cover-index">{String(projectIndex + 1).padStart(2, '0')}</span>
                    <span className="video-cover-format">{project.ratio === 'portrait' ? '9:16' : '16:9'}</span>
                    <div className="video-cover-title"><small>AIGC VIDEO PROJECT</small></div>
                    <span className="video-cover-play" aria-hidden="true">▶</span>
                  </div>
                  <div className="video-card-meta">
                    <span>{project.type}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <small>{project.episodes.length} 集 · {formatTotalDuration(project.episodes)}</small>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  )
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return `${m}'${String(s).padStart(2, '0')}"`
}

function formatTotalDuration(episodes: { durationSec: number }[]): string {
  const total = episodes.reduce((acc, ep) => acc + ep.durationSec, 0)
  return formatDuration(total)
}

function MaterialSection({ title, assets }: { title: string; assets?: VideoAsset[] }) {
  if (!assets?.length) return null
  return (
    <section className="material-section">
      <div className="material-heading"><h2>{title}</h2><span>{String(assets.length).padStart(2, '0')} ASSETS</span></div>
      <div className="material-grid">
        {assets.map((asset) => <figure className="material-image" key={asset.src}><OptimizedImage src={asset.src} alt={asset.alt} /></figure>)}
      </div>
    </section>
  )
}

function VideoDetailPage({ project }: { project: VideoProject }) {
  return (
    <>
      <Header />
      <main className="inner-page detail-page">
        <section className="detail-title">
          <p className="detail-type-label">{project.type}</p>
          <DetailHeading title={project.title} />
          {project.englishTitle && <p className="detail-english">{project.englishTitle}</p>}
          <div className="detail-summary">
            <p>{project.description}</p>
          </div>
          <div className="detail-actions">
            <a className="secondary-button" href="#/videos">← 返回视频作品</a>
            <a className="back-button" href="#/"><span aria-hidden="true">←</span> 返回首页</a>
          </div>
        </section>
        <section className="player-section">
          <div className="player-shell">
            {project.episodes.map((episode) => (
              episode.bvid ? (
                <div className="player-frame" key={episode.id}>
                  <div className="player-frame-label"><span>{episode.title} · {formatDuration(episode.durationSec)}</span>{episode.bilibiliUrl && <a href={episode.bilibiliUrl} target="_blank" rel="noreferrer">在 B 站打开 ↗</a>}</div>
                  <iframe loading="lazy" src={`https://player.bilibili.com/player.html?bvid=${episode.bvid}&page=1&high_quality=1&danmaku=0&autoplay=0`} title={`${project.title} - ${episode.title}`} allowFullScreen scrolling="no" frameBorder="0" />
                </div>
              ) : (
                <div className="player-placeholder" key={episode.id}>
                  <span>BILIBILI PLAYER</span>
                  <strong>{episode.title} · {formatDuration(episode.durationSec)}</strong>
                  <p>尚未连接该集的 B 站公开视频；从创作中心取得 BVID 后，这里会自动显示官方播放器。</p>
                  <p className="player-spec">{episode.width} × {episode.height}</p>
                </div>
              )
            ))}
          </div>
        </section>
        <VideoExcerpts key={project.id} projectId={project.id} />
        {project.materials && (
          <div className="materials-wrap section-tight">
            <MaterialSection title="人物设定" assets={project.materials.characters} />
            <MaterialSection title="场景设定" assets={project.materials.scenes} />
            <MaterialSection title="道具 / 产品设定" assets={project.materials.props} />
            <MaterialSection title="其他素材" assets={project.materials.other} />
          </div>
        )}
        <section className="next-project section-tight">
          <h2>其他视频项目</h2>
          <a className="back-button" href="#/videos"><span aria-hidden="true">←</span> 返回视频作品</a>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

function NotFound() {
  return <><Header /><main className="not-found"><span>404</span><h1>页面不存在</h1><a className="back-button" href="#/"><span aria-hidden="true">←</span> 返回首页</a></main><SiteFooter /></>
}

function App() {
  const initialHash = window.location.hash || '#/'
  const [route, setRoute] = useState(() => initialHash.split('?')[0].replace(/^#/, '') || '/')
  const [locationHash, setLocationHash] = useState(initialHash)
  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    const handleHash = () => {
      const nextHash = window.location.hash || '#/'
      setLocationHash(nextHash)
      setRoute(nextHash.split('?')[0].replace(/^#/, '') || '/')
    }
    handleHash(); window.addEventListener('hashchange', handleHash)
    return () => {
      window.removeEventListener('hashchange', handleHash)
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])
  useEffect(() => {
    let settledFrame = 0
    const frame = window.requestAnimationFrame(() => {
      settledFrame = window.requestAnimationFrame(() => {
        const query = locationHash.split('?')[1]
        const section = new URLSearchParams(query).get('section')
        if (route === '/' && section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      })
    })
    return () => {
      window.cancelAnimationFrame(frame)
      window.cancelAnimationFrame(settledFrame)
    }
  }, [route, locationHash])
  useEffect(() => {
    const category = designCategories.find((item) => route === `/work/${item.slug}`)
    const video = allVideos.find((item) => route === `/video/${item.id}`)
    document.title = category ? `${category.title} · ${profile.name}` : video ? `${video.title} · ${profile.name}` : route === '/videos' ? `AIGC 视频 · ${profile.name}` : `${profile.name} · AIGC 内容创作作品集`
  }, [route])

  const category = designCategories.find((item) => route === `/work/${item.slug}`)
  const video = allVideos.find((item) => route === `/video/${item.id}`)
  const page = route === '/' ? <Home /> : route === '/videos' ? <VideosPage /> : category ? <CategoryPage slug={category.slug} /> : video ? <VideoDetailPage project={video} /> : <NotFound />
  return <>{page}<ImageViewer route={route} /></>
}

createRoot(document.getElementById('root')!).render(<App />)
