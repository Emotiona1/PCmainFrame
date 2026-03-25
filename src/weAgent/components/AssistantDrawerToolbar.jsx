import React from 'react';

function AssistantDrawerToolbar({ onClose }) {
  const handleServiceClick = () => {
    // 后续在这里接真实的客服跳转逻辑
    // eslint-disable-next-line no-console
    console.log('客服按钮点击');
  };

  return (
    <div className="assistant-drawer__toolbar">
      <button
        className="assistant-drawer__icon-button assistant-drawer__icon-button--close"
        type="button"
        aria-label="关闭抽屉"
        onClick={onClose}
      >
        X
      </button>
      <button
        className="assistant-drawer__icon-button assistant-drawer__icon-button--service"
        type="button"
        aria-label="客服"
        onClick={handleServiceClick}
      >
        ☎
      </button>
    </div>
  );
}

export default AssistantDrawerToolbar;
