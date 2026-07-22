// Xai - Intelligence Workspace Figma Design Generator
// Run this plugin in Figma to generate the full design

const COLORS = {
  bgBase: { r: 0.05, g: 0.07, b: 0.09 },
  bgSurface: { r: 0.086, g: 0.106, b: 0.133 },
  bgHover: { r: 0.11, g: 0.13, b: 0.16 },
  textPrimary: { r: 0.902, g: 0.91, b: 0.922 },
  textSecondary: { r: 0.545, g: 0.58, b: 0.62 },
  accentSignal: { r: 1, g: 0.706, b: 0.329 },
  accentSuccess: { r: 0.247, g: 0.725, b: 0.314 },
  borderSubtle: { r: 0.129, g: 0.149, b: 0.176 },
}

function solidFill(color, opacity = 1) {
  return { type: 'SOLID', color, opacity }
}

function createFrame(name, w, h, opts = {}) {
  const frame = figma.createFrame()
  frame.name = name
  frame.resize(w, h)
  frame.x = opts.x ?? 0
  frame.y = opts.y ?? 0
  frame.fills = opts.fills ?? [solidFill(COLORS.bgBase)]
  frame.cornerRadius = opts.cornerRadius ?? 0

  if (opts.strokes) frame.strokes = opts.strokes
  if (opts.strokeWeight !== undefined) frame.strokeWeight = opts.strokeWeight
  if (opts.strokeAlign) frame.strokeAlign = opts.strokeAlign
  if (opts.effects) frame.effects = opts.effects
  if (opts.opacity !== undefined) frame.opacity = opts.opacity

  // Auto Layout
  if (opts.layoutMode) {
    frame.layoutMode = opts.layoutMode
    frame.primaryAxisAlignItems = opts.primaryAxisAlignItems ?? 'MIN'
    frame.counterAxisAlignItems = opts.counterAxisAlignItems ?? 'MIN'
    frame.paddingLeft = opts.paddingLeft ?? 0
    frame.paddingRight = opts.paddingRight ?? 0
    frame.paddingTop = opts.paddingTop ?? 0
    frame.paddingBottom = opts.paddingBottom ?? 0
    frame.itemSpacing = opts.itemSpacing ?? 0
  }

  if (opts.clipsContent) frame.clipsContent = true

  if (opts.children) {
    for (const child of opts.children) {
      frame.appendChild(child)
    }
  }

  return frame
}

const FONT_STYLE = { 400: 'Regular', 500: 'Medium', 700: 'Bold' }

function createText(name, chars, opts = {}) {
  const text = figma.createText()
  text.name = name
  text.characters = chars
  text.x = opts.x ?? 0
  text.y = opts.y ?? 0
  text.fills = opts.fills ?? [solidFill(COLORS.textPrimary)]
  text.textAutoResize = opts.textAutoResize ?? 'WIDTH_AND_HEIGHT'

  const weight = opts.fontWeight ?? 400
  const style = opts.fontStyle ?? FONT_STYLE[weight] ?? 'Regular'
  text.fontName = { family: opts.fontFamily ?? 'Inter', style }
  text.fontSize = opts.fontSize ?? 16

  if (opts.lineHeight) {
    text.lineHeight = { value: opts.lineHeight, unit: 'PIXELS' }
  }
  if (opts.letterSpacing !== undefined) {
    text.letterSpacing = { value: opts.letterSpacing, unit: 'PERCENT' }
  }

  return text
}

function createRect(name, w, h, opts = {}) {
  const rect = figma.createRectangle()
  rect.name = name
  rect.resize(w, h)
  rect.x = opts.x ?? 0
  rect.y = opts.y ?? 0
  rect.fills = opts.fills ?? []
  rect.cornerRadius = opts.cornerRadius ?? 0
  if (opts.strokes) rect.strokes = opts.strokes
  if (opts.strokeWeight !== undefined) rect.strokeWeight = opts.strokeWeight
  if (opts.opacity !== undefined) rect.opacity = opts.opacity
  return rect
}

