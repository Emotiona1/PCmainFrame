# PC Chat Web

一个轻量的 React + Webpack 5 聊天组件包。

## 项目定位

- 对外只打包组件，不再输出 HTML 页面
- 源码统一收敛到 `src/myAgentWebview`
- 构建产物统一输出到 `dist/myAgentWebview`
- 组件对外采用 CommonJS 方式引入

## 环境要求

- Node.js `18` 或更高版本

## 安装

```bash
npm install
```

## 构建

```bash
npm run build
```

## 本地预览

```bash
npm run preview
```

默认会自动打开浏览器，并在 `http://127.0.0.1:3001/` 打开预览宿主，用来查看组件效果。
预览宿主会加载 `preview/chat-panel.html`，组件内部默认指向这个 HTML。

## 验证

```bash
npm run verify
```

## 组件入口

- `src/myAgentWebview/index.jsx`：对外导出入口
- `src/myAgentWebview/MyAgentWebview.jsx`：主组件
- `src/myAgentWebview/config/webview.js`：下半区 HTML 地址配置

## 打包结果

- `dist/myAgentWebview/index.js`
- `dist/preview` 为本地预览产物，不建议作为交付物
- `examples/host-react` 为宿主接入示例目录

如果你后续要切换真实聊天页面，只需要修改 `src/myAgentWebview/config/webview.js` 里的 `WEBVIEW_SRC`。

## CommonJS 引入示例

### 方式一，按包名引入

```jsx
const React = require('react');
const { createRoot } = require('react-dom/client');
const MyAgentWebview = require('pc-chat-web');

function App() {
  return React.createElement(
    'div',
    { style: { width: 1200, height: 860 } },
    React.createElement(MyAgentWebview),
  );
}

createRoot(document.getElementById('root')).render(React.createElement(App));
```

### 方式二，直接引入打包文件

```jsx
const React = require('react');
const { createRoot } = require('react-dom/client');
const MyAgentWebview = require('./dist/myAgentWebview/index.js');

createRoot(document.getElementById('root')).render(
  React.createElement(MyAgentWebview),
);
```

## 注意事项

- 宿主项目需要提供 `React`
- 如果宿主项目也要直接渲染组件，还需要提供 `ReactDOM`
- 当前组件包已经把样式一起打进 bundle，导入组件即可看到样式
- 组件外层会自带自己的样式作用域，不会去依赖宿主页面的 `body` 或 `#root`
- 组件内部默认读取 `src/myAgentWebview/config/webview.js` 里的 `WEBVIEW_SRC`
