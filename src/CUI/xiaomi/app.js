(function () {
  const history = document.getElementById('history');
  const input = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');

  const createRow = (side, text, meta) => {
    const row = document.createElement('div');
    row.className = `row row--${side}`;

    const avatar = document.createElement('div');
    avatar.className = `avatar avatar--${side}`;
    avatar.textContent = side === 'left' ? '咪' : '我';

    const bubble = document.createElement('div');
    bubble.className = `bubble bubble--${side}`;

    const paragraph = document.createElement('p');
    paragraph.className = 'bubble__text';
    paragraph.textContent = text;

    const time = document.createElement('span');
    time.className = 'bubble__meta';
    time.textContent = meta;

    bubble.appendChild(paragraph);
    bubble.appendChild(time);

    if (side === 'left') {
      row.appendChild(avatar);
      row.appendChild(bubble);
    } else {
      row.appendChild(bubble);
      row.appendChild(avatar);
    }

    return row;
  };

  const scrollToBottom = () => {
    history.scrollTop = history.scrollHeight;
  };

  const sendMessage = () => {
    const value = input.value.trim();

    if (!value) {
      return;
    }

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    history.appendChild(createRow('right', value, `${hours}:${minutes}`));
    input.value = '';
    scrollToBottom();
  };

  sendButton.addEventListener('click', sendMessage);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  scrollToBottom();
})();
