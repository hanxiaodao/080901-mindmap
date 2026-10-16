# 13015 计算机系统原理 · 考点笔记

全国自考 13015《计算机系统原理》（袁春风 2023 年版，机械工业出版社）的考点笔记 + 交互式复习页面 + 错题集。本目录是 [080901-mindmap](https://github.com/hanxiaodao/080901-mindmap) 仓库中的一个课程模块。

## 在线阅读

**https://hanxiaodao.github.io/080901-mindmap/13015-计算机系统原理/**

- [考点笔记页](https://hanxiaodao.github.io/080901-mindmap/13015-计算机系统原理/)（index.html）：94 个考点按教材六章编号，另附 5 个总览专题（考试地图、高频公式、高频易错、题型索引、考前速记）；含考点评级（S/A/B/C）、真题出处、公式块、易错提醒；支持章节折叠、深浅主题、`Ctrl+K` 全文搜索、导出 Markdown、速记图 PDF 汇编（导出菜单一键打印全部章节速记图）。
- [错题集](https://hanxiaodao.github.io/080901-mindmap/13015-计算机系统原理/mistakes.html)（mistakes.html）：按真题卷归档，支持按章筛选、只看未掌握、复习模式（直接展开思路）；错题数据录在 `mistakes-data.js`，把错题发给 AI 总结入档、推送后页面直接可见，无需手动导入。

## 仓库内容

| 目录 | 说明 |
|---|---|
| `index.html` / `mistakes.html` | 笔记页与错题集（单文件自包含） |
| `exam-notes.md` | 笔记唯一内容源，改动后重跑渲染脚本即可更新页面 |
| `mistakes-data.js` | 错题数据源（`window.MISTAKES` 数组），由 AI 总结录入，错题集页面读取它渲染 |
| `distill/` | 真题逐题拆解（papers-*.md）、考点登记表（topics.md）、真题回测覆盖矩阵（coverage.md）、课件/课后习题提炼稿（chN-extract.md） |
| `materials/` | 教材、课件、真题 PDF 的 MinerU 解析文本（`full.md`），笔记溯源用 |
| `01 课件/`、`03 历年真题/`、`05课后习题大题及总结/`、`课后习题/` | 原始资料 PDF（版权原因不入库，`.gitignore` 已排除） |
| `.agents/` | 渲染脚本所在工具目录 |

## 本地使用

笔记页直接双击打开即可；错题集页与 `mistakes-data.js` 同目录双击也能打开（数据跟着仓库走，换设备都是在线的同一份，不依赖浏览器本地存储）。

修改内容：编辑 `exam-notes.md`（唯一内容源）后运行

```bash
python .agents/skills/exam-note-distiller/scripts/render_notes.py exam-notes.md
```

## 版权说明

仓库内的教材、历年真题与考点解析课资料版权归机械工业出版社与命题机构所有，页面笔记为个人整理的学习笔记。全部内容仅供个人学习复习使用，请勿商用或二次传播。
