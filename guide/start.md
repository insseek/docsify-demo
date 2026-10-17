# 配置说明

所有站点配置都写在 `index.html` 的 `window.$docsify` 对象里。下面是本模板已经接好的部分，按需修改即可。

## 站点信息

```js
window.$docsify = {
  name: 'Docsify Demo',            // 侧边栏顶部显示的名称
  repo: 'your-name/your-repo',     // 可选：右上角 GitHub 角标
  auto2top: true,                  // 切换页面后回到顶部
  skipLink: '跳到主要内容',         // 无障碍跳转链接，false 可关闭
}
```

同时别忘了修改 `<head>` 里的 `<title>` 和 `<meta name="description">`。

## 页面与导航

| 文件 | 作用 | 对应配置 |
| --- | --- | --- |
| `README.md` | 首页 | 无 |
| `_sidebar.md` | 侧边栏 | `loadSidebar: '_sidebar.md'` |
| `_navbar.md` | 顶部导航 | `loadNavbar: '_navbar.md'` |
| `_coverpage.md` | 封面页 | `coverpage: true` |
| `_404.md` | 404 页面 | `notFoundPage: true` |

### 新增页面

1. 新建 Markdown 文件，例如 `guide/faq.md`；
2. 在 `_sidebar.md` 中加一行：

```markdown
- [常见问题](guide/faq.md)
```

3. 预览时通过 `#/guide/faq` 访问，或直接点击侧边栏链接。

### 标题层级

- `subMaxLevel: 3`：在侧边栏中显示页面内 `##`、`###` 标题；
- `maxLevel: 4`：目录（TOC）抓取的最大标题层级。

## 全文搜索

```js
search: {
  placeholder: '搜索',
  paths: 'auto',   // 依据侧边栏自动建立索引
  depth: 2,        // 索引标题深度 1-6
}
```

搜索索引会缓存在浏览器 IndexedDB 中，默认一天过期（`maxAge`）。同一域名下部署多个站点时，可用 `namespace` 区分索引。

## 上一节 / 下一节

```js
pagination: {
  previousText: '上一节',
  nextText: '下一节',
  crossChapter: true,      // 允许跨章节跳转
  crossChapterText: true,  // 显示所属章节名称
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
<link id="theme-dark" rel="stylesheet" href="_style/docsify@5-themes-core-dark.min.css" media="(prefers-color-scheme: dark)">
<script src="_script/theme-toggle.js"></script>
```

不需要深色模式时，删除上面的 `<link>`、`_script/theme-toggle.js` 以及 `_style/custom.css` 即可。

## 升级文档版本

`_script/` 与 `_style/` 中的文件取自 npm 包 `docsify@5.0.0`：

- 运行时：`dist/docsify.min.js`
- 搜索插件：`dist/plugins/search.min.js`
- 主题：`dist/themes/core.min.css`、`dist/themes/addons/core-dark.min.css`

升级时从 [docsify](https://www.npmjs.com/package/docsify) 的对应版本下载并替换即可。