function createLine(name, length, opts = {}) {
  const line = figma.createLine()
  line.name = name
  line.resize(length, 0)
  line.x = opts.x ?? 0
  line.y = opts.y ?? 0
  line.strokes = opts.strokes ?? [{ type: 'SOLID', color: COLORS.borderSubtle, opacity: 1 }]
  line.strokeWeight = opts.strokeWeight ?? 1
  if (opts.opacity !== undefined) line.opacity = opts.opacity
  return line
}

// ============ DESIGN SYSTEM PAGE ============

async function buildDesignSystem(page) {
  let y = 60

  // Title
  const title = createText('Title', 'Design System', { x: 60, y, fontSize: 48, fontWeight: 500 })
  page.appendChild(title)
  y += 80

  // Colors section
  const colorTitle = createText('Section Title', 'Colors', { x: 60, y, fontSize: 24, fontWeight: 500 })
  page.appendChild(colorTitle)
  y += 56

  const colorSub = createText('Sub', 'Background, text, accent, and border tokens used throughout the product.', { x: 60, y, fontSize: 14 })
  page.appendChild(colorSub)
  y += 48

  const swatches = [
    ['bg-base', COLORS.bgBase],
    ['bg-surface', COLORS.bgSurface],
    ['bg-hover', COLORS.bgHover],
    ['text-primary', COLORS.textPrimary],
    ['text-secondary', COLORS.textSecondary],
    ['accent-signal', COLORS.accentSignal],
    ['accent-success', COLORS.accentSuccess],
    ['border-subtle', COLORS.borderSubtle],
  ]

  let sx = 60
  for (const [label, color] of swatches) {
    const swatch = createFrame(label, 140, 140, { x: sx, y, fills: [solidFill(color)], cornerRadius: 8 })
    const labelText = createText('l', label, { x: 0, y: 148, fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: 8 })
    labelText.fills = [solidFill(COLORS.textSecondary)]
    swatch.appendChild(labelText)
    page.appendChild(swatch)
    sx += 160
  }
  y += 200

  // Typography section
  const typeTitle = createText('Section Title 2', 'Typography', { x: 60, y, fontSize: 24, fontWeight: 500 })
  page.appendChild(typeTitle)
  y += 56

  const typeScale = [
    ['h1 (64px)', 'Raw data, structured into decisions.', 64, 67, -2, 500],
    ['h2 (40px)', 'From ingestion to decision.', 40, 44, -1, 500],
    ['h3 (24px)', 'Ingest Data', 24, 29, 0, 500],
    ['body (16px)', 'Xai ingests noise and returns clarity.', 16, 26, 0, 400],
    ['body-sm (14px)', 'Structure becomes decision-ready.', 14, 22, 0, 400],
    ['label (11px)', 'INSIGHT FLOW', 11, 15, 8, 500],
    ['caption (12px)', '2,048 nodes processed', 12, 18, 0, 400],
  ]

  for (const [label, text, size, lh, ls, wgt] of typeScale) {
    const nameText = createText(label + '-label', label, { x: 60, y, fontSize: 12 })
    nameText.fills = [solidFill(COLORS.textSecondary)]
    page.appendChild(nameText)

    const isMono = label.startsWith('label')
    const sample = createText(label + '-sample', text, { x: 220, y, fontSize: size, lineHeight: lh, letterSpacing: ls, fontWeight: wgt, fontFamily: isMono ? 'JetBrains Mono' : 'Inter' })
    page.appendChild(sample)
    y += lh + 24
  }

  y += 24

  const mono = createText('mono', 'JetBrains Mono — NODES: 2,048  |  CLUSTERS: 12', { x: 60, y, fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: 8, fontWeight: 500 })
  mono.fills = [solidFill(COLORS.accentSignal)]
  page.appendChild(mono)
  y += 48

  // Spacing section
  const spacingTitle = createText('Section Title 3', 'Spacing', { x: 60, y, fontSize: 24, fontWeight: 500 })
  page.appendChild(spacingTitle)
  y += 56

  const spacings = [8, 16, 24, 32, 48, 64, 96, 128]
  let spx = 60
  for (const s of spacings) {
    const box = createRect(`${s}px`, s, 24, { x: spx, y, fills: [solidFill(COLORS.accentSignal, 0.6)], cornerRadius: 2 })
    page.appendChild(box)
    const label = createText(`l${s}`, `${s}px`, { x: spx, y: y + 28, fontSize: 12 })
    label.fills = [solidFill(COLORS.textSecondary)]
    page.appendChild(label)
    spx += s + 32
  }
}

