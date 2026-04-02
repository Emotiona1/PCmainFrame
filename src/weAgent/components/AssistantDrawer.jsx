import React from 'react';
import { createPortal } from 'react-dom';
import AssistantDetailView from './AssistantDetailView';
import AssistantSelectView from './AssistantSelectView';

function AssistantDrawer({
  open,
  shellRect,
  currentAssistant,
  selectedAssistantId,
  initialViewMode = 'detail',
  onSelectAssistant,
  onConfirm,
  onBackdropClick,
}) {
  const [viewMode, setViewMode] = React.useState('detail');
  const panelRef = React.useRef(null);

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

    const handleDocumentPointerDown = (event) => {
      const panelElement = panelRef.current;
      if (!panelElement) {
        return;
      }

      if (panelElement.contains(event.target)) {
        return;
      }

      handleClose();
    };

    window.addEventListener('weAgent:assistant-close', handleClose);
    document.addEventListener('pointerdown', handleDocumentPointerDown, true);

    return () => {
      window.removeEventListener('weAgent:assistant-close', handleClose);
      document.removeEventListener('pointerdown', handleDocumentPointerDown, true);
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
          ref={panelRef}
          className="assistant-drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-label={viewMode === 'detail' ? '助手简介' : '助手切换'}
          onClick={(event) => event.stopPropagation()}
        >
          {viewMode === 'detail' ? (
            <AssistantDetailView curPartnerAccount={currentAssistant.partnerAccount} />
          ) : (
            <AssistantSelectView
              selectedAssistantId={selectedAssistantId}
              onSelectAssistant={onSelectAssistant}
              onCancel={onBackdropClick}
              onConfirm={onConfirm}
            />
          )}
        </aside>
      </div>
    </div>,
    document.body,
  );
}

export default AssistantDrawer;
