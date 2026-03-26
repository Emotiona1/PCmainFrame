import React from 'react';
import { AssistantDetail } from '../ai-chat-viewer/dist/lib/index.js';

function AssistantDetailView() {
  return (
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <AssistantDetail />
    </div>
  );
}

export default AssistantDetailView;
