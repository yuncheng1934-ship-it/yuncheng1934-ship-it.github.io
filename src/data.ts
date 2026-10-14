export type DesignProject = { id: string; name: string; type: string; description: string; ratio: 'landscape' | 'portrait' | 'square'; image?: string }
export type DesignCategory = { slug: string; shortCode: string; title: string; en: string; description: string; projects: DesignProject[] }

export const profile = {
  name: '石韵程',
  role: 'AIGC 内容创作者',
  location: '北京·朝阳区',
  phone: '18047118924',
  email: '18047118924@163.com',
  summary: '拥有 8 年内容创作与运营经验，近 2 年专注 AIGC 视觉设计，并持续参与 AIGC 视频制作。能够独立完成从创意策划、脚本与分镜，到角色与场景资产搭建、AI 视觉及视频生成、后期剪辑成片的完整流程。',
  jobTarget: '求职方向包括 AIGC 视频创作、分镜脚本、剧本设计及相关内容创作岗位。',
  experiences: [
    { period: '2024.04—2026.10', company: '知了互动（北京）科技有限公司', role: 'AIGC 内容创作（平面＋视频）' },
    { period: '2021.03—2024.03', company: '北京易汇众盟网络技术有限公司', role: '运营主管（直播＋社群营销内容）' },
    { period: '2018.04—2021.01', company: '北京布洛克文化传媒有限公司', role: '新媒体内容运营' },
  ],
  skills: ['AI 视频制作', '分镜设计', '脚本拆解', '角色与场景资产', 'AIGC 视觉', '一致性控制', '后期剪辑', '商业内容制作'],
}

