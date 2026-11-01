/* ============ ✏️ APNI MARZI SE YAHAN EDIT KARO ============ */
const CFG = {
  name: "Ahmad",
  day: 20, month: 12,   /* year ki zaroorat nahi, khud next birthday ka sal le leta hai */
  wishes: [
    "May your smile never lose its sparkle.",
    "May joy follow you like your own shadow.",
    "May every dream you hold come home to you.",
    "May your days be soft, warm and full of love."
  ],
  letter: [
    "Dear NAME,",
    "Some people make the ordinary feel magical,",
    "and you are one of them.",
    "I hope this year gives you everything",
    "your heart has quietly been wishing for.",
    "Happy Birthday. 🎂"
  ],
  signature: "— with love",
  balloons: [
    "A year full of laughter.",
    "Courage to chase every dream.",
    "People who love you loudly.",
    "Peace on the hardest days.",
    "Small joys that feel huge.",
    "You are loved. Always."
  ],
  reasons: [
    { i: "💖", t: "Your kind heart" },
    { i: "😊", t: "Your lovely smile" },
    { i: "✨", t: "The way you light up a room" },
    { i: "🌷", t: "Simply being you" }
  ],
  finale: "May your life always be as beautiful as your heart."
};
/* ========================================================= */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const app = $('#app'), steps = $$('.step'), dotsEl = $('#dots');
let cur = -1, maxS = 0, timers = [], raf = 0, fwOn = false;
const later = (f, ms) => timers.push(setTimeout(f, ms));
const rnd = (a, b) => a + Math.random() * (b - a);

$$('[data-name]').forEach(e => e.textContent = CFG.name);
steps.forEach((_, i) => { const d = document.createElement('i'); d.onclick = () => { if (i > 0 && i <= maxS) go(i); }; dotsEl.appendChild(d); });
$$('[data-next]').forEach(b => b.onclick = () => go(cur + 1));

function cleanup() { timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(raf); fwOn = false; }
function go(n) {
  cleanup(); cur = n; maxS = Math.max(maxS, n);
  steps.forEach((s, i) => s.classList.toggle('on', i === n));
  $$('i', dotsEl).forEach((d, i) => d.className = i === n ? 'on' : i < n ? 'seen' : '');
  dotsEl.style.opacity = n === 0 ? 0 : 1;
  app.classList.toggle('night', n === 8);
  $('#pg').innerHTML = `<b>${String(n).padStart(2, '0')}</b> / ${String(steps.length - 1).padStart(2, '0')}`; $('#pg').style.opacity = n === 0 ? 0 : 1;
  [s0, s1, s2, s3, s4, s5, s6, s7, s8][n]();
}

/* falling petals + tap hearts */
setInterval(() => {
  const p = document.createElement('span'); p.className = 'pet';
  p.textContent = ['🌸', '💮', '🌷', '🤍', '💗'][Math.random() * 5 | 0];
  p.style.left = rnd(0, 100) + '%'; p.style.fontSize = rnd(11, 22) + 'px';
  p.style.setProperty('--dx', rnd(-60, 60) + 'px'); p.style.setProperty('--r', rnd(180, 600) + 'deg');
  p.style.animationDuration = rnd(7, 13) + 's';
  $('#petals').appendChild(p); setTimeout(() => p.remove(), 13000);
}, 800);
document.addEventListener('pointerdown', e => {
  const h = document.createElement('span'); h.className = 'tapheart'; h.textContent = '💗';
  h.style.left = e.clientX - 10 + 'px'; h.style.top = e.clientY - 10 + 'px'; h.style.setProperty('--dx', rnd(-25, 25) + 'px');
  document.body.appendChild(h); setTimeout(() => h.remove(), 1100);
});

/* music (put music.mp3 in the same folder) */
const bgm = $('#bgm'), mbtn = $('#music');
mbtn.onclick = () => { if (bgm.paused) { bgm.play().catch(() => {}); mbtn.classList.add('on'); } else { bgm.pause(); mbtn.classList.remove('on'); } };

