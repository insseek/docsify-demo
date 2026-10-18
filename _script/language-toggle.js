/**
 * 中英文切换：右下角「中 / EN」按钮。
 *
 * 点击在 `/` 与 `/en/` 之间切换路由，Docsify 会自动加载对应目录的内容。
 * 不做路径保持、文案注入等额外逻辑。
 */
(() => {
  'use strict';

  const isEnglish = () => /^#\/en(?:\/|\?|$)/.test(window.location.hash);

  const controls = document.getElementById('app-controls');
  if (!controls) {
    return;
  }

  const button = document.createElement('button');
  button.id = 'language-toggle';
  button.type = 'button';
  button.className = 'app-control';

  function update() {
    const english = isEnglish();
    button.textContent = english ? 'EN' : '中';
    button.title = english ? 'Switch to Chinese' : '切换到英文';
    button.setAttribute('aria-label', button.title);
    document.documentElement.lang = english ? 'en' : 'zh-CN';
  }

  button.addEventListener('click', () => {
    window.location.hash = isEnglish() ? '#/' : '#/en/';
    update();
  });

  window.addEventListener('hashchange', update);
  controls.insertBefore(button, controls.firstChild);
  update();
})();