export const designCategories: DesignCategory[] = [
  {
    slug: 'commercial', shortCode: 'CVD', title: '商业视觉设计', en: 'COMMERCIAL VISUAL DESIGN',
    description: '覆盖服饰、数码、食品、美妆与生活方式等品类，以真实商业需求为导向完成产品呈现、信息编排与视觉氛围塑造。',
    projects: [
      { id: 'commercial-01', name: 'MOKU 情侣装新品拼贴海报', type: '服饰 / 电商 Banner', description: '以拼贴版式呈现情侣装新品，兼顾人物氛围、服装展示与促销信息层级。', ratio: 'landscape', image: '/works/commercial/commercial-01.webp' },
      { id: 'commercial-02', name: 'Soundora 沉浸式降噪耳机', type: '数码产品 / 电商 Banner', description: '以蓝色科技界面组织耳机产品卖点，强化降噪功能与未来感。', ratio: 'landscape', image: '/works/commercial/commercial-02.webp' },
      { id: 'commercial-03', name: 'VIZEN 无人机：飞向更远之境', type: '数码产品 / 电商 Banner', description: '结合户外影像与产品参数，建立专业、探索感的无人机广告视觉。', ratio: 'landscape', image: '/works/commercial/commercial-03.webp' },
      { id: 'commercial-04', name: '冰雪中的机械键盘', type: '数码产品 / 电商 Banner', description: '通过冰雪材质与冷色光效强化机械键盘的性能感与使用场景。', ratio: 'landscape', image: '/works/commercial/commercial-04.webp' },
      { id: 'commercial-05', name: '好曲奇，好心情！', type: '食品 / 电商 Banner', description: '多口味包装结合高饱和黄色，建立轻松、明快的零食消费氛围。', ratio: 'landscape', image: '/works/commercial/commercial-05.webp' },
      { id: 'commercial-06', name: '次世代霓虹游戏手柄', type: '游戏数码 / 电商 Banner', description: '用霓虹光效和沉浸式界面表达游戏设备的速度感与科技属性。', ratio: 'landscape', image: '/works/commercial/commercial-06.webp' },
      { id: 'commercial-07', name: '水果气泡饮活力海报', type: '饮品 / 电商 Banner', description: '以漫画式字体和水果元素构建年轻、高能量的饮品广告画面。', ratio: 'landscape', image: '/works/commercial/commercial-07.webp' },
      { id: 'commercial-08', name: '真实食材，美好生活', type: '食品 / 电商 Banner', description: '通过自然食材、包装与早餐场景传达健康、可信赖的产品感受。', ratio: 'landscape', image: '/works/commercial/commercial-08.webp' },
      { id: 'commercial-09', name: 'VYRO 运动智能手表', type: '智能穿戴 / 电商 Banner', description: '以人物运动状态和产品特写共同突出智能手表的轻量与活力。', ratio: 'landscape', image: '/works/commercial/commercial-09.webp' },
      { id: 'commercial-10', name: '青柠气泡饮清爽果香海报', type: '饮品 / 电商 Banner', description: '以柠檬实拍质感和醒目标题营造清爽、天然的季节限定视觉。', ratio: 'landscape', image: '/works/commercial/commercial-10.webp' },
      { id: 'commercial-11', name: '618 美妆梦幻抓娃机', type: '美妆 / 竖版电商海报', description: '以抓娃机场景承载美妆促销信息，突出节日氛围与电商转化重点。', ratio: 'portrait', image: '/works/commercial/commercial-11.webp' },
      { id: 'commercial-12', name: '天然食材，快乐猫咪', type: '宠物食品 / 竖版电商海报', description: '通过食材、包装与宠物形象建立清晰的品质感和亲和力。', ratio: 'portrait', image: '/works/commercial/commercial-12.webp' },
      { id: 'commercial-13', name: '果香缤纷复古饮品海报', type: '饮品 / 竖版电商海报', description: '运用复古海报语言和高饱和水果色彩强化产品的年轻气质。', ratio: 'portrait', image: '/works/commercial/commercial-13.webp' },
      { id: 'commercial-14', name: '桃香绽放奢华香氛', type: '香氛 / 竖版电商海报', description: '以桃子、花朵和通透材质塑造温柔、精致的香氛产品氛围。', ratio: 'portrait', image: '/works/commercial/commercial-14.webp' },
      { id: 'commercial-15', name: '沉浸之声：星环降噪耳机', type: '数码产品 / 竖版电商海报', description: '用深色宇宙场景与金属产品特写表现耳机的沉浸体验。', ratio: 'portrait', image: '/works/commercial/commercial-15.webp' },
      { id: 'commercial-16', name: '草地上的活力健身装备', type: '运动生活 / 竖版电商海报', description: '以户外草地和成套装备构建健康、轻松的运动生活方式。', ratio: 'portrait', image: '/works/commercial/commercial-16.webp' },
      { id: 'commercial-17', name: '草莓芝士蛋糕冰淇淋', type: '食品 / 竖版电商海报', description: '以高饱和粉色和人物场景打造年轻、愉悦的冰淇淋新品视觉。', ratio: 'portrait', image: '/works/commercial/commercial-17.webp' },
      { id: 'commercial-18', name: '跃动蓝境：NEXORA 潮流球鞋', type: '运动鞋服 / 竖版电商海报', description: '低机位人物构图结合高对比蓝色，突出球鞋的潮流与运动属性。', ratio: 'portrait', image: '/works/commercial/commercial-18.webp' },
      { id: 'commercial-19', name: '阳光零食缤纷旅行拼贴', type: '休闲食品 / 竖版电商海报', description: '用手绘图形和旅行符号组织多产品信息，传达轻松有趣的零食体验。', ratio: 'portrait', image: '/works/commercial/commercial-19.webp' },
      { id: 'commercial-20', name: '霓虹街头态度广告', type: '潮流服饰 / 竖版电商海报', description: '以低机位街拍和黑绿高对比排版强化年轻、直接的街头态度。', ratio: 'portrait', image: '/works/commercial/commercial-20.webp' },
      { id: 'commercial-21', name: '风起之间，携光而行', type: '时尚箱包 / 竖版电商海报', description: '人物动态、天空与流动面料共同营造轻盈、优雅的品牌画面。', ratio: 'portrait', image: '/works/commercial/commercial-21.webp' },
      { id: 'commercial-22', name: '香脆芝士薯片活力广告', type: '休闲食品 / 竖版电商海报', description: '以蓝橙撞色、飞散薯片与大标题建立直接有力的货架视觉。', ratio: 'portrait', image: '/works/commercial/commercial-22.webp' },
    ],
  },
  {
    slug: 'ip-vi', shortCode: 'IPV', title: 'IP 形象及 VI 延展', en: 'IP & VISUAL IDENTITY',
    description: '以 NESTO 猫咪 IP 为核心，从角色设定、表情动作到产品与海报延展，呈现一套完整的视觉系统。',
    projects: [
      { id: 'ipvi-01', name: 'NESTO 同伴｜核心形象', type: 'IP 形象 / 主视觉', description: '以黑白橙配色和鲜明神态建立角色识别，完成核心形象与品牌气质定义。', ratio: 'landscape', image: '/works/ip-vi/ipvi-01.webp' },
      { id: 'ipvi-02', name: 'NESTO｜角色设定', type: 'IP 形象 / 三视图', description: '通过正侧背结构、色彩规范与细节拆解，建立可持续延展的角色标准。', ratio: 'landscape', image: '/works/ip-vi/ipvi-02.webp' },
      { id: 'ipvi-03', name: 'NESTO｜表情系统', type: 'IP 延展 / 表情设计', description: '围绕不同情绪设计表情与轮廓变化，丰富角色在社交内容中的表达能力。', ratio: 'landscape', image: '/works/ip-vi/ipvi-03.webp' },
      { id: 'ipvi-04', name: 'NESTO｜动作系统', type: 'IP 延展 / 动作设计', description: '用多组姿态与动作测试角色的动态表现，保证不同场景下的形象一致性。', ratio: 'landscape', image: '/works/ip-vi/ipvi-04.webp' },
      { id: 'ipvi-05', name: 'NESTO｜产品细节', type: 'VI 延展 / 产品设计', description: '将角色图形转化为织标、徽章与包袋细节，验证品牌元素在实体载体上的适配。', ratio: 'landscape', image: '/works/ip-vi/ipvi-05.webp' },
      { id: 'ipvi-06', name: 'NESTO｜产品配色', type: 'VI 延展 / 色彩系统', description: '以多套包袋配色展示角色图形与品牌色在产品系列中的组合能力。', ratio: 'landscape', image: '/works/ip-vi/ipvi-06.webp' },
      { id: 'ipvi-07', name: 'NESTO｜海报应用', type: 'VI 延展 / 海报设计', description: '将 IP、商品与自然场景组合为系列海报，完成从角色到传播物料的闭环。', ratio: 'landscape', image: '/works/ip-vi/ipvi-07.webp' },
    ],
  },
  {
    slug: 'logo', shortCode: 'LOG', title: '品牌标志设计', en: 'BRAND LOGO DESIGN',
    description: '将品牌标志与创意字体统一展示，覆盖字标、符号、中文标题字及基础应用推演。',
    projects: [
      { id: 'logo-01', name: 'BREEZE 复古立体字标', type: '字标设计 / 复古风格', description: '以厚重立体结构和暖色渐变建立复古、轻快的品牌印象，并展示构形过程与应用效果。', ratio: 'landscape', image: '/works/logo/logo-01.webp' },
      { id: 'logo-02', name: 'NEXO 现代蓝白品牌标志', type: '品牌标志 / 运动科技', description: '以倾斜字形与星形符号表现速度感，完成标志比例、图标与产品应用的系统展示。', ratio: 'landscape', image: '/works/logo/logo-02.webp' },
      { id: 'logo-03', name: 'LUNE 香氛品牌标志', type: '品牌标志 / 香氛美学', description: '以月相意象与高对比字形构成精致字标，并验证其在包装与摄影场景中的适配。', ratio: 'landscape', image: '/works/logo/logo-03.webp' },
      { id: 'type-01', name: '流光', type: '中文标题字 / 流线实验', description: '从冰川与光影形态提取流线结构，形成轻盈、具有速度感的中文标题字。', ratio: 'landscape', image: '/works/typography/type-01.webp' },
      { id: 'type-02', name: '启程', type: '中文标题字 / 科技动势', description: '以倾斜骨架与几何切面强化启程的方向感，呈现从字形推演到应用的完整过程。', ratio: 'landscape', image: '/works/typography/type-02.webp' },
      { id: 'type-03', name: '曦野', type: '中文标题字 / 品牌构想', description: '结合东方笔意与现代几何结构，建立适用于自然生活方式品牌的文字识别。', ratio: 'landscape', image: '/works/typography/type-03.webp' },
    ],
  },
]

