import React from 'react';

function ChatWebview({ src }) {
  return (
    <iframe
      className="chat-panel__webview"
      title="chat-webview"
      src={src}
      loading="lazy"
    />
  );
}

export default ChatWebview;
