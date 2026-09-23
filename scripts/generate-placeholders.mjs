// Generates the line-art placeholder images in src/assets/placeholders.
// They stand in for product photography until real photos are shot.
// Run: node scripts/generate-placeholders.mjs
import { mkdirSync, writeFileSync } from 'node:fs';

const out = new URL('../src/assets/placeholders/', import.meta.url);
mkdirSync(out, { recursive: true });

const tones = {
  ivory: ['#FBF8F3', '#EFE6D8'],
  blush: ['#FAF3F0', '#EBD9D2'],
  sage: ['#F5F6F1', '#DDE1D3'],
  stone: ['#F6F3EE', '#E0D8CC'],
  noir: ['#2A2723', '#1A1816'],
};

const gold = '#A8834B';
const goldLight = '#D9BF8C';

const gem = (cx, cy, r, fill = 'url(#gem)') =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${gold}" stroke-width="2"/>`;

function jhumka(x, y, s = 1) {
  const t = (v) => v * s;
  let dots = '';
  for (let i = -4; i <= 4; i++) {
    dots += `<line x1="${x + t(i * 16)}" y1="${y + t(212)}" x2="${x + t(i * 16)}" y2="${y + t(236)}" stroke="${gold}" stroke-width="2"/>`;
    dots += gem(x + t(i * 16), y + t(242), t(5), goldLight);
  }
  return `
    <path d="M${x} ${y - t(40)} q${t(-26)} ${t(-10)} ${t(-18)} ${t(-40)}" fill="none" stroke="${gold}" stroke-width="3"/>
    ${gem(x, y, t(26))}
    <circle cx="${x}" cy="${y}" r="${t(12)}" fill="none" stroke="${goldLight}" stroke-width="2"/>
    <line x1="${x}" y1="${y + t(26)}" x2="${x}" y2="${y + t(70)}" stroke="${gold}" stroke-width="3"/>
    <path d="M${x - t(78)} ${y + t(208)} Q${x - t(78)} ${y + t(78)} ${x} ${y + t(72)} Q${x + t(78)} ${y + t(78)} ${x + t(78)} ${y + t(208)} Z" fill="url(#metal)" stroke="${gold}" stroke-width="3"/>
    <path d="M${x - t(60)} ${y + t(170)} Q${x} ${y + t(150)} ${x + t(60)} ${y + t(170)}" fill="none" stroke="${gold}" stroke-width="2"/>
    <path d="M${x - t(40)} ${y + t(120)} Q${x} ${y + t(104)} ${x + t(40)} ${y + t(120)}" fill="none" stroke="${gold}" stroke-width="2"/>
    ${dots}`;
}

function necklace(cx, cy, w, s = 1) {
  const t = (v) => v * s;
  let drops = '';
  const n = 9;
  for (let i = 0; i < n; i++) {
    const a = Math.PI * (0.12 + (0.76 * i) / (n - 1));
    const px = cx - Math.cos(a) * w;
    const py = cy + Math.sin(a) * t(210);
    const len = i === 4 ? t(70) : t(34);
    drops += `<line x1="${px}" y1="${py}" x2="${px}" y2="${py + len}" stroke="${gold}" stroke-width="2"/>`;
    drops += i === 4
      ? `<path d="M${px} ${py + len} q${t(-28)} ${t(40)} 0 ${t(70)} q${t(28)} ${t(-30)} 0 ${t(-70)} Z" fill="url(#gem)" stroke="${gold}" stroke-width="2"/>`
      : gem(px, py + len + t(9), t(9));
  }
  return `
    <path d="M${cx - w} ${cy - t(60)} Q${cx - w} ${cy + t(230)} ${cx} ${cy + t(230)} Q${cx + w} ${cy + t(230)} ${cx + w} ${cy - t(60)}" fill="none" stroke="${gold}" stroke-width="4"/>
    <path d="M${cx - w + t(22)} ${cy - t(60)} Q${cx - w + t(22)} ${cy + t(200)} ${cx} ${cy + t(200)} Q${cx + w - t(22)} ${cy + t(200)} ${cx + w - t(22)} ${cy - t(60)}" fill="none" stroke="${goldLight}" stroke-width="2" stroke-dasharray="2 10" stroke-linecap="round"/>
    ${drops}`;
}

function bangles(cx, cy) {
  let g = '';
  [-70, 0, 70].forEach((dx, i) => {
    g += `<ellipse cx="${cx + dx}" cy="${cy}" rx="150" ry="190" fill="none" stroke="${i === 1 ? gold : goldLight}" stroke-width="${i === 1 ? 14 : 8}"/>`;
    g += `<ellipse cx="${cx + dx}" cy="${cy}" rx="150" ry="190" fill="none" stroke="${gold}" stroke-width="1.5" stroke-dasharray="1 14" stroke-linecap="round"/>`;
  });
  return g;
}

