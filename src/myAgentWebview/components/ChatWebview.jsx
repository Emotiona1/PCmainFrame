import React from 'react';
import { DEFAULT_WORKSPACE } from '../config/webview';

function ChatWebview({ src = DEFAULT_WORKSPACE.src }) {
  return (
    <webview
      className="chat-panel__webview"
      title="chat-webview"
      src={src}
      nodeintegration
      webpreferences="contextIsolation=false"
      disablewebsecurity
      allowpopups="false"
    />
  );
}

export default ChatWebview;