// ============ HERO PAGE ============

async function buildHero(page) {
  const children = []

  // Particle grid
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 12; y++) {
      const jx = ((x * 31 + y * 17) % 13) - 6
      const jy = (((x * 31 + y * 17) * 7) % 13) - 6
      const dot = createRect(`node-${x}-${y}`, 3, 3, {
        x: 60 + x * 72 + jx * 3,
        y: 40 + y * 72 + jy * 3,
        cornerRadius: 1.5,
        fills: [solidFill(y < 6 ? COLORS.textSecondary : COLORS.accentSignal, y < 6 ? 0.3 : 0.6)],
      })
      children.push(dot)
    }
  }

  const badge = createText('badge', 'XAI — INTELLIGENCE WORKSPACE', { x: 120, y: 260, fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: 8, fontWeight: 500 })
  badge.fills = [solidFill(COLORS.accentSignal)]
  children.push(badge)

  const headline = createText('headline', 'Raw data,\nstructured into\ndecisions.', { x: 120, y: 296, fontSize: 64, lineHeight: 67, letterSpacing: -2, fontWeight: 500 })
  children.push(headline)

  const subtext = createText('subtext', 'Xai ingests noise and returns clarity — watch structure\nemerge as you scroll.', { x: 120, y: 556, fontSize: 16, lineHeight: 26 })
  subtext.fills = [solidFill(COLORS.textSecondary)]
  children.push(subtext)

  for (const child of children) {
    page.appendChild(child)
  }
}

// ============ INSIGHT FLOW PAGE ============

async function buildInsightFlow(page) {
  const label = createText('label', 'INSIGHT FLOW', { x: 96, y: 120, fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: 8, fontWeight: 500 })
  label.fills = [solidFill(COLORS.textSecondary)]
  page.appendChild(label)

  const title = createText('title', 'From ingestion to decision.', { x: 96, y: 156, fontSize: 40, lineHeight: 44, letterSpacing: -1, fontWeight: 500 })
  page.appendChild(title)

  const stages = [
    ['01', 'Ingest Data', 'Raw signals arrive from every source,\nunstructured and unlabeled.'],
    ['02', 'Analyze with AI', 'Xai finds structure — clusters, patterns,\nand relationships humans would miss.'],
    ['03', 'Generate Insight', 'Structure becomes a decision-ready\nrecommendation, not just a chart.'],
  ]

  for (let i = 0; i < stages.length; i++) {
    const [idx, stageTitle, desc] = stages[i]
    const card = createFrame(`stage-${idx}`, 360, 280, {
      x: 96 + i * 440, y: 380,
      fills: [solidFill(COLORS.bgSurface)],
      cornerRadius: 4,
      strokes: [{ type: 'SOLID', color: i === 1 ? COLORS.accentSignal : COLORS.borderSubtle, opacity: 1 }],
      strokeWeight: 1,
      layoutMode: 'VERTICAL',
      paddingLeft: 32, paddingRight: 32, paddingTop: 32, paddingBottom: 32,
      itemSpacing: 16,
    })

    const idxText = createText(`idx-${idx}`, idx, { fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: 8, fontWeight: 500 })
    idxText.fills = [solidFill(COLORS.accentSignal)]
    card.appendChild(idxText)

    const t = createText(`title-${idx}`, stageTitle, { fontSize: 24, lineHeight: 29, fontWeight: 500 })
    card.appendChild(t)

    const d = createText(`desc-${idx}`, desc, { fontSize: 14, lineHeight: 22 })
    d.fills = [solidFill(COLORS.textSecondary)]
    card.appendChild(d)

    page.appendChild(card)

    if (i < 2) {
      const conn = createLine(`connector-${i}`, 80, {
        x: 456 + i * 440, y: 510,
        strokes: [{ type: 'SOLID', color: COLORS.borderSubtle, opacity: 1 }],
        strokeWeight: 1,
      })
      page.appendChild(conn)
    }
  }
}

