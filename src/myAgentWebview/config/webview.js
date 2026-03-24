import xiaomiHtml from '../webview/xiaomi.html';
import designHelperHtml from '../webview/design-helper.html';
import codingExpertHtml from '../webview/coding-expert.html';
import opsAssistantHtml from '../webview/ops-assistant.html';
import serviceBotHtml from '../webview/service-bot.html';

const toDataUrl = (html) =>
  `data:text/html;charset=UTF-8,${encodeURIComponent(html)}`;

export const WEBVIEW_SRC_BY_ASSISTANT_ID = {
  xiaomi: toDataUrl(xiaomiHtml),
  'helper-pro': toDataUrl(designHelperHtml),
  'coding-expert': toDataUrl(codingExpertHtml),
  'ops-assistant': toDataUrl(opsAssistantHtml),
  'service-bot': toDataUrl(serviceBotHtml),
};

export const DEFAULT_WEBVIEW_SRC = WEBVIEW_SRC_BY_ASSISTANT_ID.xiaomi;

export const getWebviewSrcByAssistantId = (assistantId) =>
  WEBVIEW_SRC_BY_ASSISTANT_ID[assistantId] ?? DEFAULT_WEBVIEW_SRC;
