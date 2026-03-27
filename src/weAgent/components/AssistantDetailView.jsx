import React from 'react';
import { AssistantDetail } from '../ai-chat-viewer/dist/lib/index.js';

function AssistantDetailView({ curPartnerAccount }) {
  return (
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <AssistantDetail curPartnerAccount={curPartnerAccount} />
    </div>
  );
}

export default AssistantDetailView;
