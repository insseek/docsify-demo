# Configuration

Every site option lives in the `window.$docsify` object in `index.html`. The options below are already wired up in this template; adjust them as needed.

## Site information

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

- `repo`: a **full repository URL** (for example `https://github.com/user/repo` or `https://gitlab.com/user/repo`). It renders a GitHub-style corner link in the top-right corner; set it to an empty string (`repo: ''`) to hide it entirely. Docsify also accepts a `username/repo` shorthand that defaults to GitHub, but a full URL is safer across hosts.
- `nameLink`: destination when the site name in the sidebar is clicked, configured per language.
- `skipLink`: the accessible “skip to main content” link; supports per-path values, and `false` disables it.
- `cornerExternalLinkTarget`: how the GitHub corner opens, `_blank` by default.

Also update `<title>` and `<meta name="description">` in `<head>`. `_script/language-toggle.js` keeps `<html lang>` in sync with the current route.

## Pages and navigation

| File                                 | Purpose    | Option                           |
| ------------------------------------ | ---------- | -------------------------------- |
| `README.md` / `en/README.md`         | Homepage   | `homepage` (default `README.md`) |
| `_sidebar.md` / `en/_sidebar.md`     | Sidebar    | `loadSidebar: '_sidebar.md'`     |
| `_navbar.md` / `en/_navbar.md`       | Navbar     | `loadNavbar: '_navbar.md'`       |
| `_coverpage.md` / `en/_coverpage.md` | Cover page | `coverpage: { ... }`             |
| `_404.md` / `en/_404.md`             | 404 page   | `notFoundPage: { ... }`          |

### Add a page

1. Create the Chinese page, for example `guide/faq.md`.
2. Create the matching English page `en/guide/faq.md`.
3. Add one line to each `_sidebar.md`:

   ```markdown
   - [FAQ](/guide/faq.md)
   ```

4. Visit `#/guide/faq` or `#/en/guide/faq`, or click the sidebar link.

### Heading levels

- `subMaxLevel: 3`: shows `##` and `###` headings in the sidebar;
- `maxLevel: 4`: the deepest heading level included in the table of contents.

### Navbar dropdowns

`_navbar.md` is a Markdown list. Put a nested list under an item to get a hover dropdown:

```markdown
- Translations
  - [简体中文](/)
  - [English](/en/)
```

- Docsify natively expands nested items on hover (`:hover`) and keyboard focus (`:focus-within`).
- Language links point to the language home page; the current page path is not preserved.
- The same pattern works for any other dropdown items.
- On small screens (≤ 640px) the top bar keeps only the last language menu; page links stay in the sidebar, so nothing collides with the GitHub corner.

## Chinese / English switching

### Directory layout

- Chinese: the site root `/` (default language)
- English: `/en/`

Each language needs its own `_sidebar.md`, `_coverpage.md`, and `_404.md`, plus an optional `_navbar.md`.

### Routes and aliases

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

- `alias` keys are treated as regular expressions (first match wins). They map deep-page navbar / sidebar requests to the language directory, avoiding layer-by-layer fallback requests; `(?!en/)` keeps English paths from being mapped to the root.
- `fallbackLanguages: ['en']` falls back from a missing `/en/foo` to `/foo` instead of showing a 404.
- `coverpage` values are relative to the current language directory (Docsify prepends the language path), so `_coverpage.md` is enough for `/en/`.
- `notFoundPage` values are relative to the site root, so the full path `en/_404.md` is required.

### Interface strings

Search, pagination, accessible links, and similar UI text are localized with “path → string” objects:

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
> Object key order matters: put `/en/` before `/`, otherwise English pages match the Chinese string first.

### Switch entry points

- **Bottom-right language button**: created by `_script/language-toggle.js`; it shows the current language (`中` / `EN`) and switches between `/` and `/en/`, sharing the `.app-control` style with the theme button.
- **Navbar → Translations**: declared in `_navbar.md`; Docsify’s native hover/focus dropdown.
- Language state is derived entirely from the URL and is not written to `localStorage`.
- The button only switches routes; it does not preserve the current page path.

### Add a third language

The button currently toggles only Chinese and English. To add a third language, copy `en/` to `ja/`, add the `/ja/` config and navbar entries, and adjust the toggle logic in `_script/language-toggle.js`.

## Full-text search

