import React from 'react';
import { createRoot } from 'react-dom/client';
import WeAgentWebview from '../../src/weAgent/WeAgentWebview';
import './preview.css';

function PreviewApp() {
  return (
    <div className="preview-page">
      <main className="preview-frame">
        <WeAgentWebview />
      </main>
    </div>
  );
}

createRoot(document.getElementById('preview-root')).render(
  <React.StrictMode>
    <PreviewApp />
  </React.StrictMode>,
);
