import React from 'react';

const mockMessages = [
  { id: 1, sender: 'contact', text: '你好，方案看得怎么样了？', time: '09:12' },
  { id: 2, sender: 'me', text: '我已经看完了，整体没问题。', time: '09:15' },
  { id: 3, sender: 'contact', text: '好，那我今天整理后发你确认。', time: '09:18' },
];

function ChatContentMock() {
  return (
    <div className="chat-panel__mock">
      <div className="chat-panel__history" aria-label="mock chat history">
        {mockMessages.map((message) => (
          <article
            key={message.id}
            className={`chat-bubble-row chat-bubble-row--${message.sender}`}
          >
            <div className="chat-bubble">
              <p className="chat-bubble__text">{message.text}</p>
              <time className="chat-bubble__time">{message.time}</time>
            </div>
          </article>
        ))}
      </div>

      <div className="chat-panel__composer">
        <textarea
          className="chat-panel__input"
          placeholder="输入消息，Enter 发送，Shift + Enter 换行"
          rows={4}
          readOnly
          value=""
        />
        <div className="chat-panel__actions">
          <button type="button" className="chat-panel__button">
            发送
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatContentMock;