/* 0 — loader */
function s0() {
  let p = 0; const btn = $('#begin'); btn.classList.remove('show'); $('#pct').textContent = '0%';
  const t = setInterval(() => {
    p = Math.min(100, p + rnd(1, 5));
    $('#hin').style.setProperty('--p', p); $('#heart').style.setProperty('--p', p);
    $('#hin').style.clipPath = `inset(${100 - p}% 0 0 0)`;
    $('#pct').textContent = Math.floor(p) + '%';
    if (p >= 100) { clearInterval(t); $('#pct').textContent = 'Ready ❤️'; btn.classList.add('show'); }
  }, 90);
  timers.push(t);
  btn.onclick = () => { bgm.play().then(() => mbtn.classList.add('on')).catch(() => {}); go(1); };
}

/* 1 — date */
function s1() {
  const M = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  $('#mon').textContent = M[CFG.month - 1].toUpperCase();
  let h = ''; 'SMTWTFS'.split('').forEach(d => h += `<span class="h">${d}</span>`);
  const now = new Date(); let Y = now.getFullYear(); if (new Date(Y, CFG.month - 1, CFG.day) < new Date(now.getFullYear(), now.getMonth(), now.getDate())) Y++;
  const f = new Date(Y, CFG.month - 1, 1).getDay(), n = new Date(Y, CFG.month, 0).getDate();
  for (let i = 0; i < f; i++) h += '<span></span>';
  for (let d = 1; d <= n; d++) h += `<span class="${d === CFG.day ? 'me' : ''}" style="animation-delay:${(f + d) * 0.02}s">${d}</span>`;
  $('#cal').innerHTML = h;
  $('#dt').textContent = `${CFG.day} ${M[CFG.month - 1]}`;
}

/* 2 — wishes */
function s2() {
  const l = $('#wl');
  l.innerHTML = CFG.wishes.map((w, i) => `<div class="w" style="--from:${i % 2 ? 80 : -80}px;--tilt:${i % 2 ? 4 : -4}deg"><b>✿</b><span>${w}</span></div>`).join('');
  $$('.w', l).forEach((e, i) => later(() => e.classList.add('in'), 300 + i * 500));
}

/* 3 — letter */
function s3() {
  const env = $('#env'), paper = $('#paper'), b = $('#b3');
  env.classList.remove('open'); paper.classList.remove('show'); b.classList.add('hide');
  paper.innerHTML = CFG.letter.map((t, i) => `<p style="animation-delay:${1.6 + i * 0.7}s">${t.replace('NAME', CFG.name)}</p>`).join('') +
    `<p class="sig" style="animation-delay:${1.8 + CFG.letter.length * 0.7}s">${CFG.signature}</p>`;
  env.onclick = () => {
    env.classList.add('open'); later(() => paper.classList.add('show'), 100);
    later(() => b.classList.remove('hide'), (2.4 + CFG.letter.length * 0.7) * 1000);
  };
}

/* 4 — balloons */
function s4() {
  const cols = ['#ff6f9f', '#d6336c', '#ff93b4', '#b3174f', '#f0508b', '#e8457c'], g = $('#bg');
  let popped = 0; const total = CFG.balloons.length;
  $('#b4').classList.add('hide'); $('#cnt').textContent = `0 / ${total}`;
  g.innerHTML = CFG.balloons.map((m, i) => `<div class="bl" style="--c:${cols[i % 6]};--d:${-i * 0.6}s;--sx:${i % 2 ? 6 : -6}px;--rt:${i % 2 ? 3 : -3}deg"><div class="msg">${m}</div></div>`).join('');
  $$('.bl', g).forEach((el, i) => el.onclick = () => {
    const r = el.getBoundingClientRect(), a = app.getBoundingClientRect();
    for (let k = 0; k < 12; k++) {
      const s = document.createElement('span'); s.className = 'pt'; s.textContent = ['💗', '✨', '🌸'][k % 3];
      s.style.left = r.left - a.left + r.width / 2 + 'px'; s.style.top = r.top - a.top + 30 + 'px';
      const ang = k / 12 * 6.28, d = rnd(40, 90);
      s.style.setProperty('--dx', Math.cos(ang) * d + 'px'); s.style.setProperty('--dy', Math.sin(ang) * d + 'px');
      app.appendChild(s); setTimeout(() => s.remove(), 900);
    }
    el.classList.add('gone');
    $('#cnt').textContent = `${++popped} / ${total}`;
    if (popped === total) later(() => $('#b4').classList.remove('hide'), 700);
  });
}

