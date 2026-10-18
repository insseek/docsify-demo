/**
 * Docsify v5 — 右下角微信二维码
 *
 * 读取 `window.$docsify.wechat`：
 * - `enabled: false`：完全不渲染按钮（默认显示）
 * - `qrcode`：二维码图片地址，默认 `_media/wechat-qrcode.jpg`
 * - `text`：展示文案，字符串或「路径 → 文案」对象，后者按当前路由自动匹配
 *
 * 交互与顶部语言菜单一致：悬停、键盘聚焦或点击展开；Esc 或点击外部关闭。
 * 按钮位于右下角悬浮控件的最下方，样式与语言 / 主题按钮统一。
 */
(() => {
  'use strict';

  const config = window.$docsify && window.$docsify.wechat;
  if (!config || config.enabled === false) {
    return;
  }

  const DEFAULT_TEXT = '微信扫码　关注「里探」';
  const DEFAULT_QRCODE = '_media/wechat-qrcode.jpg';
  const QRCODE =
    typeof config.qrcode === 'string' && config.qrcode
      ? config.qrcode
      : DEFAULT_QRCODE;

  const MESSAGES = {
    zh: {
      button: '微信二维码',
      alt: '「里探」微信二维码',
    },
    en: {
      button: 'WeChat QR code',
      alt: 'WeChat QR code for 「里探」',
    },
  };

  const QR_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect width="5" height="5" x="3" y="3" rx="1"></rect>' +
    '<rect width="5" height="5" x="16" y="3" rx="1"></rect>' +
    '<rect width="5" height="5" x="3" y="16" rx="1"></rect>' +
    '<path d="M21 16h-3a2 2 0 0 0-2 2v3"></path>' +
    '<path d="M21 21v.01"></path>' +
    '<path d="M12 7v3a2 2 0 0 1-2 2H7"></path>' +
    '<path d="M3 12h.01"></path>' +
    '<path d="M12 3h.01"></path>' +
    '<path d="M12 16v.01"></path>' +
    '<path d="M16 12h1"></path>' +
    '<path d="M21 12v.01"></path>' +
    '<path d="M12 21v-1"></path>' +
    '</svg>';

  /** 当前路由路径。 */
  function currentPath() {
    const hash = window.location.hash.replace(/^#/, '');
    return hash.split('?')[0] || '/';
  }

  /** 当前语言：按 /en/ 前缀判断。 */
  function currentLanguage() {
    return /^\/en(\/|$)/.test(currentPath()) ? 'en' : 'zh';
  }

  function message(key) {
    return (MESSAGES[currentLanguage()] || MESSAGES.zh)[key];
  }

  /**
   * 解析卡片文案：字符串直接使用；对象按当前路径匹配，
   * 同时命中多个 key 时取最长的一个，避免 `/` 抢先匹配 `/en/`。
   */
  function resolveText() {
    const { text } = config;
    if (typeof text === 'string' && text) {
      return text;
    }
    if (text && typeof text === 'object') {
      const route = currentPath();
      // 兼容 `/en` 这类无尾斜杠路径，保证仍能命中 `/en/`。
      const path = route.endsWith('/') ? route : `${route}/`;
      const key = Object.keys(text)
        .filter(item => path.indexOf(item) > -1)
        .sort((a, b) => b.length - a.length)[0];
      if (key) {
        return text[key];
      }
    }
    return currentLanguage() === 'zh'
      ? DEFAULT_TEXT
      : 'Scan with WeChat to follow 「里探」';
  }

  // 避免重复插入（例如脚本被引入两次）。
  if (document.getElementById('wechat-toggle')) {
    return;
  }

  const controls = document.getElementById('app-controls');
  if (!controls) {
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'wechat-control';

  const button = document.createElement('button');
  button.id = 'wechat-toggle';
  button.type = 'button';
  button.className = 'app-control';
  button.innerHTML = QR_ICON;
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'wechat-panel');

  const panel = document.createElement('div');
  panel.id = 'wechat-panel';
  panel.className = 'wechat-panel';
  panel.setAttribute('aria-hidden', 'true');

  const image = document.createElement('img');
  image.className = 'wechat-qrcode';
  image.src = QRCODE;
  image.width = 430;
  image.height = 430;
  image.decoding = 'async';

  const text = document.createElement('p');
  text.className = 'wechat-text';

  panel.append(image, text);
  wrapper.append(button, panel);
  controls.appendChild(wrapper);

  let pinned = false;

  /** 同步展开状态（CSS 负责显示，JS 负责 aria 与触屏 / 键盘状态）。 */
  function setOpen(open) {
    wrapper.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    panel.setAttribute('aria-hidden', String(!open));
  }

  /** 跟随语言 / 路由刷新按钮与卡片文案。 */
  function update() {
    const label = message('button');
    button.setAttribute('aria-label', label);
    image.alt = message('alt');
    text.textContent = resolveText();
    text.hidden = !text.textContent;
  }

  // 悬停 / 聚焦临时展开；点击按钮固定展开，方便扫码时移开鼠标。
  button.addEventListener('click', () => {
    pinned = !pinned;
    setOpen(pinned);
  });
  wrapper.addEventListener('mouseenter', () => setOpen(true));
  wrapper.addEventListener('mouseleave', () => {
    if (!pinned) {
      setOpen(false);
    }
  });
  wrapper.addEventListener('focusin', () => setOpen(true));
  wrapper.addEventListener('focusout', event => {
    if (!pinned && !wrapper.contains(event.relatedTarget)) {
      setOpen(false);
    }
  });
  // Esc 在任意焦点位置都能收起，且不改变当前焦点。
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && wrapper.classList.contains('is-open')) {
      pinned = false;
      setOpen(false);
    }
  });

  // 点击二维码卡片以外的区域时收起。
  document.addEventListener('click', event => {
    if (!wrapper.contains(event.target)) {
      pinned = false;
      setOpen(false);
    }
  });

  const docsify = (window.$docsify = window.$docsify || {});
  docsify.plugins = (docsify.plugins || []).concat([
    hook => {
      hook.doneEach(() => {
        update();
        pinned = false;
        setOpen(false);
      });
    },
  ]);

  update();
})();
