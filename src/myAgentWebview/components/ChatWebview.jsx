import React from 'react';
import { DEFAULT_WEBVIEW_SRC } from '../config/webview';

function ChatWebview({ src = DEFAULT_WEBVIEW_SRC }) {
  return (
    <webview
      className="chat-panel__webview"
      title="chat-webview"
      src={src}
      allowpopups="false"
    />
  );
}

export default ChatWebview;
