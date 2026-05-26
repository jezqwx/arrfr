import { useEffect, useRef, useState } from "react";
import "./SosPage.css";

import MdiIcon from "../components/MdiIcon";

import {
  mdiFlash,
  mdiPhone,
  mdiChatProcessingOutline,
  mdiClockOutline,
  mdiContentCopy,
  mdiCheck,
  mdiShieldCheck,
  mdiBank,
  mdiOfficeBuilding,
  mdiHeartOutline,
  mdiFileDocumentOutline,
  mdiScaleBalance,
  mdiDownload,
  mdiRobotOutline,
  mdiSend,
  mdiAccountGroup,
} from "@mdi/js";

const SUPPORT_PHONE = "1459";
const SUPPORT_PHONE_DISPLAY = "1459";

const EMERGENCY_CONTACTS = [
  {
    icon: mdiOfficeBuilding,
    title: "АРРФР",
    subtitle: "Горячая линия финансового регулятора",
    hours: "Пн–Пт",
    phone: "1459",
  },
  {
    icon: mdiFileDocumentOutline,
    title: "Минфин РК",
    subtitle: "Налоги и государственные закупки",
    hours: "Пн–Пт",
    phone: "1484 / 8-800-080-30-84",
  },
  {
    icon: mdiShieldCheck,
    title: "Генеральная прокуратура",
    subtitle: "Круглосуточный телефон доверия",
    hours: "24/7",
    phone: "115",
  },
  {
    icon: mdiScaleBalance,
    title: "Финансовый мониторинг",
    subtitle: "Противодействие коррупции",
    hours: "24/7",
    phone: "1424",
  },
  {
    icon: mdiAccountGroup,
    title: "Egov",
    subtitle: "Единый контакт-центр госуслуг",
    hours: "24/7",
    phone: "1414 / 8-800-080-7777",
  },
  {
    icon: mdiBank,
    title: "Kaspi Bank",
    subtitle: "Городская линия для звонков из-за рубежа",
    hours: "Международная линия",
    phone: "+7 (727) 258-59-89",
  },
  {
    icon: mdiBank,
    title: "Halyk Bank",
    subtitle: "Городская линия для звонков из-за рубежа",
    hours: "Международная линия",
    phone: "+7 (727) 259-07-77",
  },
  {
    icon: mdiBank,
    title: "Банк ЦентрКредит",
    subtitle: "Городская линия для звонков из-за рубежа",
    hours: "Международная линия",
    phone: "+7 (727) 244-30-00",
  },
  {
    icon: mdiBank,
    title: "ForteBank",
    subtitle: "Городская линия для звонков из-за рубежа",
    hours: "Международная линия",
    phone: "+7 (727) 258-40-40",
  },
];

const DOCUMENT_TEMPLATES = [
  {
    icon: mdiFileDocumentOutline,
    title: "Заявление о мошенничестве",
    description: "Шаблон для обращения в правоохранительные органы.",
    files: [
      { url: "/documents/Заявление.pdf",                    filename: "Заявление_о_мошенничестве.pdf" },
      { url: "/documents/Заявление_каз.pdf",       filename: "ҚЫЛМЫСТЫҚ_ҚҰҚЫҚ_БҰЗУШЫЛЫҚ_ТУРАЛЫ_АРЫЗ.pdf" },
    ],
  },
  {
    icon: mdiBank,
    title: "Обращение в банк",
    description: "Форма для срочной блокировки операции или карты.",
    files: [
      { url: "/documents/банкжалоба.pdf",     filename: "ЖАЛОБА_на_неправомерные_действия_банка.pdf" },
      { url: "/documents/банкжалоба_каз.pdf",                                 filename: "Банкқа_шағым.pdf" },
    ],
  },
  {
    icon: mdiScaleBalance,
    title: "Жалоба регулятору",
    description: "Документ для защиты прав потребителя финансовых услуг.",
    files: [], // прикрепишь позже
  },
];

const AGENT_FEATURES = [
  "Пошаговая инструкция действий",
  "Подсказка, куда обратиться",
  "Помощь в составлении обращения",
];

const TRUST_ITEMS = [
  {
    icon: mdiAccountGroup,
    title: "Поддержка граждан",
    description: "Вы не остаётесь один на один с проблемой.",
  },
  {
    icon: mdiHeartOutline,
    title: "Безопасность",
    description: "Мы помогаем действовать быстро и спокойно.",
  },
  {
    icon: mdiScaleBalance,
    title: "Защита прав",
    description: "Финансовые права можно и нужно защищать.",
  },
];

