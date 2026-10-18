#!/usr/bin/env node
// ChatGPT 分享页 → 完整内容（turbo-stream v2 解码）。
// 用法: node extract_share.mjs <page.html | https://chatgpt.com/s/...> [outDir]
// 输出: <outDir>/share_full.json + message-N-<role>.md
// 提示: 传 URL 时用内置 fetch（Node ≥ 18）；网络受限环境下通常直连失败，
//       先按 SKILL.md「抓取」用 curl 带代理存成 html，再把文件路径传进来。

import fs from "node:fs";
import path from "node:path";

const [src, outArg] = process.argv.slice(2);
if (!src) {
  console.error("用法: node extract_share.mjs <page.html | https://chatgpt.com/s/...> [outDir]");
  process.exit(1);
}
const outDir = outArg || process.cwd();

const html = /^https?:/.test(src)
  ? await (async () => {
      const res = await fetch(src, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        },
      });
      if (!res.ok)
        throw new Error(
          `fetch ${src} -> HTTP ${res.status}（网络受限时请用 curl 带代理存成 html 后传文件路径）`
        );
      return await res.text();
    })()
  : fs.readFileSync(src, "utf8");

// ---- 1. 取数据流：新版分享页 = 若干 streamController.enqueue("<JSON字符串>") ----
const re = /streamController\.enqueue\(("(?:[^"\\]|\\.)*")\)/g;
let streamText = "";
let chunks = 0;
let m;
while ((m = re.exec(html)) !== null) {
  streamText += JSON.parse(m[1]);
  chunks++;
}
if (!chunks) {
  if (html.includes("__NEXT_DATA__"))
    throw new Error("这是旧版分享页（__NEXT_DATA__ 格式），本脚本只处理新版 /s/ 分享流，见 references/tech-notes.md。");
  throw new Error(
    "未找到 streamController.enqueue 数据流：链接可能过期/不公开，或 HTML 保存时被转码（必须原始字节保存，勿经 PowerShell）。"
  );
}
console.log(`数据流: ${chunks} 个 enqueue 块, ${streamText.length} 字符`);

// ---- 2. turbo-stream v2 解码（@remix-run/turbo-stream unflatten.js 的移植）----
const UNDEFINED = -7, NULL = -5, NAN = -2, POS_INF = -6, NEG_INF = -3, NEG_ZERO = -4, HOLE = -1;
const values = [];
const hydrated = [];
const deferred = {};

function mkDeferred(id) {
  return (deferred[id] = { __promise__: id, resolved: undefined });
}

function hydrate(index) {
  switch (index) {
    case UNDEFINED: return undefined;
    case NULL: return null;
    case NAN: return NaN;
    case POS_INF: return Infinity;
    case NEG_INF: return -Infinity;
    case NEG_ZERO: return -0;
  }
  if (hydrated[index] !== undefined) return hydrated[index];
  const value = values[index];
  if (!value || typeof value !== "object") return (hydrated[index] = value);

  if (Array.isArray(value)) {
    if (typeof value[0] === "string") {
      const [type] = value;
      switch (type) {
        case "D": return (hydrated[index] = new Date(value[1]));
        case "U": return (hydrated[index] = value[1]);
        case "B": return (hydrated[index] = { __bigint__: value[1] });
        case "R": return (hydrated[index] = { __regexp__: value[1], flags: value[2] });
        case "Y": return (hydrated[index] = { __symbol__: value[1] });
        case "S": {
          const s = [];
          hydrated[index] = s;
          for (let i = 1; i < value.length; i++) s.push(hydrate(value[i]));
          return s;
        }
        case "M": {
          const mm = [];
          hydrated[index] = mm;
          for (let i = 1; i < value.length; i += 2) mm.push([hydrate(value[i]), hydrate(value[i + 1])]);
          return mm;
        }
        case "N": {
          const o = {};
          hydrated[index] = o;
          const b = value[1] || {};
          for (const k of Object.keys(b)) o[hydrate(Number(k.slice(1)))] = hydrate(b[k]);
          return o;
        }
        case "P": return (hydrated[index] = hydrated[value[1]] ?? mkDeferred(value[1]));
        case "E": return (hydrated[index] = { __error__: value[1], name: value[2] });
        case "Z": return (hydrated[index] = hydrated[value[1]] ?? mkDeferred(value[1]).resolved);
        default: {
          const args = value.slice(1).map((i) => hydrate(i));
          return (hydrated[index] = { __type__: type, args });
        }
      }
    }
    const arr = [];
    hydrated[index] = arr;
    for (let i = 0; i < value.length; i++) if (value[i] !== HOLE) arr[i] = hydrate(value[i]);
    return arr;
  }
  const obj = {};
  hydrated[index] = obj;
  for (const key of Object.keys(value)) obj[hydrate(Number(key.slice(1)))] = hydrate(value[key]);
  return obj;
}

