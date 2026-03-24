import React from 'react';
import { DEFAULT_WORKSPACE } from '../config/webview';

function ChatWebview({ src = DEFAULT_WORKSPACE.src }) {
  return (
    <webview
      className="chat-panel__webview"
      title="chat-webview"
      src={src}
      nodeintegration
      allowpopups="false"
    />
  );
}

export default ChatWebview;