// Keep the two formats in independent collections, including their detail pages.
const commercialCollection = designCategories[0]
const commercialProjects = commercialCollection.projects
commercialCollection.projects = commercialProjects.filter((project) => project.ratio === 'portrait')
commercialCollection.description = '竖版商业海报，覆盖服饰、食品、美妆与生活方式等品类，呈现产品、人物与视觉氛围。'
designCategories.splice(1, 0, {
  slug: 'banner', shortCode: 'BNR', title: 'BANNER视觉设计', en: 'BANNER VISUAL DESIGN',
  description: '横版 BANNER 视觉，结合产品卖点、信息编排与场景表达，展示电商及推广设计。',
  projects: commercialProjects.filter((project) => project.ratio === 'landscape').map((project) => ({
    ...project,
    type: project.type.replace(/banner/gi, 'BANNER'),
    name: project.name.replace(/banner/gi, 'BANNER'),
    description: project.description.replace(/banner/gi, 'BANNER'),
  })),
})

const homeCategoryPreviews: Record<string, string[]> = {
  commercial: ['/works/commercial/commercial-17.webp', '/works/commercial/commercial-18.webp'],
  banner: ['/works/commercial/commercial-02.webp', '/works/commercial/commercial-03.webp'],
  'ip-vi': ['/works/ip-vi/ipvi-01.webp', '/works/ip-vi/ipvi-06.webp'],
  logo: ['/works/logo/logo-02.webp', '/works/typography/type-01.webp'],
  'aigc-video': ['/works/videos/ta-qing-ming-mv/cover-v2.jpg', '/works/videos/moscato-tvc/cover-v2.jpg'],
}

