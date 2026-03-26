import { Root } from 'react-dom/client';
import App, { type AppProps } from '../App';
import AssistantDetail from '../pages/assistantDetail';
import SwitchAssistant from '../pages/switchAssistant';
import type { Message, MessagePart, StreamMessage, SessionMessage, SessionStatus, AgentStatus } from '../types';
export type { AppProps, Message, MessagePart, StreamMessage, SessionMessage, SessionStatus, AgentStatus, };
export { AssistantDetail, SwitchAssistant };
export declare function mountAIChatViewer(container: Element, props?: AppProps): Root;
export declare function unmountAIChatViewer(container: Element): void;
type AppExport = typeof App & {
    mount: typeof mountAIChatViewer;
    unmount: typeof unmountAIChatViewer;
    AssistantDetail: typeof AssistantDetail;
    SwitchAssistant: typeof SwitchAssistant;
};
declare const AppWithMount: AppExport;
export { AppWithMount as App };
export { AppWithMount as AIChatViewer };
export default AppWithMount;
