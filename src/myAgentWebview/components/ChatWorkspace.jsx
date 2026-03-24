import React from 'react';
import ChatWebview from './ChatWebview';

function ChatWorkspace({ drawerOpen, webviewSrc }) {
  return (
    <div className={`chat-panel ${drawerOpen ? 'chat-panel--drawer-open' : ''}`}>
      {!drawerOpen ? <ChatWebview src={webviewSrc} /> : null}
    </div>
  );
}

export default ChatWorkspace;