export const homeCategories = [
  ...designCategories.map(({ slug, shortCode, title, en, description }) => ({
    slug, shortCode, title, en, description, href: `#/work/${slug}`,
    previews: homeCategoryPreviews[slug],
  })),
  { slug: 'aigc-video', shortCode: 'AIV', title: 'AIGC 视频', en: 'AI VIDEO CREATION', description: '漫剧与仿真人剧、音乐 MV 与 AI 影像游戏、TVC 广告及信息流推广的完整视频创作流程。', href: '#/videos', previews: homeCategoryPreviews['aigc-video'] },
]

// 视频项目元数据
// 时长/分辨率/帧率均通过 ffprobe 从本机成片文件抽取得来(2026-10-12)
// 项目简介基于项目名+目录结构+VIDEO_ASSET_AUDIT 描述整理,只描述题材与方向
// 本人职责字段 responsibility 全部为 'TBD' - 需要石韵程本人逐项确认补充
// BVID 与公开链接于 2026-10-12 从哔哩哔哩创作中心已通过稿件中提取

export type Episode = { id: string; title: string; durationSec: number; width: number; height: number; bvid?: string; bilibiliUrl?: string }
export type VideoAsset = { src: string; alt: string }
export type VideoMaterials = { characters?: VideoAsset[]; scenes?: VideoAsset[]; props?: VideoAsset[]; other?: VideoAsset[] }
export type VideoProject = {
  id: string
  title: string
  englishTitle?: string
  type: string
  ratio: 'landscape' | 'portrait'
  description: string
  responsibility: string  // 'TBD' = 待本人补充
  episodes: Episode[]
  cover: string
  materials?: VideoMaterials
  featured?: boolean  // 是否在首页精选
}
export type VideoGroup = { id: string; title: string; subtitle: string; description: string; projects: VideoProject[] }

const videoAssets = (projectId: string, kind: 'characters' | 'scenes' | 'props' | 'other', count: number, label: string): VideoAsset[] =>
  Array.from({ length: count }, (_, index) => ({
    src: `/works/videos/${projectId}/${kind}-${String(index + 1).padStart(2, '0')}.webp`,
    alt: `${label} ${index + 1}`,
  }))

