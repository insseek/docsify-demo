# Docsify v5 Demo

> 一个可以直接复用的 Docsify v5 起步模板：没有构建步骤，写完 Markdown 就能发布；内置中英文切换。

## 这是什么

- **Docsify 5.0.0**：运行时把 Markdown 渲染成网站，不需要生成静态 HTML。
- **中英文切换**：中文在根目录，英文在 `en/`；右上角「翻译」下拉菜单和右下角语言按钮都能切换，并停留在当前页面。
- **核心主题**：官方 v5 核心主题。深色模式默认跟随系统，右下角按钮可手动切换并记住选择。
- **常用能力已接好**：封面页、侧边栏、顶部导航、全文搜索、上一节 / 下一节、404 页面。
- **微信二维码**：右下角二维码按钮，悬停 / 聚焦 / 点击展示「里探」公众号卡片，可在 `wechat` 配置中关闭。
- **捐赠入口**：捐赠页支持微信支付 / 支付宝收款码，可在 `donate` 配置中分别显示或隐藏。
- **资源本地化**：`_script/` 与 `_style/` 内是完整的运行文件，不依赖外部 CDN，离线也能预览。
- **仓库入口**：右上角 GitHub 风格角标直达 <https://github.com/insseek/docsify-demo>，`repo` 可配置为任意仓库 URL。

## 目录结构

