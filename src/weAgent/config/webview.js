import xiaomiHtml from '../webview/xiaomi.html';
import aiChatViewerHtml from '../webview/ai-chat-viewer.html';
import designHelperHtml from '../webview/design-helper.html';
import codingExpertHtml from '../webview/coding-expert.html';
import localEmployeeHtml from '../webview/local-employee.html';

const toDataUrl = (html) =>
  `data:text/html;charset=UTF-8,${encodeURIComponent(html)}`;

export const WORKSPACE_BY_ASSISTANT_ID = {
  xiaomi: toDataUrl(xiaomiHtml),
  'ai-chat-viewer': toDataUrl(aiChatViewerHtml),
  'helper-pro': toDataUrl(designHelperHtml),
  'coding-expert': toDataUrl(codingExpertHtml),
  'local-employee': toDataUrl(localEmployeeHtml),
  'base-employee': {
    type: 'placeholder',
    placeholderId: 'AIAssistantWeAgentContainter',
  },
};

export const DEFAULT_WORKSPACE = {
  type: 'webview',
  src: WORKSPACE_BY_ASSISTANT_ID.xiaomi,
};

export const getWorkspaceByAssistantId = (assistantId) => {
  const workspace = WORKSPACE_BY_ASSISTANT_ID[assistantId];

  if (!workspace) {
    return DEFAULT_WORKSPACE;
  }

  if (typeof workspace === 'string') {
    return {
      type: 'webview',
      src: workspace,
    };
  }

  return workspace;
};
