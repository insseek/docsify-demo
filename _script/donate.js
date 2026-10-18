/**
 * Docsify v5 — 捐赠二维码（微信支付 / 支付宝）
 *
 * 读取 `window.$docsify.donate`：
 * - `wechat` / `alipay`：每种方式可设 `enabled: false` 隐藏
 * - `qrcode`：收款二维码图片地址
 * - `label`：可选，覆盖默认标题
 *
 * 页面中的 `<div id="donate-options"></div>` 会按配置渲染对应二维码；
 * 全部隐藏时显示“暂未开放捐赠方式”。
 */
(() => {
  'use strict';

  const config = window.$docsify && window.$docsify.donate;
  if (!config) {
    return;
  }

  const MESSAGES = {
    zh: {
      wechat: '微信支付',
      alipay: '支付宝',
      alt: '收款二维码',
      empty: '暂未开放捐赠方式。',
    },
    en: {
      wechat: 'WeChat Pay',
      alipay: 'Alipay',
      alt: 'donation QR code',
      empty: 'Donation options are not available right now.',
    },
  };

  const METHODS = [
    { key: 'wechat', fallbackQrcode: '_media/wechat-donate.png' },
    { key: 'alipay', fallbackQrcode: '_media/alipay-donate.jpg' },
  ];

  /** 当前语言；优先复用 i18n 的判断。 */
  function currentLanguage() {
    const i18n = window.$docsifyI18n;
    if (i18n) {
      return i18n.language;
    }
    return /^\/en(\/|$)/.test(window.location.hash.replace(/^#/, ''))
      ? 'en'
      : 'zh';
  }

  function message(key) {
    return (MESSAGES[currentLanguage()] || MESSAGES.zh)[key];
  }

  /** 把 `true`、`{ enabled, qrcode, label }` 统一成配置对象。 */
  function normalizeMethod(raw) {
    if (raw === false || raw === null || raw === undefined) {
      return null;
    }
    if (raw === true) {
      return {};
    }
    return typeof raw === 'object' ? raw : null;
  }

  /** 渲染捐赠方式；仅在当前页面存在容器时执行。 */
  function render() {
    const container = document.getElementById('donate-options');
    if (!container) {
      return;
    }

    container.textContent = '';

    const methods = METHODS.map(({ key, fallbackQrcode }) => {
      const method = normalizeMethod(config[key]);
      if (!method || method.enabled === false) {
        return null;
      }
      return {
        key,
        qrcode:
          typeof method.qrcode === 'string' && method.qrcode
            ? method.qrcode
            : fallbackQrcode,
        label:
          typeof method.label === 'string' && method.label
            ? method.label
            : message(key),
      };
    }).filter(Boolean);

    if (!methods.length) {
      const empty = document.createElement('p');
      empty.className = 'donate-empty';
      empty.textContent = message('empty');
      container.appendChild(empty);
      return;
    }

    methods.forEach(method => {
      const figure = document.createElement('figure');
      figure.className = 'donate-option';

      const title = document.createElement('figcaption');
      title.className = 'donate-option-title';
      title.textContent = method.label;

      const link = document.createElement('a');
      link.className = 'donate-option-link';
      link.href = method.qrcode;
      link.target = '_blank';
      link.rel = 'noopener';

      const image = document.createElement('img');
      image.src = method.qrcode;
      image.alt = `${method.label} ${message('alt')}`;
      image.loading = 'lazy';
      image.decoding = 'async';

      link.appendChild(image);
      figure.append(title, link);
      container.appendChild(figure);
    });
  }

  const docsify = (window.$docsify = window.$docsify || {});
  docsify.plugins = (docsify.plugins || []).concat([
    hook => {
      hook.doneEach(() => render());
    },
  ]);

  document.addEventListener('docsify:i18n:change', render);
})();
