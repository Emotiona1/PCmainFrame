# Webpack 5 Host Integration

这个目录是给“把 `myAgentWebview` 代码复制到另一个前端项目里”时使用的接入模板。

## 目标

- 保留你原本项目的 webpack 打包逻辑不变
- 只额外增加一套 `myAgentWebview` 的独立构建
- 最终组件包输出为 `dist/myAgentWebview/index.js`
- 下半区使用 Electron 的 `<webview>` 标签，并内置最简单的 HTML

## 建议做法

在宿主项目根目录新增一个独立配置文件：

```text
webpack.myAgentWebview.config.js
```

然后把下面这个配置复制进去，再按需改路径即可。

## 示例配置

参考同目录下的 [webpack.myAgentWebview.config.js](./webpack.myAgentWebview.config.js)。

## 推荐脚本

```json
{
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "build:myAgentWebview": "webpack --config webpack.myAgentWebview.config.js",
    "build:all": "npm run build && npm run build:myAgentWebview"
  }
}
```

## 使用方式

宿主项目编译完成后，可以这样引入：

```jsx
const MyAgentWebview = require('./dist/myAgentWebview/index.js').default;
```

如果你是通过包名发布后的方式引入，则直接：

```jsx
const MyAgentWebview = require('pc-chat-web').default;
```

## 注意事项

- 宿主项目需要自己提供 `React`
- 宿主进程需要开启 `webviewTag`
- 这个组件包不会去改你原本项目的 webpack 入口，只是多加了一条独立构建链
