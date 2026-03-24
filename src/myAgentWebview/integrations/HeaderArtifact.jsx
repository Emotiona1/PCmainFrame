import React from 'react';
import settingIcon from '../imgs/setting.webp';
import kefuIcon from '../imgs/kefu.webp';

function HeaderArtifact({ name, intro, onOpenSettings }) {
  const handleServiceClick = () => {
    console.log('客服图标点击');
  };

  return (
    <header className="chat-header">
      <div className="chat-header__identity">
        <div className="chat-header__topline">
          <h1 className="chat-header__name">{name}</h1>
        </div>
        <p className="chat-header__signature">{intro}</p>
      </div>

      <div className="chat-header__actions">
        <button
          className="chat-header__icon-button"
          type="button"
          aria-label="联系客服"
          onClick={handleServiceClick}
        >
          <img
            className="chat-header__icon-image"
            src={kefuIcon}
            alt=""
            aria-hidden="true"
          />
        </button>
        <button
          className="chat-header__settings-button"
          type="button"
          aria-label="打开设置"
          onClick={onOpenSettings}
        >
          <img
            className="chat-header__icon-image"
            src={settingIcon}
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
}

export { HeaderArtifact };