const lines = streamText.split("\n");
values.push(...JSON.parse(lines[0]));
const root = hydrate(0);
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line) continue;
  const lm = /^([A-Z])(\d+):(.*)$/.exec(line);
  if (!lm) {
    console.warn("跳过无法识别的流行:", line.slice(0, 60));
    continue;
  }
  if (lm[1] === "P") {
    const startIndex = values.length;
    values.push(...JSON.parse(lm[3]));
    const resolved = hydrate(startIndex);
    const id = Number(lm[2]);
    if (deferred[id]) deferred[id].resolved = resolved;
    else deferred[id] = { __promise__: id, resolved };
  } else {
    console.warn("未处理的延迟行类型:", lm[1], lm[2]);
  }
}

// ---- 3. 导出 ----
fs.mkdirSync(outDir, { recursive: true });
const jsonOut = path.join(outDir, "share_full.json");
fs.writeFileSync(
  jsonOut,
  JSON.stringify(
    root,
    (k, v) => {
      if (v === undefined) return "__undefined__";
      if (typeof v === "number" && Number.isNaN(v)) return "__NaN__";
      return v;
    },
    2
  )
);

const route = root.loaderData?.["routes/s.$postId"] ?? {};
const post = route.postWithProfile?.post ?? route.post;
const messages = post?.attachments?.flatMap((a) => a.messages ?? []) ?? [];
const stamp = (t) => (t ? new Date(t * 1000).toISOString() : "?");

messages.forEach((msg, i) => {
  const dil = msg.metadata?.model_dil_v2;
  let body = (msg.content?.parts ?? []).filter((p) => typeof p === "string").join("\n\n");
  let degraded = "";
  if (!body && dil?.fallbackMarkdown) {
    body = dil.fallbackMarkdown;
    degraded = "（parts 为空，使用 fallbackMarkdown 降级文本）";
  }
  const header =
    `<!--\n来源: ${src}\n` +
    `消息: ${msg.id} · ${msg.author?.role} · ${stamp(msg.create_time)}\n` +
    `模型: ${msg.metadata?.model_slug ?? "?"}\n` +
    `含 DIL 图形数据: ${dil ? "是（正文 <box> 标记可用 render_dil.mjs 渲染成 HTML）" : "否"} ${degraded}\n` +
    `注意: 分享可能只是对话切片，本条不一定覆盖完整对话。\n-->\n\n`;
  const f = path.join(outDir, `message-${i + 1}-${msg.author?.role ?? "unknown"}.md`);
  fs.writeFileSync(f, header + body + "\n");
  console.log(`写出 ${f}（${body.length} 字符${dil ? "，含 DIL" : ""}）`);
});

console.log("\n概览:");
console.log("  post:", post?.id ?? "(未识别)", "| 分享时间:", post?.posted_at ? stamp(post.posted_at) : "?", "| og_title:", post?.og_title ?? "?");
console.log("  消息数:", messages.length, "|", messages.map((x) => x.author?.role).join(", "));
console.log("  完整数据:", jsonOut);
