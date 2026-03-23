import React from 'react';
import { createRoot } from 'react-dom/client';
import MyAgentWebview from '../../src/myAgentWebview/MyAgentWebview';
import './preview.css';

function PreviewApp() {
  return (
    <div className="preview-page">
      <header className="preview-hero">
        <p className="preview-hero__eyebrow">MyAgentWebview Preview</p>
        <h1 className="preview-hero__title">本地组件预览宿主</h1>
        <p className="preview-hero__description">
          这个页面只用于本地查看组件效果，不参与最终交付。最终交付物仍然是
          <code>dist/myAgentWebview/index.js</code>。
        </p>
        <div className="preview-hero__notes">
          <span>组件入口：src/myAgentWebview/MyAgentWebview.jsx</span>
          <span>预览地址：http://127.0.0.1:3001/</span>
        </div>
      </header>

      <main className="preview-frame">
        <MyAgentWebview />
      </main>
    </div>
  );
}

createRoot(document.getElementById('preview-root')).render(
  <React.StrictMode>
    <PreviewApp />
  </React.StrictMode>,
);
