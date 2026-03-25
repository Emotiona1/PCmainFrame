import React from 'react';
import { HeaderArtifact } from './integrations/HeaderArtifact';
import ChatWorkspace from './components/ChatWorkspace';
import AssistantDrawer from './components/AssistantDrawer';
import { getWorkspaceByAssistantId } from './config/webview';
import './styles/global.css';
import './styles/chat.css';

const assistants = [
  {
    id: 'xiaomi',
    name: '小咪',
    avatar: '咪',
    assistantId: 'XM-001',
    intro: '产品维护知识入口，一站式查看常见问题与处理建议。',
    product: '产品维护平台',
    owner: '产品支持团队',
    accountStatus: '运行中',
    description: '产品维护知识入口，一站式查看常见问题与处理建议。',
  },
  {
    id: 'helper-pro',
    name: '设计小助手',
    avatar: '设',
    assistantId: 'DS-102',
    intro: '设计师一枚，有专业设计能力，适合处理设计类咨询。',
    product: '设计协作平台',
    owner: '设计支持组',
    accountStatus: '运行中',
    description: '设计师一枚，有专业设计能力。',
  },
  {
    id: 'coding-expert',
    name: '编程专家',
    avatar: '程',
    assistantId: 'CODE-301',
    intro: '专业的 Java 助手，代码编写能力较强。',
    product: '研发知识平台',
    owner: '开发支持组',
    accountStatus: '运行中',
    description: '专业的 Java 助手，代码编写能力较强。',
  },
  {
    id: 'local-employee',
    name: '本地员工助手',
    avatar: '员',
    assistantId: 'EMP-208',
    intro: '可在本地环境提供常见流程支持和业务协助。',
    product: '本地员工平台',
    owner: '员工支持组',
    accountStatus: '运行中',
    description: '可在本地环境提供常见流程支持和业务协助。',
  },
  {
    id: 'base-employee',
    name: '基座员工助手',
    avatar: '基',
    assistantId: 'BASE-409',
    intro: '提供基座能力入口与通用员工接入支持。',
    product: '员工基座平台',
    owner: '平台基座组',
    accountStatus: '运行中',
    description: '提供基座能力入口与通用员工接入支持。',
  },
];

function MyAgentWebview() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [currentAssistantId, setCurrentAssistantId] = React.useState(
    assistants[0].id,
  );
  const [draftAssistantId, setDraftAssistantId] = React.useState(
    assistants[0].id,
  );
  const shellRef = React.useRef(null);
  const [shellRect, setShellRect] = React.useState(null);

  const currentAssistant =
    assistants.find((assistant) => assistant.id === currentAssistantId) ??
    assistants[0];

  const draftAssistant =
    assistants.find((assistant) => assistant.id === draftAssistantId) ??
    currentAssistant;

  const currentWorkspace = getWorkspaceByAssistantId(currentAssistant.id);

  const openDrawer = () => {
    setDraftAssistantId(currentAssistant.id);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setDraftAssistantId(currentAssistant.id);
  };

  const confirmSwitch = () => {
    setCurrentAssistantId(draftAssistant.id);
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
  }, [isDrawerOpen]);

  return (
    <div className="myAgentWebview">
      <div className="page">
        <div ref={shellRef} className="chat-shell">
          <HeaderArtifact
            name={currentAssistant.name}
            intro={currentAssistant.intro}
            onOpenSettings={openDrawer}
          />
          <ChatWorkspace drawerOpen={isDrawerOpen} workspace={currentWorkspace} />
        </div>
        <AssistantDrawer
          open={isDrawerOpen}
          shellRect={shellRect}
          currentAssistant={currentAssistant}
          assistants={assistants}
          selectedAssistantId={draftAssistant.id}
          onSelectAssistant={setDraftAssistantId}
          onCancel={closeDrawer}
          onConfirm={confirmSwitch}
          onBackdropClick={closeDrawer}
        />
      </div>
    </div>
  );
}

export default MyAgentWebview;
