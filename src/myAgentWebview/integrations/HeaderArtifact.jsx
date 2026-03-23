import React from 'react';

function HeaderArtifact({ name, signature }) {
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
        <div className="chat-header__meta">
          <p className="chat-header__signature">{signature}</p>
        </div>
      </div>
    </header>
  );
}

export { HeaderArtifact };
