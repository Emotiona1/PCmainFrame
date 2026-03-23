import React from 'react';
import { HeaderArtifact } from './integrations/HeaderArtifact';
import ChatWorkspace from './components/ChatWorkspace';
import './styles/global.css';
import './styles/chat.css';

const headerData = {
  name: '张晓宇',
  signature: '让沟通更简单',
  status: '在线',
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
