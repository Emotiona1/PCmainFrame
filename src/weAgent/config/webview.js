const path = require('path');
import xiaomiHtml from '../webview/xiaomi.html';
import designHelperHtml from '../webview/design-helper.html';
import codingExpertHtml from '../webview/coding-expert.html';
import localEmployeeHtml from '../webview/local-employee.html';

const toDataUrl = (html) =>
  `data:text/html;charset=UTF-8,${encodeURIComponent(html)}`;

const WORKSPACE_BY_KEY = {
  // Legacy workspace keys remain stable so partnerAccount mappings can point to them.
  xiaomi: path.join('CUI', 'xiaomi', 'index.html'),
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
  src: WORKSPACE_BY_KEY.xiaomi,
};

const normalizeWorkspace = (workspace) => {
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

export const getWorkspaceByPartnerAccount = (partnerAccount) => {
  const workspace = partnerAccount ? WORKSPACE_BY_KEY[partnerAccount] : null;

  return normalizeWorkspace(workspace);
};

export const shouldInvokeMethodAForPartnerAccount = () => false;
