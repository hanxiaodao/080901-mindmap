#!/usr/bin/env node
// 含 DIL 图形标记（<box>/<grid>/<title>/<text>/<divider>，ChatGPT 画布式回复）的
// Markdown → 单文件静态 HTML（离线可开、可打印 PDF）。
// 用法: node render_dil.mjs input.md [output.html]
// 说明: 无 DIL 标记时等价于一个极简 Markdown 渲染器；图形样式为近似复刻，非官方渲染结果。

import fs from "node:fs";
import path from "node:path";

const [inArg, outArg] = process.argv.slice(2);
if (!inArg) {
  console.error("用法: node render_dil.mjs input.md [output.html]");
  process.exit(1);
}
const outFile = outArg || inArg.replace(/\.md$/i, "") + ".html";
let md = fs.readFileSync(inArg, "utf8");
md = md.replace(/^\s*<!--[\s\S]*?-->/, ""); // 去掉 extract_share.mjs 写的头部注释

// ---------- 行内 Markdown ----------
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) =>
  esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");

// ---------- DIL 标记解析 ----------
const DIL_TAGS = new Set(["box", "grid", "grid-item", "title", "text", "divider"]);

function tokenize(src) {
  const toks = [];
  let i = 0;
  while (i < src.length) {
    if (src[i] === "<") {
      const close = src.indexOf(">", i);
      if (close === -1) {
        toks.push({ type: "text", value: src.slice(i) });
        break;
      }
      const raw = src.slice(i, close + 1);
      const cm = /^<\s*\/\s*([a-zA-Z-]+)\s*>$/.exec(raw);
      const om = /^<\s*([a-zA-Z-]+)([\s\S]*?)\s*\/?>$/.exec(raw);
      if (cm) toks.push({ type: "close", tag: cm[1] });
      else if (om)
        toks.push({ type: "open", tag: om[1], attrs: parseAttrs(om[2]), selfClose: raw.endsWith("/>"), raw });
      else toks.push({ type: "text", value: raw });
      i = close + 1;
    } else {
      const next = src.indexOf("<", i);
      const end = next === -1 ? src.length : next;
      toks.push({ type: "text", value: src.slice(i, end) });
      i = end;
    }
  }
  return toks;
}

function parseAttrs(s) {
  const attrs = {};
  const re = /([a-zA-Z-]+)(?:\s*=\s*(?:"([^"]*)"|\{((?:[^{}]|\{[^{}]*\})*)\}))?/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    if (m[2] !== undefined) attrs[m[1]] = m[2];
    else if (m[3] !== undefined) attrs[m[1]] = decodeExpr(m[3]);
    else attrs[m[1]] = true;
  }
  return attrs;
}

