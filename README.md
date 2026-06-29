# 常州初三预习助手

一个无后端的网页原型，面向孩子自主预习初三课程。第一版主打每日 20-30 分钟任务，英语和数学做深，同时补齐五科章节目录、课时要点和可继续扩展的学习材料。

线上地址：https://xxouu.github.io/changzhou-grade9-prep-app/

## 运行

```bash
python3 -m http.server 4174
```

浏览器打开 `http://localhost:4174`。

## 测试

需要 Node.js 18+。

```bash
node --test tests/*.test.mjs
```

## 发布

这是纯静态网页，已包含 `netlify.toml`，可以直接发布到 Netlify 或 GitHub Pages。

### Netlify 手动发布

```bash
npm install -g netlify-cli
netlify login
netlify deploy --dir=.      # 预览地址
netlify deploy --prod --dir=. # 正式发布
```

### GitHub + Netlify 自动发布

1. 在本目录初始化 Git 仓库并推到 GitHub。
2. 在 Netlify 新建站点，连接这个仓库。
3. Build command 留空，Publish directory 填 `.`。

发布后每次推送到 GitHub，Netlify 会自动重新部署。

## 内容策略

- 默认地区：江苏常州。
- 默认教材版本：统编/人教语文、苏科数学、译林英语、苏科物理、沪教化学。
- 孩子视图只展示已校对内容。
- 校对视图可查看待校对内容，用于后续人工审核。
- 英语按 8 个单元提供预习包；Unit 1 已按课本后 Wordlist 录入 67 条英文+中文，其他单元仍是扩展预习词库，待逐项校对。
- 英语词表默认先显示英文，点击/聚焦词条显示中文；闪卡支持“英→中”和“中→英”两种翻面方向。
- 语文按 25 课提供导读要点和默写词语，不收录课文全文。
- 数学、物理、化学提供章节列表、课时要点、预习任务和易错方向。
