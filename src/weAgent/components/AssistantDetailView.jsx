import React from 'react';

function AssistantDetailView({ currentAssistant, onSwitchAssistants }) {
  return (
    <>
      <div className="assistant-drawer__header assistant-drawer__header--detail">
        <div className="assistant-detail__avatar" aria-hidden="true">
          {currentAssistant.avatar}
        </div>
        <div className="assistant-detail__meta">
          <h2 className="assistant-detail__name">{currentAssistant.name}</h2>
          <p className="assistant-detail__id">ID: {currentAssistant.assistantId}</p>
        </div>
      </div>

      <div className="assistant-detail__content">
        <div className="assistant-detail__block">
          <div className="assistant-detail__label">助手简介</div>
          <div className="assistant-detail__value">{currentAssistant.intro}</div>
        </div>
        <div className="assistant-detail__block">
          <div className="assistant-detail__label">产品归属</div>
          <div className="assistant-detail__value">{currentAssistant.product}</div>
        </div>
        <div className="assistant-detail__block">
          <div className="assistant-detail__label">责任人</div>
          <div className="assistant-detail__value">{currentAssistant.owner}</div>
        </div>
        <div className="assistant-detail__block assistant-detail__block--status">
          <div className="assistant-detail__label">账号状态</div>
          <div className="assistant-detail__status">
            <span className="assistant-detail__status-dot" aria-hidden="true" />
            <span>{currentAssistant.accountStatus}</span>
          </div>
        </div>
      </div>

      <div className="assistant-drawer__footer assistant-drawer__footer--single">
        <button
          className="assistant-drawer__button assistant-drawer__button--primary"
          type="button"
          onClick={onSwitchAssistants}
        >
          切换其他助理
        </button>
      </div>
    </>
  );
}

export default AssistantDetailView;
