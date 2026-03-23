import React from 'react';

function HeaderArtifact({ name, signature, status }) {
  return (
    <header className="chat-header">
      <div className="chat-header__identity">
        <div className="chat-header__meta">
          <h1 className="chat-header__name">{name}</h1>
          <p className="chat-header__signature">{signature}</p>
        </div>
      </div>
      <div className="chat-header__status">
        <span className="chat-header__status-dot" aria-hidden="true" />
        <span>{status}</span>
      </div>
    </header>
  );
}

export { HeaderArtifact };
