let cachedAssistantId = null;

const asyncReturn = (value) =>
  new Promise((resolve) => {
    globalThis.setTimeout(() => resolve(value), 0);
  });

export const getCachedAssistantId = () => asyncReturn(cachedAssistantId);

export const setCachedAssistantId = (assistantId) => {
  cachedAssistantId = assistantId;
  return asyncReturn(assistantId);
};
