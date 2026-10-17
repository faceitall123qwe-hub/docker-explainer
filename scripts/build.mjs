import { build, icon, typed, esc, VO_OFFSET } from "./frame.mjs";

const durs = [7.8, 8.4, 7.2, 9.3, 7.2, 8.7, 8.2, 9.0, 8.3, 10.5];
const scenes = [];
const HD = `tl.fromTo($(".hd"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, 0.2);`;
const HDCSS = `@R .hd { position:absolute; left:140px; top:96px; }`;
const IN = (sel, t, extra = "") => `tl.fromTo($("${sel}"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E${extra} }, ${t});`;
const sp = (s) => esc(s).replace(/ /g, "&nbsp;");

// 01 HOOK
const pcs = [
  ["U mnie", "check", "działa", "g", "Linux", "python 3.12"],
  ["U ciebie", "triangle-alert", "błąd", "y", "Windows", "python 3.8"],
];
scenes.push({
  css: `
@R .pc { top:140px; width:640px; height:480px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:22px; color:var(--muted); }
@R .pc > .ic { width:96px; height:96px; stroke-width:1.3; }
@R .pc0 { left:260px; } @R .pc1 { left:1020px; }
@R .pc .nm { font-size:56px; font-weight:600; color:var(--text); letter-spacing:-0.02em; }
@R .st { display:flex; align-items:center; gap:16px; }
@R .st .ic { width:44px; height:44px; stroke-width:2; }
@R .q { position:absolute; left:0; right:0; top:730px; text-align:center; font-size:100px; }
`,
  html: `
${pcs
  .map(
    ([n, ic, s, c, os, v], i) => `<div class="card pc pc${i}">${icon("laptop")}<div class="nm">${n}</div>
  <div class="st lb ${c}">${icon(ic)}<span>${s}</span></div>
  <div class="mono v">${v}</div><div class="mono os">${os}</div></div>`,
  )
  .join("\n")}
<h1 class="hd q"><span class="g">Docker</span> kończy z tym problemem</h1>`,
  js: `
${IN(".pc0", "V(0.1)")}
${IN(".pc1", "V(1.0)")}
tl.fromTo($(".v"), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.15 }, V(2.5));
tl.fromTo($(".os"), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.15 }, V(3.9));
tl.to($(".pc1"), { borderColor: "rgba(245,197,24,.6)", duration: 0.4 }, V(1.4));
tl.fromTo($(".q"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, V(5.4));
`,
});

// 02 KONTENER
const parts = [
  ["box", "aplikacja", 0.75],
  ["file-code", "kod", 3.18],
  ["package", "biblioteki", 3.84],
  ["file-text", "ustawienia", 4.66],
];
scenes.push({
  css: `${HDCSS}
@R .ct { position:absolute; left:560px; top:270px; width:800px; height:540px; border-radius:30px; border:2px solid var(--line); }
@R .ctl { position:absolute; left:600px; top:240px; padding:0 18px; background:var(--bg); color:var(--green); }
@R .pt { width:340px; height:200px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; color:var(--green); }
@R .pt .ic { width:64px; height:64px; stroke-width:1.5; }
@R .pt .lb { color:var(--text); }
${parts.map((_, i) => `@R .pt${i} { left:${600 + (i % 2) * 380}px; top:${320 + Math.floor(i / 2) * 240}px; }`).join("\n")}
`,
  html: `
<h1 class="hd">Wszystko w <span class="g">jednej paczce</span></h1>
<div class="ct"></div><div class="ctl mono">kontener</div>
${parts.map(([ic, n], i) => `<div class="card pt pt${i}">${icon(ic)}<span class="lb">${n}</span></div>`).join("\n")}`,
  js: `${HD}
${parts.map(([, , t], i) => IN(`.pt${i}`, `V(${t})`)).join("\n")}
tl.to($(".ct"), { borderColor: "#3ee08f", duration: 0.5, ease: "power2.out" }, V(6.1));
tl.fromTo($(".ct"), { scale: 1.04 }, { scale: 1, duration: 0.6, ease: E }, V(6.1));
tl.fromTo($(".ctl"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(6.8));
`,
});

