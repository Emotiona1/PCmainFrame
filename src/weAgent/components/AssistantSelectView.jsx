import React from 'react';
import { SwitchAssistant } from '../ai-chat-viewer/dist/lib/index.js';

function AssistantSelectView({
  assistants,
  selectedAssistantId,
  onSelectAssistant,
  onCancel,
  onConfirm,
}) {
  const selectedIndex = assistants.findIndex(
    (assistant) => assistant.id === selectedAssistantId,
  );
  const hostClassName = [
    'assistant-select-host',
    selectedIndex >= 0 ? `assistant-select-host--selected-${selectedIndex}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  React.useEffect(() => {
    const handleSelect = (event) => {
      const cardIndex = Number(event?.detail?.cardIndex);
      if (!Number.isInteger(cardIndex) || cardIndex < 0 || cardIndex >= assistants.length) {
        return;
      }

      onSelectAssistant(assistants[cardIndex].id);
    };

    const handleCancel = () => {
      onCancel();
    };

    const handleConfirm = () => {
      onConfirm();
    };

    window.addEventListener('weAgent:switch-assistant-select', handleSelect);
    window.addEventListener('weAgent:switch-assistant-cancel', handleCancel);
    window.addEventListener('weAgent:switch-assistant-confirm', handleConfirm);

    return () => {
      window.removeEventListener('weAgent:switch-assistant-select', handleSelect);
      window.removeEventListener('weAgent:switch-assistant-cancel', handleCancel);
      window.removeEventListener('weAgent:switch-assistant-confirm', handleConfirm);
    };
  }, [assistants, onCancel, onConfirm, onSelectAssistant]);

  return (
    <div className={hostClassName}>
      <SwitchAssistant defaultSelectedAssistantId={selectedAssistantId} />
    </div>
  );
}

export default AssistantSelectView;