/* 5 — star heart */
function s7() {
  const cv = $('#cv'), dpr = devicePixelRatio || 1, W = cv.clientWidth, H = cv.clientHeight;
  cv.width = W * dpr; cv.height = H * dpr; const x = cv.getContext('2d'); x.scale(dpr, dpr);
  const sc = Math.min(W, H) / 36, P = [];
  for (let i = 0; i < 950; i++) {
    const t = rnd(0, 6.283), r = Math.pow(Math.random(), .45);
    const hx = 16 * Math.pow(Math.sin(t), 3), hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    P.push({ x: rnd(0, W), y: rnd(-60, 0), vx: 0, vy: 0, tx: W / 2 + hx * sc * r, ty: H / 2 + hy * sc * r + 6, s: rnd(.6, 2.1), ph: rnd(0, 6.28) });
  }
  const m = { x: -999, y: -999 }; let f = 0;
  const mv = e => { const b = cv.getBoundingClientRect(), p = e.touches ? e.touches[0] : e; m.x = p.clientX - b.left; m.y = p.clientY - b.top; e.preventDefault(); };
  cv.onpointermove = mv; cv.ontouchmove = mv; cv.ontouchstart = mv;
  cv.onpointerleave = cv.ontouchend = () => m.x = -999;
  (function L() {
    f++; x.clearRect(0, 0, W, H); const beat = 1 + Math.sin(f / 16) * .02;
    for (const p of P) {
      const dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy) || 1;
      if (d < 90) { const k = (90 - d) / 90 * 6; p.vx += dx / d * k; p.vy += dy / d * k; }
      p.vx += (p.tx - p.x) * .02; p.vy += (p.ty - p.y) * .02; p.vx *= .87; p.vy *= .87; p.x += p.vx; p.y += p.vy;
      x.globalAlpha = .55 + .45 * Math.sin(f / 14 + p.ph);
      x.fillStyle = p.s > 1.6 ? '#c2185b' : p.s > 1 ? '#ff6f9f' : '#ffb3cc';
      x.beginPath(); x.arc(p.x, p.y, p.s * beat, 0, 6.283); x.fill();
    }
    raf = requestAnimationFrame(L);
  })();
}

