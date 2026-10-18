# Docsify v5 Demo

> A reusable Docsify v5 starter template: no build step — write Markdown and publish, with Chinese / English switching built in.

## What is this

- **Docsify 5.0.0** renders Markdown into a website at runtime; there is no static HTML generation step.
- **Bilingual by design**: Chinese lives at the site root, English under `en/`. Switch from the _Translations_ menu in the navbar or the language button in the bottom-right corner; both go to the selected language’s home page.
- **Core theme**: the official v5 core theme. Dark mode follows the system by default and can be toggled manually; your choice is remembered.
- **Batteries included**: cover page, sidebar, navbar, full-text search, previous / next pagination, and a localized 404 page.
- **WeChat QR code**: a bottom-right QR button opens a card for the 「里探」 official account on hover, focus, or click; disable it via the `wechat` config.
- **Donation page**: supports WeChat Pay and Alipay QR codes, each of which can be shown or hidden via the `donate` config.
- **Local assets**: `_script/` and `_style/` contain every runtime file, so the site also works offline without a CDN.
- **Repository entry**: the GitHub-style corner links to <https://github.com/insseek/docsify-demo>; `repo` accepts any repository URL.

## Project structure

```text
docsify-demo/
├── index.html                 # Entry point: site config and script tags
├── README.md                  # Homepage (Chinese, default language)
├── _coverpage.md              # Cover page (Chinese)
├── _sidebar.md                # Sidebar (Chinese)
├── _navbar.md                 # Navbar (Chinese)
├── _404.md                    # 404 page (Chinese)
├── .editorconfig              # Editor formatting rules
├── .markdownlint.json         # Markdown lint config
├── .nojekyll                  # Keep underscore folders on GitHub Pages
├── .prettierignore            # Skip minified third-party assets
├── .prettierrc.json           # Prettier config (same as the official repo)
├── _media/
│   ├── alipay-donate.jpg      # Alipay QR code (donation page)
│   ├── alipay-donate-small.jpg # Alipay QR thumbnail (README)
│   ├── favicon.svg            # Site icon (replace as needed)
│   ├── wechat-donate.png      # WeChat Pay QR code (donation page)
│   ├── wechat-donate-small.png # WeChat QR thumbnail (README)
│   └── wechat-qrcode.jpg      # WeChat official-account QR code
├── _script/
│   ├── docsify@5.min.js            # Docsify 5.0.0
│   ├── docsify-search@5.min.js     # Full-text search plugin
│   ├── docsify-pagination@2.10.1.min.js  # Previous / next plugin
│   ├── donate.js                   # Donation QR rendering
│   ├── language-toggle.js          # Chinese / English route toggle
│   ├── theme-toggle.js             # Dark mode toggle
│   └── wechat.js                   # WeChat QR code
├── _style/
│   ├── docsify@5-themes-core.min.css      # Core theme
│   ├── docsify@5-themes-core-dark.min.css # Dark mode add-on
│   └── custom.css                  # Floating controls, navbar dropdown, QR card
├── guide/
│   ├── start.md               # Configuration guide
│   └── markdown.md            # Markdown examples
├── about.md                   # About
├── donate.md                  # Donate (WeChat Pay QR code)
└── en/                        # English docs (same structure as the root)
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

## Preview locally

Run one of the following commands in the project root, then open <http://localhost:3000>:

```bash
# Official CLI (installed globally: npm i -g docsify-cli)
docsify serve .

# Not installed globally? Run the same CLI through npx, with no install
npx docsify-cli serve .

# Or a zero-dependency static server (no live reload)
python3 -m http.server 3000
```

Notes:

- `docsify serve` uses port 3000 by default, so `--port 3000` can be omitted;
- `docsify-cli` 5.x requires Node.js >= 20.11 and ships with live reload, so Markdown edits refresh the page automatically;
- All assets are local, so any static server works. The Python option is handy when Node.js is unavailable.

> Opening `index.html` directly with `file://` does not work: Docsify needs HTTP to fetch Markdown files.

## Start your project

1. Copy this directory (or `git init` it as the root of a new repository).
2. Update `name`, `repo`, `<title>`, and `<meta name="description">` in `index.html`.
3. Edit the Chinese files at the root and their English counterparts under `en/`.
4. Add a page: create the Markdown file for both languages, then add a link to each `_sidebar.md`.

See the [configuration guide](/en/guide/start.md) for every option, and the [Markdown examples](/en/guide/markdown.md) for syntax.

## Chinese / English switching

Two entry points:

- **Navbar → Translations**: Docsify’s native hover/focus dropdown; select 简体中文 or English.
- **Bottom-right language button**: shows the current language (`中` / `EN`) and switches between `/` and `/en/`; it shares the `.app-control` style with the theme button.

How it works:

