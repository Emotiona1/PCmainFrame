import React from 'react';
import ChatWebview from './ChatWebview';

function ChatWorkspace({ drawerOpen, workspace }) {
  const isPlaceholder = workspace?.type === 'placeholder';

  return (
    <div className={`chat-panel ${drawerOpen ? 'chat-panel--drawer-open' : ''}`}>
      {isPlaceholder ? (
        <div
          id={workspace.placeholderId}
          className="chat-panel__assistant-container"
        />
      ) : (
        <ChatWebview src={workspace?.src} />
      )}
    </div>
  );
}

export default ChatWorkspace;