// ============ DASHBOARD PAGE ============

async function buildDashboard(page) {
  // Sidebar
  const navItems = ['Overview', 'Insights', 'Automations', 'Sources', 'Settings']
  const navChildren = []

  for (let i = 0; i < navItems.length; i++) {
    const item = navItems[i]
    const active = i === 0
    const navFrame = createFrame(`nav-${item}`, 150, 32, {
      x: 0, y: i * 48, fills: [],
      paddingLeft: 16,
      layoutMode: 'HORIZONTAL',
      counterAxisAlignItems: 'CENTER',
    })
    const navText = createText(item, item.toUpperCase(), { fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: 8, fontWeight: 500 })
    navText.fills = [solidFill(active ? COLORS.textPrimary : COLORS.textSecondary)]
    navFrame.appendChild(navText)

    if (active) {
      const indicator = createRect('indicator', 150, 2, { x: 0, y: 30, fills: [solidFill(COLORS.accentSignal)] })
      navFrame.appendChild(indicator)
    }
    navChildren.push(navFrame)
  }

  const sidebar = createFrame('Sidebar', 200, 900, {
    x: 0, y: 0,
    fills: [solidFill(COLORS.bgSurface)],
    strokes: [{ type: 'SOLID', color: COLORS.borderSubtle, opacity: 1 }],
    strokeWeight: 1,
    paddingLeft: 24, paddingRight: 24, paddingTop: 48,
    itemSpacing: 8, layoutMode: 'VERTICAL',
  })
  for (const child of navChildren) {
    sidebar.appendChild(child)
  }
  page.appendChild(sidebar)

  // Content area
  const dashLabel = createText('dash-label', 'INTELLIGENCE DASHBOARD', { x: 280, y: 48, fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: 8, fontWeight: 500 })
  dashLabel.fills = [solidFill(COLORS.textSecondary)]
  page.appendChild(dashLabel)

  const dashTitle = createText('dash-title', 'Structure, made usable.', { x: 280, y: 84, fontSize: 40, lineHeight: 44, letterSpacing: -1, fontWeight: 500 })
  page.appendChild(dashTitle)

  // Panel 1: Stat
  const panel1 = createFrame('panel-stat', 320, 200, {
    x: 280, y: 152,
    fills: [solidFill(COLORS.bgSurface)],
    cornerRadius: 4,
    strokes: [{ type: 'SOLID', color: COLORS.borderSubtle, opacity: 1 }],
    strokeWeight: 1,
    paddingLeft: 24, paddingTop: 24,
    layoutMode: 'VERTICAL',
    itemSpacing: 16,
  })
  const statLabel = createText('stat-label', 'NODES PROCESSED', { fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: 8, fontWeight: 500 })
  statLabel.fills = [solidFill(COLORS.textSecondary)]
  panel1.appendChild(statLabel)
  const statValue = createText('stat-value', '2,048', { fontSize: 40, lineHeight: 44, letterSpacing: -1, fontWeight: 500 })
  panel1.appendChild(statValue)
  page.appendChild(panel1)

  // Panel 2: Chart
  const panel2 = createFrame('panel-chart', 320, 200, {
    x: 632, y: 152,
    fills: [solidFill(COLORS.bgSurface)],
    cornerRadius: 4,
    strokes: [{ type: 'SOLID', color: COLORS.borderSubtle, opacity: 1 }],
    strokeWeight: 1,
    paddingLeft: 24, paddingTop: 24,
    layoutMode: 'VERTICAL',
    itemSpacing: 16,
  })
  const chartLabel = createText('chart-label', 'INSIGHT VELOCITY', { fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: 8, fontWeight: 500 })
  chartLabel.fills = [solidFill(COLORS.textSecondary)]
  panel2.appendChild(chartLabel)

  const chartValues = [40, 65, 45, 80, 60, 90, 70]
  for (let i = 0; i < chartValues.length; i++) {
    const bar = createRect(`bar-${i}`, 28, chartValues[i] * 1.5, {
      x: i * 38, y: 110 - chartValues[i] * 1.5,
      fills: [solidFill(COLORS.accentSignal, 0.6)],
      cornerRadius: 2,
    })
    panel2.appendChild(bar)
  }
  page.appendChild(panel2)

  // Panel 3: Table
  const panel3 = createFrame('panel-table', 320, 200, {
    x: 984, y: 152,
    fills: [solidFill(COLORS.bgSurface)],
    cornerRadius: 4,
    strokes: [{ type: 'SOLID', color: COLORS.borderSubtle, opacity: 1 }],
    strokeWeight: 1,
    paddingLeft: 24, paddingTop: 24,
    layoutMode: 'VERTICAL',
    itemSpacing: 16,
  })
  const tableLabel = createText('table-label', 'TOP CLUSTERS', { fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: 8, fontWeight: 500 })
  tableLabel.fills = [solidFill(COLORS.textSecondary)]
  panel3.appendChild(tableLabel)

  const clusters = ['Cluster A', 'Cluster B', 'Cluster C']
  for (let i = 0; i < clusters.length; i++) {
    const rowFrame = createFrame(`row-${i}`, 280, 32, {
      x: 0, y: i * 36, fills: [],
      strokes: i < 2 ? [{ type: 'SOLID', color: COLORS.borderSubtle, opacity: 1 }] : [],
      strokeWeight: 1,
      paddingBottom: 8,
      layoutMode: 'HORIZONTAL',
      primaryAxisAlignItems: 'SPACE_BETWEEN',
    })
    const rowName = createText(clusters[i], clusters[i], { fontSize: 14, lineHeight: 20 })
    rowName.fills = [solidFill(COLORS.textSecondary)]
    rowFrame.appendChild(rowName)
    const rowValue = createText(`v-${i}`, `${92 - i * 11}%`, { fontSize: 14, lineHeight: 20 })
    rowFrame.appendChild(rowValue)
    panel3.appendChild(rowFrame)
  }
  page.appendChild(panel3)
}

