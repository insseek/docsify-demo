/**
 * Docsify Starter — 深色 / 浅色模式切换
 *
 * - 默认跟随系统（prefers-color-scheme）
 * - 点击按钮切换，并把选择记在 localStorage，刷新后保持
 * - 双击按钮：清除记忆，恢复跟随系统
 *
 * 原理：核心主题始终加载，深色附加样式通过 `<link id="theme-dark">` 的
 * media 属性控制 —— `all` 表示启用，`not all` 表示禁用。
 */
(() => {
  'use strict';

  const STORAGE_KEY = 'docsify-theme';
  const LABELS = {
    light: '切换到浅色模式（双击恢复跟随系统）',
    dark: '切换到深色模式（双击恢复跟随系统）',
  };
  const ICONS = {
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

  const darkSheet = document.getElementById('theme-dark');
  if (!darkSheet) {
    return;
  }

  const media = window.matchMedia('(prefers-color-scheme: dark)');

  /** 读取用户手动选择；未选择或不可用时返回 null。 */
  function readChoice() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch (error) {
      return null;
    }
  }

  /** 写入用户选择；`null` 表示清除记忆、恢复跟随系统。 */
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

  /** 当前实际生效的主题。 */
  function effectiveTheme() {
    return readChoice() || (media.matches ? 'dark' : 'light');
  }

  /** 应用主题：只改变外观，不写入记忆。 */
  function paint(theme) {
    document.documentElement.dataset.theme = theme;
    darkSheet.media = theme === 'dark' ? 'all' : 'not all';
  }

  const button = document.createElement('button');
  button.id = 'theme-toggle';
  button.type = 'button';
  button.className = 'app-control';

  function updateButton() {
    const isDark = effectiveTheme() === 'dark';
    const label = LABELS[isDark ? 'light' : 'dark'];
    button.innerHTML = isDark ? ICONS.dark : ICONS.light;
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-pressed', String(isDark));
    button.title = label;
  }

  button.addEventListener('click', () => {
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    writeChoice(next);
    paint(next);
    updateButton();
  });

  button.addEventListener('dblclick', () => {
    writeChoice(null);
    paint(media.matches ? 'dark' : 'light');
    updateButton();
  });

  // 未手动选择时，跟随系统变化。
  media.addEventListener('change', () => {
    if (!readChoice()) {
      paint(media.matches ? 'dark' : 'light');
    }
    updateButton();
  });

  // 与页面中的悬浮控件容器共用位置；单独使用时也能创建它。
  let controls = document.getElementById('app-controls');
  if (!controls) {
    controls = document.createElement('div');
    controls.id = 'app-controls';
    controls.className = 'app-controls';
    document.body.appendChild(controls);
  }
  controls.appendChild(button);

  paint(effectiveTheme());
  updateButton();
})();
