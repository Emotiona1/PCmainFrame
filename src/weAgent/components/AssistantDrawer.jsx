import React from 'react';
import { createPortal } from 'react-dom';
import AssistantDetailView from './AssistantDetailView';
import AssistantSelectView from './AssistantSelectView';
import AssistantDrawerToolbar from './AssistantDrawerToolbar';

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
      className="weAgent weAgent--drawer-layer"
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
          <AssistantDrawerToolbar onClose={onBackdropClick} />

          {viewMode === 'detail' ? (
            <AssistantDetailView
              currentAssistant={currentAssistant}
              onSwitchAssistants={() => setViewMode('select')}
            />
          ) : (
            <AssistantSelectView
              assistants={assistants}
              selectedAssistantId={selectedAssistantId}
              onSelectAssistant={onSelectAssistant}
              onCancel={() => {
                setViewMode('detail');
                onSelectAssistant(currentAssistant.id);
              }}
              onConfirm={onConfirm}
              onBackToDetail={() => setViewMode('detail')}
            />
          )}
        </aside>
      </div>
    </div>,
    document.body,
  );
}

export default AssistantDrawer;
