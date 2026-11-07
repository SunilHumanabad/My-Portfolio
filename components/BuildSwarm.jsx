'use client';

import { useEffect, useRef } from 'react';
import { site } from '@/config/site';
import { allSkills } from '@/data/skills';
import { BLOCKS } from '@/lib/buildBlocks';

/*
 * Live build
 * ──────────
 * Started by the header's "Motion" button. The page goes blank, then a team of
 * multiplayer-style cursors — each tagged with one of the owner's skills —
 * rebuilds it block by block as you scroll: boxes are dragged out with a
 * crosshair and a W × H badge, text is typed in behind an I-beam caret.
 * The faster you scroll, the more cursors join and the faster they work.
 *
 * Original, dependency-free code. Purely visual: content stays in the DOM for
 * screen readers, focusing a hidden block reveals it instantly, Esc or "Skip"
 * finishes everything at once.
 */

const NAMES = [...new Set([...site.identity.specialties, ...allSkills])];
const COLORS = ['#e32b3c', '#7b61ff', '#0fa958', '#1abcfe', '#f5a400', '#ff7262', '#a259ff', '#00b5a3', '#ff4fa3', '#3d8bff'];

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, k) => a + (b - a) * k;
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/** Line boxes of a text element, relative to its own top-left corner. */
function textLines(el) {
  const box = el.getBoundingClientRect();
  const range = document.createRange();
  range.selectNodeContents(el);
  const rects = [...range.getClientRects()].filter((q) => q.width > 1 && q.height > 1).sort((a, b) => a.top - b.top);
  const lines = [];
  for (const q of rects) {
    const mid = q.top + q.height / 2;
    const line = lines.find((l) => mid > l.top && mid < l.bottom);
    if (line) {
      line.left = Math.min(line.left, q.left);
      line.right = Math.max(line.right, q.right);
      line.top = Math.min(line.top, q.top);
      line.bottom = Math.max(line.bottom, q.bottom);
    } else {
      lines.push({ left: q.left, right: q.right, top: q.top, bottom: q.bottom });
    }
  }
  return {
    w: box.width,
    lines: lines.map((l) => ({
      left: l.left - box.left,
      right: l.right - box.left,
      top: l.top - box.top,
      bottom: l.bottom - box.top,
    })),
  };
}

/** clip-path that shows every finished line plus the current line up to the caret. */
function typingClip(geo, p) {
  const { w, lines } = geo;
  if (!lines.length) return { clip: `inset(-20px ${(1 - p) * 100}% -20px -20px)`, caret: null };
  const total = lines.reduce((s, l) => s + (l.right - l.left), 0);
  let d = p * total;
  let i = 0;
  while (i < lines.length - 1 && d > lines[i].right - lines[i].left) {
    d -= lines[i].right - lines[i].left;
    i++;
  }
  const L = lines[i];
  const x = L.left + Math.min(d, L.right - L.left);
  const pad = 60;
  const top = L.top - 2;
  const bottom = L.bottom + 6;
  return {
    clip: `polygon(${-pad}px ${-pad}px, ${w + pad}px ${-pad}px, ${w + pad}px ${top}px, ${x}px ${top}px, ${x}px ${bottom}px, ${-pad}px ${bottom}px)`,
    caret: { x, top: L.top, h: L.bottom - L.top },
  };
}

function createAgent(layer, index, x, y) {
  const color = COLORS[index % COLORS.length];
  const root = document.createElement('div');
  root.className = 'ba is-arrow';
  root.style.setProperty('--c', color);
  root.innerHTML =
    '<svg class="ba__arrow" viewBox="0 0 18 22"><path d="M1.5 1.5v16.8l4.4-4 3 6.6 2.9-1.3-2.9-6.5h6.2z" fill="currentColor" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>' +
    '<svg class="ba__cross" viewBox="0 0 22 22"><path d="M11 0v8M11 14v8M0 11h8M14 11h8" stroke="currentColor" stroke-width="1.8"/></svg>' +
    '<svg class="ba__ibeam" viewBox="0 0 12 24"><path d="M2 1.5h3c.6 0 1 .4 1 1v19c0 .6.4 1 1 1h3M10 1.5H7c-.6 0-1 .4-1 1M6 21.5c0 .6-.4 1-1 1H2" stroke="currentColor" stroke-width="1.7" fill="none"/></svg>' +
    '<span class="ba__name"></span>';
  root.querySelector('.ba__name').textContent = NAMES[index % NAMES.length];
  const sel = document.createElement('div');
  sel.className = 'ba-sel';
  sel.style.setProperty('--c', color);
  sel.innerHTML = '<i></i><i></i><i></i><i></i><span class="ba-sel__badge"></span>';
  const caret = document.createElement('span');
  caret.className = 'ba-caret';
  caret.style.setProperty('--c', color);
  layer.append(sel, caret, root);
  return {
    root,
    sel,
    badge: sel.querySelector('.ba-sel__badge'),
    caret,
    color,
    name: NAMES[index % NAMES.length],
    x,
    y,
    mode: 'arrow',
    task: null,
    rest: { x, y },
    idleSince: 0,
    home: Math.random(),
    ox: (Math.random() - 0.5) * 120,
    oy: (Math.random() - 0.5) * 90,
  };
}

