import React from 'react';
import { createPortal } from 'react-dom';
import AssistantDetailView from './AssistantDetailView';
import AssistantSelectView from './AssistantSelectView';

function AssistantDrawer({
  open,
  shellRect,
  currentAssistant,
  assistants,
  selectedAssistantId,
  initialViewMode = 'detail',
  onSelectAssistant,
  onCancel,
  onConfirm,
  onBackdropClick,
}) {
  const [viewMode, setViewMode] = React.useState('detail');

  React.useEffect(() => {
    if (open) {
      setViewMode(initialViewMode);
    }
  }, [open, initialViewMode]);

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleClose = () => {
      onBackdropClick();
    };

    window.addEventListener('weAgent:assistant-close', handleClose);

    return () => {
      window.removeEventListener('weAgent:assistant-close', handleClose);
    };
  }, [onBackdropClick, open]);

  if (!open || typeof document === 'undefined' || !shellRect) {
    return null;
  }

  const overlayStyle = {
    top: `${shellRect.top}px`,
    height: `${shellRect.height}px`,
    right: '0px',
  };

  return createPortal(
    <div
      className="weAgent weAgent--drawer-layer"
      style={overlayStyle}
    >
      <div className="assistant-drawer" aria-hidden={!open}>
        <aside
          className="assistant-drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-label={viewMode === 'detail' ? '助手简介' : '助手切换'}
          onClick={(event) => event.stopPropagation()}
        >
          {viewMode === 'detail' ? (
            <AssistantDetailView />
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