const INITIAL_MESSAGES = [
  {
    role: "agent",
    text: "Здравствуйте! Опишите вашу ситуацию, и я подскажу первые шаги.",
    time: "09:00",
  },
];

function now() {
  return new Date().toLocaleTimeString("ru", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return [copied, copy];
}

function useReveal(delay = 0) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(26px)",
    transition: "opacity 0.65s ease, transform 0.65s ease",
  };
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="sos-section-header">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

function ContactCard({ icon, title, subtitle, hours, phone }) {
  const [copied, copy] = useCopyToClipboard();

  return (
    <article className="sos-contact-card">
      <div className="sos-card-head">
        <div className="sos-icon-wrap">
          <MdiIcon path={icon} size={26} />
        </div>

        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>

          <div className="sos-hours">
            <MdiIcon path={mdiClockOutline} size={15} />
            <span>{hours}</span>
          </div>
        </div>
      </div>

      <div className="sos-card-actions">
        <button className="sos-phone-btn" type="button">
          <MdiIcon path={mdiPhone} size={18} />
          {phone}
        </button>

        <button
          className="sos-copy-btn"
          type="button"
          onClick={() => copy(phone)}
          title={copied ? "Скопировано!" : "Копировать"}
          aria-label="Копировать номер"
        >
          <MdiIcon path={copied ? mdiCheck : mdiContentCopy} size={18} />
        </button>
      </div>
    </article>
  );
}

