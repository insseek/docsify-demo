/**
 * 深色 / 浅色模式切换
 *
 * - 默认跟随系统（prefers-color-scheme）
 * - 点击按钮切换，并把选择记在 localStorage，刷新后保持
 * - 双击按钮：清除记忆，恢复跟随系统
 *
 * 原理：核心主题始终加载，深色附加样式通过 <link id="theme-dark"> 的
 * media 属性控制 —— `all` 表示启用，`not all` 表示禁用。
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'docsify-theme';
  var darkSheet = document.getElementById('theme-dark');
  if (!darkSheet) {
    return;
  }

  var media = window.matchMedia('(prefers-color-scheme: dark)');

  var ICONS = {
    light:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="4"></circle>' +
      '<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>' +
      '</svg>',
    dark:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>' +
      '</svg>',
  };

  function readChoice() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch (error) {
      return null;
    }
  }

  function writeChoice(value) {
    try {
      if (value) {
        localStorage.setItem(STORAGE_KEY, value);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      /* 隐私模式下 localStorage 可能不可用，忽略即可 */
    }
  }

  /** 当前实际生效的主题 */
  function effectiveTheme() {
    return readChoice() || (media.matches ? 'dark' : 'light');
  }

  /** 应用主题：paint 只改变外观，不写入记忆 */
  function paint(theme) {
    document.documentElement.dataset.theme = theme;
    darkSheet.media = theme === 'dark' ? 'all' : 'not all';
  }

  var button = document.createElement('button');
  button.id = 'theme-toggle';
  button.type = 'button';

  function updateButton() {
    var isDark = effectiveTheme() === 'dark';
    var label = isDark ? '切换到浅色模式' : '切换到深色模式';
    button.innerHTML = isDark ? ICONS.dark : ICONS.light;
    button.setAttribute('aria-label', label + '（双击恢复跟随系统）');
    button.setAttribute('aria-pressed', String(isDark));
    button.title = label + '（双击恢复跟随系统）';
  }

  button.addEventListener('click', function () {
    var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    writeChoice(next);
    paint(next);
    updateButton();
  });

  button.addEventListener('dblclick', function () {
    writeChoice(null);
    paint(media.matches ? 'dark' : 'light');
    updateButton();
  });

  // 未手动选择时，跟随系统变化
  media.addEventListener('change', function () {
    if (!readChoice()) {
      paint(media.matches ? 'dark' : 'light');
    }
    updateButton();
  });

  document.body.appendChild(button);
  paint(effectiveTheme());
  updateButton();
})();
