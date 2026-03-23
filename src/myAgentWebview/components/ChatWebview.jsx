import React from 'react';
import { WEBVIEW_SRC } from '../config/webview';

function ChatWebview({ src = WEBVIEW_SRC }) {
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
