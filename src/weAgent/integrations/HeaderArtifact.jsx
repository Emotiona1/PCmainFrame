import React from 'react';
import openclawIcon from '../imgs/openclaw.webp';
import switchIcon from '../imgs/switch.webp';
import settingIcon from '../imgs/setting.webp';
import kefuIcon from '../imgs/kefu.webp';

function HeaderArtifact({ name, intro, onOpenSwitch, onOpenSettings }) {

  const handleServiceClick = () => {
    // 后续在这里接真实的客服跳转逻辑
    // eslint-disable-next-line no-console
    console.log('客服图标点击');
  };

  return (
    <header className="chat-header">
      <div className="chat-header__identity">
        <img
          className="chat-header__brand-icon"
          src={openclawIcon}
          alt=""
          aria-hidden="true"
        />
        <div className="chat-header__text">
          <div className="chat-header__topline">
            <h1 className="chat-header__name">{name}</h1>
          </div>
          <p className="chat-header__signature">{intro}</p>
        </div>
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
          className="chat-header__icon-button"
          type="button"
          aria-label="切换"
          onClick={onOpenSwitch}
        >
          <img
            className="chat-header__icon-image"
            src={switchIcon}
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
