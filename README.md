# Docsify v5 Demo

> 一个可以直接复用的 Docsify v5 起步模板：没有构建步骤，写完 Markdown 就能发布。

## 这是什么

- **Docsify 5.0.0**：运行时把 Markdown 渲染成网站，不需要生成静态 HTML。
- **核心主题**：官方 v5 核心主题，深色模式可自动跟随系统，也可用右下角按钮手动切换并记住选择。
- **常用能力已接好**：封面页、侧边栏、顶部导航、全文搜索、上一节 / 下一节、404 页面。
- **资源本地化**：`_script/` 与 `_style/` 内是完整的运行文件，不依赖外部 CDN，离线也能预览。

## 目录结构

```text
docsify-demo/
├── index.html                 # 入口：站点配置与脚本引用
├── README.md                  # 首页（当前页）
├── _coverpage.md              # 封面页
├── _sidebar.md                # 侧边栏
├── _navbar.md                 # 顶部导航
├── _404.md                    # 404 页面
├── .nojekyll                  # 让 GitHub Pages 保留 _script 等下划线目录
├── _media/
│   └── favicon.svg            # 站点图标（可替换）
├── _script/
│   ├── docsify@5.min.js            # Docsify 5.0.0
│   ├── docsify-search@5.min.js     # 全文搜索插件
│   ├── docsify-pagination@2.10.1.min.js  # 上一节/下一节插件
│   └── theme-toggle.js             # 深色模式切换按钮
├── _style/
│   ├── docsify@5-themes-core.min.css      # 核心主题
│   ├── docsify@5-themes-core-dark.min.css # 深色模式附加样式
│   └── custom.css                  # 切换按钮样式（自定义样式放这里）
└── guide/
    ├── start.md               # 配置说明
    └── markdown.md            # Markdown 语法示例
```

## 本地预览

在项目根目录执行任一命令，然后访问 <http://localhost:3000>：

```bash
# 官方 CLI（已全局安装：npm i -g docsify-cli）
docsify serve .

# 未全局安装：用 npx 临时运行同一个 CLI，无需安装
npx docsify-cli serve .

# 或者零依赖的静态服务器（无热更新）
python3 -m http.server 3000
```

说明：

- `docsify serve` 默认端口就是 3000，`--port 3000` 可省略；
- `docsify-cli` 5.x 需要 Node.js >= 20.11，自带 livereload，修改 Markdown 后页面会自动刷新；
- 本模板资源已本地化，任何静态服务器都能预览，Python 方式适合没装 Node 的环境。

> 直接双击 `index.html`（`file://` 方式）无法使用，Docsify 需要通过 HTTP 读取 Markdown 文件。

## 开始你的项目

1. 复制整个目录（或 `git init` 后作为新仓库的根目录）。
2. 修改 `index.html` 里的 `name`、`<title>`、`<meta name="description">`。
3. 修改 `_coverpage.md`、`_sidebar.md`、`_navbar.md` 和 `README.md`。
4. 新增页面：写一个 `.md` 文件，再在 `_sidebar.md` 中加一行链接即可。

更多配置项见 [配置说明](guide/start.md)，语法示例见 [Markdown 示例](guide/markdown.md)。

## 深色模式

默认跟随系统设置；点击页面右下角的圆形按钮可手动切换，选择会保存在浏览器中（`localStorage`，键名 `docsify-theme`），刷新后保持。**双击按钮**可清除记忆，恢复「跟随系统」。

实现方式：核心主题常驻加载，深色附加样式通过 `<link id="theme-dark">` 的 `media` 属性启停（`all` 启用、`not all` 禁用），`_script/theme-toggle.js` 负责按钮状态与记忆。

## 部署

这是一个纯静态站点，把整个目录发布到任意静态托管即可：

- **GitHub Pages**：推送到仓库后，在 Settings → Pages 选择分支根目录。`.nojekyll` 已包含，避免 Jekyll 忽略 `_script/`、`_style/` 等下划线目录。
- **Vercel / Netlify / Cloudflare Pages**：构建命令留空，输出目录填 `.`（或仓库根目录）。
- **自有服务器**：上传目录，用 Nginx / Caddy 等作为静态站点服务。

## 常见定制

| 需求 | 做法 |
| --- | --- |
| 换主题色 | 在 `index.html` 的 `<head>` 内加 `<style>:root{--theme-color:#e11d48;}</style>` |
| 换字体 | 设置 `--font-family`、`--font-family-mono` 主题变量 |
| 深色模式 | 右下角按钮切换；双击按钮恢复「跟随系统」 |
| 关闭深色模式 | 删除 `_style/docsify@5-themes-core-dark.min.css` 的 `<link>`、`_script/theme-toggle.js` 的 `<script>` 和 `_style/custom.css` 的 `<link>` |
| 恢复 v4 观感 | 加载官方 Vue 附加主题 `dist/themes/addons/vue.min.css`（需自行下载到 `_style/`） |
| 关闭搜索 / 分页 | 删除 `index.html` 中对应的 `<script>`，以及 `$docsify` 里的配置项 |
| 使用 CDN | 把 `_script/`、`_style/` 的引用换成 `https://cdn.jsdelivr.net/npm/docsify@5/...` |

---

文档由 [Docsify](https://docsify.js.org) 驱动，MIT License。