// 03 ANALOGIA
const hosts = [
  ["laptop", "laptop"],
  ["server", "serwer"],
  ["cloud", "chmura"],
];
scenes.push({
  css: `${HDCSS}
@R .big { left:710px; top:240px; width:500px; height:320px; display:flex; align-items:center; justify-content:center; gap:40px; color:var(--green); border-color:rgba(62,224,143,.5); }
@R .big .ic { width:170px; height:170px; stroke-width:1.1; }
@R .big .qm { font-size:120px; font-weight:600; color:var(--muted); }
@R .ho { top:650px; width:440px; height:210px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; color:var(--muted); }
@R .ho .row { display:flex; align-items:center; gap:22px; }
@R .ho .ic { width:64px; height:64px; stroke-width:1.4; }
@R .ho .mini .ic { width:40px; height:40px; color:var(--green); }
@R .ho .lb { color:var(--text); }
${hosts.map((_, i) => `@R .ho${i} { left:${200 + i * 540}px; }`).join("\n")}
`,
  html: `
<h1 class="hd">Jak kontener <span class="g">w porcie</span></h1>
<div class="card big">${icon("container")}<span class="qm">?</span></div>
${hosts.map(([ic, n], i) => `<div class="card ho ho${i}"><div class="row">${icon(ic)}<span class="mini">${icon("container")}</span></div><span class="lb">${n}</span></div>`).join("\n")}`,
  js: `${HD}
tl.fromTo($(".big"), { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.7, ease: E }, V(0.3));
tl.fromTo($(".qm"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, V(1.6));
tl.fromTo($(".ho"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E, stagger: 0.25 }, V(3.9));
tl.fromTo($(".ho .mini"), { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.6, ease: E, stagger: 0.25 }, V(4.5));
`,
});

// 04 VM vs KONTENER
const rowTop = [836, 740, 644, 548];
const vm = [
  [["Sprzęt", 760, "var(--muted)"]],
  [["Hypervisor", 760, "var(--muted)"]],
  [["System gościa", 370], ["System gościa", 370]],
  [["Aplikacja", 370], ["Aplikacja", 370]],
];
const ctn = [
  [["Sprzęt", 760, "var(--muted)"]],
  [["System i jądro", 760, "var(--green)"]],
  [["Docker", 760, "var(--green)"]],
  [["App", 240], ["App", 240], ["App", 240]],
];
const stack = (rows, x0, p) =>
  rows
    .map((row, r) => {
      let x = x0;
      return row
        .map(([t, w, c], k) => {
          const h = `<div class="card bl ${p}${r} ${p}r${r}" style="left:${x}px; top:${rowTop[r]}px; width:${w}px;${c ? ` border-color:${c};` : ""}"><span class="lb">${t}</span></div>`;
          x += w + 20;
          return h;
        })
        .join("");
    })
    .join("\n");
scenes.push({
  css: `${HDCSS}
@R .bl { height:84px; display:flex; align-items:center; justify-content:center; border-radius:18px; }
@R .tt { position:absolute; top:250px; font-size:54px; font-weight:600; letter-spacing:-0.02em; }
@R .t0 { left:140px; } @R .t1 { left:1020px; }
@R .bd { position:absolute; top:340px; display:flex; gap:30px; }
@R .bd0 { left:140px; color:var(--muted); } @R .bd1 { left:1020px; color:var(--green); }
`,
  html: `
<h1 class="hd">Maszyna wirtualna <span class="g">vs kontener</span></h1>
<div class="tt t0">Maszyna wirtualna</div><div class="tt t1 g">Kontenery</div>
<div class="bd bd0 mono"><span class="s1">start: minuty</span><span class="s2">GB</span></div>
<div class="bd bd1 mono"><span class="s1">start: sekunda</span><span class="s2">MB</span></div>
${stack(vm, 140, "v")}
${stack(ctn, 1020, "c")}`,
  js: `${HD}
tl.fromTo($(".t0"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, V(0.1));
${[0, 1, 2, 3].map((r) => IN(`.vr${r}`, `V(0.4) + ${r} * 0.35`, ", stagger: 0.08")).join("\n")}
tl.fromTo($(".t1"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, V(3.7));
${[0, 1, 2, 3].map((r) => IN(`.cr${r}`, `V(3.9) + ${r} * 0.3`, ", stagger: 0.08")).join("\n")}
tl.fromTo($(".cr1"), { scale: 1 }, { scale: 1.03, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, V(4.7));
tl.fromTo($(".bd .s1"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: E, stagger: 0.1 }, V(6.3));
tl.fromTo($(".bd .s2"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: E, stagger: 0.1 }, V(7.3));
`,
});

