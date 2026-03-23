# PC Chat Web

一个轻量的 React + Webpack 5 聊天壳子项目。

## 设计目标

- 上半区只保留本地组件产物接入层
- 下半区只保留 webview 容器挂载层
- 页面本身尽量少逻辑，后续上线只改少量代码

## 环境要求

- Node.js `18` 或更高版本

## 安装

```bash
npm install
```

## 启动开发环境

```bash
npm start
```

## 当前接入方式

- `src/myAgentWebview/integrations/HeaderArtifact.jsx`：顶部本地组件产物适配层
- `src/myAgentWebview/components/ChatWorkspace.jsx`：底部聊天区壳子
- `src/myAgentWebview/components/ChatContentMock.jsx`：底部 mock 聊天内容

## 目录约定

- 源码统一放在 `src/myAgentWebview`
- 打包产物统一输出到 `dist/myAgentWebview`

如果你后续拿到了真实的组件产物或 webview 标签，只需要替换这两个接入层里的少量代码。