// ============ SIGNATURE PAGE ============

async function buildSignature(page) {
  const label = createText('sig-label', 'SIGNATURE INTERACTION', { x: 96, y: 120, fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: 8, fontWeight: 500 })
  label.fills = [solidFill(COLORS.textSecondary)]
  page.appendChild(label)

  const title = createText('sig-title', 'Every cluster,\nreorganized in\nreal time.', { x: 96, y: 156, fontSize: 40, lineHeight: 44, letterSpacing: -1, fontWeight: 500 })
  page.appendChild(title)

  // Isometric lattice
  const ox = 800, oy = 450

  for (let i = -7; i <= 7; i++) {
    const guide = createLine(`guide-${i}`, 400, {
      x: ox + i * 36 - 200 - (7 * 18),
      y: oy + i * 18,
      strokes: [{ type: 'SOLID', color: COLORS.borderSubtle, opacity: 0.4 }],
      strokeWeight: 1,
    })
    guide.opacity = 0.4
    page.appendChild(guide)
  }

  for (let x = -7; x < 7; x++) {
    for (let y = -7; y < 7; y++) {
      const dist = Math.sqrt(x * x + y * y)
      const size = 8 + Math.max(0, 1 - dist / 10) * 16
      const opacity = 0.3 + Math.max(0, 1 - dist / 10) * 0.5
      const zOff = Math.max(0, 1 - dist / 10) * 20
      const cell = createRect(`cell-${x}-${y}`, size, size, {
        x: ox + x * 36 - size / 2 - y * 18,
        y: oy + y * 18 - zOff,
        fills: [solidFill(COLORS.accentSignal, opacity)],
        cornerRadius: 2,
      })
      page.appendChild(cell)
    }
  }

  const readout1 = createText('readout-1', 'NODES: 196', { x: 96, y: 600, fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: 8, fontWeight: 500 })
  readout1.fills = [solidFill(COLORS.accentSignal)]
  page.appendChild(readout1)

  const readout2 = createText('readout-2', 'CLUSTERS: 12', { x: 96, y: 620, fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: 8, fontWeight: 500 })
  readout2.fills = [solidFill(COLORS.accentSignal)]
  page.appendChild(readout2)
}

