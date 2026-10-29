(() => {
  const S = window.SITE;
  // content.js failed to load (the error box already says where), so stop here
  if (!S) return;

  // check the content for common editing slips and fill safe defaults so the page still renders
  const problem = (t, d) => window.siteProblem && window.siteProblem(t, d);
  const seen = new Set();
  (S.projects || []).forEach((p, n) => {
    const where = `Project ${n + 1}${p && p.title ? ` ("${p.title}")` : ""}`;
    if (!p.id) problem(where, "needs an id, like id: \"my-project\",");
    else if (seen.has(p.id)) problem(where, `the id "${p.id}" is used twice. Each project needs its own.`);
    seen.add(p.id);
    if (!p.title) problem(where, "needs a title");
    p.cat = p.cat || []; p.tools = p.tools || []; p.links = p.links || []; p.kicker = p.kicker || ""; p.stat = p.stat || "";
    p.summary = p.summary || ""; p.year = p.year || "";
    if (!p.thumb) p.thumb = { kind: "type", word: p.title || "?", sub: p.kicker || "" };
  });
  (S.featured || []).forEach((id) => { if (!seen.has(id)) problem("featured", `"${id}" isn't the id of any project`); });
  (S.experience || []).forEach((x) => {
    if (x.project && !seen.has(x.project)) problem(`Experience ("${x.role}")`, `project: "${x.project}" isn't the id of any project`);
    x.points = x.points || [];
  });
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // text that may hold [label](https://link) links, written the same way as in Notion
  const rich = (s) => esc(s).replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const transition = (fn) => {
    const t = document.startViewTransition(fn);
    [t.ready, t.finished, t.updateCallbackDone].forEach((p) => p.catch(() => {}));
  };
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  };

  /* ---------------- hero + static bits ---------------- */
  $("#status").textContent = S.status;
  $("#intro").textContent = S.intro;
  const tg = $("#tagline"); if (tg) tg.textContent = S.tagline || "";
  $("#school").textContent = S.school;
  $("#resumeTop").href = S.resume;
  $("#quick").innerHTML =
    `<a class="primary" href="${S.resume}" download>Résumé ↓</a>` +
    `<a href="mailto:${S.email}">Email</a>` +
    S.links.map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a>`).join("");
  $("#mail").href = `mailto:${S.email}`;
  $("#mailText").innerHTML = `<a href="mailto:${S.email}">${S.email}</a>`;
  $("#footLinks").innerHTML =
    S.links.map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join("") +
    `<a href="${S.resume}" download>Résumé</a>`;
  $("#yr").textContent = new Date().getFullYear();

  const clock = $("#clock");
  const tick = () => {
    clock.textContent =
      new Date().toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit" }) + " PT";
  };
  tick(); setInterval(tick, 30000);

  /* ---------------- thumbnails (drawn, not downloaded) ---------------- */
  const rng = (seed) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  // no small copy in assets/photos/sm? use the full-size image instead
  const smFallback = "this.onerror=null;this.src=this.src.replace('/sm/','/')";
  const ink = "#2F5240", red = "#E08DA0", soft = "#c9d6cc";

  const thumbs = {
    scatter() {
      const r = rng(7); let pts = "";
      for (let i = 0; i < 46; i++) {
        const x = 30 + r() * 340, y = 440 - (x * 0.95) - 30 + (r() - 0.5) * 120;
        pts += `<circle cx="${x.toFixed(1)}" cy="${Math.max(40, y).toFixed(1)}" r="${(2.5 + r() * 3).toFixed(1)}" fill="${i % 9 ? ink : red}" opacity=".85"/>`;
      }
      return svg(`${axes()}${pts}<line x1="20" y1="420" x2="380" y2="68" stroke="${red}" stroke-width="2"/><text x="28" y="470" ${lbl}>price ~ sqft + bath</text>`);
    },
    bars() {
      const r = rng(3); let b = "";
      for (let i = 0; i < 9; i++) {
        const w = 330 - i * 30 - r() * 20;
        b += `<rect x="30" y="${50 + i * 42}" width="0" height="22" fill="${i === 0 ? red : ink}"><animate attributeName="width" to="${w.toFixed(0)}" dur="1.2s" begin="${(i * 0.06).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines=".2 .7 .1 1"/></rect>`;
      }
      return svg(`${b}<text x="30" y="470" ${lbl}>skill mentions / posting</text>`);
    },
    map() {
      const r = rng(11); let c = "";
      for (let y = 0; y < 15; y++) for (let x = 0; x < 13; x++) {
        const v = r(); if (v < 0.35) continue;
        const big = v > 0.93;
        c += `<circle cx="${40 + x * 27}" cy="${50 + y * 26}" r="${big ? 9 : 2 + v * 4}" fill="${big ? red : ink}" opacity="${big ? 1 : 0.25 + v * 0.6}"/>`;
      }
      return svg(`${c}<text x="30" y="470" ${lbl}>CO₂ by country &amp; type</text>`);
    },
    nodes() {
      const r = rng(5); let w = "", l = "";
      for (let i = 0; i < 44; i++) { const h = 8 + r() * 70; w += `<rect x="${24 + i * 4.6}" y="${150 - h / 2}" width="2.4" height="${h.toFixed(1)}" fill="${ink}"/>`; }
      const ys = [80, 160, 240, 320, 400];
      ys.forEach((y, i) => {
        l += `<path d="M230 150 C 290 150, 280 ${y}, 330 ${y}" fill="none" stroke="${i === 2 ? red : soft}" stroke-width="1.4"/>`;
        l += `<rect x="330" y="${y - 12}" width="46" height="24" fill="${i === 2 ? red : ink}"/>`;
      });
      return svg(`${w}${l}<text x="28" y="470" ${lbl}>400+ voice notes → capsules</text>`);
    },
    rings() {
      let c = "";
      for (let i = 0; i < 17; i++) {
        const x = 70 + (i % 4) * 85, y = 70 + Math.floor(i / 4) * 80, on = [0, 3, 4, 6, 9, 12, 16].includes(i);
        c += `<circle cx="${x}" cy="${y}" r="28" fill="none" stroke="${on ? ink : soft}" stroke-width="${on ? 8 : 3}" stroke-dasharray="${on ? 120 : 176} 200" transform="rotate(-90 ${x} ${y})"/>`;
        c += `<text x="${x}" y="${y + 4}" text-anchor="middle" font-family="JetBrains Mono" font-size="11" fill="${on ? ink : "#9aa79e"}">${i + 1}</text>`;
      }
      return svg(`${c}<text x="30" y="470" ${lbl}>17 UN SDGs · UC Davis</text>`);
    },
    flow() {
      let c = "";
      for (let i = 0; i < 7; i++) {
        const x = i % 2 ? 230 : 60, y = 40 + i * 58;
        c += `<rect x="${x}" y="${y}" width="110" height="34" fill="${i === 6 ? red : i % 3 ? "none" : ink}" stroke="${ink}" stroke-width="1.4"/>`;
        c += `<text x="${x + 10}" y="${y + 21}" font-family="JetBrains Mono" font-size="11" fill="${i === 6 || !(i % 3) ? "#fff" : ink}">0${i + 1}</text>`;
        if (i < 6) c += `<path d="M${x + (i % 2 ? 0 : 110)} ${y + 17} L ${i % 2 ? 170 : 230} ${y + 75}" stroke="${ink}" stroke-width="1" fill="none"/>`;
      }
      return svg(`${c}<text x="30" y="470" ${lbl}>7-stage workflow · Zapier</text>`);
    },
    grid() {
      return `<div class="th-grid">${["IG", "IG", "TT", "IG", "TT", "TT"].map((t) => `<span>${t}</span>`).join("")}</div>`;
    },
    type(t, p) {
      const isVideo = p.cat.includes("video");
      return `<div class="th-type ${t.tint || ""}">${isVideo ? `<span class="play">▶</span>` : ""}<div><b>${esc(t.word)}</b><i>${esc(t.sub)}</i></div></div>`;
    },
    // a real image of the work: poster, dashboard, map. fit "top" crops from the top, "contain" shows it whole
    image(t) {
      return `<div class="th-img fit-${t.fit || "top"}"><img src="assets/photos/sm/${t.file}.jpg" alt="" loading="lazy" onerror="${smFallback}"></div>`;
    },
    // household income share by bracket, Tracy vs California (ACS 2024 5-year, table S1901)
    income(t) {
      const ca = [4.5, 2.9, 5.0, 5.3, 8.1, 13.0, 11.6, 17.8, 11.3, 20.5];
      const tr = [2.4, 1.6, 2.6, 3.0, 5.3, 10.1, 12.4, 25.0, 17.8, 19.9];
      const labels = ["<10k", "", "", "", "", "50k", "", "100k", "", "200k+"];
      const base = 410, k = 12, bw = 14;
      let g = "";
      ca.forEach((v, i) => {
        const x = 38 + i * 34;
        g += `<rect x="${x}" y="${base - v * k}" width="${bw}" height="${v * k}" fill="${soft}"/>`;
        g += `<rect x="${x + bw + 2}" y="${base - tr[i] * k}" width="${bw}" height="${tr[i] * k}" fill="${i === 7 ? red : ink}"/>`;
        if (labels[i]) g += `<text x="${x + bw}" y="${base + 18}" text-anchor="middle" ${lbl}>${labels[i]}</text>`;
      });
      g += `<text x="${38 + 7 * 34 + bw}" y="${base - 25 * k - 10}" text-anchor="middle" font-family="JetBrains Mono" font-size="12" fill="${ink}">25%</text>`;
      g += `<rect x="38" y="40" width="10" height="10" fill="${ink}"/><text x="54" y="49" ${lbl}>Tracy</text><rect x="110" y="40" width="10" height="10" fill="${soft}"/><text x="126" y="49" ${lbl}>California</text>`;
      return svg(`<path d="M30 ${base} H385" stroke="${soft}"/>${g}<text x="30" y="470" ${lbl}>household income share · ACS 2024</text>`);
    },
    photo(t, p) {
      const isVideo = p.cat.includes("video");
      return `<div class="th-photo"><img src="assets/photos/sm/${t.file}.jpg" alt="" loading="lazy" onerror="${smFallback}">` +
        `${isVideo ? `<span class="play">▶</span>` : ""}<div><b>${esc(t.word || "")}</b><i>${esc(t.sub || "")}</i></div></div>`;
    },
  };
  const lbl = `font-family="JetBrains Mono" font-size="11" letter-spacing=".5" fill="#69756D"`;
  const axes = () => `<path d="M20 30 V430 H385" fill="none" stroke="${soft}" stroke-width="1"/>`;
  function svg(inner) {
    return `<svg class="th-svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${inner}</svg>`;
  }
  const thumbFor = (p) => (thumbs[p.thumb.kind] || thumbs.type)(p.thumb, p);

  /* ---------------- projects ---------------- */
  const grid = $("#projects");
  grid.innerHTML = S.projects.map((p, i) => `
    <button class="card reveal" style="--d:${(i % 4) * 0.06}s;view-transition-name:c-${p.id}" data-id="${p.id}" data-cat="${p.cat.join(" ")}">
      <div class="look mono"><span class="no">No. ${pad(i + 1)}</span><span class="yr">${p.year}</span></div>
      <div class="thumb">${thumbFor(p)}<span class="badge">${esc(p.stat)}</span></div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.summary)}</p>
      <div class="tags mono">${p.cat.map((c) => `<span>${c}</span>`).join("")}</div>
    </button>`).join("");

  // chip counts
  $$(".chip").forEach((c) => {
    const f = c.dataset.filter;
    const n = f === "all" ? S.projects.length : S.projects.filter((p) => p.cat.includes(f)).length;
    c.insertAdjacentHTML("beforeend", `<sup>${n}</sup>`);
  });

  const countEl = $("#count");
  let current = "all";
  function applyFilter(f, animate = true) {
    current = f;
    $$(".chip").forEach((c) => { const on = c.dataset.filter === f; c.classList.toggle("is-on", on); c.setAttribute("aria-selected", on); });
    const run = () => {
      let shown = 0;
      $$(".card", grid).forEach((card) => {
        const vis = f === "all" || card.dataset.cat.split(" ").includes(f);
        card.classList.toggle("is-hidden", !vis);
        if (vis) shown++;
      });
      countEl.textContent = `${pad(shown)} projects`;
    };
    animate && document.startViewTransition && !reduce ? transition(run) : run();
  }
  $$(".chip").forEach((c) => c.addEventListener("click", () => applyFilter(c.dataset.filter)));
  applyFilter("all", false);

  function setView(v, animate = true) {
    $$(".view").forEach((b) => { const on = b.dataset.view === v; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on); });
    const run = () => (grid.dataset.view = v);
    animate && document.startViewTransition && !reduce ? transition(run) : run();
    store.set("view", v);
  }
  $$(".view").forEach((b) => b.addEventListener("click", () => setView(b.dataset.view)));
  setView(store.get("view") || "grid", false);

  // camera cursor (viewfinder that locks onto clickable things), hover preview on index rows
  const cam = $(".cam"), camLabel = cam && $(".cam-label", cam);
  const preview = document.createElement("div");
  preview.className = "list-preview";
  document.body.appendChild(preview);
  if (fine) {
    if (cam) document.documentElement.classList.add("has-cam");
    let mx = -100, my = -100, cx = -100, cy = -100, px = 0, py = 0;
    addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; cam && cam.classList.add("on"); }, { passive: true });
    document.addEventListener("mouseleave", () => cam && cam.classList.remove("on"));
    (function loop() {
      cx += (mx - cx) * 0.5; cy += (my - cy) * 0.5;
      px += (mx + 24 - px) * 0.14; py += (my - 140 - py) * 0.14;
      if (cam) cam.style.translate = `${cx}px ${cy}px`;
      preview.style.left = px + "px"; preview.style.top = py + "px";
      requestAnimationFrame(loop);
    })();
    if (cam) {
      document.addEventListener("mouseover", (e) => {
        const t = e.target.closest(".card, .feat-card, .frame, a, button");
        cam.classList.toggle("lock", !!t);
        camLabel.textContent = !t ? "" : t.matches(".frame") ? "Look" : t.matches(".card, .feat-card") ? "View" : "";
      });
      document.addEventListener("mousedown", () => {
        cam.classList.remove("snap"); void cam.offsetWidth; cam.classList.add("snap");
      });
    }
    grid.addEventListener("mouseover", (e) => {
      const card = e.target.closest(".card");
      if (card && grid.dataset.view === "list") {
        preview.innerHTML = $(".thumb", card).innerHTML;
        preview.classList.add("on");
      } else preview.classList.remove("on");
    });
    grid.addEventListener("mouseleave", () => preview.classList.remove("on"));
  }

  // shutter flash when something opens, like taking the picture
  const flash = $(".flash");
  const shutter = () => {
    if (!flash || reduce) return;
    flash.classList.remove("go"); void flash.offsetWidth; flash.classList.add("go");
  };

  /* ---------------- drawer ---------------- */
  const drawer = $("#drawer"), dBody = $("#dBody");
  let openIdx = -1;

  function embedGate(p) {
    const e = p.embed; if (!e) return "";
    // where other sites can't be embedded (shared preview links), link out instead
    if (S.embeds === false && e.kind !== "file") return p.links.length ? `<a class="embed-gate" href="${p.links[0].url}" target="_blank" rel="noopener"><div><div class="play-big">${e.kind === "tableau" ? "◩" : "▶"}</div><span class="mono">${esc(p.links[0].label)} ↗</span></div></a>` : `<div class="d-thumb">${thumbFor(p)}</div>`;
    const label = { tableau: "Load interactive dashboard", drive: "Play video", linkedin: "Load episodes", youtube: "Play video", file: "Play film (sound on)" }[e.kind];
    return `<button class="embed-gate" data-embed="${p.id}"><div><div class="play-big">${e.kind === "tableau" ? "◩" : "▶"}</div><span class="mono">${label}</span></div></button>`;
  }
  function embedHTML(e) {
    const f = (src, cls = "") => `<iframe class="embed ${cls}" src="${src}" loading="lazy" allow="autoplay; fullscreen" allowfullscreen title="Embedded media"></iframe>`;
    if (e.kind === "file") return `<video class="embed" src="${e.src}" poster="${e.poster || ""}" controls autoplay playsinline></video>`;
    if (e.kind === "tableau") return f(e.src, "tall");
    if (e.kind === "drive") return f(`https://drive.google.com/file/d/${e.id}/preview`);
    if (e.kind === "youtube") return f(`https://www.youtube-nocookie.com/embed/${e.id}?autoplay=1&rel=0`);
    if (e.kind === "linkedin")
      return `<div class="embed-row">${e.ids.map((id) => f(`https://www.linkedin.com/embed/feed/update/urn:li:activity:${id}?compact=true`)).join("")}</div>`;
    return "";
  }

  function openProject(id, push = true) {
    const i = S.projects.findIndex((p) => p.id === id);
    if (i < 0) return;
    openIdx = i;
    const p = S.projects[i];
    $("#dNo").textContent = `No. ${pad(i + 1)} / ${pad(S.projects.length)} — ${p.cat.join(" · ")}`;
    // Notion-style write-up: meta row, media, then Overview / Problem / Solution / Process / Impact
    const meta = [["Organization", p.org], ["Timeline", p.timeline], ["Role", p.role]]
      .filter(([, v]) => v).map(([k, v]) => `<div><dt class="mono">${k}</dt><dd>${esc(v)}</dd></div>`).join("");
    const list = (arr) => `<ul>${arr.map((t) => `<li>${rich(t)}</li>`).join("")}</ul>`;
    const sections = [
      ["🔭", "Overview", p.overview && `<p>${rich(p.overview)}</p>`],
      ["🚨", "Problem", p.problem && list(p.problem)],
      ["💡", "Solution", p.solution && list(p.solution)],
      ["🔨", "Process", p.process && `<ul class="d-process">${p.process.map(([k, v]) => `<li><b>${esc(k)}:</b> ${rich(v)}</li>`).join("")}</ul>`],
      ["💥", "Impact", p.impact && `<ul class="d-impact">${p.impact.map((t) => `<li>${rich(t)}</li>`).join("")}</ul>`],
    ].filter(([, , html]) => html)
      .map(([ico, name, html]) => `<section class="d-sec"><h3><span aria-hidden="true">${ico}</span> ${name}</h3>${html}</section>`).join("");
    const cover = p.thumb.kind === "image" ? `<a class="d-cover" href="assets/photos/${p.thumb.file}.jpg" target="_blank" rel="noopener"><img src="assets/photos/${p.thumb.file}.jpg" alt="${esc(p.title)}"></a>` : `<div class="d-thumb">${thumbFor(p)}</div>`;
    const media = p.embed && !(S.embeds === false && p.embed.kind !== "file") ? embedGate(p) : cover;
    dBody.innerHTML = `
      <p class="mono d-kicker">${esc(p.kicker)} · ${p.year}</p>
      <h2 class="d-title" id="dTitle">${esc(p.title)}</h2>
      ${p.tagline ? `<p class="d-tagline">${esc(p.tagline)}</p>` : ""}
      <dl class="d-metarow">${meta}</dl>
      <div class="d-media">${media}</div>
      ${p.links.length ? `<div class="d-links">${p.links.map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>` : ""}
      <div class="d-body">${sections}
        ${p.pieces ? `<section class="d-sec"><h3><span aria-hidden="true">🎬</span> Pieces</h3><ul class="d-pieces">${p.pieces.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}
      </div>
      <p class="d-tools mono">${p.tools.map((t) => `<span>${esc(t)}</span>`).join("")}</p>`;
    const gate = $(".embed-gate", dBody);
    gate && gate.addEventListener("click", () => { gate.outerHTML = embedHTML(p.embed); });
    $(".drawer-inner").scrollTop = 0;
    if (!drawer.open) { shutter(); drawer.showModal(); document.documentElement.style.overflow = "hidden"; }
    if (push) history.replaceState(null, "", `#p/${p.id}`);
  }
  function closeDrawer() {
    drawer.close();
  }
  drawer.addEventListener("close", () => {
    document.documentElement.style.overflow = "";
    if (location.hash.startsWith("#p/")) history.replaceState(null, "", "#work");
  });
  drawer.addEventListener("click", (e) => { if (e.target === drawer) closeDrawer(); });
  $("#dClose").addEventListener("click", closeDrawer);
  const step = (d) => {
    const vis = S.projects.filter((p) => current === "all" || p.cat.includes(current));
    const at = vis.findIndex((p) => p.id === S.projects[openIdx].id);
    openProject(vis[(at + d + vis.length) % vis.length].id);
  };
  $("#dPrev").addEventListener("click", () => step(-1));
  $("#dNext").addEventListener("click", () => step(1));
  grid.addEventListener("click", (e) => { const c = e.target.closest(".card"); c && openProject(c.dataset.id); });
  if (location.hash.startsWith("#p/")) openProject(location.hash.slice(3), false);

  /* ---------------- experience ---------------- */
  const sched = $("#schedule");
  sched.innerHTML = S.experience.map((x, i) => `
    <li class="slot reveal ${i === 0 ? "open" : ""}" style="--d:${i * 0.08}s">
      <button class="slot-btn" aria-expanded="${i === 0}">
        <span class="date mono">${esc(x.date)}</span>
        <span><span class="role">${esc(x.role)}</span><span class="org">${esc(x.org)}</span></span>
        <span class="plus">+</span>
      </button>
      <div class="slot-body"><div>
        <p class="place mono">${esc(x.place || "")}</p>
        <ul>${x.points.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        ${x.project ? `<a class="go mono" href="#p/${x.project}" data-open="${x.project}">See the project →</a>` : "<span style='display:block;height:12px'></span>"}
      </div></div>
    </li>`).join("");
  // one photo per role, crossfading as roles open
  const expPhoto = $("#expPhoto");
  expPhoto.innerHTML = S.experience.map((x, i) =>
    x.img ? `<img src="assets/photos/${x.img}.jpg" alt="" loading="lazy" data-i="${i}" class="${i === 0 ? "on" : ""}">` : "").join("");
  const showExp = (i) => {
    if (!S.experience[i].img) return;
    $$("img", expPhoto).forEach((im) => im.classList.toggle("on", +im.dataset.i === i));
  };
  const slots = $$(".slot", sched);
  slots.forEach((li, i) => {
    $(".slot-btn", li).addEventListener("click", () => {
      const on = !li.classList.contains("open");
      // accordion: one role open at a time so the photo always matches
      slots.forEach((o) => { o.classList.toggle("open", o === li && on); $(".slot-btn", o).setAttribute("aria-expanded", o === li && on); });
      if (on) showExp(i);
    });
    if (fine) li.addEventListener("mouseenter", () => showExp(i));
  });
  sched.addEventListener("mouseleave", () => {
    const open = slots.findIndex((li) => li.classList.contains("open"));
    if (open > -1) showExp(open);
  });
  sched.addEventListener("click", (e) => {
    const a = e.target.closest("[data-open]");
    if (a) { e.preventDefault(); openProject(a.dataset.open); }
  });

  /* ---------------- archive film strip ---------------- */
  const strip = $("#strip");
  const full = (ph) => `assets/photos/${ph.file}.jpg`;
  strip.innerHTML = S.photos.map((ph, i) => {
    const [w, h] = ph.shape === "l" ? [700, 525] : ph.shape === "v" ? [394, 700] : [525, 700];
    return `
    <figure class="frame ${ph.video ? "has-video" : ""} ${ph.film ? "is-film" : ""}" data-i="${i}" style="margin:0">
      <img src="assets/photos/sm/${ph.file}.jpg" alt="${esc(ph.caption)}" width="${w}" height="${h}" loading="${i < 4 ? "eager" : "lazy"}" draggable="false">
      ${ph.video ? `<video src="assets/video/${ph.video}" muted loop playsinline preload="none" aria-hidden="true"></video><span class="live mono">${ph.film ? "▶ Film" : "Live"}</span>` : ""}
      <figcaption class="fno">${pad(i + 1)}A ▸ ${esc(ph.caption)}</figcaption>
    </figure>`;
  }).join("");
  // Live-photo clips: play while hovered (desktop) or while centered (touch)
  $$(".has-video:not(.is-film)", strip).forEach((f) => {
    const vid = $("video", f);
    f.addEventListener("mouseenter", () => vid.play().catch(() => {}));
    f.addEventListener("mouseleave", () => { vid.pause(); vid.currentTime = 0; });
  });
  const wrap = document.createElement("div");
  wrap.className = "strip-wrap";
  strip.before(wrap); wrap.append(strip);
  wrap.insertAdjacentHTML("afterbegin", `<div class="holes t"></div><div class="holes b"></div>`);

  const frames = $$(".frame", strip);
  const frameNo = $("#frameNo");
  let centerIdx = 0;
  function markCenter() {
    const mid = strip.getBoundingClientRect().left + strip.clientWidth / 2;
    let best = 0, bd = Infinity;
    frames.forEach((f, i) => { const r = f.getBoundingClientRect(); const d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = i; } });
    if (best !== centerIdx || !frames[best].classList.contains("is-center")) {
      frames.forEach((f, i) => f.classList.toggle("is-center", i === best));
      centerIdx = best; frameNo.textContent = `${pad(best + 1)}A / ${pad(frames.length)}`;
      // films play while centered; on touch screens Live Photos do too
      frames.forEach((f, i) => {
        const v = $("video", f); if (!v || (fine && !f.classList.contains("is-film"))) return;
        i === best ? v.play().catch(() => {}) : v.pause();
      });
    }
  }
  let raf;
  strip.addEventListener("scroll", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(markCenter); }, { passive: true });
  const goTo = (i) => {
    i = Math.max(0, Math.min(frames.length - 1, i));
    const f = frames[i];
    strip.scrollTo({ left: f.offsetLeft - (strip.clientWidth - f.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  };
  $("#prev").addEventListener("click", () => goTo(centerIdx - 1));
  $("#next").addEventListener("click", () => goTo(centerIdx + 1));
  strip.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(centerIdx + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(centerIdx - 1); }
    if (e.key === "Enter") openLightbox(centerIdx);
  });
  // vertical wheel → horizontal when the strip has room to move
  strip.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
    const atStart = strip.scrollLeft <= 0, atEnd = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 1;
    if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;
    e.preventDefault(); strip.scrollLeft += e.deltaY;
  }, { passive: false });
  // drag with momentum
  let down = false, sx = 0, sl = 0, moved = 0, v = 0, lastX = 0, lastT = 0;
  strip.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    down = true; moved = 0; sx = lastX = e.clientX; sl = strip.scrollLeft; lastT = performance.now(); v = 0;
  });
  addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
    if (moved > 4) strip.classList.add("dragging");
    strip.scrollLeft = sl - dx;
    const now = performance.now(); v = (e.clientX - lastX) / Math.max(1, now - lastT); lastX = e.clientX; lastT = now;
  });
  addEventListener("pointerup", () => {
    if (!down) return; down = false;
    if (moved > 4) {
      let vel = -v * 16;
      const glide = () => {
        if (Math.abs(vel) < 0.5) { strip.classList.remove("dragging"); markCenter(); goTo(centerIdx); return; }
        strip.scrollLeft += vel; vel *= 0.92; requestAnimationFrame(glide);
      };
      reduce ? (strip.classList.remove("dragging"), goTo(centerIdx)) : glide();
    }
  });
  strip.addEventListener("click", (e) => {
    const f = e.target.closest(".frame"); if (!f || moved > 4) return;
    const i = +f.dataset.i;
    i === centerIdx ? openLightbox(i) : goTo(i);
  });
  addEventListener("load", () => { goTo(0); markCenter(); });
  markCenter();

  // lightbox
  const lb = $("#lightbox"), lbVid = $("#lbVid"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  let lbIdx = 0;
  function openLightbox(i) {
    lbIdx = (i + S.photos.length) % S.photos.length;
    const ph = S.photos[lbIdx];
    lbImg.src = full(ph); lbImg.alt = ph.caption;
    lbVid.hidden = !ph.film; lbImg.hidden = !!ph.film;
    if (ph.film) { lbVid.poster = full(ph); lbVid.src = `assets/video/${ph.video}`; lbVid.play().catch(() => {}); } else { lbVid.pause(); lbVid.removeAttribute("src"); }
    lbCap.textContent = `${pad(lbIdx + 1)}A — ${ph.caption}  ·  ← → to browse`;
    if (!lb.open) { shutter(); lb.showModal(); }
  }
  $("#lbClose").addEventListener("click", () => lb.close());
  lb.addEventListener("close", () => lbVid.pause());
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") openLightbox(lbIdx + 1);
    if (e.key === "ArrowLeft") openLightbox(lbIdx - 1);
  });
  drawer.addEventListener("keydown", (e) => {
    if (e.target.closest("iframe")) return;
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });

  /* ---------------- about ---------------- */
  $("#education").innerHTML = S.education.map(([s, d, y]) => `<div><dt>${esc(s)}</dt><dd>${esc(d)}</dd><span class="yr">${y}</span></div>`).join("");
  $("#honors").innerHTML = S.honors.map((h) => `<li>${esc(h)}</li>`).join("");
  $("#skills").innerHTML = Object.entries(S.skills).map(([k, rows]) =>
    `<div><h4>${k}</h4>${rows.map(([a, b]) => `<div class="skill"><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div>`).join("");

  /* ---------------- scroll effects ---------------- */
  $$(".sec-head, .about-grid > div, .polaroid + *, .strip-foot").forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((ents) => ents.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { rootMargin: "0px 0px -8% 0px" });
  $$(".reveal").forEach((el) => io.observe(el));

  const top = $(".top"), bar = $(".progress"), expPhotoEl = $("#expPhoto"), expStage = $(".exp-stage");
  const navLinks = $$(".nav a");
  const sections = navLinks.map((a) => $(a.getAttribute("href")));
  let ticking = false;
  function onScroll() {
    ticking = false;
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    top.classList.toggle("scrolled", y > 10);
    // menu is see-through while it sits over the hero video
    const scr = $(".screen");
    top.classList.toggle("on-video", !!scr && scr.getBoundingClientRect().bottom > top.offsetHeight);
    if (!reduce) {
      const r = expStage.getBoundingClientRect();
      const p = (innerHeight - r.top) / (innerHeight + r.height);
      if (p > 0 && p < 1) expPhotoEl.style.setProperty("--py", `${(p - 0.5) * -40}px`);
    }
    let active = -1;
    sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * 0.4) active = i; });
    navLinks.forEach((a, i) => a.classList.toggle("is-active", i === active));
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------------- featured work (hero) ---------------- */
  const feat = S.featured.map((id) => S.projects.find((p) => p.id === id)).filter(Boolean);
  const stack = $("#featStack"), dots = $("#featDots");
  stack.innerHTML = feat.map((p) => `
    <button class="feat-card" data-id="${p.id}" tabindex="-1">
      <div class="feat-thumb">${thumbFor(p)}</div>
      <div class="feat-info">
        <span class="mono muted">${esc(p.kicker)} · ${p.year}</span>
        <h3 class="serif">${esc(p.title)}</h3>
        <span class="feat-stat mono">${esc(p.stat)}</span>
        <span class="feat-open mono">Open →</span>
      </div>
    </button>`).join("");
  dots.innerHTML = feat.map((p, i) => `<button role="tab" aria-label="${esc(p.title)}" data-i="${i}"></button>`).join("");
  const fCards = $$(".feat-card", stack), fDots = $$("button", dots);
  let fi = 0, fTimer;
  function showFeat(i) {
    fi = (i + feat.length) % feat.length;
    fCards.forEach((c, k) => {
      const pos = (k - fi + feat.length) % feat.length; // 0 = front
      c.style.setProperty("--pos", pos);
      c.classList.toggle("front", pos === 0);
      c.tabIndex = pos === 0 ? 0 : -1;
      c.setAttribute("aria-hidden", pos !== 0);
    });
    fDots.forEach((d, k) => { d.classList.toggle("on", k === fi); d.setAttribute("aria-selected", k === fi); });
  }
  const autoplay = () => { clearInterval(fTimer); if (!reduce) fTimer = setInterval(() => showFeat(fi + 1), 4200); };
  stack.addEventListener("click", (e) => {
    const c = e.target.closest(".feat-card"); if (!c) return;
    c.classList.contains("front") ? openProject(c.dataset.id) : showFeat(fCards.indexOf(c));
  });
  dots.addEventListener("click", (e) => { const d = e.target.closest("button"); if (d) { showFeat(+d.dataset.i); autoplay(); } });
  stack.addEventListener("mouseenter", () => clearInterval(fTimer));
  stack.addEventListener("mouseleave", autoplay);
  stack.addEventListener("focusin", () => clearInterval(fTimer));
  // swipe on touch
  let tx = null;
  stack.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; clearInterval(fTimer); }, { passive: true });
  stack.addEventListener("touchend", (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 40) showFeat(fi + (dx < 0 ? 1 : -1));
    autoplay();
  });
  showFeat(0); autoplay();

  /* ---------------- hero reel: timecode + pause ---------------- */
  const reel = $("#reel"), tc = $("#tc"), reelBtn = $("#reelToggle");
  if (reel) {
    // full-HD reel on bigger screens, a lighter vertical cut on phones held upright
    const phone = matchMedia("(max-width: 860px) and (orientation: portrait)").matches;
    reel.src = phone ? reel.dataset.phone : reel.dataset.hd;
    if (!reduce) reel.play().catch(() => {});
    const fmt = (t) => { const f = Math.floor((t % 1) * 24), s = Math.floor(t); return [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60, f].map(pad).join(":"); };
    (function tcLoop() { tc.textContent = fmt(reel.currentTime || 0); requestAnimationFrame(tcLoop); })();
    const setReel = (play) => {
      play ? reel.play().catch(() => {}) : reel.pause();
      reelBtn.textContent = play ? "❚❚ Pause" : "▶ Play";
      reelBtn.setAttribute("aria-pressed", !play);
    };
    reelBtn.addEventListener("click", () => setReel(reel.paused));
    if (reduce) setReel(false);
    // save battery: pause the reel while it is scrolled out of view
    new IntersectionObserver(([en]) => { if (reelBtn.getAttribute("aria-pressed") === "false") en.isIntersecting ? reel.play().catch(() => {}) : reel.pause(); }).observe(reel);
  }
})();
