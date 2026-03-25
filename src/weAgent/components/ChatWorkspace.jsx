import React from 'react';
import ChatWebview from './ChatWebview';

function ChatWorkspace({ drawerOpen, workspaces, activeAssistantId }) {
  // 这里只控制“当前显示哪一层”，不做卸载。
  // 这样切回小咪时，之前的 webview 还能保留原状态。
  const activeWorkspaceIds = new Set([activeAssistantId]);

  return (
    <div className={`chat-panel ${drawerOpen ? 'chat-panel--drawer-open' : ''}`}>
      <div className="chat-panel__workspace-stack">
        {workspaces.map(({ id, workspace }) => {
          const isActive = activeWorkspaceIds.has(id);
          const layerClassName = [
            'chat-panel__workspace-layer',
            isActive ? 'chat-panel__workspace-layer--active' : 'chat-panel__workspace-layer--inactive',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div key={id} className={layerClassName} aria-hidden={!isActive}>
              {workspace.type === 'placeholder' ? (
                <div
                  id={workspace.placeholderId}
                  className="chat-panel__assistant-container"
                />
              ) : (
                <ChatWebview src={workspace.src} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatWorkspace;