// ============ COMPONENTS ============

async function buildComponents(page) {
  // Button/Primary
  const btnPrimary = figma.createComponent()
  btnPrimary.name = 'Button/Primary'
  btnPrimary.resize(120, 48)
  btnPrimary.x = 60
  btnPrimary.y = 60
  btnPrimary.fills = []
  btnPrimary.cornerRadius = 4
  btnPrimary.strokes = [{ type: 'SOLID', color: COLORS.accentSignal, opacity: 1 }]
  btnPrimary.strokeWeight = 1
  btnPrimary.layoutMode = 'HORIZONTAL'
  btnPrimary.primaryAxisAlignItems = 'CENTER'
  btnPrimary.counterAxisAlignItems = 'CENTER'
  btnPrimary.paddingLeft = 24
  btnPrimary.paddingRight = 24
  btnPrimary.paddingTop = 16
  btnPrimary.paddingBottom = 16

  const btnText = createText('btn-text', 'Explore', { fontSize: 14, lineHeight: 20 })
  btnText.fills = [solidFill(COLORS.accentSignal)]
  btnPrimary.appendChild(btnText)
  page.appendChild(btnPrimary)

  // Button/Ghost
  const btnGhost = figma.createComponent()
  btnGhost.name = 'Button/Ghost'
  btnGhost.resize(80, 48)
  btnGhost.x = 220
  btnGhost.y = 60
  btnGhost.fills = []
  btnGhost.layoutMode = 'HORIZONTAL'
  btnGhost.primaryAxisAlignItems = 'CENTER'
  btnGhost.counterAxisAlignItems = 'CENTER'

  const ghostText = createText('ghost-text', 'Cancel', { fontSize: 14, lineHeight: 20 })
  ghostText.fills = [solidFill(COLORS.textSecondary)]
  btnGhost.appendChild(ghostText)
  page.appendChild(btnGhost)
}

// ============ MAIN ============

async function main() {
  // Load fonts first
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' })
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' })
  await figma.loadFontAsync({ family: 'JetBrains Mono', style: 'Medium' })
  await figma.loadFontAsync({ family: 'JetBrains Mono', style: 'Regular' })

  // Repurpose default page instead of removing it
  const defaultPage = figma.root.children[0]
  defaultPage.name = '🎨 Design System'
  await buildDesignSystem(defaultPage)

  // Create remaining pages
  const pages = [
    { name: 'Hero Section', builder: buildHero },
    { name: 'Insight Flow', builder: buildInsightFlow },
    { name: 'Dashboard Preview', builder: buildDashboard },
    { name: 'Signature Interaction', builder: buildSignature },
    { name: 'Components', builder: buildComponents },
  ]

  for (const { name, builder } of pages) {
    const page = figma.createPage()
    page.name = name
    await builder(page)
  }

  await figma.setCurrentPageAsync(figma.root.children[0])
  figma.closePlugin('Xai design generated successfully!')
}

main().catch(err => {
  figma.closePlugin(`Error: ${err.message}`)
})
