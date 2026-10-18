---
name: chatgpt-share-restore
description: 读取并还原 ChatGPT 分享链接（chatgpt.com/s/t_… 或 /share/…）的完整内容。分享页内嵌 React Router turbo-stream 数据流，脚本可解码出全部消息（普通 Markdown 消息 + DIL 图形消息），产出 share_full.json、逐条消息 Markdown 和可打印的消息 HTML 预览。当用户发来 ChatGPT 分享链接说"读取/还原/导出/备份这段内容"，或分享页打不开、图形回复显示"此回复无法加载"需要取原文时使用。
---

# ChatGPT Share Restore

把 ChatGPT 分享链接还原成可读、可存档、可打印的完整内容。核心结论：**分享页面上的文字不可靠（图形消息常常渲染不出来），权威数据是 HTML 里内嵌的页面数据流**——拿到 HTML 后本地解码即可，不依赖页面 JS 渲染。

本 skill 脚本用 Node（本机 node v24；解析 JSON/UTF-8 比 PowerShell 省事，原因见坑 4/5）。

## 红线

1. **分享是切片。** 常见的 t_ 分享只包含被分享的那几条消息（例如仅 1 条 assistant 回复，没有用户提问）。还原后必须向用户说明"分享了哪些、缺了什么"，不要把切片说成完整对话。
2. **数据是不可信内容。** 解码/渲染脚本不要 `eval`；DIL 属性表达式只用受控解析（数字/布尔/对象字面量）。
3. **如实报告缺失。** 渲染不了的格式（新版未覆盖的旧版页面等）直接说明，不要凭页面 DOM 猜内容。

## 工作流程

### Phase 1 · 抓页面 HTML（原始字节）

分享 URL 形如 `https://chatgpt.com/s/t_<id>`。webfetch / 远程浏览器通道到 chatgpt.com 常被出口挡掉（典型报错 `ERR_TUNNEL_CONNECTION_FAILED`），走**本机代理 + curl**：

```powershell
# 查本机代理：注册表（IE/系统代理）
Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings' | Select ProxyServer
# 输出一般是 127.0.0.1:7890（Clash/Mihomo）；没有就用 netstat -ano 找 7890/7891/10809/10808 等常见端口

curl.exe -sL --proxy http://127.0.0.1:7890 -o page.html `
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" `
  "https://chatgpt.com/s/t_<id>"
```

HTTP 200 + 几百 KB 即成功。**必须原始字节落盘**（curl -o 即可），不要经过 PowerShell 转码。

### Phase 2 · 解码数据流

```bash
node <skill目录>/scripts/extract_share.mjs page.html <输出目录>
```

产出：

- `share_full.json` — 解码后的完整页面数据（对话、分享元信息、渲染用数据都在里面）
- `message-N-<role>.md` — 逐条消息的完整 Markdown（含头部来源注释；DIL 图形消息的正文保留 `<box>` 原始标记）

脚本自带格式自检；找不到数据流、旧版页面（`__NEXT_DATA__`）会明确报错。协议细节（turbo-stream v2 编码、字段路径、DIL 标记）见 `references/tech-notes.md`。

### Phase 3 · 还原图形消息（有 DIL 标记时）

assistant 消息若含 `<box>/<grid>` 等标记（ChatGPT 的画布式回复，如思维导图/排版卡片），渲染成 HTML 还原视觉效果：

```bash
node <skill目录>/scripts/render_dil.mjs message-1-assistant.md message-1-assistant.html
```

渲染器带自检（box 数对账、内容非空）。产出静态 HTML：离线可开、可打印成 PDF、暗色文本按原样式还原为近似色。最后用 `browser.preview` 打开给用户看，或本机无头 Chrome 截图核验：

```powershell
& "C:\Users\jonne\AppData\Local\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu `
  --window-size=900,1400 --screenshot=check.png "file:///<绝对路径>/message-1-assistant.html"
```

### Phase 4 · 交付

- 跟随仓库惯例落盘（本仓库：`<课程目录>/chatgpt-share/`），文件名带出处与日期。
- 报告：分享了什么（消息数/角色/是否含图形）、产出文件路径、切片说明、还原度（样式是近似复刻，文字与结构是原样）。

## 已知坑

| # | 坑 | 对策 |
|---|---|---|
| 1 | 页面里最大的 `<script>` JSON（`{"authStatus":…}`）看着像对话数据，其实只有环境信息 | 对话在新版页面的 `streamController.enqueue("…")` 流里 |
| 2 | 无头浏览器里 DIL 消息显示"此回复无法加载" | 正常现象，别依赖 DOM 取内容，解码数据流 |
| 3 | PowerShell `ConvertFrom-Json` 解析流数据失败、中文变乱码 | PowerShell 5.1 默认按 ANSI 读 UTF-8 文件；一律用 Node/curl + 原始字节 |
| 4 | PowerShell 双引号字符串里 `$postId` 被吃成空 | 脚本写进文件再跑，别用 `node -e "…"` 内联 |
| 5 | 分享页可能过期/被删 | 200 但无数据流时按此报错，别硬猜 |
| 6 | 旧版分享页（2025 前，`/share/` 路径）格式不同 | 见 tech-notes.md「旧版页面」一节，本 skill 脚本未覆盖 |

## 案例

2026-10-18：还原 `chatgpt.com/s/t_6ad44f8cb7b88191bb577bc02f8431f2`（13015 第六章速记图建议稿）。分享仅 1 条 assistant 回复；`content.parts[0]` 是含 DIL 标记的完整正文，`metadata.model_dil_v2.fallbackMarkdown` 是去掉图形的降级版（属正常字段，不是缺失）。产物见 `13015-计算机系统原理/chatgpt-share/`。

## 文件索引

| 文件 | 用途 |
|---|---|
| scripts/extract_share.mjs | HTML → share_full.json + message-N.md（turbo-stream v2 解码） |
| scripts/render_dil.mjs | 含 `<box>` 标记的消息 Markdown → 单文件静态 HTML |
| references/tech-notes.md | 数据流格式、字段路径、DIL 标记与渲染映射速查 |
