---
name: exam-note-distiller
description: 考试导向的课程考点笔记蒸馏 + 交互式思维导图生成。当用户想整理某门课的考点笔记/复习笔记、分析历年真题、从教材提炼考点、把课程知识点做成思维导图或知识点网页时使用——即用户说"帮我把这门课整理成考点笔记""做个思维导图""分析真题""提炼考点""考前笔记"之类的话，即使用户没提"考试"两个字，只要目标是从课程资料产出高密度复习笔记，就用本 skill。流程：真题反推考点 → 考点聚类评级 → 教材/个人笔记/网络补齐 → 产出 exam-notes.md → 按模板渲染交互式 HTML。PDF 素材经 MinerU 解析。
---

# Exam Note Distiller

把历年真题 + 教材（+ 考试大纲 + 个人笔记）蒸馏成一份**以考试为中心的高密度考点笔记**，并渲染成交互式 HTML 思维导图（暗/亮主题、折叠章节、考点评级徽章、一键导出 Markdown）。

核心立场：**从真题反推这门课怎么考，再回教材补齐所需知识。** 不做"教材复读机"。

本 skill 没有"生成 HTML 的脚本"——渲染由 AI 按资产模板直接完成；唯一的脚本是 MinerU PDF 解析工具。

## 红线（违反即返工）

1. **禁止编造真题证据。** 年份、题号、考查内容只能来自用户提供的材料；记不清写【待核实】。
2. **禁止伪造趋势。** 样本不足不下趋势结论；表述用"近年出现……"，不用"以后一定……"。
3. **禁止把网络知识或个人笔记内容包装成教材原文、大纲要求。**
4. **"没考过"≠"超纲"。** 只有大纲支持才能标非重点，否则标【低频】保留。

## 工作目录与产物

在用户指定的课程目录（没有就建一个）内工作：

```
<课程目录>/
├── materials/          # 用户提供的原始素材：真题、教材、大纲、个人笔记
│   └── parsed/         # PDF 经 MinerU 解析后的 Markdown（parse_pdf.py 输出）
├── distill/
│   ├── papers.md       # 真题拆解记录（每题一条）
│   ├── topics.md       # 考点登记表（聚类结果+频率+评级）
│   └── coverage.md     # 覆盖矩阵（真题 × 考点）
├── exam-notes.md       # 最终笔记（唯一内容源，规范见 references/format-contract.md）
└── index.html          # 渲染产物（AI 按 assets/template.html 生成）
```

中间文件必须落盘，大课程跨多轮会话时靠它们续作。**exam-notes.md 是唯一内容源**：后续任何内容修改先改它，再重新渲染 HTML；不要直接在 HTML 上改内容。

## 流程

### Phase 0 · 素材盘点

问清（能从上下文判断的不要问）：哪门课；材料有哪些——**真题（几套、有没有答案）、教材、大纲、个人总结的笔记**；哪些是 PDF；要不要渲染成网页。

然后按 references/distillation-guide.md §2 的降级路径确定模式（真题充足 / 真题少 / 无真题纯大纲模式）——**这决定后面评级和趋势结论能做多细**。

### Phase 1 · 素材预处理

- **PDF 素材**（教材章节、真题扫描件、课件）：先跑 MinerU 解析，输出到 `materials/parsed/`：

  ```bash
  MINERU_API_KEY=<key> python <skill目录>/scripts/parse_pdf.py 教材.pdf 真题.pdf -o materials/parsed
  ```

  key 由用户配置在环境变量 `MINERU_API_KEY`；未配置就向用户要，不要猜测。扫描件加 `--ocr`。**解析结果是机器识别的，公式和表格要先抽查再当内容依据**；识别质量差的部分向用户说明，必要时请用户提供可复制文本。

- **个人笔记**：通读后按类型归档——口诀/记忆技巧、易错记录、自己的理解与扩展。它们稍后融入对应考点（人话解释、tip 块），并反映用户的薄弱环节（相关考点可适当加重）。个人笔记与教材/真题冲突时按 distillation-guide.md §13 处理，并向用户指出。

### Phase 2 · 真题拆解

逐题拆解写入 `distill/papers.md`（字段见 distillation-guide.md §3）。批量进行：每读完一套真题就落盘一次。

### Phase 3 · 考点聚类与评级

按"共同知识结构"把题聚成考点（题 ≠ 考点），按四相似聚类、不按教材章节；统计频率、评级 S–D，写入 `distill/topics.md`。规则见 distillation-guide.md §4–§7。

### Phase 4 · 补齐知识

对每个考点回教材提取必需知识（深度按考法定，见 distillation-guide.md §9），融入个人笔记中对应的内容。教材缺啥补啥时用 WebSearch/WebFetch 检索，遵守 distillation-guide.md §16：关键结论两个来源一致才用，分歧标【存疑】。

### Phase 5 · 撰写 exam-notes.md

写笔记。开写前必读两份文档：

- **references/format-contract.md** — 内容格式规范（exam-notes.md 是唯一内容源，HTML 渲染以它为准）
- **references/style-guide.md** — 写作风格（考点粒度、子主题骨架、文风七条、篇幅基准）

总览层（考试地图/高频公式/高频易错/题型索引/考前速记）按 format-contract.md §4 放置。

### Phase 6 · 渲染 HTML（AI 直接完成，无脚本）

读 **assets/template.html**（文件头的注释就是完整的渲染规则：token 替换表、内容块 → CSS 类的映射、章节配色表），把 exam-notes.md 的内容渲染进去，产出 `index.html`：

- 交互 JS（折叠/主题切换/Markdown 导出）**原样保留，不要改动**。
- 章节按顺序取配色表；meta 的 level/freq 渲染为徽章和年份。
- GitHub 按钮可选：用户给了仓库链接就替换 `@@GITHUB@@` 并清掉 body 的 `no-github` 类。

### Phase 7 · 验证（不验证不算完成）

1. **渲染目检**：浏览器打开 index.html，展开两三个章节，检查公式块、表格、徽章、深浅主题。
2. **真题回测**：按 distillation-guide.md §17 执行四问回测，写 `distill/coverage.md` 覆盖矩阵，跑完自检六问。
3. 向用户报告：章数/考点数/评级分布，以及回测发现的缺口与处理方式。

### 更新已有笔记

用户后续说"补充/修改某个考点""把新一份真题并进来"时：先改 `exam-notes.md`（必要时同步更新 distill/ 的拆解与登记），再只重新渲染受影响的章节 HTML，最后目检。不要从头重写没变的部分。

## 参考文档索引

| 文件 | 什么时候读 |
|---|---|
| references/distillation-guide.md | Phase 0–4、7：方法论、降级路径、检索规则、验证闭环 |
| references/format-contract.md | Phase 5 开写前：exam-notes.md 的格式契约 |
| references/style-guide.md | Phase 5 开写前：考点结构与文风 |
| assets/template.html | Phase 6 渲染时：模板 + 文件头注释里的渲染规则 |
| scripts/parse_pdf.py | Phase 1：PDF/扫描件 → Markdown（MinerU，需 MINERU_API_KEY） |

## 收尾建议

渲染完成后，如果用户想发布，提示可选：把 `<课程目录>/index.html` 与 `exam-notes.md` 放入一个 git 仓库推送到 GitHub Pages（或复用用户已有的 mindmap 仓库模式）。不要主动 push。
