# 02324 离散数学 · 思维导图

全国自考 02324 离散数学考点思维导图（交互式 HTML）。

在线访问：[https://hanxiaodao.github.io/02324-mindmap/](https://hanxiaodao.github.io/02324-mindmap/)

## 结构

```
├── index.html               # 思维导图页面（浏览器打开 / Pages 部署）
├── mistakes-data.js         # 错题本数据（AI 维护，追加条目即可）
├── mistakes.html            # 错题本页面（读取 mistakes-data.js 渲染）
└── .github/workflows/       # GitHub Actions 自动部署
```

## 更新方式

不再从 WPS 云文档生成（旧构建脚本已于 2026-10-06 备份移除）。

1. 直接编辑 `index.html`（或让 AI 把错题追加到 `mistakes-data.js`）
2. `git add` → `git commit` → `git push`
3. GitHub Actions 自动部署 Pages，1-2 分钟后生效