// 05 DOCKERFILE
const df = [
  ["FROM", "node:20", "obraz bazowy", 2.68],
  ["WORKDIR", "/app", "", 3.0],
  ["COPY", ". .", "kopiuj kod", 4.12],
  ["RUN", "npm install", "instaluj", 4.93],
  ["CMD", '["node", "app.js"]', "uruchom", 5.7],
];
scenes.push({
  css: `${HDCSS}
@R .term { left:240px; top:250px; width:1440px; height:560px; }
@R .term .body { gap:0; padding-top:30px; }
@R .dl { display:flex; align-items:center; height:84px; font-size:50px; }
@R .dl .k { width:280px; color:var(--yellow); }
@R .dl .a { margin-left:auto; color:var(--muted); }
@R .dl .mono { font-size:50px; }
`,
  html: `
<h1 class="hd">Przepis: <span class="g">Dockerfile</span></h1>
<div class="term"><div class="bar"><i></i><i></i><i></i><span class="mono muted">Dockerfile</span></div>
<div class="body">${df.map(([k, v, a], i) => `<div class="dl d${i}"><span class="mono k">${k}</span><span class="mono">${sp(v)}</span><span class="lb a">${a}</span></div>`).join("")}</div></div>`,
  js: `${HD}
tl.fromTo($(".term"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(1.5));
${df.map(([, , , t], i) => `tl.fromTo($(".d${i}"), { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.45, ease: E }, V(${t}));`).join("\n")}
`,
});

// 06 OBRAZ -> KONTENERY
const cy = [270, 490, 710];
scenes.push({
  css: `${HDCSS}
@R .df { left:140px; top:410px; width:300px; height:240px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; color:var(--muted); }
@R .df .ic { width:64px; height:64px; stroke-width:1.4; }
@R .df .mono { color:var(--text); }
@R .im { left:590px; top:360px; width:510px; height:340px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; color:var(--yellow); border-color:rgba(245,197,24,.5); }
@R .im > .ic { width:84px; height:84px; stroke-width:1.3; }
@R .im .lb { color:var(--text); font-size:54px; font-weight:600; }
@R .im .ro { display:flex; align-items:center; gap:12px; color:var(--muted); }
@R .im .ro .ic { width:36px; height:36px; stroke-width:1.8; }
@R .co { left:1260px; width:520px; height:160px; display:flex; align-items:center; gap:24px; padding:0 40px; color:var(--green); border-color:rgba(62,224,143,.4); }
@R .co .ic { width:56px; height:56px; stroke-width:1.5; }
${cy.map((y, i) => `@R .co${i} { top:${y}px; }`).join("\n")}
@R .lbl { position:absolute; color:var(--yellow); }
@R .lb1 { left:449px; top:450px; } @R .lb2 { left:1118px; top:376px; }
@R .ck { position:absolute; left:140px; top:880px; display:flex; align-items:center; gap:20px; color:var(--muted); }
@R .ck .ic { width:52px; height:52px; color:var(--yellow); stroke-width:1.6; }
`,
  html: `
<h1 class="hd">Obraz i <span class="g">kontenery</span></h1>
<svg class="wire" viewBox="0 0 1920 1080">
  <path class="w0" pathLength="1" d="M440 530 L590 530"/>
  ${cy.map((y, i) => `<path class="wc wc${i}" pathLength="1" d="M1100 530 C 1180 530, 1180 ${y + 80}, 1260 ${y + 80}"/>`).join("")}
</svg>
<div class="card df">${icon("file-text")}<span class="mono">Dockerfile</span></div>
<div class="card im">${icon("layers")}<span class="lb">obraz</span><span class="ro lb">${icon("lock")}tylko do odczytu</span></div>
${cy.map((_, i) => `<div class="card co co${i}">${icon("box")}<span class="lb">kontener ${i + 1}</span></div>`).join("\n")}
<div class="lbl lb1 mono">build</div><div class="lbl lb2 mono">run</div>
<div class="ck lb">${icon("cookie")}<span>jedna foremka, wiele ciastek</span></div>`,
  js: `${HD}
${IN(".df", "V(0.2)")}
draw(".w0", V(0.8), 0.4);
tl.fromTo($(".lb1"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, V(0.8));
tl.fromTo($(".im"), { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, V(1.07));
tl.fromTo($(".im .ro"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, V(2.2));
tl.fromTo($(".lb2"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, V(4.6));
${cy.map((_, i) => `draw(".wc${i}", V(4.7) + ${i} * 0.2, 0.45);\n${IN(`.co${i}`, `V(5.0) + ${i} * 0.2`)}`).join("\n")}
tl.fromTo($(".ck"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(6.2));
`,
});

