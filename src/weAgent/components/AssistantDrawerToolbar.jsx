import React from 'react';

function AssistantDrawerToolbar({ onClose }) {
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
      >
        ☎
      </button>
    </div>
  );
}

export default AssistantDrawerToolbar;
