# 配置说明

所有站点配置都写在 `index.html` 的 `window.$docsify` 对象里。下面是本模板已经接好的部分，按需修改即可。

## 站点信息

```js
window.$docsify = {
  name: 'Docsify Demo',
  nameLink: {
    '/en/': '#/en/',
    '/': '#/',
  },
  repo: 'https://github.com/insseek/docsify-demo',
  cornerExternalLinkTarget: '_blank',
  auto2top: true,
  skipLink: {
    '/en/': 'Skip to main content',
    '/': '跳到主要内容',
  },
};
```

- `repo`：**完整仓库 URL**（如 `https://github.com/user/repo`、`https://gitlab.com/user/repo`）。设置后右上角出现 GitHub 风格角标，留空（`repo: ''`）则完全不显示。Docsify 也兼容 `用户名/仓库名` 简写（默认 GitHub），跨平台时建议写完整 URL。
- `nameLink`：点击侧边栏顶部站点名时的目标地址，按语言分别配置。
- `skipLink`：无障碍「跳到主要内容」链接，支持按路径配置，`false` 可关闭。
- `cornerExternalLinkTarget`：GitHub 角标的打开方式，默认 `_blank`。

同时别忘了修改 `<head>` 里的 `<title>` 和 `<meta name="description">`。`<html lang>` 由 `_script/language-toggle.js` 根据当前路由更新。

## 页面与导航

| 文件                                 | 作用     | 对应配置                       |
| ------------------------------------ | -------- | ------------------------------ |
| `README.md` / `en/README.md`         | 首页     | `homepage`（默认 `README.md`） |
| `_sidebar.md` / `en/_sidebar.md`     | 侧边栏   | `loadSidebar: '_sidebar.md'`   |
| `_navbar.md` / `en/_navbar.md`       | 顶部导航 | `loadNavbar: '_navbar.md'`     |
| `_coverpage.md` / `en/_coverpage.md` | 封面页   | `coverpage: { ... }`           |
| `_404.md` / `en/_404.md`             | 404 页面 | `notFoundPage: { ... }`        |

### 新增页面

1. 新建中文页面，例如 `guide/faq.md`；
2. 新建对应的英文页面 `en/guide/faq.md`；
3. 在两个 `_sidebar.md` 中分别加一行：

   ```markdown
   - [常见问题](/guide/faq.md)
   ```

4. 预览时通过 `#/guide/faq` 或 `#/en/guide/faq` 访问，也可以直接点击侧边栏链接。

### 标题层级

- `subMaxLevel: 3`：在侧边栏中显示页面内 `##`、`###` 标题；
- `maxLevel: 4`：目录（TOC）抓取的最大标题层级。

### 顶部导航与下拉菜单

`_navbar.md` 使用 Markdown 列表；把子列表放在某一项下面，就得到鼠标悬停展开的下拉菜单：

```markdown
- 翻译
  - [简体中文](/)
  - [English](/en/)
```

- Docsify 原生支持悬停（`:hover`）与键盘聚焦（`:focus-within`）展开二级菜单。
- 下拉里的语言链接直接指向语言首页，不保留当前页面路径。
- 其他二级菜单同理，可以按需增加多项。
- 小屏幕（≤ 640px）下顶部导航只保留最后一个语言菜单，页面链接由左侧侧边栏承担，避免与右上角 GitHub 角标拥挤。

## 多语言（中文 / English）

### 目录结构

- 中文：站点根目录 `/`（默认语言）
- 英文：`/en/`

每种语言需要自己的 `_sidebar.md`、`_coverpage.md`、`_404.md`，以及可选的 `_navbar.md`。

### 路由与别名

```js
alias: {
  '/en/(.+)/_navbar.md': '/en/_navbar.md',
  '/en/(.+)/_sidebar.md': '/en/_sidebar.md',
  '/(?!en/)(.+)/_navbar.md': '/_navbar.md',
  '/(?!en/)(.+)/_sidebar.md': '/_sidebar.md',
},
fallbackLanguages: ['en'],

coverpage: {
  '/en/': '_coverpage.md',
  '/': '_coverpage.md',
},
notFoundPage: {
  '/en/': 'en/_404.md',
  '/': '_404.md',
},
```

- `alias` 的 key 会作为正则匹配（按声明顺序命中），把深层页面的导航 / 侧边栏请求映射到所属语言目录，避免逐层回退产生的 404 请求；`(?!en/)` 用于排除英文路径，避免把 `/en/` 的请求误映射到根目录。
- `fallbackLanguages: ['en']`：`/en/foo` 不存在时自动回退到 `/foo`，而不是直接显示 404。
- `coverpage` 的值相对于当前语言目录（Docsify 会自动补上语言路径），所以 `/en/` 写 `_coverpage.md` 即可。
- `notFoundPage` 的值相对于站点根目录，需要写完整路径 `en/_404.md`。

### 界面文案

搜索、分页、无障碍链接等通过「路径 → 文案」的对象本地化：

```js
search: {
  placeholder: {
    '/en/': 'Search',
    '/': '搜索',
  },
  noData: {
    '/en/': 'No results found',
    '/': '没有找到相关内容',
  },
  paths: 'auto',
  pathNamespaces: ['/en'],
},
pagination: {
  previousText: { '/en/': 'Previous', '/': '上一节' },
  nextText: { '/en/': 'Next', '/': '下一节' },
  crossChapter: true,
  crossChapterText: true,
},
```

> [!IMPORTANT]
> 对象的 key 顺序有意义：`/en/` 要写在 `/` 之前，否则英文页面会先匹配到中文文案。

