import React from 'react';
import { AssistantDetail } from '../ai-chat-viewer/dist/lib/index.js';

function AssistantDetailView({ onSwitchAssistants }) {
  return (
    <>
      <div className="assistant-detail-host">
        <AssistantDetail />
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
