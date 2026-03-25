# Host React Example

这是一个最小宿主接入示例目录，演示如何在别的 React 项目里使用 `we-agent-web` 组件包。

## 接入方式

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import WeAgentWebview from 'we-agent-web';

function App() {
  return (
    <div style={{ width: 1200, height: 860 }}>
      <WeAgentWebview />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
```

## 目录说明

- `src/App.jsx`：宿主页面示例
- `src/index.jsx`：宿主入口示例

如果你想把这个示例扩展成可运行项目，可以在这个目录里继续补 `package.json` 和构建配置。