// 07 WARSTWY
const lys = [
  ["FROM node:20", "system"],
  ["COPY package.json", "lista bibliotek"],
  ["RUN npm install", "biblioteki"],
  ["COPY . .", "twój kod"],
];
const ly = (i) => 760 - i * 116;
scenes.push({
  css: `${HDCSS}
@R .ly { left:300px; width:1320px; height:100px; display:flex; align-items:center; padding:0 40px; gap:40px; border-radius:20px; }
${lys.map((_, i) => `@R .ly${i} { top:${ly(i)}px; }`).join("\n")}
@R .ly .ds { color:var(--muted); }
@R .ly .tg { margin-left:auto; padding:6px 20px; border-radius:14px; }
@R .ly .ok { color:var(--green); border:1.5px solid rgba(62,224,143,.5); }
@R .ly .rb { color:var(--yellow); border:1.5px solid rgba(245,197,24,.6); }
`,
  html: `
<h1 class="hd">Obraz ma <span class="g">warstwy</span></h1>
${lys.map(([c, d], i) => `<div class="card ly ly${i}"><span class="mono">${sp(c)}</span><span class="lb ds">${d}</span><span class="tg mono ${i === 3 ? "rb" : "ok"}">${i === 3 ? "przebudowa" : "z cache"}</span></div>`).join("\n")}`,
  js: `${HD}
${lys.map((_, i) => `tl.fromTo($(".ly${i}"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(0.6) + ${i} * 0.18);`).join("\n")}
tl.set($(".tg"), { opacity: 0 }, 0);
tl.to($(".ly3"), { borderColor: "rgba(245,197,24,.7)", duration: 0.4 }, V(3.2));
tl.fromTo($(".ly3"), { scaleX: 1 }, { scaleX: 0.97, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, V(4.2));
tl.to($(".ly3 .tg"), { opacity: 1, duration: 0.4 }, V(4.3));
tl.to([$(".ly2 .tg"), $(".ly1 .tg"), $(".ly0 .tg")], { opacity: 1, duration: 0.4, stagger: 0.15 }, V(5.8));
`,
});

// 08 REJESTR
const imgs = ["nginx", "node", "redis"];
scenes.push({
  css: `${HDCSS}
@R .hub { left:660px; top:240px; width:600px; height:260px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:22px; }
@R .hub .t { display:flex; align-items:center; gap:18px; color:var(--green); }
@R .hub .t .ic { width:56px; height:56px; stroke-width:1.5; }
@R .hub .t .lb { color:var(--text); }
@R .chips { display:flex; gap:16px; }
@R .chip { padding:6px 20px; border-radius:14px; border:1.5px solid var(--line); color:var(--yellow); }
@R .mc { top:640px; width:420px; height:220px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; color:var(--muted); }
@R .mc > .ic { width:64px; height:64px; stroke-width:1.4; }
@R .mc .lb { color:var(--text); }
@R .mc0 { left:200px; } @R .mc1 { left:1300px; }
@R .run { display:flex; align-items:center; gap:12px; color:var(--green); }
@R .run .ic { width:36px; height:36px; stroke-width:2; }
@R .fly { position:absolute; left:860px; top:420px; padding:6px 20px; border-radius:14px; border:1.5px solid rgba(245,197,24,.6); background:var(--panel); color:var(--yellow); }
@R .cmd { position:absolute; left:0; right:0; top:920px; text-align:center; display:flex; justify-content:center; gap:60px; }
`,
  html: `
<h1 class="hd">Rejestr <span class="g">obrazów</span></h1>
<svg class="wire" viewBox="0 0 1920 1080">
  <path class="a0" pathLength="1" d="M860 500 C 860 570, 410 570, 410 640"/>
  <path class="a1" pathLength="1" d="M1060 500 C 1060 570, 1510 570, 1510 640"/>
</svg>
<div class="card hub"><div class="t">${icon("cloud")}<span class="lb">Docker Hub</span></div>
  <div class="chips">${imgs.map((n) => `<span class="chip mono">${n}</span>`).join("")}</div></div>
${["laptop", "server"].map((ic, i) => `<div class="card mc mc${i}">${icon(ic)}<span class="lb">${i ? "serwer" : "laptop"}</span><span class="run lb">${icon("play")}działa</span></div>`).join("\n")}
<div class="fly f0 mono">nginx</div><div class="fly f1 mono">nginx</div>
<div class="cmd"><span class="mono y c0">docker pull nginx</span><span class="mono g c1">docker run nginx</span></div>`,
  js: `${HD}
tl.fromTo($(".hub"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(1.0));
tl.fromTo($(".chip"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: E, stagger: 0.12 }, V(2.4));
tl.fromTo($(".mc"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E, stagger: 0.15 }, V(3.4));
tl.set([$(".fly"), $(".run")], { opacity: 0 }, 0);
draw(".a0", V(4.4), 0.5); draw(".a1", V(4.4), 0.5);
tl.fromTo($(".c0"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, V(4.5));
tl.fromTo($(".f0"), { opacity: 1, x: 0, y: 0 }, { x: -530, y: 190, duration: 0.9, ease: IO }, V(4.8));
tl.fromTo($(".f1"), { opacity: 1, x: 0, y: 0 }, { x: 570, y: 190, duration: 0.9, ease: IO }, V(4.8));
tl.to($(".fly"), { opacity: 0, duration: 0.25 }, V(5.7));
tl.fromTo($(".c1"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, V(6.1));
tl.to($(".run"), { opacity: 1, duration: 0.4, stagger: 0.15 }, V(6.5));
tl.to($(".mc"), { borderColor: "rgba(62,224,143,.5)", duration: 0.4, stagger: 0.15 }, V(6.5));
`,
});

// 09 COMPOSE
const svcs = [
  ["web", "globe", "strona", 2.1],
  ["db", "database", "baza danych", 2.84],
  ["cache", "zap", "cache", 3.56],
];
scenes.push({
  css: `${HDCSS}
@R .term { left:140px; top:270px; width:680px; height:500px; }
@R .term .body { font-size:50px; }
@R .sv { left:960px; width:820px; height:150px; display:flex; align-items:center; gap:28px; padding:0 40px; color:var(--muted); }
@R .sv > .ic { width:56px; height:56px; stroke-width:1.5; }
@R .sv .lb { color:var(--text); }
@R .sv .stt { margin-left:auto; display:flex; align-items:center; gap:14px; color:var(--green); }
@R .sv .stt i { display:block; width:18px; height:18px; border-radius:50%; background:var(--green); }
${svcs.map((_, i) => `@R .sv${i} { top:${270 + i * 175}px; }`).join("\n")}
@R .cmd { left:140px; top:840px; height:100px; display:flex; align-items:center; padding:0 40px; font-size:52px; }
`,
  html: `
<h1 class="hd">Wiele kontenerów: <span class="g">Compose</span></h1>
<div class="term"><div class="bar"><i></i><i></i><i></i><span class="mono muted">compose.yml</span></div>
<div class="body"><div class="mono y">services:</div>${svcs.map(([k], i) => `<div class="mono y${i}">&nbsp;&nbsp;${k}:</div>`).join("")}</div></div>
${svcs.map(([, ic, n], i) => `<div class="card sv sv${i}">${icon(ic)}<span class="lb">${n}</span><span class="stt mono"><i></i>działa</span></div>`).join("\n")}
<div class="card cmd mono"><span class="g">$</span>&nbsp;${typed("docker compose up")}</div>`,
  js: `${HD}
${IN(".term", "V(0.3)")}
${svcs.map(([, , , t], i) => `${IN(`.sv${i}`, `V(${t})`)}\ntl.fromTo($(".y${i}"), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, ease: E }, V(${t}));`).join("\n")}
tl.set($(".stt"), { opacity: 0 }, 0);
${IN(".cmd", "V(4.7)")}
type(".cmd", V(5.0), 0.045);
tl.to($(".stt"), { opacity: 1, duration: 0.4, stagger: 0.2 }, V(6.0));
tl.to($(".sv"), { borderColor: "rgba(62,224,143,.45)", duration: 0.4, stagger: 0.2 }, V(6.0));
`,
});

