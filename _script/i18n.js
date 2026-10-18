/**
 * Docsify v5 — 中英文切换（路由目录方案）
 *
 * 语言目录约定与 Docsify 官方文档一致：
 * - 简体中文：站点根目录 `/`
 * - English：`/en/` 目录
 *
 * 该脚本负责：
 * - 根据当前路由同步 `<html lang>`；
 * - 在右下角主题按钮上方渲染语言切换按钮（样式由 `.app-control` 统一提供）；
 * - 将顶部导航中的语言下拉菜单增强为可用键盘操作、并标记当前语言；
 * - 通过 `window.$docsifyI18n` 暴露语言判断与文案，供其他脚本复用。
 *
 * 路由方案的好处：每种语言拥有独立 URL，可直接分享、被搜索引擎索引；
 * 界面文案则通过 `index.html` 中按路径书写的配置（如 `search.placeholder`）本地化。
 */
(() => {
  'use strict';

  /** 语言注册表：`root` 必须是带首尾斜杠的站点绝对路径。 */
  const LANGUAGES = {
    zh: {
      code: 'zh-CN',
      label: '简体中文',
      short: '中',
      root: '/',
      switchLabel: '切换到英文 (English)',
    },
    en: {
      code: 'en',
      label: 'English',
      short: 'EN',
      root: '/en/',
      switchLabel: 'Switch to Chinese (简体中文)',
    },
  };

  /** 供 theme-toggle.js 等脚本复用的界面文案。 */
  const MESSAGES = {
    zh: {
      theme: {
        toggleLight: '切换到浅色模式（双击恢复跟随系统）',
        toggleDark: '切换到深色模式（双击恢复跟随系统）',
      },
      search: {
        clear: '清除搜索',
        shortcutSlash: '按 / 聚焦搜索',
        shortcutCtrl: '按 Control+K 聚焦搜索',
        results: '找到 {count} 条结果',
      },
      repository: {
        label: '查看源码仓库',
      },
    },
    en: {
      theme: {
        toggleLight: 'Switch to light mode (double-click to follow system)',
        toggleDark: 'Switch to dark mode (double-click to follow system)',
      },
      search: {
        clear: 'Clear search',
        shortcutSlash: 'Press / to search',
        shortcutCtrl: 'Press Control+K to search',
        results: 'Found {count} results',
      },
      repository: {
        label: 'View source repository',
      },
    },
  };

  /** 当前 routerMode；配置尚未就绪时按 hash 处理。 */
  function getRouterMode() {
    const config = window.$docsify;
    if (
      config &&
      typeof config === 'object' &&
      typeof config.routerMode === 'string'
    ) {
      return config.routerMode;
    }
    return 'hash';
  }

  /**
   * 把 URL / hash 片段规范化为以 `/` 开头的路径。
   * 仅保留路径本身，丢弃查询参数与锚点。
   */
  function normalizePath(value) {
    let path = value || '';
    if (path.startsWith('#')) {
      path = path.slice(1);
    }
    path = path.split('?')[0].split('#')[0];
    if (!path) {
      path = '/';
    }
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }
    return path.replace(/\/{2,}/g, '/');
  }

  /** 当前路由路径，例如 `/en/guide/start`。 */
  function getRoutePath() {
    const raw =
      getRouterMode() === 'history'
        ? window.location.pathname
        : window.location.hash;
    return normalizePath(raw);
  }

  /** 是否为英文路径：`/en`、`/en/` 或 `/en/...`。 */
  function isEnglishPath(path) {
    return path === '/en' || path.startsWith('/en/');
  }

  /** 判断路径所属语言，未知路径一律视为默认中文。 */
  function getLanguage(path = getRoutePath()) {
    return isEnglishPath(normalizePath(path)) ? 'en' : 'zh';
  }

  /** 去掉语言前缀，得到与语言无关的页面路径。 */
  function stripLanguage(path) {
    const normalized = normalizePath(path);
    if (!isEnglishPath(normalized)) {
      return normalized;
    }
    const rest = normalized.replace(/^\/en(?=\/|$)/, '');
    return rest.startsWith('/') ? rest : `/${rest}`;
  }

  /**
   * 计算同一页面在目标语言下的路径。
   * 例如当前 `/en/guide/start`，切到中文得到 `/guide/start`。
   */
  function pathForLanguage(lang, path = getRoutePath()) {
    const rest = stripLanguage(path);
    if (lang === 'zh') {
      return rest;
    }
    return rest === '/' ? LANGUAGES.en.root : `/en${rest}`;
  }

  /** 跳转；history 模式使用整页导航，hash 模式交给 Docsify 路由。 */
  function navigate(path) {
    if (getRouterMode() === 'history') {
      window.location.assign(path);
      return;
    }
    window.location.hash = `#${path}`;
  }

  /** 读取当前语言的文案；缺失时返回 `null`，便于调用方回退。 */
  function t(key) {
    const messages = MESSAGES[getLanguage()] || MESSAGES.zh;
    const value = key
      .split('.')
      .reduce(
        (current, part) =>
          current && typeof current === 'object' ? current[part] : undefined,
        messages,
      );
    return typeof value === 'string' ? value : null;
  }

  /** 同步 `<html lang>` 与便于 CSS 选中的 `data-lang`。 */
  function applyDocumentLanguage(lang) {
    document.documentElement.lang = LANGUAGES[lang].code;
    document.documentElement.dataset.lang = lang;
  }

  /** 复用页面中的悬浮控件容器；不存在时创建一个。 */
  function ensureControls() {
    let controls = document.getElementById('app-controls');
    if (!controls) {
      controls = document.createElement('div');
      controls.id = 'app-controls';
      controls.className = 'app-controls';
      document.body.appendChild(controls);
    }
    return controls;
  }

  const controls = ensureControls();

  const languageButton = document.createElement('button');
  languageButton.id = 'language-toggle';
  languageButton.type = 'button';
  languageButton.className = 'app-control';
  languageButton.textContent = LANGUAGES.zh.short;
  languageButton.addEventListener('click', () => {
    const target = getLanguage() === 'en' ? 'zh' : 'en';
    navigate(pathForLanguage(target));
  });
  controls.insertBefore(languageButton, controls.firstChild);

  /**
   * 更新语言按钮：圈内显示当前语言（中 / EN），
   * 与主题按钮“显示当前状态”的逻辑保持一致；提示文案描述点击后的目标语言。
   */
  function updateLanguageButton() {
    const meta = LANGUAGES[getLanguage()];
    languageButton.textContent = meta.short;
    languageButton.title = meta.switchLabel;
    languageButton.setAttribute('aria-label', meta.switchLabel);
    languageButton.dataset.lang = getLanguage();
  }

  const DROPDOWN_CLASS = 'nav-dropdown';
  const OPEN_CLASS = 'is-open';

  /** 关闭所有展开的语言下拉菜单。 */
  function closeDropdowns() {
    document
      .querySelectorAll(`.${DROPDOWN_CLASS}.${OPEN_CLASS}`)
      .forEach(item => {
        item.classList.remove(OPEN_CLASS);
        const toggle = item.querySelector('.nav-dropdown-toggle');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
  }

  /**
   * 把 Docsify 生成的纯文本二级菜单标题升级为可聚焦按钮：
   * 鼠标悬停、键盘聚焦或点击都能展开，Esc 关闭。
   */
  function decorateDropdown(item) {
    if (
      Array.from(item.children).some(child =>
        child.classList.contains('nav-dropdown-toggle'),
      )
    ) {
      return;
    }

    const submenu = Array.from(item.children).find(
      child => child.tagName === 'UL',
    );
    if (!submenu) {
      return;
    }

    // 标题既可能是裸文本节点，也可能被包在 <p> 中；统一取其文本。
    // 如果标题本身是链接或按钮，则保留 Docsify 的原生行为。
    const labelNodes = Array.from(item.childNodes).filter(
      node => node !== submenu,
    );
    const hasInteractiveLabel = labelNodes.some(
      node =>
        node.nodeType === 1 &&
        (node.tagName === 'A' || node.tagName === 'BUTTON'),
    );
    if (hasInteractiveLabel) {
      return;
    }

    const labelText = labelNodes
      .map(node => node.textContent)
      .join('')
      .trim();
    if (!labelText) {
      return;
    }

    labelNodes.forEach(node => node.remove());

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-dropdown-toggle';
    toggle.textContent = labelText;
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-expanded', 'false');

    const setExpanded = expanded => {
      item.classList.toggle(OPEN_CLASS, expanded);
      toggle.setAttribute('aria-expanded', String(expanded));
    };

    // 悬停、聚焦由 CSS 负责显示；这里只同步状态并支持触屏 / 键盘点击。
    toggle.addEventListener('click', () => setExpanded(true));
    item.addEventListener('mouseenter', () => setExpanded(true));
    item.addEventListener('mouseleave', () => setExpanded(false));
    item.addEventListener('focusin', () => setExpanded(true));
    item.addEventListener('focusout', event => {
      if (!item.contains(event.relatedTarget)) {
        setExpanded(false);
      }
    });
    item.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        setExpanded(false);
        toggle.blur();
      }
    });

    item.insertBefore(toggle, submenu);
  }

  /**
   * 将下拉菜单中的语言链接标记为当前语言，并把 href 改写为「当前页面」
   * 在目标语言下的地址，从而在切换语言时保留阅读位置。
   */
  function markActiveLanguage(nav) {
    const current = getLanguage();
    const roots = [LANGUAGES.zh.root, LANGUAGES.en.root];
    const hrefPrefix = getRouterMode() === 'history' ? '' : '#';

    nav.querySelectorAll(`.${DROPDOWN_CLASS} li > a`).forEach(link => {
      // 首次识别语言后写入 data-lang；后续渲染直接复用，
      // 避免 href 被改写后无法再判断它原本指向哪种语言。
      let lang = link.dataset.lang;

      if (!lang) {
        let targetPath;
        try {
          const url = new URL(
            link.getAttribute('href') || '',
            window.location.href,
          );
          targetPath = normalizePath(
            url.hash ? url.hash.slice(1) : url.pathname,
          );
        } catch (error) {
          return;
        }
        if (!roots.includes(targetPath)) {
          return;
        }
        lang = getLanguage(targetPath);
        link.dataset.lang = lang;
      }

      if (!LANGUAGES[lang]) {
        return;
      }

      const active = lang === current;
      const destination = pathForLanguage(lang);
      link.setAttribute('href', `${hrefPrefix}${destination}`);

      const item = link.closest('li');
      if (item) {
        item.classList.toggle('active', active);
      }
      if (active) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  /** 在每次 Docsify 渲染后增强导航下拉菜单。 */
  function decorateNavbar() {
    // `mergeNavbar` 会把顶部导航复制到侧边栏（.app-nav-merged），二者都要处理。
    document.querySelectorAll('.app-nav, .app-nav-merged').forEach(nav => {
      const isTopNav = nav.classList.contains('app-nav');

      nav.querySelectorAll('li').forEach(item => {
        const submenu = Array.from(item.children).find(
          child => child.tagName === 'UL',
        );
        if (!submenu) {
          return;
        }
        item.classList.add(DROPDOWN_CLASS);
        // 侧边栏中的合并导航直接展开子项，不需要下拉按钮。
        if (isTopNav) {
          decorateDropdown(item);
        }
      });

      markActiveLanguage(nav);
    });
  }

  let lastLanguage = null;
  let searchStatusObserver = null;

  /** 把搜索结果数量文案替换为当前语言；插件内置的是英文。 */
  function localizeSearchStatus() {
    const status = document.querySelector('.search .results-status');
    if (!status) {
      return;
    }

    const text = status.textContent.trim();
    const english = text.match(/^Found (\d+) results?$/i);
    const chinese = text.match(/^找到 (\d+) 条结果$/);
    const template = t('search.results');
    if (!template) {
      return;
    }

    if (getLanguage() === 'zh' && english) {
      status.textContent = template.replace('{count}', english[1]);
    } else if (getLanguage() === 'en' && chinese) {
      status.textContent = template.replace('{count}', chinese[1]);
    }
  }

  /**
   * 搜索插件还会写入英文的清除按钮与快捷键提示；
   * 这里统一本地化，并监听结果数量文案的变化。
   */
  function localizeSearchUi() {
    const search = document.querySelector('.search');
    if (!search) {
      return;
    }

    if (!search.dataset.i18nObserved) {
      const status = search.querySelector('.results-status');
      if (status) {
        search.dataset.i18nObserved = 'true';
        if (searchStatusObserver) {
          searchStatusObserver.disconnect();
        }
        searchStatusObserver = new MutationObserver(localizeSearchStatus);
        searchStatusObserver.observe(status, {
          childList: true,
          characterData: true,
          subtree: true,
        });
      }
    }

    const clearButton = search.querySelector('.clear-button');
    const clearLabel = t('search.clear');
    if (clearButton && clearLabel) {
      clearButton.title = clearLabel;
      const hidden = clearButton.querySelector('.visually-hidden');
      if (hidden) {
        hidden.textContent = clearLabel;
      }
    }

    const shortcuts = [t('search.shortcutSlash'), t('search.shortcutCtrl')];
    search.querySelectorAll('.kbd-group kbd').forEach((kbd, index) => {
      if (shortcuts[index]) {
        kbd.title = shortcuts[index];
      }
    });

    localizeSearchStatus();
  }

  /**
   * 仓库角标由 Docsify 注入（GitHub 风格图标），
   * 其 aria-label / title 需要跟随语言；链接本身可指向任意仓库地址。
   */
  function localizeRepositoryLink() {
    const corner = document.querySelector('.github-corner');
    if (!corner) {
      return;
    }
    const label = t('repository.label');
    if (label) {
      corner.setAttribute('aria-label', label);
      corner.title = label;
    }
  }

  /** 统一刷新语言相关的 DOM 状态，并在语言变化时广播事件。 */
  function sync() {
    const lang = getLanguage();
    applyDocumentLanguage(lang);
    updateLanguageButton();
    decorateNavbar();
    localizeSearchUi();
    localizeRepositoryLink();

    if (lang !== lastLanguage) {
      lastLanguage = lang;
      document.dispatchEvent(
        new CustomEvent('docsify:i18n:change', { detail: { lang } }),
      );
    }
  }

  // 点击下拉菜单以外区域时收起菜单。
  document.addEventListener('click', event => {
    if (!event.target.closest(`.${DROPDOWN_CLASS}`)) {
      closeDropdowns();
    }
  });

  /**
   * 以 Docsify 插件的形式在每次页面渲染后刷新。
   * 本脚本在 Docsify 初始化（DOMContentLoaded）之前加载，因此可以安全地追加插件。
   */
  const docsify = (window.$docsify = window.$docsify || {});
  docsify.plugins = (docsify.plugins || []).concat([
    hook => {
      hook.doneEach(() => sync());
    },
  ]);

  // 对其他脚本公开的最小 API。
  window.$docsifyI18n = {
    languages: LANGUAGES,
    get language() {
      return getLanguage();
    },
    get languageMeta() {
      return LANGUAGES[getLanguage()];
    },
    get path() {
      return getRoutePath();
    },
    t,
    pathForLanguage,
    switchTo(lang) {
      if (LANGUAGES[lang]) {
        navigate(pathForLanguage(lang));
      }
    },
    refresh: sync,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sync);
  } else {
    sync();
  }
})();
