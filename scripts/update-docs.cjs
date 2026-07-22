const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const fs = require('fs');

const figmaUrl = 'https://www.figma.com/design/sGOxAnit9MlqTPLAmPy8Ug/Xai-Intelligence-Workspace';

const doc = new Document({
  title: 'Xai - Intelligence Workspace - Product Documentation',
  sections: [
    {
      children: [
        new Paragraph({ spacing: { before: 3000 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Xai \u2014 Intelligence Workspace', size: 52, bold: true })] }),
        new Paragraph({ spacing: { before: 200 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Product Documentation', size: 36, color: '555555' })] }),
        new Paragraph({ spacing: { before: 600 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'From raw data to structured intelligence to actionable insight.', size: 24, italics: true, color: '777777' })] }),
        new Paragraph({ spacing: { before: 1200 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'July 2026', size: 22, color: '999999' })] }),
      ],
    },
    {
      properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
      children: [
        new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400 }, children: [new TextRun({ text: '1. Product Overview', bold: true, size: 32 })] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: 'Xai is a single-page interactive product experience that visually explains how raw data is transformed into structured intelligence and actionable insights. The core narrative \u2014 "From raw data \u2192 structured intelligence \u2192 actionable insight \u2192 AI Automations" \u2014 is expressed through one continuous visual device: a coordinate lattice that starts scattered and progressively snaps into structure as the user scrolls.' })] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: 'Unlike a marketing landing page, Xai is designed to feel like using a product. Every interaction communicates technical confidence, clarity, and purpose.' })] }),
      ],
    },
    {
      children: [
        new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400 }, children: [new TextRun({ text: '2. Page Structure', bold: true, size: 32 })] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: 'The single page has 4 sections rendered sequentially. Every section reads the same scroll-progress value so the transformation feels like one system.' })] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun({ text: '2.1 Hero Section \u2014 Data to Intelligence', bold: true, size: 26 })] }),
        new Paragraph({ children: [new TextRun({ text: 'Minimal headline and subtext with a Three.js particle field. Abstract particles representing raw data transition from scattered to structured grid form based on scroll position.' })] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun({ text: '2.2 Insight Flow', bold: true, size: 26 })] }),
        new Paragraph({ children: [new TextRun({ text: '3 scroll-driven stage cards: Ingest Data, Analyze with AI, Generate Insight. Each stage animates in/out based on scroll with hover micro-interactions.' })] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun({ text: '2.3 Intelligence Dashboard Preview', bold: true, size: 26 })] }),
        new Paragraph({ children: [new TextRun({ text: 'Mock product UI with sidebar navigation (5 items) and 3 data panels: stat card, bar chart, and table. Entrance animations and hover feedback.' })] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun({ text: '2.4 Signature Interaction', bold: true, size: 26 })] }),
        new Paragraph({ children: [new TextRun({ text: 'A 3D extruding lattice (React Three Fiber) that reorganizes on scroll, paired with a live coordinate readout (NODES / CLUSTERS).' })] }),
      ],
    },
    {
      children: [
        new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400 }, children: [new TextRun({ text: '3. Design System', bold: true, size: 32 })] }),
        new Paragraph({ children: [new TextRun({ text: 'Dark theme with custom Tailwind tokens. Background: bg-base (#0D1117), bg-surface (#161B22), bg-hover (#1C2129). Text: text-primary (#E6E8EB), text-secondary (#8B949E). Accent: accent-signal (amber #FFB454), accent-success (green #3FB950). Border: border-subtle (#21262D).' })] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: 'Display font: Geist. Mono: JetBrains Mono. Size scale: h1 (64px) to caption (12px). Spacing: 8\u2013128px in px values. A 24px GRID_UNIT is shared across all sections.' })] }),
      ],
    },
    {
      children: [
        new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400 }, children: [new TextRun({ text: '4. Animation Architecture', bold: true, size: 32 })] }),
        new Paragraph({ children: [new TextRun({ text: 'Two-layer system: GSAP owns page-level scroll narrative (grid transformation from chaos to structure). Framer Motion owns component-level interactions (hover, tabs, entrances). Shared easings (confident, precise, snap) in lib/animation/easings.ts keep the feel consistent.' })] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: 'The useScrollProgress hook provides a 0\u20131 value every section derives its structure prop from, ensuring consistent scroll math across the page.' })] }),
      ],
    },
    {
      children: [
        new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400 }, children: [new TextRun({ text: '5. Technical Stack', bold: true, size: 32 })] }),
        new Paragraph({ children: [new TextRun({ text: 'Next.js 15 (App Router), Tailwind CSS, Framer Motion, GSAP, Three.js / React Three Fiber, TypeScript. Components organized in components/sections/ and components/ui/.' })] }),
      ],
    },
    {
      children: [
        new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400 }, children: [new TextRun({ text: '6. Key Design Decisions', bold: true, size: 32 })] }),
        new Paragraph({ children: [new TextRun({ text: 'Grid Background as central narrative device, not decoration. Clean animation boundary between GSAP (page-level) and Framer Motion (component-level). Signature Interaction ties 3D back to the data narrative via coordinate readout. prefers-reduced-motion respected globally.' })] }),
      ],
    },
    {
      children: [
        new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 400 }, children: [new TextRun({ text: '7. Design File', bold: true, size: 32 })] }),
        new Paragraph({ children: [new TextRun({ text: 'The Figma design file is available at: ' + figmaUrl })] }),
        new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: figmaUrl, color: '0563C1' })] }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: 'Includes 6 pages: Design System, Hero Section, Insight Flow, Dashboard Preview, Signature Interaction, and Components.' })] }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('Xai-Product-Documentation.docx', buffer);
  console.log('Updated: Xai-Product-Documentation.docx (' + buffer.length + ' bytes)');
}).catch(err => console.error('Error:', err.message));
