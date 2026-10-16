# 04737 C++程序设计 · 考点笔记 + 错题集

全国自考 04737 C++程序设计考点思维导图与错题集（交互式 HTML，纯静态、无构建依赖）。

## 结构

```
├── exam-notes.md        # 唯一内容源：考点笔记（58 考点 / 9 章）
├── index.html           # 思维导图页面（由 skill 的 render_notes.py 从 exam-notes.md 生成，勿手改）
├── render.py            # 旧版渲染器（已被 .agents/skills/exam-note-distiller/scripts/render_notes.py 取代）
├── mistakes-data.js     # 错题集数据（AI 维护，追加条目即可）
├── mistakes.html        # 错题集页面（读取 mistakes-data.js 渲染）
├── distill/             # 真题蒸馏中间产物（考点聚类、覆盖度）
├── 真题/ 教材/ 参考笔记/  # 原始素材
└── .agents/skills/      # exam-note-distiller skill（模板 + 参考文档）
```

## 更新方式

1. 改内容：考点改 `exam-notes.md`，错题追加到 `mistakes-data.js`
2. 重新生成页面：`python .agents/skills/exam-note-distiller/scripts/render_notes.py`（只影响 `index.html`）
3. `git add . && git commit -m "..." && git push` → Pages 自动上线

## 错题集怎么用

页面：<https://hanxiaodao.github.io/cpp-mindmap/mistakes.html>（右上角「错题集」胶囊也可进入）

**录入流程**：把错题发给 AI（拍照、口述、粘贴题干都可以）→ AI 总结成条目追加到
`mistakes-data.js` 的 `window.MISTAKES` 数组 → 提交推送 → 页面按试卷编号自动分组。

**手动追加**：照 `mistakes-data.js` 末尾的模板复制一条，字段含义：

| 字段 | 必填 | 说明 |
|---|---|---|
| `exam` | ✅ | 试卷编号，分组依据，如 `"2025年10月"`（按 `YYYY年M月` 才能时间倒序） |
| `q` | ✅ | 题目概述（题干文字） |
| `fix` | ✅ | 正确思路 / 答案 / 考点讲解 |
| `no` | | 题号，如 `"三、1"` |
| `type` | | 题型：单选 / 填空 / 程序填空 / 程序分析 / 程序设计（页面自动生成筛选项） |
| `ch` | | 章节号 1~9（0 或缺省 = 未分类） |
| `kp` | | 考点，如 `"考点18"` |
| `opts` | | 选项数组（选择题用，每项一行） |
| `code` | | 代码片段（程序题用，保留缩进原样显示） |
| `wrong` | | 我的错因 |
| `done` | | 是否已掌握，`true` / `false`（默认未掌握） |

页面功能：章节筛选 + 题型筛选 + 关键词搜索 + 只看未掌握 + 复习模式（直接展开正确思路）+
暗色/亮色主题，试卷分组默认展开最近一套。

## 素材与蒸馏

`真题/` 是 2023.04–2026.04 七套 PDF；`distill/` 是逐题反推的考点聚类（`topics.md`）、
试卷结构（`papers.md`）、覆盖度核查（`coverage.md`）。改考点前先看 `distill/`。
