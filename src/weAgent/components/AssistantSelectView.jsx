import React from 'react';
import { SwitchAssistant } from '../ai-chat-viewer/dist/lib/index.js';

function AssistantSelectView({
  selectedAssistantId,
  onSelectAssistant,
  onCancel,
  onConfirm,
}) {
  React.useEffect(() => {
    const handleSelect = (event) => {
      const assistant = event?.detail;

      if (!assistant || !assistant.partnerAccount) {
        return;
      }

      onSelectAssistant(assistant);
    };

    const handleCancel = (event) => {
      onCancel(event?.detail ?? null);
    };

    const handleConfirm = (event) => {
      onConfirm(event?.detail ?? null);
    };

    window.addEventListener('weAgent:switch-assistant-select', handleSelect);
    window.addEventListener('weAgent:switch-assistant-cancel', handleCancel);
    window.addEventListener('weAgent:switch-assistant-confirm', handleConfirm);

    return () => {
      window.removeEventListener('weAgent:switch-assistant-select', handleSelect);
      window.removeEventListener('weAgent:switch-assistant-cancel', handleCancel);
      window.removeEventListener('weAgent:switch-assistant-confirm', handleConfirm);
    };
  }, [onCancel, onConfirm, onSelectAssistant]);

  return (
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <SwitchAssistant defaultSelectedAssistantId={selectedAssistantId} />
    </div>
  );
}

export default AssistantSelectView;
