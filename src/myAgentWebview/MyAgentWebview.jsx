import React from 'react';
import { HeaderArtifact } from './integrations/HeaderArtifact';
import ChatWorkspace from './components/ChatWorkspace';
import './styles/global.css';
import './styles/chat.css';

const headerData = {
  name: '小咪',
  signature: '可一站式获取产品维护知识',
};

function MyAgentWebview() {
  return (
    <div className="myAgentWebview">
      <div className="page">
        <div className="chat-shell">
          <HeaderArtifact {...headerData} />
          <ChatWorkspace />
        </div>
      </div>
    </div>
  );
}

export default MyAgentWebview;