/* 6 — finale */
function s8() {
  const c = $('#fw'), x = c.getContext('2d'); c.width = app.clientWidth; c.height = app.clientHeight;
  const words = ['Happy', 'Birthday,', CFG.name + ' ❤'];
  $('#title').innerHTML = words.map((w, i) => `<span style="animation-delay:${0.5 + i * 0.6}s">${w}</span>`).join('');
  $('#fname').textContent = 'Made with love, just for you';
  $('#fmsg').textContent = CFG.finale;
  $('#replay').onclick = () => go(1);
  /* extra finale animation */
  $('#stars').innerHTML = Array.from({ length: 46 }, () => `<i class="tw" style="left:${rnd(0, 100)}%;top:${rnd(0, 100)}%;animation-delay:${rnd(0, 2)}s;animation-duration:${rnd(1.4, 3)}s"></i>`).join('');
  $('#lanterns').innerHTML += Array.from({ length: 6 }, () => `<span class="bal" style="left:${rnd(2, 92)}%;--dx:${rnd(-30, 30)}px;animation-duration:${rnd(8, 14)}s;animation-delay:${rnd(-10, 0)}s">${['🎈', '💗', '🎀', '🌸'][Math.random() * 4 | 0]}</span>`).join('');
  const msgs = [CFG.finale, ...CFG.wishes]; let mi = 0; const fm = $('#fmsg');
  timers.push(setInterval(() => { fm.classList.add('out'); setTimeout(() => { fm.textContent = msgs[++mi % msgs.length]; fm.classList.remove('out'); }, 600); }, 3800));
  timers.push(setInterval(() => confetti(16), 4000)); later(() => confetti(50), 1800);
  /* date chip + bunting flags + confetti cannons */
  const MN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  $('#datechip').textContent = `${CFG.day} ${MN[CFG.month - 1]}`;
  const fc = ['#ff9fbd', '#ffd3b8', '#ff6f9f', '#ffffff', '#e8457c'];
  $('#bunting').innerHTML = Array.from({ length: 10 }, (_, i) => `<i class="flag" style="--c:${fc[i % 5]};--d:${-i * 0.3}s"></i>`).join('');
  const cannon = () => [0, 1].forEach(side => { for (let i = 0; i < 26; i++) {
    const p = document.createElement('i'); p.className = 'cn';
    p.style.left = (side ? 94 : 4) + '%'; p.style.background = ['#ff6f9f', '#ffd166', '#fff', '#ffb3cc', '#e8457c'][i % 5];
    p.style.setProperty('--dx', (side ? -1 : 1) * rnd(30, 220) + 'px'); p.style.setProperty('--dy', -rnd(240, 560) + 'px'); p.style.setProperty('--r', rnd(200, 800) + 'deg');
    app.appendChild(p); setTimeout(() => p.remove(), 2000);
  } });
  later(cannon, 1200); timers.push(setInterval(cannon, 5000));

  $('#lanterns').innerHTML = Array.from({ length: 9 }, () =>
    `<span class="ln" style="left:${rnd(2, 95)}%;--dx:${rnd(-40, 40)}px;animation-duration:${rnd(9, 16)}s;animation-delay:${rnd(-12, 0)}s;transform:scale(${rnd(.6, 1.2)})"></span>`).join('');
  let FW = []; fwOn = true;
  const burst = () => {
    const cx = rnd(40, c.width - 40), cy = rnd(70, c.height * .5), col = `hsl(${rnd(325, 375)},90%,${rnd(68, 82)}%)`;
    for (let i = 0; i < 54; i++) { const a = i / 54 * 6.283, s = rnd(1.5, 4.2); FW.push({ x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s, l: 1, c: col }); }
  };
  burst(); let n = 0;
  (function L() {
    if (!fwOn) return; n++;
    x.globalCompositeOperation = 'destination-out'; x.fillStyle = 'rgba(0,0,0,.18)'; x.fillRect(0, 0, c.width, c.height);
    x.globalCompositeOperation = 'lighter';
    if (n % 55 === 0) burst();
    for (const p of FW) { p.x += p.vx; p.y += p.vy; p.vy += .045; p.vx *= .985; p.l -= .011; x.globalAlpha = Math.max(p.l, 0); x.fillStyle = p.c; x.beginPath(); x.arc(p.x, p.y, 2.2, 0, 6.283); x.fill(); }
    x.globalAlpha = 1; FW = FW.filter(p => p.l > 0);
    raf = requestAnimationFrame(L);
  })();
}

/* helpers */
function confetti(n = 40) {
  for (let i = 0; i < n; i++) {
    const c = document.createElement('i'); c.className = 'conf';
    c.style.cssText = `position:absolute;top:-14px;left:${rnd(0, 100)}%;width:9px;height:14px;z-index:40;pointer-events:none;background:${['#ff6f9f','#ffd166','#fff','#d6336c','#ffb3cc'][i % 5]};animation:fall ${rnd(2, 4)}s linear forwards`;
    c.style.setProperty('--dx', rnd(-70, 70) + 'px'); c.style.setProperty('--r', rnd(300, 900) + 'deg');
    app.appendChild(c); setTimeout(() => c.remove(), 4200);
  }
}