// 属性表达式受控解析：数字 / 布尔 / 对象字面量；绝不 eval
function decodeExpr(s) {
  const t = s.trim();
  if (/^-?\d+(\.\d+)?$/.test(t)) return Number(t);
  if (t === "true") return true;
  if (t === "false") return false;
  if (t.startsWith("{")) {
    try {
      return JSON.parse(t.replace(/([{,]\s*)([a-zA-Z_$][\w$]*)\s*:/g, '$1"$2":'));
    } catch {
      return t;
    }
  }
  return t;
}

function parseNodes(tokens, i = 0, endTag = null) {
  const nodes = [];
  while (i < tokens.length) {
    const tk = tokens[i];
    if (tk.type === "close") {
      if (tk.tag === endTag) return [nodes, i + 1];
      i++;
    } else if (tk.type === "open") {
      if (tk.selfClose) {
        nodes.push({ tag: tk.tag, attrs: tk.attrs, children: [] });
        i++;
      } else {
        const [children, ni] = parseNodes(tokens, i + 1, tk.tag);
        nodes.push({ tag: tk.tag, attrs: tk.attrs, children });
        i = ni;
      }
    } else {
      const text = tk.value.replace(/\s+/g, " ").trim();
      if (text) nodes.push({ text });
      i++;
    }
  }
  return [nodes, i];
}

// ---------- DIL → HTML ----------
const RADIUS = { xl: "16px", lg: "12px", md: "8px", sm: "4px" };
const SIZE = { lg: "1.05rem", md: "0.92rem", sm: "0.82rem", xs: "0.72rem" };
const px = (n) => (Number.isFinite(Number(n)) ? Number(n) * 4 + "px" : undefined);

function renderNodes(nodes) {
  let html = "";
  let run = [];
  const flush = () => {
    if (run.length) {
      html += `<div class="dil-run">${run.map((t) => inline(t)).join(" ")}</div>`;
      run = [];
    }
  };
  for (const n of nodes) {
    if (n.text !== undefined) {
      run.push(n.text);
      continue;
    }
    flush();
    html += renderNode(n);
  }
  flush();
  return html;
}

function renderNode(n) {
  const c = renderNodes(n.children);
  switch (n.tag) {
    case "box": {
      const a = n.attrs;
      const s = ["display:flex", "flex-direction:column", "min-width:0"];
      if (a.radius) s.push(`border-radius:${RADIUS[a.radius] ?? a.radius}`);
      if (a.padding !== undefined) s.push(`padding:${px(a.padding)}`);
      if (a.gap !== undefined) s.push(`gap:${px(a.gap)}`);
      if (a.align === "center") s.push("align-items:center", "text-align:center");
      if (a.width) s.push(`width:${a.width}`);
      if (a.background) s.push(`background:${a.background}`);
      if (a.theme === "dark") s.push("color:#FFFFFF");
      if (a.border === true) s.push("border:1px solid rgba(100,116,139,.45)");
      else if (a.border && typeof a.border === "object")
        s.push(`border:${a.border.size ?? 1}px solid ${a.border.color ?? "#64748B"}`);
      return `<div class="dil-box" style="${s.join(";")}">${c}</div>`;
    }
    case "grid": {
      const a = n.attrs;
      const s = ["display:grid", `grid-template-columns:repeat(${a.columns || 2},minmax(0,1fr))`];
      if (a.gap !== undefined) s.push(`gap:${px(a.gap)}`);
      s.push("width:100%");
      return `<div style="${s.join(";")}">${c}</div>`;
    }
    case "grid-item":
      return `<div style="min-width:0;display:flex">${c}</div>`;
    case "title": {
      const a = n.attrs;
      const s = [`font-size:${SIZE[a.size] ?? "1rem"}`, "font-weight:700", "line-height:1.35"];
      if (a.color) s.push(`color:${a.color}`);
      return `<div style="${s.join(";")}">${c}</div>`;
    }
    case "text": {
      const a = n.attrs;
      const s = [`font-size:${SIZE[a.size] ?? "0.85rem"}`, "line-height:1.4"];
      if (a.color) s.push(`color:${a.color}`);
      return `<div style="${s.join(";")}">${c}</div>`;
    }
    case "divider": {
      const a = n.attrs;
      return `<hr style="border:none;border-top:1px solid ${a.color || "currentColor"};width:100%;margin:2px 0;opacity:.9">`;
    }
    default:
      return `<div>${c}</div>`;
  }
}

// ---------- 普通 Markdown 块 ----------
function renderMarkdown(src) {
  const blocks = src.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  let html = "";
  for (const b of blocks) {
    const lines = b.split("\n");
    if (/^#{2,4}\s/.test(b)) {
      const level = Math.min(4, b.match(/^#+/)[0].length);
      html += `<h${level}>${inline(b.replace(/^#+\s+/, ""))}</h${level}>`;
    } else if (lines.every((l) => l.trim().startsWith("|"))) {
      const rows = lines.filter((l) => !/^\|[\s:|-]+\|$/.test(l.trim()));
      html += "<table>";
      rows.forEach((r, i) => {
        const cells = r.trim().replace(/^\||\|$/g, "").split("|").map((x) => inline(x.trim()));
        html += "<tr>" + cells.map((x) => (i === 0 ? `<th>${x}</th>` : `<td>${x}</td>`)).join("") + "</tr>";
      });
      html += "</table>";
    } else if (lines.every((l) => l.startsWith("- ")))
      html += "<ul>" + lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join("") + "</ul>";
    else if (/^\*[^*].*\*$/.test(b)) html += `<p class="note">${inline(b)}</p>`;
    else html += `<p>${inline(b)}</p>`;
  }
  return html;
}

// ---------- 混排拆分：Markdown 段落 ｜ DIL 图形块 ----------
const toks = tokenize(md);
const doc = [];
let buf = [];
const flushBuf = () => {
  if (buf.length) {
    doc.push({ md: buf.join("") });
    buf = [];
  }
};
for (let i = 0; i < toks.length; ) {
  const t = toks[i];
  if (t.type === "open" && DIL_TAGS.has(t.tag)) {
    flushBuf();
    if (t.selfClose) {
      doc.push({ dil: [{ tag: t.tag, attrs: t.attrs, children: [] }] });
      i++;
    } else {
      const [children, ni] = parseNodes(toks, i + 1, t.tag);
      doc.push({ dil: [{ tag: t.tag, attrs: t.attrs, children }] });
      i = ni;
    }
  } else {
    buf.push(t.type === "text" ? t.value : t.raw ?? "");
    i++;
  }
}
flushBuf();

// ---------- 自检 ----------
const boxCount = (md.match(/<box[\s>]/g) || []).length;
let bodyHtml = "";
let dilTextLen = 0;
for (const part of doc) {
  if (part.dil) {
    const h = renderNodes(part.dil);
    dilTextLen += h.replace(/<[^>]+>/g, "").replace(/\s+/g, "").length;
    bodyHtml += `<div class="mapwrap">${h}</div>`;
  } else {
    bodyHtml += renderMarkdown(part.md);
  }
}
const renderedBoxes = (bodyHtml.match(/dil-box/g) || []).length;
if (renderedBoxes !== boxCount)
  throw new Error(`自检失败: 源 <box> 数 ${boxCount} ≠ 渲染 dil-box 数 ${renderedBoxes}`);
if (boxCount > 0 && dilTextLen === 0) throw new Error("自检失败: DIL 图形块渲染后无文本");
console.log(`渲染完成: ${boxCount} 个 box, DIL 文本 ${dilTextLen} 字符, 页面 ${bodyHtml.length} 字符`);

const title = (md.match(/^#{1,2}\s+(.+)$/m) ?? [, path.basename(inArg, ".md")])[1];
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<style>
  :root { color-scheme: light; }
  body { margin:0; background:#f3f4f6; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif; color:#111827; }
  main { max-width:780px; margin:24px auto; background:#fff; border-radius:14px; padding:36px 40px 28px; box-shadow:0 1px 3px rgba(0,0,0,.08); }
  p { line-height:1.75; margin:0 0 14px; font-size:.95rem; }
  h2 { font-size:1.15rem; margin:26px 0 12px; }
  h3 { font-size:1.02rem; margin:20px 0 10px; }
  ul { margin:0 0 14px; padding-left:1.3em; line-height:1.9; font-size:.95rem; }
  table { border-collapse:collapse; width:100%; margin:6px 0 18px; font-size:.9rem; }
  th,td { border:1px solid #e5e7eb; padding:7px 10px; text-align:left; }
  th { background:#f9fafb; }
  .note { color:#6b7280; font-size:.85rem; font-style:italic; }
  .dil-run { font-size:.95rem; line-height:1.5; }
  .mapwrap { margin:6px 0 10px; }
  footer { max-width:780px; margin:0 auto 28px; color:#9ca3af; font-size:.72rem; text-align:center; }
  @media print {
    body { background:#fff; }
    main { box-shadow:none; margin:0; padding:8px 0; border-radius:0; max-width:none; }
    .mapwrap, .dil-box { break-inside:avoid; }
  }
</style>
</head>
<body>
<main>${bodyHtml}</main>
<footer>由 chatgpt-share-restore/render_dil.mjs 从 ${esc(path.basename(inArg))} 还原；样式为近似复刻。</footer>
</body>
</html>
`;

fs.writeFileSync(outFile, html, "utf8");
console.log("写出", outFile);
