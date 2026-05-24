// src/components/ChatWidget/ChatWidget.jsx

import { useRef, useEffect } from 'react';
import styles from './ChatWidget.module.css';

import SendIcon from '@/assets/icons/send.svg?react';
import BotIcon  from '@/assets/icons/bot.svg?react';

/**
 * @param {object}   props
 * @param {Array}    props.messages   - [{role, text, time}]
 * @param {boolean}  props.loading
 * @param {string}   props.input
 * @param {Function} props.onInput    - (value: string) => void
 * @param {Function} props.onSend     - () => void
 */
export function ChatWidget({ messages, loading, input, onInput, onSend }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className={styles.widget}>
      {/* Header */}
      <div className={styles.widgetHeader}>
        <div className={styles.botAvatar}>
          <BotIcon /> 
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="8" width="18" height="12" rx="3" stroke="white" strokeWidth="1.5" />
            <circle cx="9"  cy="14" r="1.5" fill="white" />
            <circle cx="15" cy="14" r="1.5" fill="white" />
            <path d="M9 4h6M12 4v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className={styles.botName}>ИИ-агент</p>
          <p className={styles.botStatus}>Онлайн 24/7</p>
        </div>
      </div>

      {/* Messages */}
      <div className={`${styles.messages} scrollbar-thin`}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={[styles.messageRow, m.role === 'user' ? styles.userRow : styles.agentRow].join(' ')}
          >
            <div
              className={[styles.bubble, m.role === 'user' ? styles.userBubble : styles.agentBubble].join(' ')}
            >
              {m.text}
            </div>
            <span className={styles.time}>{m.time}</span>
          </div>
        ))}

        {loading && (
          <div className={`${styles.messageRow} ${styles.agentRow}`}>
            <div className={`${styles.bubble} ${styles.agentBubble} ${styles.typing}`}>
              Печатает<span className={styles.dots}></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => onInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Опишите свою ситуацию"
          aria-label="Сообщение агенту"
        />
        <button
          className={styles.sendBtn}
          onClick={onSend}
          aria-label="Отправить"
          disabled={!input.trim()}
        >
          <SendIcon />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
