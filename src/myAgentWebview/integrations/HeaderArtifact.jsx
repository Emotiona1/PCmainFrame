import React from 'react';

function HeaderArtifact({ name, onOpenSettings }) {
  return (
    <header className="chat-header">
      <div className="chat-header__identity">
        <div className="chat-header__topline">
          <h1 className="chat-header__name">{name}</h1>
          <span className="chat-header__inline-status">
            <span
              className="chat-header__inline-status-dot"
              aria-hidden="true"
            />
            <span>已连接</span>
          </span>
        </div>
      </div>

      <div className="chat-header__actions">
        <button
          className="chat-header__settings-button"
          type="button"
          onClick={onOpenSettings}
        >
          设置
        </button>
      </div>
    </header>
  );
}

export { HeaderArtifact };