const selectedVideoAssets = (projectId: string, kind: 'characters' | 'scenes' | 'props' | 'other', indices: number[], label: string): VideoAsset[] =>
  indices.map((index) => ({
    src: `/works/videos/${projectId}/${kind}-${String(index).padStart(2, '0')}.webp`,
    alt: `${label} ${index}`,
  }))

const projectMedia = (
  projectId: string,
  counts: { characters?: number; scenes?: number; props?: number; other?: number },
): Pick<VideoProject, 'cover' | 'materials'> => ({
  cover: `/works/videos/${projectId}/cover-v2.jpg`,
  materials: {
    characters: counts.characters ? videoAssets(projectId, 'characters', counts.characters, '人物设定') : undefined,
    scenes: counts.scenes ? videoAssets(projectId, 'scenes', counts.scenes, '场景设定') : undefined,
    props: counts.props ? videoAssets(projectId, 'props', counts.props, '道具设定') : undefined,
    other: counts.other ? videoAssets(projectId, 'other', counts.other, '其他素材') : undefined,
  },
})

// 14 个视频项目（部分项目包含多集成片）
// 数据来源:ffprobe 探针 + VIDEO_ASSET_AUDIT.md(2026-10-10)
export const videoProjects: VideoProject[] = [
  // ── 叙事影像 ──────────────────────────────────────
  {
    id: 'broken-lullaby',
    title: 'Broken Lullaby',
    englishTitle: '海外短片 · Little Brother',
    type: '海外竖屏短片 / 情绪剧',
    ratio: 'portrait',
    description: '英文剧本,完整分镜与人物场景道具资料。题材偏情绪表达,关注海外内容适配与真人感画面。',
    responsibility: 'TBD',
    episodes: [
      { id: 'broken-lullaby-01', title: '正片', durationSec: 66.48, width: 808, height: 1364, bvid: 'BV1EKp46YEif', bilibiliUrl: 'https://www.bilibili.com/video/BV1EKp46YEif/' },
    ],
    ...projectMedia('broken-lullaby', { characters: 4, scenes: 14, props: 6 }),
  },
  {
    id: 'wai-pai-jia-zhuan',
    title: '我在阴间开外卖站,鬼差都成骑手',
    type: '国内竖屏漫剧 / 喜剧',
    ratio: 'landscape', // 实际成片是 2276×1280(横屏),漫剧里少见
    description: '两集横屏漫剧,以"阴间 + 外卖 + 喜剧"的强钩子设定展开。已具备 10 个人物资产、12 个场景资产、13 个道具资产,系列化生产。',
    responsibility: 'TBD',
    episodes: [
      { id: 'wai-pai-05', title: '第 5 集', durationSec: 46.02, width: 2276, height: 1280, bvid: 'BV1Rgp46ZEUE', bilibiliUrl: 'https://www.bilibili.com/video/BV1Rgp46ZEUE/' },
      { id: 'wai-pai-07', title: '第 7 集', durationSec: 75.42, width: 2276, height: 1280, bvid: 'BV1qMp46wE2W', bilibiliUrl: 'https://www.bilibili.com/video/BV1qMp46wE2W/' },
    ],
    ...projectMedia('wai-pai-jia-zhuan', { characters: 4, scenes: 12, props: 13 }),
    featured: true,
  },
  {
    id: 'gaoxiao-zhi-nv',
    title: '搞笑直女勇闯生存综艺',
    type: '国内竖屏漫剧 / 真人感喜剧',
    ratio: 'portrait',
    description: '9:16 写实系 AI 轻喜漫剧。海上生存综艺背景,直女主角与嘉宾高密度互怼,主持人公布生存规则并把冲突推进至荒岛挑战。73 镜分镜、4 个核心角色(C01 直女主角 / C02 明强 / C03 紫衣女嘉宾 / C05 主持人)。',
    responsibility: 'TBD',
    episodes: [
      { id: 'gaoxiao-02', title: '第 02 集', durationSec: 113.24, width: 590, height: 1048, bvid: 'BV1BKp46YEaN', bilibiliUrl: 'https://www.bilibili.com/video/BV1BKp46YEaN/' },
      { id: 'gaoxiao-03', title: '第 03 集', durationSec: 94.97, width: 590, height: 1048, bvid: 'BV1EKp46YEw1', bilibiliUrl: 'https://www.bilibili.com/video/BV1EKp46YEw1/' },
    ],
    ...projectMedia('gaoxiao-zhi-nv', { characters: 8, scenes: 3, props: 2 }),
  },
  {
    id: 'dongbei-zhen-qian-jin',
    title: '东北真千金归来,专护受气假千金',
    type: '国内竖屏漫剧 / 家庭剧情',
    ratio: 'portrait',
    description: '17–24 集剧本与分镜、资产台账与固定资产。聚焦"真假千金"的家庭冲突结构,适合竖屏连续剧情。',
    responsibility: 'TBD',
    episodes: [
      { id: 'dongbei-17', title: '第 17 集', durationSec: 64.04, width: 590, height: 1048, bvid: 'BV17Mp46wEeH', bilibiliUrl: 'https://www.bilibili.com/video/BV17Mp46wEeH/' },
      { id: 'dongbei-24', title: '第 24 集', durationSec: 64.92, width: 590, height: 1048, bvid: 'BV17Mp46wEjn', bilibiliUrl: 'https://www.bilibili.com/video/BV17Mp46wEjn/' },
    ],
    ...projectMedia('dongbei-zhen-qian-jin', { characters: 7, scenes: 3, props: 6 }),
  },
  {
    id: 'our-tiny-great-aunt',
    title: 'Our Tiny Great-Aunt Is Too Powerful',
    type: '海外竖屏漫剧 / 奇幻家庭',
    ratio: 'portrait',
    description: '21–22 集剧本与分镜,资产台账与固定资产。已具备完整系列制作能力。',
    responsibility: 'TBD',
    episodes: [
      { id: 'tiny-21', title: 'EP 21', durationSec: 86.24, width: 762, height: 1342, bvid: 'BV1s9px6rEKY', bilibiliUrl: 'https://www.bilibili.com/video/BV1s9px6rEKY/' },
      { id: 'tiny-22', title: 'EP 22', durationSec: 84.40, width: 762, height: 1342, bvid: 'BV1y9px6rEbQ', bilibiliUrl: 'https://www.bilibili.com/video/BV1y9px6rEbQ/' },
    ],
    ...projectMedia('our-tiny-great-aunt', { characters: 8, scenes: 4, props: 6 }),
  },
  {
    id: 'the-fate-i-refused',
    title: 'The Fate I Refused',
    type: '海外竖屏漫剧 / 反转剧情',
    ratio: 'portrait',
    description: '多集剧本与完整分镜、固定资产与制作底稿。"命运反转"叙事结构,关注情绪张力与节奏推进。',
    responsibility: 'TBD',
    episodes: [
      { id: 'fate-1011', title: 'EP 10–11', durationSec: 122.95, width: 766, height: 1334, bvid: 'BV15Lp464EMU', bilibiliUrl: 'https://www.bilibili.com/video/BV15Lp464EMU/' },
      { id: 'fate-1213', title: 'EP 12–13', durationSec: 94.78, width: 766, height: 1334, bvid: 'BV17Mp46wEeG', bilibiliUrl: 'https://www.bilibili.com/video/BV17Mp46wEeG/' },
    ],
    ...projectMedia('the-fate-i-refused', { characters: 8, scenes: 6, props: 3 }),
  },
  {
    id: 'the-mob-boss',
    title: 'The Mob Boss Spoils His Pregnant Wife',
    type: '海外竖屏漫剧 / 甜宠',
    ratio: 'portrait',
    description: '完整剧本、分镜、固定资产与制作底稿。"霸总甜宠"题材,关注人物一致性与连续叙事。',
    responsibility: 'TBD',
    episodes: [
      { id: 'mob-10', title: 'EP 10', durationSec: 86.38, width: 772, height: 1372, bvid: 'BV17Mp46wERp', bilibiliUrl: 'https://www.bilibili.com/video/BV17Mp46wERp/' },
      { id: 'mob-11', title: 'EP 11', durationSec: 106.05, width: 762, height: 1342, bvid: 'BV1BMp46wEFx', bilibiliUrl: 'https://www.bilibili.com/video/BV1BMp46wEFx/' },
    ],
    ...projectMedia('the-mob-boss', { characters: 8, scenes: 12, props: 3 }),
  },

  // ── 商业影像 ──────────────────────────────────────
  {
    id: 'moscato-tvc',
    title: 'MOSCATO 气泡酒 TVC',
    type: '真实商业项目 / 产品 TVC',
    ratio: 'portrait',
    description: '真实商业项目。完整剧本与产品/场景/人物资产,葡萄园—开瓶—聚会结构,符合社交媒体竖屏投放习惯。',
    responsibility: 'TBD',
    episodes: [
      { id: 'moscato-01', title: '正片', durationSec: 39.78, width: 698, height: 1240, bvid: 'BV1C4421o7y4', bilibiliUrl: 'https://www.bilibili.com/video/BV1C4421o7y4/' },
    ],
    ...projectMedia('moscato-tvc', { characters: 2, scenes: 4, props: 3 }),
    featured: true,
  },
  {
    id: 'pepero-tvc',
    title: 'PEPERO 曲奇饼干 TVC',
    type: '真实商业项目 / 快消 TVC',
    ratio: 'portrait',
    description: '真实商业项目。完整剧本与约 20 个交付文件(含分镜脚本)。快消品广告与社交媒体内容。',
    responsibility: 'TBD',
    episodes: [
      { id: 'pepero-01', title: '正片', durationSec: 38.94, width: 698, height: 1240, bvid: 'BV1VLp464Ear', bilibiliUrl: 'https://www.bilibili.com/video/BV1VLp464Ear/' },
    ],
    ...projectMedia('pepero-tvc', { characters: 1, scenes: 2, props: 6 }),
  },

  // ── 游戏与概念影像 ──────────────────────────────
  {
    id: 'han-zhong-game',
    title: '汉中游戏',
    type: '文旅 + 游戏化叙事',
    ratio: 'landscape',
    description: '明亮 3D 卡通画面 + 轻量游戏化结构。30 镜完整分镜、人物场景资产索引、文旅关卡与游戏 UI,适合地点信息、任务机制、角色资产的系统化展示。',
    responsibility: 'TBD',
    episodes: [
      { id: 'hanzhong-01', title: '正片', durationSec: 95.20, width: 2276, height: 1280, bvid: 'BV1BKp46YEe4', bilibiliUrl: 'https://www.bilibili.com/video/BV1BKp46YEe4/' },
    ],
    ...projectMedia('han-zhong-game', { characters: 6, scenes: 16, props: 4 }),
    featured: true,
  },
  {
    id: 'gui-ze-game',
    title: '规则游戏',
    type: '悬疑 / 影视游戏',
    ratio: 'landscape',
    description: '清晰悬疑游戏设定、角色选择、游戏 UI、关卡推进、多场景设计、怪物视觉。完整 46 镜分镜,超过 3 分钟时长,适合证明结构设计、镜头编排与世界观统筹能力。',
    responsibility: 'TBD',
    episodes: [
      { id: 'guize-01', title: '正片', durationSec: 195.42, width: 1258, height: 708, bvid: 'BV1EKp46YEAY', bilibiliUrl: 'https://www.bilibili.com/video/BV1EKp46YEAY/' },
    ],
    ...projectMedia('gui-ze-game', { characters: 9, scenes: 22, props: 10 }),
    featured: true,
  },

  // ── 音乐与视觉实验 ──────────────────────────────
  {
    id: 'ta-qing-ming-mv',
    title: '踏青冥 MV',
    type: '音乐 MV / 东方玄幻',
    ratio: 'landscape',
    description: '东方玄幻、新中式赛博朋克风格音乐 MV,横屏 1080p。剧本、分镜、角色双形态、场景、道具和参考帧完整,视觉跨度大;同时证明视觉风格、镜头设计、资产管理和长篇节奏控制。',
    responsibility: 'TBD',
    episodes: [
      { id: 'taqingming-01', title: '正片', durationSec: 159.10, width: 1920, height: 1080, bvid: 'BV1j3p46FEGT', bilibiliUrl: 'https://www.bilibili.com/video/BV1j3p46FEGT/' },
    ],
    ...projectMedia('ta-qing-ming-mv', { characters: 5, scenes: 22, props: 4 }),
    featured: true,
  },
  {
    id: 'huan-zhuang-warm',
    title: 'AI 换装｜暖棕卧室',
    type: '信息流推广 / AI 换装',
    ratio: 'portrait',
    description: '以暖棕卧室为场景的竖屏 AI 换装短片，包含独立人物设定、服装道具板与场景全景。',
    responsibility: 'TBD',
    episodes: [
      { id: 'huan-brown', title: '暖棕卧室', durationSec: 12.00, width: 742, height: 1318, bvid: 'BV1EKp46YE7v', bilibiliUrl: 'https://www.bilibili.com/video/BV1EKp46YE7v/' },
    ],
    cover: '/works/videos/huan-zhuang/cover-warm-v2.jpg',
    materials: {
      characters: selectedVideoAssets('huan-zhuang', 'characters', [1], '暖棕人物设定'),
      scenes: selectedVideoAssets('huan-zhuang', 'scenes', [1, 2], '暖棕场景设定'),
      props: selectedVideoAssets('huan-zhuang', 'props', [1, 2], '暖棕服装道具'),
    },
  },
  {
    id: 'huan-zhuang-pink',
    title: 'AI 换装｜粉色衣帽间',
    type: '信息流推广 / AI 换装',
    ratio: 'portrait',
    description: '以粉色衣帽间为场景的竖屏 AI 换装短片，包含独立人物设定、服装道具板与场景全景。',
    responsibility: 'TBD',
    episodes: [
      { id: 'huan-pink', title: '粉色衣帽间', durationSec: 12.84, width: 742, height: 1318, bvid: 'BV17Kp46YE9d', bilibiliUrl: 'https://www.bilibili.com/video/BV17Kp46YE9d/' },
    ],
    cover: '/works/videos/huan-zhuang/cover-pink-v2.jpg',
    materials: {
      characters: selectedVideoAssets('huan-zhuang', 'characters', [2], '粉色人物设定'),
      scenes: selectedVideoAssets('huan-zhuang', 'scenes', [3, 4], '粉色场景设定'),
      props: selectedVideoAssets('huan-zhuang', 'props', [1, 3], '粉色服装道具'),
    },
  },
]