export default function BuildSwarm({ run, origin, onDone }) {
  const layerRef = useRef(null);
  const countRef = useRef(null);
  const facesRef = useRef(null);
  const hudRef = useRef(null);
  const skipRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    const faces = facesRef.current;
    if (!layer) return undefined;
    const html = document.documentElement;
    const mobile = window.matchMedia('(max-width: 899px)').matches;
    const START_AGENTS = mobile ? 4 : 6;
    const MAX_AGENTS = mobile ? 7 : 10;

    // ── Collect blocks in document order (skip ones nested in another block) ──
    const kinds = new Map();
    for (const [selector, kind] of BLOCKS) {
      document.querySelectorAll(selector).forEach((el) => {
        if (!kinds.has(el)) kinds.set(el, kind);
      });
    }
    const els = [...kinds.keys()]
      .filter((el) => {
        for (let p = el.parentElement; p; p = p.parentElement) if (kinds.has(p)) return false;
        return true;
      })
      .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    // The outlined copy of the hero name is revealed together with the solid lines.
    const solid = [...document.querySelectorAll('h1.hero__name .hero__line')];
    const outline = [...document.querySelectorAll('.hero__name--outline .hero__line')];
    const blocks = els.map((el) => {
      const i = solid.indexOf(el);
      return { el, kind: kinds.get(el), twins: i >= 0 && outline[i] ? [outline[i]] : [], state: 'pending' };
    });
    const parts = (b) => [b.el, ...b.twins];
    const setClip = (b, v) => parts(b).forEach((e) => (e.style.clipPath = v));
    const finishBlock = (b) => {
      parts(b).forEach((e) => {
        e.classList.remove('build-hidden');
        e.style.clipPath = '';
      });
      b.state = 'done';
    };

    html.classList.add('is-building');
    blocks.forEach((b) => parts(b).forEach((e) => e.classList.add('build-hidden')));
    delete html.dataset.build; // the pre-paint "pending" state hands over to the build

    // ── Agents ──
    const agents = [];
    const spawn = (x, y) => {
      const a = createAgent(layer, agents.length, x, y);
      agents.push(a);
      if (faces) {
        const f = document.createElement('span');
        f.style.setProperty('--c', a.color);
        f.textContent = a.name.charAt(0);
        f.title = a.name;
        faces.append(f);
      }
      return a;
    };
    const setMode = (a, m) => {
      if (a.mode !== m) {
        a.mode = m;
        a.root.className = `ba is-${m}`;
      }
    };
    const placeSel = (a, l, t, w, h) => {
      a.sel.style.transform = `translate3d(${l}px, ${t}px, 0)`;
      a.sel.style.width = `${Math.max(0, w)}px`;
      a.sel.style.height = `${Math.max(0, h)}px`;
    };

    const W0 = window.innerWidth;
    const H0 = window.innerHeight;
    const sx = origin?.x ?? W0 / 2;
    const sy = origin?.y ?? 40;
    for (let i = 0; i < START_AGENTS; i++) {
      const a = spawn(sx, sy);
      const ang = Math.PI * 0.15 + (i / START_AGENTS) * Math.PI * 0.9 + Math.random() * 0.3;
      const r = 120 + Math.random() * 180;
      a.rest = { x: clamp(sx - Math.cos(ang) * r, 30, W0 - 140), y: clamp(sy + Math.sin(ang) * r, 90, H0 - 60) };
    }

    // ── State ──
    let mouse = origin ? { ...origin } : null;
    let phase = 'intro';
    const startAt = performance.now();
    let last = startAt;
    let lastScan = 0;
    let lastSpawn = 0;
    let lastActivity = startAt;
    let finaleAt = 0;
    let finaleLength = 1500;
    let speed = 1;
    let stopped = false;
    let raf = 0;

    const entryPoint = (b, r, geo) => {
      if (b.kind === 'box') return { x: r.left, y: r.top };
      const l0 = geo?.lines[0];
      if (b.kind === 'text' && l0) return { x: r.left + l0.left, y: r.top + (l0.top + l0.bottom) / 2 };
      return { x: r.left, y: r.top + r.height / 2 };
    };

    const startTask = (a, b, now) => {
      b.state = 'active';
      const r = b.el.getBoundingClientRect();
      const geo = b.kind === 'text' ? textLines(b.el) : null;
      const chars = (b.el.textContent || '').trim().length;
      const tg = entryPoint(b, r, geo);
      a.task = {
        b,
        geo,
        t: 0,
        from: { x: a.x, y: a.y },
        travel: clamp(Math.hypot(tg.x - a.x, tg.y - a.y) * 0.75, 220, 700),
        work:
          b.kind === 'box'
            ? clamp(Math.hypot(r.width, r.height) * 0.65, 300, 760)
            : clamp(chars * 17 + (geo?.lines.length || 1) * 70, 320, 1500),
        settle: 260,
        started: false,
        settled: false,
      };
      lastActivity = now;
    };

    const runTask = (a, dt) => {
      const k = a.task;
      const b = k.b;
      k.t += dt;
      if (!b.el.isConnected || (b.state === 'done' && !k.settled)) {
        a.sel.classList.remove('is-on');
        a.caret.classList.remove('is-on');
        a.task = null;
        return;
      }
      const r = b.el.getBoundingClientRect();
      const T1 = k.travel;
      const T2 = T1 + k.work;
      const T3 = T2 + k.settle;

      if (k.t < T1) {
        setMode(a, 'arrow');
        const tg = entryPoint(b, r, k.geo);
        const p = easeInOut(k.t / T1);
        a.x = lerp(k.from.x, tg.x, p);
        a.y = lerp(k.from.y, tg.y, p);
        return;
      }
      if (!k.started) {
        k.started = true;
        parts(b).forEach((e) => e.classList.remove('build-hidden'));
        a.sel.classList.add('is-on');
        a.sel.classList.toggle('is-text', b.kind !== 'box');
      }

      if (k.t < T2) {
        const raw = clamp((k.t - T1) / k.work, 0, 1);
        if (b.kind === 'box') {
          const p = easeOut(raw);
          const w = r.width * p;
          const h = r.height * p;
          setMode(a, 'cross');
          a.x = r.left + w;
          a.y = r.top + h;
          placeSel(a, r.left, r.top, w, h);
          a.badge.textContent = `${Math.round(w)} × ${Math.round(h)}`;
          setClip(b, `inset(0 ${(1 - p) * 100}% ${(1 - p) * 100}% 0)`);
        } else {
          setMode(a, 'beam');
          placeSel(a, r.left, r.top, r.width, r.height);
          let cx;
          let cy;
          let ch;
          if (b.kind === 'text') {
            const { clip, caret } = typingClip(k.geo, raw);
            setClip(b, clip);
            cx = r.left + (caret ? caret.x : r.width * raw);
            cy = r.top + (caret ? caret.top : 0);
            ch = caret ? caret.h : r.height;
          } else {
            setClip(b, `inset(-20px ${(1 - raw) * 100}% -20px -20px)`);
            cx = r.left + r.width * raw;
            cy = r.top;
            ch = r.height;
          }
          a.caret.classList.add('is-on');
          a.caret.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
          a.caret.style.height = `${ch}px`;
          a.x = cx + 4;
          a.y = cy + ch * 0.55;
        }
        return;
      }

      if (!k.settled) {
        k.settled = true;
        finishBlock(b);
        a.caret.classList.remove('is-on');
        k.leave = { x: a.x, y: a.y };
        setMode(a, 'arrow');
      }
      placeSel(a, r.left, r.top, r.width, r.height);
      const p = easeOut(clamp((k.t - T2) / k.settle, 0, 1));
      a.x = k.leave.x + 18 * p;
      a.y = k.leave.y + 14 * p;
      if (k.t >= T3) {
        a.sel.classList.remove('is-on');
        a.task = null;
        a.rest = { x: a.x, y: a.y };
        a.idleSince = performance.now();
      }
    };

    const idle = (a, dt, now, W, H) => {
      setMode(a, 'arrow');
      let tx = a.rest.x;
      let ty = a.rest.y;
      let tau = 260;
      if (phase === 'finale') {
        if (mouse) {
          tx = mouse.x + a.ox;
          ty = mouse.y + a.oy;
          tau = 120 + a.home * 220;
        } else {
          ty = H + 80;
          tau = 400;
        }
      } else if (phase === 'build' && now - a.idleSince > 1400) {
        // Nothing to do here — wait near the bottom for the next blocks to scroll in.
        tx = W * (0.08 + a.home * 0.84);
        ty = H - 130 - a.home * 90;
      }
      const wob = Math.sin(now / 500 + a.home * 10) * 3;
      const f = 1 - Math.exp(-dt / tau);
      a.x += (tx - a.x) * f;
      a.y += (ty + wob - a.y) * f;
    };

    const scan = (now, W, H) => {
      const available = [];
      let pending = 0;
      let done = 0;
      for (const b of blocks) {
        if (b.state === 'done') {
          done++;
          continue;
        }
        if (b.state !== 'pending') continue;
        if (!b.el.isConnected) {
          b.state = 'done';
          continue;
        }
        const r = b.el.getBoundingClientRect();
        if ((r.width === 0 && r.height === 0) || r.bottom < -20) {
          finishBlock(b); // invisible, or already scrolled past
          continue;
        }
        pending++;
        if (r.top < H * 0.94) available.push(b);
      }
      if (countRef.current) countRef.current.textContent = `${done}/${blocks.length}`;

      const idleAgents = agents.filter((a) => !a.task);
      speed = 1 + clamp((available.length - idleAgents.length) / 5, 0, 2.5);
      // The faster you scroll, the more help arrives.
      if (available.length > agents.length * 1.5 && agents.length < MAX_AGENTS && now - lastSpawn > 300) {
        lastSpawn = now;
        const a = spawn(Math.random() * W, H + 30);
        a.rest = { x: a.x, y: H - 120 };
      }
      for (const a of agents) {
        if (a.task || !available.length) continue;
        let best = available[0];
        let bestD = Infinity;
        for (const b of available.slice(0, 4)) {
          const r = b.el.getBoundingClientRect();
          const d = Math.hypot(r.left - a.x, r.top - a.y);
          if (d < bestD) {
            bestD = d;
            best = b;
          }
        }
        available.splice(available.indexOf(best), 1);
        startTask(a, best, now);
      }
      if (pending === 0 && agents.every((a) => !a.task)) startFinale(now, 1500);
      else if (now - lastActivity > 60000) skip(); // nobody scrolled for a minute — tidy up
    };

    const startFinale = (now, length) => {
      if (phase === 'finale') return;
      phase = 'finale';
      finaleAt = now;
      finaleLength = length;
      hudRef.current?.classList.add('is-leaving');
      agents.forEach((a) => {
        a.sel.classList.remove('is-on');
        a.caret.classList.remove('is-on');
      });
    };

    const skip = () => {
      blocks.forEach((b) => b.state !== 'done' && finishBlock(b));
      agents.forEach((a) => (a.task = null));
      if (countRef.current) countRef.current.textContent = `${blocks.length}/${blocks.length}`;
      startFinale(performance.now(), 700);
    };
    skipRef.current = skip;

    const frame = (now) => {
      if (stopped) return;
      const dt = Math.min(50, now - last);
      last = now;
      const W = window.innerWidth;
      const H = window.innerHeight;
      if (phase === 'intro' && now - startAt > 600) phase = 'build';
      if (phase === 'build' && now - lastScan > 90) {
        lastScan = now;
        scan(now, W, H);
      }
      let fade = 1;
      if (phase === 'finale') {
        const p = (now - finaleAt) / finaleLength;
        fade = 1 - clamp((p - 0.55) / 0.45, 0, 1);
        if (p >= 1) {
          stopped = true;
          onDone(run);
          return;
        }
      }
      for (const a of agents) {
        if (a.task) runTask(a, dt * speed);
        else idle(a, dt, now, W, H);
        a.root.style.transform = `translate3d(${a.x}px, ${a.y}px, 0)`;
        a.root.style.opacity = String(fade);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onPointer = (e) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    const onKey = (e) => {
      if (e.key === 'Escape') skip();
    };
    // Keyboard users never land on an invisible block.
    const onFocus = (e) => {
      const b = blocks.find((x) => x.state !== 'done' && parts(x).some((p) => p.contains(e.target)));
      if (b) finishBlock(b);
    };
    const onScroll = () => {
      lastActivity = performance.now();
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    document.addEventListener('focusin', onFocus);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('focusin', onFocus);
      blocks.forEach(finishBlock);
      html.classList.remove('is-building');
      html.classList.add('build-done');
      delete html.dataset.build;
      layer.replaceChildren();
      faces?.replaceChildren();
    };
  }, [run, origin, onDone]);

  return (
    <>
      <div ref={layerRef} className="build-layer" aria-hidden="true" />
      <div ref={hudRef} className="build-hud">
        <span ref={facesRef} className="build-hud__faces" aria-hidden="true" />
        <span className="build-hud__label">
          <span className="build-hud__live" aria-hidden="true" />
          Building live <span ref={countRef} className="build-hud__count" />
        </span>
        <button type="button" onClick={() => skipRef.current?.()}>
          Skip
        </button>
      </div>
    </>
  );
}