```text
docsify-demo/
├── index.html                 # 入口：站点配置与脚本引用
├── README.md                  # 首页（中文，默认语言）
├── _coverpage.md              # 封面页（中文）
├── _sidebar.md                # 侧边栏（中文）
├── _navbar.md                 # 顶部导航（中文）
├── _404.md                    # 404 页面（中文）
├── .editorconfig              # 编辑器格式约定
├── .markdownlint.json         # Markdown 规范配置
├── .nojekyll                  # 让 GitHub Pages 保留 _script 等下划线目录
├── .prettierignore            # 跳过压缩后的第三方资源
├── .prettierrc.json           # Prettier 配置（与官方仓库一致）
├── _media/
│   ├── alipay-donate.jpg      # 支付宝收款二维码（捐赠页）
│   ├── alipay-donate-small.jpg # 支付宝二维码缩略图（README）
│   ├── favicon.svg            # 站点图标（可替换）
│   ├── wechat-donate.png      # 微信收款二维码（捐赠页）
│   ├── wechat-donate-small.png # 微信二维码缩略图（README）
│   └── wechat-qrcode.jpg      # 微信公众号二维码
├── _script/
│   ├── docsify@5.min.js            # Docsify 5.0.0
│   ├── docsify-search@5.min.js     # 全文搜索插件
│   ├── docsify-pagination@2.10.1.min.js  # 上一节/下一节插件
│   ├── donate.js                   # 捐赠二维码渲染
│   ├── i18n.js                     # 中英文切换
│   ├── theme-toggle.js             # 深色模式切换
│   └── wechat.js                   # 微信二维码
├── _style/
│   ├── docsify@5-themes-core.min.css      # 核心主题
│   ├── docsify@5-themes-core-dark.min.css # 深色模式附加样式
│   └── custom.css                  # 悬浮按钮、导航下拉菜单与二维码卡片样式
├── guide/
│   ├── start.md               # 配置说明
│   └── markdown.md            # Markdown 语法示例
├── about.md                   # 关于
├── donate.md                  # 捐赠（微信收款二维码）
└── en/                        # 英文文档（结构与根目录一致）
    ├── README.md
    ├── _coverpage.md
    ├── _sidebar.md
    ├── _navbar.md
    ├── _404.md
    ├── about.md
    ├── donate.md
    └── guide/
        ├── start.md
        └── markdown.md
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
2. 修改 `index.html` 里的 `name`、`repo`、`<title>`、`<meta name="description">`。
3. 修改根目录的中文文档，以及 `en/` 下对应的英文文档。
4. 新增页面：在根目录与 `en/` 下各写一个 `.md` 文件，再分别在两个 `_sidebar.md` 中加一行链接即可。

更多配置项见 [配置说明](/guide/start.md)，语法示例见 [Markdown 示例](/guide/markdown.md)。

## 中英文切换

两个入口，都会停留在当前页面：

- **顶部导航 → 翻译**：鼠标悬停、键盘聚焦或点击展开，选择「简体中文」或「English」。
- **右下角语言按钮**：圈内显示当前语言「中 / EN」，点击切换到另一种语言，与主题按钮显示当前状态的逻辑一致。按钮位于主题按钮上方，二者共用 `.app-control` 样式。

实现方式：

- 中文页面放在站点根目录，英文页面放在 `/en/`，即 Docsify 官方推荐的语言目录方案；
- `index.html` 中的 `alias` 让深层页面复用所属语言的 `_navbar.md` / `_sidebar.md`，减少逐层回退的 404 请求；
- `fallbackLanguages: ['en']` 让缺失的英文页面回退到中文同名页面；
- 界面文案通过「路径 → 文案」配置本地化：`search.placeholder`、`search.noData`、`pagination.*`、`skipLink`、`coverpage`、`notFoundPage`、`nameLink`；
- `_script/i18n.js` 负责同步 `<html lang>`、改写下拉菜单链接以保留当前页面、增强下拉菜单的键盘操作，并暴露 `window.$docsifyI18n`；
- 搜索插件内置的「找到 N 条结果」、清除按钮与快捷键提示也由 `i18n.js` 本地化；
- 小屏幕（≤ 640px）顶部只保留「翻译」菜单，页面导航交给左侧侧边栏，避免与 GitHub 角标拥挤。

新增语言：复制 `en/` 为 `ja/` 并翻译内容，再在 `index.html` 相同配置中补充 `/ja/` 条目，最后在两个导航文件的语言菜单里加入对应链接。

## 深色模式

默认跟随系统设置；点击页面右下角的圆形按钮可手动切换，选择会保存在浏览器中（`localStorage`，键名 `docsify-theme`），刷新后保持。**双击按钮**可清除记忆，恢复「跟随系统」。

实现方式：核心主题常驻加载，深色附加样式通过 `<link id="theme-dark">` 的 `media` 属性启停（`all` 启用、`not all` 禁用），`_script/theme-toggle.js` 负责按钮状态与记忆，并通过 `window.$docsifyI18n` 同步按钮文案。

## 微信二维码

右下角最下方是一个二维码按钮，悬停、键盘聚焦或点击都会展开卡片，显示「里探」公众号二维码与文案；点击按钮可固定展开，方便扫码，按 `Esc` 或点击卡片外部收起。

在 `index.html` 中配置：

```js
wechat: {
  enabled: true,
  qrcode: '_media/wechat-qrcode.jpg',
  text: {
    '/en/': 'Scan with WeChat to follow 「里探」',
    '/': '微信扫码　关注「里探」',
  },
},
```

- `enabled: false`：隐藏按钮与卡片；`text` 可以是字符串，也可以是「路径 → 文案」对象，后者自动取最长匹配项。
- `qrcode`：二维码图片地址，替换为自己的图片即可。
- 中英文切换时文案自动更新，按钮的 `aria-label` 与图片 `alt` 也会本地化。
- 卡片背景、边框和文字颜色沿用主题变量，自动适配浅色 / 深色模式。

## 仓库入口（GitHub 角标）

`index.html` 中的 `repo: 'https://github.com/insseek/docsify-demo'` 会生成右上角仓库角标，点击直达仓库。`repo` 使用**完整 URL**，因此可以指向 GitHub、GitLab 或任意代码托管；角标图标固定为 GitHub 风格，留空（`repo: ''`）则完全不显示入口。Docsify 也兼容 `用户名/仓库名` 简写（默认补全为 GitHub），跨平台时建议始终写完整 URL。

## 捐赠

如果你认为 Docsify Demo 对你有帮助，或者我的工作有价值。若考虑捐赠，欢迎帮我买杯咖啡 ☕。

|                            微信支付                            |                              支付宝                              |
| :------------------------------------------------------------: | :--------------------------------------------------------------: |
| [![微信收款二维码](_media/wechat-donate-small.png)](donate.md) | [![支付宝收款二维码](_media/alipay-donate-small.jpg)](donate.md) |

两种方式可在 `index.html` 的 `donate` 配置中分别开关：

```js
donate: {
  wechat: {
    enabled: true,
    qrcode: '_media/wechat-donate.png',
  },
  alipay: {
    enabled: true,
    qrcode: '_media/alipay-donate.jpg',
  },
},
```

将对应方式的 `enabled` 设为 `false` 即可隐藏。

## 部署

这是一个纯静态站点，把整个目录发布到任意静态托管即可：

- **GitHub Pages**：推送到仓库后，在 Settings → Pages 选择分支根目录。`.nojekyll` 已包含，避免 Jekyll 忽略 `_script/`、`_style/` 等下划线目录。
- **Vercel / Netlify / Cloudflare Pages**：构建命令留空，输出目录填 `.`（或仓库根目录）。
- **自有服务器**：上传目录，用 Nginx / Caddy 等作为静态站点服务。

## 常见定制

| 需求            | 做法                                                                                                                  |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| 换主题色        | 在 `index.html` 的 `<head>` 内加 `<style>:root{--theme-color:#e11d48;}</style>`                                       |
| 换字体          | 设置 `--font-family`、`--font-family-mono` 主题变量                                                                   |
| 深色模式        | 右下角按钮切换；双击按钮恢复「跟随系统」                                                                              |
| 仓库入口        | 修改 `index.html` 中的 `repo`（完整 URL；留空隐藏角标）                                                               |
| 新增语言        | 复制 `en/` 并翻译，再在 `index.html` 中补充对应路径的配置                                                             |
| 关闭语言切换    | 删除 `_script/i18n.js` 的 `<script>`、`_navbar.md` 中的「翻译」菜单，以及 `custom.css` 中与 `nav-dropdown` 相关的样式 |
| 关闭深色模式    | 删除深色样式 `<link>`、`_script/theme-toggle.js` 的 `<script>` 和 `_style/custom.css` 中的按钮样式                    |
| 关闭微信二维码  | 将 `index.html` 中 `wechat.enabled` 设为 `false`，或删除 `_script/wechat.js` 的 `<script>`                            |
| 修改捐赠入口    | 编辑 `donate.md` / `en/donate.md` 与 `_media/*-donate*` 图片；通过 `index.html` 的 `donate` 配置开关方式              |
| 恢复 v4 观感    | 加载官方 Vue 附加主题 `dist/themes/addons/vue.min.css`（需自行下载到 `_style/`）                                      |
| 关闭搜索 / 分页 | 删除 `index.html` 中对应的 `<script>`，以及 `$docsify` 里的配置项                                                     |
| 使用 CDN        | 把 `_script/`、`_style/` 的引用换成 `https://cdn.jsdelivr.net/npm/docsify@5/...`                                      |

## 代码与文档规范

- `.editorconfig` 与 `.prettierrc.json` 沿用官方 Docsify 仓库约定：UTF-8、LF、2 空格缩进、单引号。
- 文档结构与官方保持一致：每页一个 H1、代码块标注语言、导航文件首行使用 `<!-- markdownlint-disable first-line-h1 -->`。
- JavaScript 无依赖、无构建：只使用 `const` / `let`，文件头写 JSDoc 说明，并对 `localStorage` 不可用等情况做兜底。
- 已内置 Prettier 与 markdownlint 配置，可运行 `npx prettier . --check` 和 `npx markdownlint-cli2 "**/*.md"` 校验。

---

文档由 [Docsify](https://docsify.js.org) 驱动 · [GitHub 仓库](https://github.com/insseek/docsify-demo) · MIT License。
