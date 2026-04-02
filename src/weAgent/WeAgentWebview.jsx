import React from 'react';
import { HeaderArtifact } from './integrations/HeaderArtifact';
import ChatWorkspace from './components/ChatWorkspace';
import AssistantDrawer from './components/AssistantDrawer';
import LoadingPage from './components/LoadingPage';
import {
  shouldInvokeMethodAForPartnerAccount,
} from './config/webview';
import { getCachedAssistantId, setCachedAssistantId } from './services/assistantStorage';
import './styles/global.css';
import './styles/chat.css';

const WE_AGENT_HASH = '#/main/weAgent';

const ASSISTANT_FALLBACKS = {
  xiaomi: {
    partnerAccount: 'xiaomi',
    name: '小咪',
    description: '可一站式获取产品维护知识',
    bizRotId: '0',
  },
  'helper-pro': {
    partnerAccount: 'helper-pro',
    name: '设计小助手',
    description: '设计师一枚，有专业设计能力',
    bizRotId: '10001',
  },
  'coding-expert': {
    partnerAccount: 'coding-expert',
    name: '编程专家',
    description: '专业的 Java 助手，代码编写',
    bizRotId: '10002',
  },
  'local-employee': {
    partnerAccount: 'local-employee',
    name: '本地员工助手',
    description: '本地员工知识和流程问答',
    bizRotId: '10003',
  },
  'base-employee': {
    partnerAccount: 'base-employee',
    name: '员工助手',
    description: '员工统一助手入口',
    bizRotId: '78679',
  },
};

const DEFAULT_ASSISTANT = ASSISTANT_FALLBACKS.xiaomi;

const resolveAssistant = (assistant) => {
  if (!assistant) {
    return null;
  }

  if (typeof assistant === 'string') {
    return ASSISTANT_FALLBACKS[assistant] ?? {
      partnerAccount: assistant,
      name: assistant,
      description: '',
      bizRotId: '0',
    };
  }

  if (typeof assistant === 'object' && assistant.partnerAccount) {
    return {
      ...ASSISTANT_FALLBACKS[assistant.partnerAccount],
      ...assistant,
      partnerAccount: assistant.partnerAccount,
    };
  }

  return null;
};

function WeAgentWebview() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [drawerInitialViewMode, setDrawerInitialViewMode] = React.useState('detail');
  const [currentAssistant, setCurrentAssistant] = React.useState(null);
  const [draftAssistant, setDraftAssistant] = React.useState(null);
  const [isAssistantReady, setIsAssistantReady] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const shellRef = React.useRef(null);
  const [shellRect, setShellRect] = React.useState(null);
  const loadingTimeoutRef = React.useRef(null);

  const activeBizRotId = currentAssistant?.bizRotId ?? null;

  // 员工助手命中时走这里，后续可以替换成真实的业务接入方法。
  const methodA = React.useCallback((partnerAccount) => {
    // eslint-disable-next-line no-console
    console.log('methodA: 助手已切换', partnerAccount);
  }, []);

  // 非员工助手命中时走这里，后续可以替换成真实的业务接入方法。
  const methodB = React.useCallback((partnerAccount) => {
    // eslint-disable-next-line no-console
    console.log('methodB: 非员工助手已进入', partnerAccount);
  }, []);

  React.useEffect(() => {
    let isMounted = true;

    const bootstrapAssistant = async () => {
      try {
        const cachedAssistant = await getCachedAssistantId();
        const nextAssistant = resolveAssistant(cachedAssistant) ?? DEFAULT_ASSISTANT;

        if (!isMounted) {
          return;
        }

        setCurrentAssistant(nextAssistant);
        setDraftAssistant(nextAssistant);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        // eslint-disable-next-line no-console
        console.error('Failed to load cached assistant.', error);
        setCurrentAssistant(DEFAULT_ASSISTANT);
        setDraftAssistant(DEFAULT_ASSISTANT);
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

  const openDrawer = React.useCallback((viewMode = 'detail') => {
    if (!currentAssistant) {
      return;
    }

    setDraftAssistant(currentAssistant);
    setDrawerInitialViewMode(viewMode);
    setIsDrawerOpen(true);
  }, [currentAssistant]);

  const closeDrawer = React.useCallback(() => {
    setIsDrawerOpen(false);
    setDraftAssistant(currentAssistant);
    setDrawerInitialViewMode('detail');
  }, [currentAssistant]);

  React.useEffect(() => {
    if (!isDrawerOpen || typeof window === 'undefined') {
      return undefined;
    }

    const handleHashChange = () => {
      if (window.location.hash !== WE_AGENT_HASH) {
        closeDrawer();
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [closeDrawer, isDrawerOpen]);

  const confirmSwitch = () => {
    if (!draftAssistant) {
      return;
    }

    void setCachedAssistantId(draftAssistant);
    setCurrentAssistant(draftAssistant);
    setDraftAssistant(draftAssistant);
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
  }, [currentAssistant?.partnerAccount, isDrawerOpen]);

  React.useLayoutEffect(() => {
    if (!isAssistantReady || !currentAssistant) {
      return;
    }

    if (shouldInvokeMethodAForPartnerAccount(currentAssistant.partnerAccount)) {
      methodA(currentAssistant.partnerAccount);
      setIsLoading(false);
      return;
    }

    methodB(currentAssistant.partnerAccount);
    setIsLoading(false);
  }, [
    activeBizRotId,
    currentAssistant?.partnerAccount,
    isAssistantReady,
    methodA,
    methodB,
  ]);

  React.useEffect(() => {
    if (!isLoading) {
      if (loadingTimeoutRef.current) {
        window.clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }

      return undefined;
    }

    loadingTimeoutRef.current = window.setTimeout(() => {
      setIsLoading(false);
      loadingTimeoutRef.current = null;
    }, 10000);

    return () => {
      if (!loadingTimeoutRef.current) {
        return;
      }

      window.clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    };
  }, [isLoading]);

  if (isLoading || !isAssistantReady || !currentAssistant) {
    return <LoadingPage />;
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
            activeBizRotId={activeBizRotId}
          />
        </div>
        <AssistantDrawer
          open={isDrawerOpen}
          shellRect={shellRect}
          currentAssistant={currentAssistant}
          selectedAssistantId={draftAssistant?.partnerAccount ?? null}
          initialViewMode={drawerInitialViewMode}
          onSelectAssistant={setDraftAssistant}
          onConfirm={confirmSwitch}
          onBackdropClick={closeDrawer}
        />
      </div>
    </div>
  );
}

export default WeAgentWebview;
