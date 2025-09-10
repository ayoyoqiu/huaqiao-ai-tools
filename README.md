# 花桥小智 · AI 工具导航

一个简洁现代的 AI 工具导航与文章展示站点（纯静态）。

## 目录结构

```
├── index.html                # 入口页（动态加载 src/pages/index.html）
├── src/
│   ├── pages/                # 页面片段与文章（HTML）
│   │   ├── index.html        # 主页面主体内容（无 <head>）
│   │   ├── article-*.html    # 文章详情页（完整 HTML）
│   ├── styles/               # 样式
│   │   └── style.css
│   ├── scripts/              # 脚本
│   │   └── script.js
│   └── config/               # 配置
│       └── article-config.js
├── public/
│   ├── images/               # 公共图片（可选）
│   └── icons/                # 图标（可选）
├── docs/
│   └── 需求文档.md
└── README.md
```

## 本地启动

使用系统自带 Python 启动静态服务器：

```bash
python3 -m http.server 8000
```

访问：

- 主页：`http://localhost:8000/`
- 文章页示例：
  - `http://localhost:8000/src/pages/article-nano-banana.html`
  - `http://localhost:8000/src/pages/article-descript-growth.html`
  - `http://localhost:8000/src/pages/article-cc-product.html`

## 开发说明

- 入口 `index.html` 会 fetch `src/pages/index.html` 并注入到 `#app` 容器。
- 样式、脚本分别从 `src/styles/` 与 `src/scripts/` 引入。
- 文章页为完整 HTML，可直接在浏览器中打开或通过服务器访问。


