import React from 'react';
import ChatWebview from './ChatWebview';

function ChatWorkspace({ webviewSrc }) {
  return (
    <div className="chat-panel">
      <ChatWebview src={webviewSrc || 'about:blank'} />
    </div>
  );
}

export default ChatWorkspace;