function ring(cx, cy) {
  return `
    <ellipse cx="${cx}" cy="${cy + 60}" rx="140" ry="150" fill="none" stroke="${gold}" stroke-width="16"/>
    <ellipse cx="${cx}" cy="${cy + 60}" rx="140" ry="150" fill="none" stroke="${goldLight}" stroke-width="4"/>
    <path d="M${cx - 70} ${cy - 110} L${cx} ${cy - 170} L${cx + 70} ${cy - 110} L${cx} ${cy - 60} Z" fill="url(#gem)" stroke="${gold}" stroke-width="3"/>
    <path d="M${cx - 70} ${cy - 110} L${cx + 70} ${cy - 110} M${cx - 30} ${cy - 110} L${cx} ${cy - 60} L${cx + 30} ${cy - 110}" fill="none" stroke="${gold}" stroke-width="2"/>
    ${gem(cx - 96, cy - 92, 12)}${gem(cx + 96, cy - 92, 12)}`;
}

function tikka(cx, top) {
  let chain = '';
  for (let y = top; y < top + 360; y += 22) chain += `<circle cx="${cx}" cy="${y}" r="6" fill="none" stroke="${gold}" stroke-width="2"/>`;
  return `
    ${gem(cx, top - 20, 16, goldLight)}
    ${chain}
    <circle cx="${cx}" cy="${top + 440}" r="84" fill="url(#metal)" stroke="${gold}" stroke-width="3"/>
    <circle cx="${cx}" cy="${top + 440}" r="56" fill="none" stroke="${gold}" stroke-width="2"/>
    ${gem(cx, top + 440, 26)}
    <path d="M${cx} ${top + 524} q-30 44 0 84 q30 -40 0 -84 Z" fill="url(#gem)" stroke="${gold}" stroke-width="2"/>`;
}

function frame(w, h, tone, label, body) {
  const [a, b] = tones[tone];
  const dark = tone === 'noir';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
    <radialGradient id="gem" cx="0.35" cy="0.35" r="0.8"><stop offset="0" stop-color="#FFF7E6"/><stop offset="0.5" stop-color="${goldLight}"/><stop offset="1" stop-color="${gold}"/></radialGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3E5C4"/><stop offset="0.5" stop-color="${goldLight}"/><stop offset="1" stop-color="#B8955A"/></linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <ellipse cx="${w / 2}" cy="${h * 0.9}" rx="${w * 0.3}" ry="${h * 0.02}" fill="${dark ? '#000' : '#8A6A35'}" opacity="0.08"/>
  ${body}
  <text x="${w - 44}" y="${h - 30}" text-anchor="end" font-family="Georgia, serif" font-size="${Math.round(w / 44)}" letter-spacing="2" fill="${dark ? '#D9BF8C' : '#8A6A35'}" opacity="0.55">${label}</text>
</svg>
`;
}

const W = 800;
const H = 1000;
const motifs = {
  earrings: () => jhumka(260, 330, 1.05) + jhumka(540, 330, 1.05),
  necklace: () => necklace(400, 300, 250),
  'necklace-set': () => necklace(400, 250, 220, 0.9) + jhumka(170, 700, 0.55) + jhumka(630, 700, 0.55),
  bangles: () => bangles(400, 500),
  ring: () => ring(400, 520),
  tikka: () => tikka(400, 220),
};

const toneList = ['ivory', 'blush', 'sage', 'stone'];
for (const [name, draw] of Object.entries(motifs)) {
  toneList.forEach((tone) => {
    writeFileSync(new URL(`${name}-${tone}.svg`, out), frame(W, H, tone, 'SAMPLE IMAGE', draw()));
  });
}

// Wide hero / banner compositions.
writeFileSync(
  new URL('hero.svg', out),
  frame(1600, 1100, 'ivory', 'SAMPLE IMAGE', necklace(800, 300, 300) + jhumka(330, 360, 1.2) + jhumka(1270, 360, 1.2)),
);
writeFileSync(
  new URL('banner-bridal.svg', out),
  frame(1600, 900, 'noir', 'SAMPLE IMAGE', necklace(800, 200, 280, 0.95) + tikka(1300, 120) + jhumka(300, 300, 1)),
);
writeFileSync(
  new URL('og-default.svg', out),
  frame(1200, 630, 'ivory', '', necklace(600, 130, 200, 0.75)),
);
console.log('placeholders written');