### 切换入口

- **右下角语言按钮**：由 `_script/language-toggle.js` 创建，显示当前语言「中 / EN」，点击在 `/` 与 `/en/` 之间切换；与主题按钮共用 `.app-control` 样式。
- **顶部导航「翻译」菜单**：在 `_navbar.md` 中声明，使用 Docsify 原生悬停 / 聚焦下拉。
- 语言状态完全由 URL 决定，不写入 `localStorage`。
- 按钮只做路由切换，不保留当前页面路径。

### 新增第三种语言

当前按钮只在中英之间切换。新增语言需要复制 `en/` 为 `ja/`，补齐 `/ja/` 配置和导航菜单，并自行调整 `_script/language-toggle.js` 的切换逻辑。

## 全文搜索

```js
search: {
  placeholder: {
    '/en/': 'Search',
    '/': '搜索',
  },
  paths: 'auto', // 依据侧边栏自动建立索引
  depth: 2, // 索引标题深度 1-6
  pathNamespaces: ['/en'], // 中英文使用独立索引
}
```

搜索索引会缓存在浏览器 IndexedDB 中，默认一天过期（`maxAge`）。同一域名下部署多个站点时，可用 `namespace` 区分索引。

## 上一节 / 下一节

```js
pagination: {
  previousText: { '/en/': 'Previous', '/': '上一节' },
  nextText: { '/en/': 'Next', '/': '下一节' },
  crossChapter: true, // 允许跨章节跳转
  crossChapterText: true, // 显示所属章节名称
}
```

## 主题定制

主题色、字体等都通过 CSS 变量控制。在 `index.html` 的 `<head>` 里、主题样式之后加一段 `<style>` 即可：

```html
<style>
  :root {
    --theme-color: #e11d48;
    --font-family: 'Noto Sans SC', system-ui, sans-serif;
    --font-family-mono: 'JetBrains Mono', ui-monospace, monospace;
  }
</style>
```

完整变量列表见 [Docsify 主题文档](https://docsify.js.org/#/themes?id=theme-properties)。

### 深色模式

模板自带自动 + 手动两种模式：

- 默认跟随系统（`prefers-color-scheme`）；
- 点击右下角圆形按钮手动切换，选择保存在 `localStorage`，刷新后保持；
- 双击按钮清除记忆，恢复跟随系统。

实现上，核心主题常驻，深色样式通过 `<link id="theme-dark">` 的 `media` 属性启停：

```html
<link
  id="theme-dark"
  rel="stylesheet"
  href="_style/docsify@5-themes-core-dark.min.css"
  media="(prefers-color-scheme: dark)"
/>
<script src="_script/theme-toggle.js"></script>
```

右下角的语言、主题、二维码按钮共用 `.app-control` 样式，从下到上依次为二维码、主题、语言。不需要深色模式时，删除上面的 `<link>`、`_script/theme-toggle.js` 以及 `_style/custom.css` 中的按钮样式即可。

## 微信二维码

右下角最下方是二维码按钮，按钮使用通用二维码图标，样式与语言 / 主题按钮一致。悬停、键盘聚焦或点击展开卡片，显示二维码与文案；点击按钮可固定展开，方便扫码，按 `Esc` 或点击卡片外部关闭。

配置：

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

- `enabled`：设为 `false` 时完全不渲染按钮和卡片。
- `qrcode`：二维码图片地址，默认 `_media/wechat-qrcode.jpg`。
- `text`：字符串或「路径 → 文案」对象；对象会按当前路由匹配，并优先选择最长 key，切换语言时自动更新。
- 按钮的 `aria-label` 与图片 `alt` 跟随界面语言；卡片颜色使用主题变量，自动适配浅色 / 深色模式。

## 捐赠入口

捐赠页 `donate.md` / `en/donate.md` 中的二维码由 `_script/donate.js` 渲染，可在 `index.html` 中控制：

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

- `enabled: false`：隐藏对应收款方式；两种都隐藏时页面显示「暂未开放捐赠方式」。
- `qrcode`：替换为新的收款码图片。
- `label`：可选，覆盖默认的「微信支付 / 支付宝」标题。
- 二维码卡片使用主题变量，自动适配浅色 / 深色模式；点击图片可查看原图。

## 仓库入口（GitHub 角标）

- `index.html` 中的 `repo: 'https://github.com/insseek/docsify-demo'` 会生成右上角 GitHub 风格角标，点击直达 <https://github.com/insseek/docsify-demo>。
- 需要更多入口时，也可以在 `_navbar.md` 中加一项 `[GitHub](https://github.com/insseek/docsify-demo)`；外部链接默认在新标签页打开，可用 `externalLinkTarget` 修改。
- 换成自己的仓库：修改 `repo` 为完整 URL，可指向 GitHub / GitLab 等任意托管；置空（`repo: ''`）可移除角标。

## 升级文档版本

`_script/` 与 `_style/` 中的官方文件取自 npm 包 `docsify@5.0.0`：

- 运行时：`dist/docsify.min.js`
- 搜索插件：`dist/plugins/search.min.js`
- 主题：`dist/themes/core.min.css`、`dist/themes/addons/core-dark.min.css`

`_script/language-toggle.js`、`_script/theme-toggle.js`、`_script/wechat.js`、`_script/donate.js` 是本模板自带的脚本，升级 Docsify 时无需替换。升级官方文件时，从 [docsify](https://www.npmjs.com/package/docsify) 的对应版本下载并覆盖即可。
