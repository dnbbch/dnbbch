const fs = require('fs');

const bricolage = fs.readFileSync('/Users/dnbbch/Projects/portfolio/public/fonts/BricolageGrotesque-ExtraBold.ttf').toString('base64');
const jbmono = fs.readFileSync('/Users/dnbbch/Projects/portfolio/node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2').toString('base64');

let s = 20261121;
const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };

function banner({ glyphColor, nameColor, subColor, glyphBase, glyphAccent }) {
  const W = 1600, H = 300, CW = 20, CH = 24;
  const RAMP = ',;i1tfLCG08@';
  let cells = '';
  for (let y = CH; y <= H; y += CH) {
    for (let x = CW; x <= W; x += CW) {
      // elliptical distance from the center: glyphs dissolve toward the
      // edges instead of stopping at a hard rectangle boundary
      const nx = (x - W / 2) / (W / 2);
      const ny = (y - H / 2) / (H / 2);
      const d = Math.sqrt(nx * nx * 0.72 + ny * ny * 1.15);
      const p = Math.max(0, Math.min(1, 1.18 - d * 1.5 + (rnd() - 0.5) * 0.55));
      if (rnd() > p) continue;
      const ch = RAMP[Math.floor(rnd() * RAMP.length)];
      const fade = Math.max(0.35, 1 - d * 0.55); // edge glyphs also dimmer
      const ar = rnd();
      const op = (ar > 0.965 ? glyphAccent : glyphBase + rnd() * 0.14) * fade;
      cells += `<text x='${x}' y='${y}' fill='${glyphColor}' fill-opacity='${op.toFixed(2)}'>${ch}</text>`;
    }
  }
  return `<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}' viewBox='0 0 ${W} ${H}'>
<style>
@font-face{font-family:'Bricolage';src:url(data:font/truetype;charset=utf-8;base64,${bricolage}) format('truetype');font-weight:800;}
@font-face{font-family:'JB';src:url(data:font/woff2;base64,${jbmono}) format('woff2');}
.g{font-family:'JB',ui-monospace,Menlo,Consolas,monospace;font-size:15px}
.name{font-family:'Bricolage',sans-serif;font-weight:800;font-size:88px;letter-spacing:2px;fill:${nameColor}}
.sub{font-family:'JB',ui-monospace,Menlo,Consolas,monospace;font-size:19px;letter-spacing:8px;fill:${subColor}}
</style>
<g class='g'>${cells}</g>
<text x='${W/2}' y='158' text-anchor='middle' class='name'>dnbbch</text>
<text x='${W/2}' y='206' text-anchor='middle' class='sub'>fullstack developer</text>
</svg>`;
}

fs.writeFileSync('/tmp/dnbbch-profile/banner-light.svg', banner({
  glyphColor: '#C4562A', nameColor: '#171310', subColor: '#C4562A',
  glyphBase: 0.12, glyphAccent: 0.42,
}));
fs.writeFileSync('/tmp/dnbbch-profile/banner-dark.svg', banner({
  glyphColor: '#D97448', nameColor: '#f2ede6', subColor: '#D97448',
  glyphBase: 0.16, glyphAccent: 0.6,
}));
console.log('ok');
