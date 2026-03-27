import React from 'react';
import ChatWebview from './ChatWebview';

function ChatWorkspace({ drawerOpen, activeAssistantId }) {
  const isContainerActive = activeAssistantId === 'x00_2';

  return (
    <div className={`chat-panel ${drawerOpen ? 'chat-panel--drawer-open' : ''}`}>
      <div className="chat-panel__workspace-stack">
        <div
          id="AIAssistantWeAgentContainter"
          className={[
            'chat-panel__workspace-layer',
            'chat-panel__assistant-container',
            isContainerActive ? 'chat-panel__workspace-layer--active' : 'chat-panel__workspace-layer--inactive',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden={!isContainerActive}
        />
        <div
          id="AIAssistantWeAgentCUI"
          className={[
            'chat-panel__workspace-layer',
            isContainerActive ? 'chat-panel__workspace-layer--inactive' : 'chat-panel__workspace-layer--active',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden={isContainerActive}
        >
          <ChatWebview />
        </div>
      </div>
    </div>
  );
}

export default ChatWorkspace;
