// src/sections/AIAgent/AIAgent.jsx

import { useState }                              from 'react';
import { ChatWidget }                            from '@/components/ChatWidget';
import { sendAgentMessage }                      from '@/services/api';
import { INITIAL_MESSAGES, AGENT_FEATURES }      from '@/constants/agent';
import styles                                    from './AIAgent.module.css';

// TODO: import CheckIcon from '@/assets/icons/check.svg?react';

function now() {
  return new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' });
}

export function AIAgent() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input,    setInput]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { role: 'user', text, time: now() };
    const updated = [...messages, userMsg];

    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const reply = await sendAgentMessage(updated);
      setMessages((prev) => [...prev, { role: 'agent', text: reply, time: now() }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'agent', text: 'Ошибка соединения. Позвоните на 1459.', time: '--:--' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* ── Left: copy ─────────────────── */}
        <div className={styles.copy}>
          <p className={styles.eyebrow}>ИИ-АГЕНТ В ПОМОЩИ</p>
          <h2 className={styles.heading}>Помощь в любое время</h2>
          <p className={styles.body}>
            Если вас обманули и вам нужна поддержка — опишите вашу ситуацию нашему ИИ-агенту.
            Он выдаст пошаговую инструкцию действий и подскажет куда обратиться.
          </p>

          <ul className={styles.features} role="list">
            {AGENT_FEATURES.map((feat) => (
              <li key={feat} className={styles.feature}>
                <span className={styles.checkWrap} aria-hidden="true">
                  {/* TODO: <CheckIcon /> */}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                {feat}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right: chat ────────────────── */}
        <ChatWidget
          messages={messages}
          loading={loading}
          input={input}
          onInput={setInput}
          onSend={handleSend}
        />
      </div>
    </section>
  );
}
