import React from 'react';

function AssistantSelectView({
  assistants,
  selectedAssistantId,
  onSelectAssistant,
  onCancel,
  onConfirm,
  onBackToDetail,
}) {
  return (
    <>
      <div className="assistant-drawer__header">
        <h2 className="assistant-drawer__title">切换助理</h2>
        <p className="assistant-drawer__subtitle">
          选择一个助手后，点击确认切换即可应用到顶部区域。
        </p>
      </div>

      <div className="assistant-drawer__content">
        {assistants.map((assistant) => {
          const checked = assistant.id === selectedAssistantId;

          return (
            <button
              key={assistant.id}
              type="button"
              className={`assistant-card ${checked ? 'assistant-card--active' : ''}`}
              onClick={() => onSelectAssistant(assistant.id)}
            >
              <div className="assistant-card__avatar" aria-hidden="true">
                {assistant.avatar}
              </div>
              <div className="assistant-card__body">
                <div className="assistant-card__head">
                  <div className="assistant-card__name">{assistant.name}</div>
                  <span className="assistant-card__mark">
                    {checked ? '已选择' : '可切换'}
                  </span>
                </div>
                <p className="assistant-card__description">
                  {assistant.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="assistant-drawer__footer">
        <button
          className="assistant-drawer__button assistant-drawer__button--ghost"
          type="button"
          onClick={() => {
            onBackToDetail();
            onCancel();
          }}
        >
          取消选择
        </button>
        <button
          className="assistant-drawer__button assistant-drawer__button--primary"
          type="button"
          onClick={onConfirm}
        >
          确认切换
        </button>
      </div>
    </>
  );
}

export default AssistantSelectView;
