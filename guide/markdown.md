# Markdown 示例

Docsify 使用 Markdown 编写内容，下面列出常用语法，可直接复制修改。

## 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
```

## 文本样式

**加粗**、*斜体*、~~删除线~~、`行内代码`，以及 [链接](https://docsify.js.org)。

## 列表

无序列表：

- 第一项
- 第二项
  - 嵌套项

有序列表：

1. 第一步
2. 第二步

任务列表：

- [x] 已完成
- [ ] 待完成

## 表格

| 名称 | 说明 | 默认值 |
| --- | --- | :---: |
| `loadSidebar` | 侧边栏文件 | `false` |
| `coverpage` | 封面页 | `false` |

## 引用与提示框

> 这是一段引用。

> [!NOTE]
> 这是一条提示（NOTE callout）。

> [!TIP]
> 这是 TIP 提示框，v5 支持 GitHub 风格 callout。

## 代码块

```js
window.$docsify = {
  name: 'My Docs',
  loadSidebar: true,
}
```

```bash
python3 -m http.server 3000
```

## 图片

![站点图标](../_media/favicon.svg)

## 分隔线

---

以上语法足以覆盖绝大多数文档场景。
