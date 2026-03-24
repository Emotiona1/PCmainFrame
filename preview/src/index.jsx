import React from 'react';
import { createRoot } from 'react-dom/client';
import MyAgentWebview from '../../src/myAgentWebview/MyAgentWebview';
import './preview.css';

function PreviewApp() {
  return (
    <div className="preview-page">
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
