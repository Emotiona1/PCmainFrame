import React from 'react';
import { createPortal } from 'react-dom';

function AssistantDrawer({
  open,
  shellRect,
  currentAssistant,
  assistants,
  selectedAssistantId,
  onSelectAssistant,
  onCancel,
  onConfirm,
  onBackdropClick,
}) {
  const [viewMode, setViewMode] = React.useState('detail');

  React.useEffect(() => {
    if (open) {
      setViewMode('detail');
    }
  }, [open]);

  if (!open || typeof document === 'undefined' || !shellRect) {
    return null;
  }

  const overlayStyle = {
    top: `${shellRect.top}px`,
    left: `${shellRect.left}px`,
    width: `${shellRect.width}px`,
    height: `${shellRect.height}px`,
  };

  return createPortal(
    <div
      className="myAgentWebview myAgentWebview--drawer-layer"
      style={overlayStyle}
    >
      <div className="assistant-drawer" aria-hidden={!open}>
        <button
          className="assistant-drawer__backdrop"
          type="button"
          aria-label="关闭设置抽屉"
          onClick={onBackdropClick}
        />

        <aside
          className="assistant-drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-label={viewMode === 'detail' ? '助手简介' : '助手切换'}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="assistant-drawer__toolbar">
            <button
              className="assistant-drawer__icon-button assistant-drawer__icon-button--close"
              type="button"
              aria-label="关闭抽屉"
              onClick={onBackdropClick}
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

          {viewMode === 'detail' ? (
            <>
              <div className="assistant-drawer__header assistant-drawer__header--detail">
                <div className="assistant-detail__avatar" aria-hidden="true">
                  {currentAssistant.avatar}
                </div>
                <div className="assistant-detail__meta">
                  <h2 className="assistant-detail__name">
                    {currentAssistant.name}
                  </h2>
                  <p className="assistant-detail__id">
                    ID: {currentAssistant.assistantId}
                  </p>
                </div>
              </div>

              <div className="assistant-detail__content">
                <div className="assistant-detail__block">
                  <div className="assistant-detail__label">助手简介</div>
                  <div className="assistant-detail__value">
                    {currentAssistant.intro}
                  </div>
                </div>
                <div className="assistant-detail__block">
                  <div className="assistant-detail__label">产品归属</div>
                  <div className="assistant-detail__value">
                    {currentAssistant.product}
                  </div>
                </div>
                <div className="assistant-detail__block">
                  <div className="assistant-detail__label">责任人</div>
                  <div className="assistant-detail__value">
                    {currentAssistant.owner}
                  </div>
                </div>
                <div className="assistant-detail__block assistant-detail__block--status">
                  <div className="assistant-detail__label">账号状态</div>
                  <div className="assistant-detail__status">
                    <span
                      className="assistant-detail__status-dot"
                      aria-hidden="true"
                    />
                    <span>{currentAssistant.accountStatus}</span>
                  </div>
                </div>
              </div>

              <div className="assistant-drawer__footer assistant-drawer__footer--single">
                <button
                  className="assistant-drawer__button assistant-drawer__button--primary"
                  type="button"
                  onClick={() => setViewMode('select')}
                >
                  切换其他助理
                </button>
              </div>
            </>
          ) : (
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
                          <div className="assistant-card__name">
                            {assistant.name}
                          </div>
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
                    setViewMode('detail');
                    onSelectAssistant(currentAssistant.id);
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
          )}
        </aside>
      </div>
    </div>,
    document.body,
  );
}

export default AssistantDrawer;