// 10 PODSUMOWANIE
const pil = [
  ["package", "Obraz", 0.1],
  ["box", "Kontener", 0.82],
  ["layers", "Warstwy", 1.6],
  ["cloud", "Rejestr", 2.24],
];
scenes.push({
  exit: 0.9,
  css: `
@R .ls { position:absolute; inset:0; }
@R .pl { top:250px; width:380px; height:240px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:22px; color:var(--green); }
@R .pl .ic { width:80px; height:80px; stroke-width:1.5; }
@R .pl .lb { color:var(--text); font-size:52px; font-weight:600; }
${pil.map((_, i) => `@R .p${i} { left:${140 + i * 420}px; }`).join("\n")}
@R .ft { position:absolute; left:140px; top:600px; font-size:108px; }
@R .fin { position:absolute; inset:0; }
@R .fh { position:absolute; left:0; right:0; top:170px; text-align:center; font-size:104px; }
@R .term { left:420px; top:360px; width:1080px; height:280px; }
@R .term .body { font-size:52px; }
@R .out { color:var(--green); }
`,
  html: `
<div class="ls">
${pil.map(([ic, n], i) => `<div class="card pl p${i}">${icon(ic)}<span class="lb">${n}</span></div>`).join("\n")}
<h1 class="hd ft">Tak działa <span class="g">Docker</span></h1>
</div>
<div class="fin">
  <h1 class="hd fh">Spróbuj <span class="g">sam</span></h1>
  <div class="term"><div class="bar"><i></i><i></i><i></i><span class="mono muted">terminal</span></div>
    <div class="body"><div class="mono k0"><span class="g">$</span> ${typed("docker run hello-world")}</div><div class="mono out">Hello from Docker!</div></div></div>
</div>`,
  js: `
${pil.map(([, , w], i) => IN(`.p${i}`, `V(${w})`)).join("\n")}
tl.fromTo($(".ft"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, V(3.5));
tl.to($(".ls"), { opacity: 0, filter: "blur(8px)", duration: 0.5, ease: "power2.inOut" }, V(4.9));
tl.fromTo($(".fh"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, V(5.3));
${IN(".term", "V(5.8)")}
type(".k0", V(6.5), 0.045);
tl.fromTo($(".out"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(7.8));
`,
});

build({
  title: "Jak działa Docker",
  durs,
  scenes,
  sfx: (st) => [
    ...[0, 1, 2].map((i) => ["click-soft", st[5] + VO_OFFSET + 5.0 + i * 0.2, 0.365, 0.4, 13 + (i % 2)]),
    ["pop", st[7] + VO_OFFSET + 6.5, 0.72, 0.3, 13],
    ["typing", st[8] + VO_OFFSET + 5.0, 0.8, 0.3, 14],
    ["chime", st[9] + VO_OFFSET + 5.3, 2.5, 0.22, 15],
    ["typing", st[9] + VO_OFFSET + 6.5, 1.0, 0.3, 14],
  ],
});
