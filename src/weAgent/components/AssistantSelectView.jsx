import React from 'react';
import { SwitchAssistant } from '../ai-chat-viewer/dist/lib/index.js';

function AssistantSelectView({
  assistants,
  selectedAssistantId,
  onSelectAssistant,
  onCancel,
  onConfirm,
}) {
  const assistantIdMap = React.useMemo(
    () => ({
      'assistant-1': assistants[0]?.id,
      'assistant-2': assistants[1]?.id,
    }),
    [assistants],
  );

  React.useEffect(() => {
    const handleSelect = (event) => {
      const assistantId = event?.detail?.id;
      const mappedAssistantId =
        assistants.some((assistant) => assistant.id === assistantId)
          ? assistantId
          : assistantIdMap[assistantId];

      if (!mappedAssistantId) {
        return;
      }

      onSelectAssistant(mappedAssistantId);
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
  }, [assistantIdMap, assistants, onCancel, onConfirm, onSelectAssistant]);

  return (
    <div className="assistant-select-host">
      <SwitchAssistant defaultSelectedAssistantId={selectedAssistantId} />
    </div>
  );
}

export default AssistantSelectView;