```js
search: {
  placeholder: {
    '/en/': 'Search',
    '/': '搜索',
  },
  paths: 'auto', // build the index from the sidebar
  depth: 2, // heading depth to index, 1-6
  pathNamespaces: ['/en'], // keep the Chinese and English indexes apart
}
```

The search index is cached in the browser's IndexedDB and expires after one day by default (`maxAge`). When several sites share a domain, use `namespace` to separate their indexes.

## Previous / next pagination

```js
pagination: {
  previousText: { '/en/': 'Previous', '/': '上一节' },
  nextText: { '/en/': 'Next', '/': '下一节' },
  crossChapter: true, // allow jumping across chapters
  crossChapterText: true, // show the chapter name
}
```

## Theme customization

Theme colors and fonts are controlled by CSS variables. Add a `<style>` block after the theme stylesheet in `<head>` in `index.html`:

```html
<style>
  :root {
    --theme-color: #e11d48;
    --font-family: 'Noto Sans SC', system-ui, sans-serif;
    --font-family-mono: 'JetBrains Mono', ui-monospace, monospace;
  }
</style>
```

See the [Docsify theme documentation](https://docsify.js.org/#/themes?id=theme-properties) for the full list of variables.

### Dark mode

The template supports both automatic and manual dark mode:

- follows the operating system by default (`prefers-color-scheme`);
- the circular button in the bottom-right corner toggles it manually and stores the choice in `localStorage`;
- double-click the button to forget the choice and follow the system again.

The core theme is always loaded; the dark styles are enabled or disabled through the `media` attribute on `<link id="theme-dark">`:

```html
<link
  id="theme-dark"
  rel="stylesheet"
  href="_style/docsify@5-themes-core-dark.min.css"
  media="(prefers-color-scheme: dark)"
/>
<script src="_script/theme-toggle.js"></script>
```

The language, theme, and QR buttons share the `.app-control` style; from bottom to top they are the QR, theme, and language buttons. To remove dark mode entirely, delete the `<link>`, `_script/theme-toggle.js`, and the button styles in `_style/custom.css`.

## WeChat QR code

The bottom-most floating button uses a generic QR icon and shares the `.app-control` style with the language and theme buttons. Hover, keyboard focus, or click opens a card with the QR code and caption; click the button to pin it open while scanning, and press `Esc` or click outside to close it.

Configure it in `index.html`:

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

- `enabled`: set to `false` to render neither the button nor the card.
- `qrcode`: QR image path, defaulting to `_media/wechat-qrcode.jpg`.
- `text`: a string or a path-keyed object; objects are matched against the current route with the longest key winning, and update automatically when the language changes.
- The button `aria-label` and image `alt` follow the interface language; the card uses theme variables, so it adapts to light and dark mode.

## Donation page

The QR codes on `donate.md` / `en/donate.md` are rendered by `_script/donate.js` and configured in `index.html`:

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

- `enabled: false`: hides that payment method; when both are hidden, the page shows “Donation options are not available right now.”.
- `qrcode`: replace it with a new payment QR image.
- `label`: optional, overrides the default “WeChat Pay / Alipay” title.
- The QR cards use theme variables, so they adapt to light and dark mode; clicking an image opens the original.

## Repository entry (GitHub-style corner)

- `repo: 'https://github.com/insseek/docsify-demo'` in `index.html` renders the GitHub-style corner in the top-right corner, linking to <https://github.com/insseek/docsify-demo>.
- For more entry points, add `[GitHub](https://github.com/insseek/docsify-demo)` to `_navbar.md`; external links open in a new tab by default (`externalLinkTarget`).
- To use your own repository, set `repo` to a full URL pointing at GitHub, GitLab, or any other host; set it to an empty string (`repo: ''`) to remove the corner.

## Upgrading Docsify

The official files in `_script/` and `_style/` come from the npm package `docsify@5.0.0`:

- runtime: `dist/docsify.min.js`
- search plugin: `dist/plugins/search.min.js`
- themes: `dist/themes/core.min.css`, `dist/themes/addons/core-dark.min.css`

`_script/language-toggle.js`, `_script/theme-toggle.js`, `_script/wechat.js`, and `_script/donate.js` are template scripts and do not need to be replaced when Docsify is upgraded. Download the matching version from [docsify on npm](https://www.npmjs.com/package/docsify) and overwrite the official files.
