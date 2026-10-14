import { useState } from 'react'
import excerptData from './video-excerpts.json'

type Excerpt = {
  label: string
  dialogueLanguage: string
  script?: { kind: string; text: string }[]
  storyboard?: string[][]
}
const excerpts = excerptData as Record<string, Excerpt>
const fields = ['镜号', '时长（秒）', '景别', '机位', '运镜', '画面与动作', '表演与微表情', '台词／旁白', '音效']
const fieldWidths = [64, 86, 90, 140, 130, 290, 170, 250, 180]
const hasValue = (value: string | undefined) => !!value?.trim() && !/^[—–\-\s]+$/.test(value)

export function VideoExcerpts({ projectId }: { projectId: string }) {
  const content = excerpts[projectId]
  const hasScript = !!content?.script?.length
  const hasStoryboard = !!content?.storyboard?.length
  const [tab, setTab] = useState<'script' | 'storyboard'>(hasScript ? 'script' : 'storyboard')
  if (!hasScript && !hasStoryboard) return null
  const active = tab === 'script' && hasScript ? 'script' : hasStoryboard ? 'storyboard' : 'script'
  const columns = fields.map((label, index) => ({ label, index })).filter(({ index }) => content.storyboard?.some(row => hasValue(row[index])))
  return <section className="video-excerpts section-tight" aria-labelledby={`excerpts-${projectId}`}>
    <div className="excerpt-heading">
      <div><h2 id={`excerpts-${projectId}`}>创作手稿</h2><p>{content.label} · 精选片段</p></div>
      <div className="excerpt-tabs" role="tablist" aria-label="创作手稿类型">
        {hasScript && <button type="button" role="tab" id={`script-tab-${projectId}`} aria-selected={active === 'script'} aria-controls={`excerpt-panel-${projectId}`} onClick={() => setTab('script')}>剧本片段</button>}
        {hasStoryboard && <button type="button" role="tab" id={`storyboard-tab-${projectId}`} aria-selected={active === 'storyboard'} aria-controls={`excerpt-panel-${projectId}`} onClick={() => setTab('storyboard')}>分镜脚本片段</button>}
      </div>
    </div>
    <div role="tabpanel" id={`excerpt-panel-${projectId}`} aria-labelledby={`${active}-tab-${projectId}`} tabIndex={0}>
      {active === 'script' ? <div className="script-excerpt">{content.script?.map((block, i) => <p key={i} className={`script-${block.kind}`}>{block.text}</p>)}</div> : <>
        <div className="storyboard-table-wrap" tabIndex={0} aria-label="精选分镜，可横向滚动">
          <table className="storyboard-table" style={{ minWidth: columns.reduce((sum, field) => sum + fieldWidths[field.index], 0) }}>
            <colgroup>{columns.map(field => <col key={field.index} style={{ width: fieldWidths[field.index] }} />)}</colgroup>
            <thead><tr>{columns.map(field => <th key={field.index} scope="col">{field.label}</th>)}</tr></thead>
            <tbody>{content.storyboard?.map((row, i) => <tr key={i}>{columns.map(field => <td key={field.index} lang={field.index === 7 ? content.dialogueLanguage : 'zh-CN'}>{hasValue(row[field.index]) ? row[field.index] : ''}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <div className="storyboard-mobile">{content.storyboard?.map((row, i) => <article key={i} className="storyboard-shot"><dl>{columns.filter(field => hasValue(row[field.index])).map(field => <div key={field.index}><dt>{field.label}</dt><dd lang={field.index === 7 ? content.dialogueLanguage : 'zh-CN'}>{row[field.index]}</dd></div>)}</dl></article>)}</div>
      </>}
    </div>
  </section>
}