- Chinese pages live at the site root, English pages under `/en/`.
- `alias` in `index.html` lets deep pages reuse the `_navbar.md` / `_sidebar.md` of their language, avoiding redundant fallback requests.
- `fallbackLanguages: ['en']` makes a missing English page fall back to the Chinese version.
- Interface strings are localized with path-keyed config values: `search.placeholder`, `search.noData`, `pagination.*`, `skipLink`, `coverpage`, `notFoundPage`, and `nameLink`.
- `_script/language-toggle.js` only handles the button, route switching, and `<html lang>`; it does not preserve the current page path.
- On small screens (≤ 640px) the top bar keeps only the last Translations menu; page navigation stays in the sidebar.

To add more languages, copy `en/` and add the corresponding `/xx/` config; the current button only toggles between Chinese and English, so more languages require adjusting the button logic.

## Dark mode

Dark mode follows the operating system by default. The circular button in the bottom-right corner toggles it manually, and the choice is stored in `localStorage` (key `docsify-theme`) so it survives a refresh. **Double-click** the button to forget the choice and follow the system again.

The core theme is always loaded; the dark add-on is enabled or disabled through the `media` attribute on `<link id="theme-dark">` (`all` enables it, `not all` disables it). `_script/theme-toggle.js` owns the button state and persistence.

## WeChat QR code

The bottom-most floating button opens a WeChat card on hover, keyboard focus, or click. It shows the 「里探」 official-account QR code and caption; click the button to pin it open while scanning, and press `Esc` or click outside to close it.

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

- `enabled: false` hides the button and card; `text` accepts a string or a path-keyed object, where the longest matching key wins.
- `qrcode` is the QR image path — replace it with your own image.
- The caption updates when the language changes, and the button `aria-label` / image `alt` are localized too.
- The card background, border, and caption color use theme variables, so it adapts to light and dark mode.

## Repository entry (GitHub-style corner)

`repo: 'https://github.com/insseek/docsify-demo'` in `index.html` renders the repository corner in the top-right corner. `repo` is a **full URL**, so it can point to GitHub, GitLab, or any other code host; the icon stays GitHub-style. Set `repo: ''` to hide the entry entirely. Docsify also accepts a `username/repo` shorthand (which defaults to GitHub), but prefer a full URL for other hosts.

## Donate

If you find Docsify Demo useful, or my work valuable, you are welcome to buy me a coffee ☕.

|                              WeChat Pay                               |                              Alipay                               |
| :-------------------------------------------------------------------: | :---------------------------------------------------------------: |
| [![WeChat Pay QR code](../_media/wechat-donate-small.png)](donate.md) | [![Alipay QR code](../_media/alipay-donate-small.jpg)](donate.md) |

Each method can be toggled in the `donate` config in `index.html`:

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

Set `enabled` to `false` to hide that method.

## Deploy

This is a fully static site: publish the whole directory to any static host.

- **GitHub Pages**: push the repository, then choose the branch root under Settings → Pages. `.nojekyll` is included so Jekyll does not ignore underscore folders such as `_script/` and `_style/`.
- **Vercel / Netlify / Cloudflare Pages**: leave the build command empty and set the output directory to `.` (the repository root).
- **Your own server**: upload the directory and serve it with Nginx, Caddy, or any static file server.

## Common customizations

| Goal                        | How                                                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Change the theme color      | Add `<style>:root{--theme-color:#e11d48;}</style>` inside `<head>` in `index.html`                                            |
| Change fonts                | Set the `--font-family` and `--font-family-mono` theme variables                                                              |
| Dark mode                   | Bottom-right button; double-click it to follow the system again                                                               |
| Repository entry            | Update `repo` in `index.html` (full URL; empty hides the corner)                                                              |
| Add a language              | Copy `en/`, translate it, and add the matching path keys in `index.html`                                                      |
| Disable language switching  | Remove the `_script/language-toggle.js` `<script>`, `en/`, the Translations menu entry, and the `/en/` config in `index.html` |
| Disable dark mode           | Remove the dark stylesheet `<link>`, `_script/theme-toggle.js`, and `_style/custom.css`                                       |
| Disable the WeChat QR code  | Set `wechat.enabled` to `false` in `index.html`, or remove `_script/wechat.js`                                                |
| Restore the v4 look         | Load the official Vue add-on theme `dist/themes/addons/vue.min.css` (download it to `_style/`)                                |
| Disable search / pagination | Remove the corresponding `<script>` and the matching `$docsify` option                                                        |
| Use a CDN                   | Replace the `_script/` / `_style/` references with `https://cdn.jsdelivr.net/npm/docsify@5/...`                               |

## Code and documentation conventions

- `.editorconfig` and `.prettierrc.json` mirror the official docsify repository: UTF-8, LF, 2-space indentation, single quotes.
- Markdown follows the same structure as the official docs: one H1 per page, language-tagged fenced code blocks, and `<!-- markdownlint-disable first-line-h1 -->` in navigation files such as `_navbar.md` and `_sidebar.md`.
- JavaScript is dependency-free and build-free: `const` / `let` only, JSDoc-style file headers, and defensive handling for unavailable `localStorage`.
- Prettier and markdownlint configs are included; verify with `npx prettier . --check` and `npx markdownlint-cli2 "**/*.md"`.

---

Powered by [Docsify](https://docsify.js.org) · [GitHub repository](https://github.com/insseek/docsify-demo) · MIT License.
