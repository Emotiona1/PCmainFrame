let cachedAssistant = null;

const asyncReturn = (value) =>
  new Promise((resolve) => {
    globalThis.setTimeout(() => resolve(value), 0);
  });

const normalizeAssistant = (assistant) => {
  if (typeof assistant === 'string') {
    return { partnerAccount: assistant };
  }

  if (assistant && typeof assistant === 'object') {
    return assistant;
  }

  return null;
};

export const getCachedAssistantId = () => asyncReturn(cachedAssistant);

export const setCachedAssistantId = (assistant) => {
  cachedAssistant = normalizeAssistant(assistant);
  return asyncReturn(cachedAssistant);
};