export const videoGroups: VideoGroup[] = [
  {
    id: 'narrative',
    title: '漫剧 / 仿真人剧',
    subtitle: 'COMIC DRAMA / LIVE-ACTION AI',
    description: '7 个国内外漫剧与仿真人短剧项目，集中展示剧本、分镜、角色一致性与连续叙事能力。',
    projects: videoProjects.filter((p) =>
      ['broken-lullaby', 'wai-pai-jia-zhuan', 'gaoxiao-zhi-nv', 'dongbei-zhen-qian-jin', 'our-tiny-great-aunt', 'the-fate-i-refused', 'the-mob-boss'].includes(p.id)
    ),
  },
  {
    id: 'music-game',
    title: '音乐 MV / AI 影像游戏',
    subtitle: 'MUSIC VIDEO / AI VISUAL GAME',
    description: '3 个音乐与游戏化影像项目，展示视觉风格、世界观、关卡设计与长篇镜头编排能力。',
    projects: videoProjects.filter((p) => ['ta-qing-ming-mv', 'gui-ze-game', 'han-zhong-game'].includes(p.id)),
  },
  {
    id: 'tvc-feed',
    title: 'TVC 广告 / 信息流推广',
    subtitle: 'TVC ADVERTISING / FEED CAMPAIGN',
    description: '4 个商业广告与信息流项目，覆盖产品质感、品牌表达、竖屏节奏与 AI 换装创意。',
    projects: videoProjects.filter((p) => ['pepero-tvc', 'moscato-tvc', 'huan-zhuang-warm', 'huan-zhuang-pink'].includes(p.id)),
  },
]

// 首页精选(按 BRIEF/CONTENT_ARCHITECTURE 推荐):踏青冥MV / 规则游戏 / 阴间外卖站 / MOSCATO / 汉中游戏
export const featuredVideos = videoProjects.filter((p) => p.featured)
export const allVideos = videoProjects