/* 6 — reasons (flip cards) */
function s5() {
  const g = $('#fcs'), total = CFG.reasons.length; let n = 0;
  $('#b6').classList.add('hide'); $('#fcnt').textContent = `0 / ${total}`;
  g.innerHTML = CFG.reasons.map(r => `<div class="fc"><div class="in"><div class="f"><div>${r.i}<small>tap me</small></div></div><div class="b">${r.t}</div></div></div>`).join('');
  $$('.fc', g).forEach(c => c.onclick = () => {
    if (c.classList.contains('flip')) return; c.classList.add('flip'); $('#fcnt').textContent = `${++n} / ${total}`;
    if (n === total) later(() => { $('#b6').classList.remove('hide'); confetti(25); }, 800);
  });
}

/* 7 — cake + knife */
function s6() {
  const w = $('#cakeWrap'), k = $('#knife'), msg = $('#cakeMsg'); w.className = ''; $('#b7').classList.add('hide');
  const html = '<div class="ly l1"></div><div class="ly l2"></div><div class="ly l3"></div>' +
    '<span class="bry" style="left:8px;bottom:76px">🍓</span><span class="bry" style="left:218px;bottom:76px">🍓</span><span class="bry" style="left:36px;bottom:142px">🍓</span><span class="bry" style="left:184px;bottom:142px">🍓</span>' +
    [90, 125, 160].map(l => `<i class="cd" style="left:${l - 4}px"></i><i class="fl" style="left:${l - 7}px"></i>`).join('');
  $('.cakeA', w).innerHTML = html; $('.cakeB', w).innerHTML = html;
  k.innerHTML = '<svg viewBox="0 0 28 110" width="28" height="110"><defs><linearGradient id="bl" x1="0" x2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#b9bfc9"/></linearGradient></defs><rect x="8" y="0" width="12" height="36" rx="6" fill="#7a1f45"/><rect x="4" y="36" width="20" height="5" rx="2" fill="#e8b4a0"/><path d="M6 41H22V80Q22 96 6 108Z" fill="url(#bl)" stroke="#9aa0ab" stroke-width=".8"/></svg>';
  k.style.transform = ''; k.classList.remove('drag'); msg.textContent = 'Tap the candles to blow them out.';
  let blown = false, done = false, drag = false, sy = 0, dy = 0;
  w.onclick = () => {
    if (blown) return; blown = true; $$('.fl', w).forEach(f => f.classList.add('off'));
    msg.textContent = 'Wish made! ✨'; confetti(30);
    later(() => { w.classList.add('ready'); msg.textContent = 'Now drag the knife down to cut the cake 🔪'; }, 1000);
  };
  const finish = () => {
    if (done) return; done = true; w.classList.add('cut'); msg.textContent = 'The first slice is yours 🍰'; confetti(60);
    later(() => $('#b7').classList.remove('hide'), 1400);
  };
  k.onpointerdown = e => { drag = true; sy = e.clientY; dy = 0; k.style.transition = ''; k.setPointerCapture(e.pointerId); k.classList.add('drag'); e.preventDefault(); };
  k.onpointermove = e => { if (!drag || done) return; dy = Math.max(0, Math.min(215, e.clientY - sy)); k.style.transform = `translateY(${dy}px)`; if (dy >= 180) { drag = false; finish(); } };
  k.onpointerup = () => {
    if (!drag || done) return; drag = false;
    if (dy < 8) { k.style.transition = 'transform .7s'; k.style.transform = 'translateY(200px)'; later(finish, 650); }
    else { k.style.transition = 'transform .4s'; k.style.transform = ''; k.classList.remove('drag'); }
  };
}

go(0);
