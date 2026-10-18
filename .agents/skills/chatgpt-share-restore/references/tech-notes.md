# 分享页数据格式速查

## 页面类型识别

| 特征 | 版本 | 对话数据位置 |
|---|---|---|
| `<script>window.__reactRouterContext.streamController.enqueue("…")` | 新版（`/s/t_…`，2025 起） | enqueue 的字符串块拼接后解码（本 skill 覆盖） |
| `<script id="__NEXT_DATA__">` | 旧版（`/share/…`，2025 前） | `props.pageProps.serverResponse.data.mapping`，按 parent/children 从根节点线性化（本 skill 脚本未覆盖） |
| `{"authStatus":"logged_out",…}` 大 JSON | 两种版本都有 | **只有环境信息，没有对话**，别被它误导 |

enqueue 提取正则（JS）：`/streamController\.enqueue\(("(?:[^"\\]|\\.)*")\)/g`，每块 `JSON.parse` 后拼接，再按 `\n` 分行。

## turbo-stream v2 扁平数组

拼接后的文本：第 1 行是主数据的扁平 JSON 数组，其余行是延迟更新（`P<id>:<json>`）。

- 数组下标即引用；根是下标 0。
- 负常量：`-1` HOLE（数组占位跳过）、`-2` NaN、`-3` -Infinity、`-4` -0、`-5` **null**、`-6` +Infinity、`-7` **undefined**。
- 对象：`{"_N": M}` → 键 = hydrate(N)，值 = hydrate(M)。对象的值、数组的元素**永远是下标/常量**。
- 数组：`[ref, ref, …]`；首元素是字符串时表示带类型值：
  - `"B"` BigInt / `"D"` Date（时间戳字面量，如 `["D",1792298577.009]`）/ `"E"` Error / `"M"` Map / `"N"` null 原型对象 / `"R"` RegExp / `"S"` Set / `"U"` URL / `"Y"` Symbol / `"Z"` 引用先前 resolved 值
  - `"P"` Promise：`["P", 自身下标]`，后续行 `P<该下标>:<新的扁平数组>` → 新数组接到 values 尾部，hydrate(新起点) 即 resolved 值（RR7 用它传 deferred loader 数据）
- 字符串/布尔/数字字面量直接躺在扁平数组里被引用。

解码器参考实现：`@remix-run/turbo-stream` v2 `dist/unflatten.js`（npm 可拿），本 skill 的 extract_share.mjs 是它的移植。

## 分享页字段路径（新版）

```
root (下标 0)
└─ loaderData["routes/s.$postId"]
   ├─ kind: "post_with_profile"
   └─ postWithProfile
      ├─ profile            # 分享者（可能 anonymous）
      └─ post
         ├─ id / posted_at / og_title / og_description
         └─ attachments[]
            └─ messages[]  # 分享的切片消息（常常只有 1 条）
               ├─ id / author.role / create_time / update_time
               ├─ content: { content_type, parts: ["…完整正文…"] }
               └─ metadata
                  ├─ model_slug / request_id / finish_details
                  └─ model_dil_v2   # 仅图形消息有
                     ├─ code             # 渲染 JSX（排错用，未还原时不必读）
                     ├─ constants        # 文本常量表 "0"…"51"，正文片段
                     └─ fallbackMarkdown # 去掉图形的降级纯文本（正常字段）
```

要点：**`content.parts[0]` 是含 `<box>` 标记的完整正文**（权威）；`fallbackMarkdown` 是它的降级版（图形标记被拍平成标题和 `---`），parts 为空时才用它。

## DIL 图形标记（正文里的 `<box>` …）

ChatGPT 画布式回复的标记，示例：

```
<box border radius="xl" padding={3} align="center" gap={2}>
  <box background="#1D4ED8" theme="dark" radius="lg" padding={3} width="72%" align="center" gap={1}>
    <title size="lg" color="#FFFFFF">第六章：I/O 系统</title>
    <text color="#FFFFFF" size="sm">体系结构 → 控制方式 → 软件层次 → 性能与考点</text>
  </box>
  <grid columns={2} gap={2}>
    <grid-item> …<box …>…</box>… </grid-item>
  </grid>
  <box border={{size:1,color:"#64748B"}} …>…</box>
</box>
```

| 标签 | 属性 | 渲染映射（render_dil.mjs 实现） |
|---|---|---|
| box | border（true 或 `{{size,color}}`）、radius（xl/lg/md）、padding、gap（数字 ×4px）、align="center"、width、background、theme（dark=白字） | flex column，圆角/背景/边框按属性 |
| grid | columns、gap | CSS grid 等分列 |
| grid-item | — | grid 子项 |
| title | size（lg…）、color | 加粗大字 |
| text | size（sm/xs）、color | 小字 |
| divider | color | 1px 分隔线 |

属性表达式（`{3}`、`{{size:1,color:"#64748B"}}`）只用受控解析：数字/true/false/对象字面量（键补引号后 JSON.parse），**不 eval**。行内 Markdown（`**粗**` `*斜*`）在 text 内容里按行内格式渲染。
