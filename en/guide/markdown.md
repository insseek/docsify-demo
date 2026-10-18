# Markdown examples

Docsify writes content in Markdown. These are the most common syntaxes — copy and adapt them.

## Headings

```markdown
# Heading 1

## Heading 2

### Heading 3
```

## Text styles

**Bold**, _italic_, ~~strikethrough~~, `inline code`, and a [Docsify](https://docsify.js.org).

## Lists

Unordered list:

- First item
- Second item
  - Nested item

Ordered list:

1. First step
2. Second step

Task list:

- [x] Done
- [ ] To do

## Tables

| Option        | Description  | Default |
| ------------- | ------------ | :-----: |
| `loadSidebar` | Sidebar file | `false` |
| `coverpage`   | Cover page   | `false` |

## Quotes and callouts

> This is a blockquote.

Below are GitHub-style callouts:

> [!NOTE]
> This is a note callout.

And here is a TIP callout:

> [!TIP]
> v5 supports GitHub-style callouts.

## Code blocks

```js
window.$docsify = {
  name: 'My Docs',
  loadSidebar: true,
};
```

```bash
python3 -m http.server 3000
```

## Images

![Site icon](/_media/favicon.svg)

## Horizontal rule

---

These syntaxes cover most documentation needs.
