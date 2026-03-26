import React from 'react';
import { HeaderArtifact } from './integrations/HeaderArtifact';
import ChatWorkspace from './components/ChatWorkspace';
import AssistantDrawer from './components/AssistantDrawer';
import {
  getWorkspaceByPartnerAccount,
  shouldInvokeMethodAForPartnerAccount,
} from './config/webview';
import { getCachedAssistantId, setCachedAssistantId } from './services/assistantStorage';
import './styles/global.css';
import './styles/chat.css';

const GET_WE_AGENT_LIST_METHOD = 'method://agentSkillsDiaglog/getWeAgentList';

const parsePedestalResponse = (response) => {
  let payload = response;

  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch (error) {
      return [];
    }
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (typeof payload?.data === 'string') {
    try {
      const parsedData = JSON.parse(payload.data);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      return [];
    }
  }

  if (Array.isArray(payload?.content)) {
    return payload.content;
  }

  if (Array.isArray(payload?.result?.data)) {
    return payload.result.data;
  }

  if (Array.isArray(payload?.result?.content)) {
    return payload.result.content;
  }

  return [];
};

function WeAgentWebview() {
  const [assistants, setAssistants] = React.useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [drawerInitialViewMode, setDrawerInitialViewMode] = React.useState('detail');
  const [currentAssistantId, setCurrentAssistantId] = React.useState(null);
  const [draftAssistantId, setDraftAssistantId] = React.useState(null);
  const [isAssistantReady, setIsAssistantReady] = React.useState(false);
  const shellRef = React.useRef(null);
  const [shellRect, setShellRect] = React.useState(null);

  const currentAssistant =
    assistants.find(
      (assistant) => assistant.partnerAccount === currentAssistantId,
    ) ??
    assistants[0] ??
    null;

  const draftAssistant =
    assistants.find(
      (assistant) => assistant.partnerAccount === draftAssistantId,
    ) ??
    currentAssistant;

  React.useEffect(() => {
    let isMounted = true;

    const bootstrapAssistant = async () => {
      try {
        const pedestal = typeof window === 'undefined' ? null : window.Pedestal;

        if (!pedestal || typeof pedestal.callMethod !== 'function') {
          throw new Error('当前环境不支持加载助手列表。');
        }

        const response = await Promise.resolve(
          pedestal.callMethod(GET_WE_AGENT_LIST_METHOD, {
            pageSize: 100,
            pageNumber: 1,
          }),
        );
        const nextAssistants = parsePedestalResponse(response);
        const cachedAssistantId = await getCachedAssistantId();
        const nextAssistantId = nextAssistants.some(
          (assistant) => assistant.partnerAccount === cachedAssistantId,
        )
          ? cachedAssistantId
          : (nextAssistants[0]?.partnerAccount ?? null);

        if (!isMounted) {
          return;
        }

        setAssistants(nextAssistants);
        setCurrentAssistantId(nextAssistantId);
        setDraftAssistantId(nextAssistantId);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        // eslint-disable-next-line no-console
        console.error('Failed to load weAgent list.', error);
        setAssistants([]);
        setCurrentAssistantId(null);
        setDraftAssistantId(null);
      } finally {
        if (!isMounted) {
          return;
        }

        setIsAssistantReady(true);
      }
    };

    void bootstrapAssistant();

    return () => {
      isMounted = false;
    };
  }, []);

  // 预先把所有助手对应的工作区都算出来并常驻，
  // 这样切换助手时只切换显示层，不会销毁已有 webview。
  const workspaces = assistants.map((assistant) => ({
    id: assistant.partnerAccount,
    workspace: getWorkspaceByPartnerAccount(assistant.partnerAccount),
  }));

  const openDrawer = (viewMode = 'detail') => {
    if (!currentAssistant) {
      return;
    }

    setDraftAssistantId(currentAssistant.partnerAccount);
    setDrawerInitialViewMode(viewMode);
    setIsDrawerOpen(true);
  };

  // 员工助手命中时走这里，后续可以替换成真实的业务接入方法。
  const methodA = React.useCallback((partnerAccount) => {
    // eslint-disable-next-line no-console
    console.log('methodA: 助手已切换', partnerAccount);
  }, []);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setDraftAssistantId(currentAssistant?.partnerAccount ?? null);
    setDrawerInitialViewMode('detail');
  };

  const confirmSwitch = () => {
    if (!draftAssistant) {
      return;
    }

    if (shouldInvokeMethodAForPartnerAccount(draftAssistant.partnerAccount)) {
      methodA(draftAssistant.partnerAccount);
    }

    void setCachedAssistantId(draftAssistant.partnerAccount);
    setCurrentAssistantId(draftAssistant.partnerAccount);
    setIsDrawerOpen(false);
  };

  React.useLayoutEffect(() => {
    const updateShellRect = () => {
      if (!shellRef.current) {
        return;
      }

      const rect = shellRef.current.getBoundingClientRect();
      setShellRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    };

    updateShellRect();

    window.addEventListener('resize', updateShellRect);
    return () => window.removeEventListener('resize', updateShellRect);
  }, [currentAssistantId, isDrawerOpen]);

  if (!isAssistantReady || !currentAssistant) {
    return null;
  }

  return (
    <div className="weAgent">
      <div className="page">
        <div ref={shellRef} className="chat-shell">
          <HeaderArtifact
            name={currentAssistant.name}
            intro={currentAssistant.description}
            onOpenSwitch={() => openDrawer('select')}
            onOpenSettings={() => openDrawer('detail')}
          />
          <ChatWorkspace
            drawerOpen={isDrawerOpen}
            workspaces={workspaces}
            activeAssistantId={currentAssistant.partnerAccount}
          />
        </div>
        <AssistantDrawer
          open={isDrawerOpen}
          shellRect={shellRect}
          currentAssistant={currentAssistant}
          assistants={assistants}
          selectedAssistantId={draftAssistant?.partnerAccount ?? null}
          initialViewMode={drawerInitialViewMode}
          onSelectAssistant={setDraftAssistantId}
          onCancel={closeDrawer}
          onConfirm={confirmSwitch}
          onBackdropClick={closeDrawer}
        />
      </div>
    </div>
  );
}

export default WeAgentWebview;