function DocCard({ icon, title, description, files }) {
  const handleDownloadAll = () => {
    files.forEach(({ url, filename }) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <article className="sos-doc-card">
      <div className="sos-icon-wrap light">
        <MdiIcon path={icon} size={28} />
      </div>

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <button type="button" onClick={handleDownloadAll}>
        <MdiIcon path={mdiDownload} size={18} />
        Скачать
      </button>
    </article>
  );
}

function ChatWidget({ messages, loading, input, onInput, onSend }) {
  const messagesEndRef = useRef(null);

    useEffect(() => {
      if (messages.length <= 1 && !loading) return;

      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, [messages, loading]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <div className="sos-chat">
      <div className="sos-chat-header">
        <div className="sos-bot-avatar">
          <MdiIcon path={mdiRobotOutline} size={22} />
        </div>

        <div>
          <b>ИИ-агент</b>
          <span>Онлайн 24/7</span>
        </div>
      </div>

      <div className="sos-messages">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`sos-message-row ${
              message.role === "user" ? "user" : "agent"
            }`}
          >
            <div className="sos-bubble">{message.text}</div>
            <small>{message.time}</small>
          </div>
        ))}

        {loading && (
          <div className="sos-message-row agent">
            <div className="sos-bubble">Печатает...</div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="sos-input-row">
        <input
          value={input}
          onChange={(event) => onInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Опишите свою ситуацию"
          aria-label="Сообщение ИИ-агенту"
        />

        <button
          type="button"
          onClick={onSend}
          disabled={!input.trim()}
          aria-label="Отправить"
        >
          <MdiIcon path={mdiSend} size={20} />
        </button>
      </div>
    </div>
  );
}

export default function SosPage() {
  const [copied, copy] = useCopyToClipboard();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const badgeReveal = useReveal(100);
  const titleReveal = useReveal(220);
  const textReveal = useReveal(340);
  const cardReveal = useReveal(480);
  const contactsReveal = useReveal(180);
  const docsReveal = useReveal(260);
  const agentReveal = useReveal(340);
  const trustReveal = useReveal(420);

  const handleSend = () => {
    const text = input.trim();

    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
        time: now(),
      },
    ]);

    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          text: "Сначала заблокируйте карту или счёт, затем обратитесь в банк и сохраните все доказательства.",
          time: now(),
        },
      ]);

      setLoading(false);
    }, 900);
  };

  return (
    <div className="sos-page">
      <section className="sos-hero">
        <svg className="sos-waves" viewBox="0 0 1000 400" aria-hidden="true">
          <path d="M0,200 C200,100 400,300 600,200 S800,100 1000,200 V400 H0Z" />
          <path d="M0,250 C150,150 350,350 550,250 S750,150 1000,250 V400 H0Z" />
        </svg>

        <div className="sos-hero-content">
          <div className="sos-badge" style={badgeReveal}>
            <MdiIcon path={mdiFlash} size={16} />
            <span>Линия защиты 3: Реакция</span>
          </div>

          <h1 style={titleReveal}>Центр экстренного реагирования</h1>

          <p style={textReveal}>
            Каждая минута важна для возврата средств и защиты прав.
            <br />
            Если уже произошёл инцидент — действуйте быстро.
          </p>

          <div className="sos-support-card" style={cardReveal}>
            <div className="sos-card-head">
              <div className="sos-icon-wrap">
                <MdiIcon path={mdiChatProcessingOutline} size={24} />
              </div>

              <div>
                <h3>Поддержка</h3>
                <p>Заявление о мошенничестве</p>

                <div className="sos-hours">
                  <MdiIcon path={mdiClockOutline} size={15} />
                  <span>24/7</span>
                </div>
              </div>
            </div>

            <div className="sos-card-actions">
              <button className="sos-phone-btn" type="button">
                <MdiIcon path={mdiPhone} size={16} />
                {SUPPORT_PHONE_DISPLAY}
              </button>

              <button
                className="sos-copy-btn"
                type="button"
                onClick={() => copy(SUPPORT_PHONE)}
                title={copied ? "Скопировано!" : "Копировать номер"}
                aria-label="Копировать номер телефона"
              >
                <MdiIcon path={copied ? mdiCheck : mdiContentCopy} size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="sos-section" style={contactsReveal}>
        <SectionHeader
          title="Экстренные контакты"
          subtitle="Сохраните эти номера — они могут понадобиться в критической ситуации"
        />

        <div className="sos-contacts-grid">
          {EMERGENCY_CONTACTS.map((contact, index) => (
            <div
              key={contact.title}
              style={{
                opacity: contactsReveal.opacity,
                transform:
                  contactsReveal.opacity === 1
                    ? "translateY(0)"
                    : "translateY(22px)",
                transition: `opacity 0.55s ease ${
                  index * 90
                }ms, transform 0.55s ease ${index * 90}ms`,
              }}
            >
              <ContactCard {...contact} />
            </div>
          ))}
        </div>
      </section>

      <section className="sos-section light" style={docsReveal}>
        <SectionHeader
          title="Шаблоны документов"
          subtitle="Готовые формы для подачи заявлений и жалоб"
        />

        <div className="sos-grid">
          {DOCUMENT_TEMPLATES.map((doc, index) => (
            <div
              key={doc.title}
              style={{
                opacity: docsReveal.opacity,
                transform:
                  docsReveal.opacity === 1
                    ? "translateY(0)"
                    : "translateY(22px)",
                transition: `opacity 0.55s ease ${
                  index * 90
                }ms, transform 0.55s ease ${index * 90}ms`,
              }}
            >
              <DocCard {...doc} />
            </div>
          ))}
        </div>
      </section>

      <section className="sos-agent-section" style={agentReveal}>
        <div className="sos-agent-copy">
          <p>ИИ-АГЕНТ В ПОМОЩИ</p>
          <h2>Помощь в любое время</h2>

          <span>
            Опишите вашу ситуацию нашему ИИ-агенту. Он выдаст пошаговую
            инструкцию действий и подскажет куда обратиться.
          </span>

          <ul>
            {AGENT_FEATURES.map((feature) => (
              <li key={feature}>
                <MdiIcon path={mdiCheck} size={14} />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <ChatWidget
          messages={messages}
          loading={loading}
          input={input}
          onInput={setInput}
          onSend={handleSend}
        />
      </section>

      <section className="sos-trust" style={trustReveal}>
        <div className="sos-top-icon">
          <MdiIcon path={mdiShieldCheck} size={48} />
        </div>

        <SectionHeader
          title="Государство на вашей стороне"
          subtitle="Мы помогаем гражданам защищать свои права при любых финансовых угрозах"
        />

        <div className="sos-grid">
          {TRUST_ITEMS.map((item, index) => (
            <article
              className="sos-trust-card"
              key={item.title}
              style={{
                opacity: trustReveal.opacity,
                transform:
                  trustReveal.opacity === 1
                    ? "translateY(0)"
                    : "translateY(22px)",
                transition: `opacity 0.55s ease ${
                  index * 90
                }ms, transform 0.55s ease ${index * 90}ms`,
              }}
            >
              <div className="sos-icon-wrap light">
                <MdiIcon path={item.icon} size={26} />
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}