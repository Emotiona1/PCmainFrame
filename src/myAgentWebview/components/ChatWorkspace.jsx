import React from 'react';
import ChatWebview from './ChatWebview';

function ChatWorkspace({ drawerOpen }) {
  return (
    <div className={`chat-panel ${drawerOpen ? 'chat-panel--drawer-open' : ''}`}>
      {!drawerOpen ? <ChatWebview /> : null}
    </div>
  );
}

export default ChatWorkspace;
