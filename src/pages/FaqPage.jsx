import { useState, useEffect, useRef } from "react";
import {
  mdiCreditCardOutline,
  mdiCar,
  mdiBank,
  mdiMagnify,
  mdiShieldCheck,
  mdiChartLine,
} from "@mdi/js";
import MdiIcon from "../components/MdiIcon";

const CATEGORIES = [
  { label: "Кредиты и займы", dot: "#3B82F6" },
  { label: "Банковские услуги", dot: "#22C55E" },
  { label: "Страхование", dot: "#EAB308" },
  { label: "Пенсия и накопления", dot: "#F97316" },
  { label: "Инвестиции", dot: "#A855F7" },
  { label: "Долги и банкротство", dot: "#EF4444" },
  { label: "Мошенничество и защита прав", dot: "#F97316" },
  { label: "Налоги", dot: "#22C55E" },
];

const FAQ_DATA = [
  {
    icon: mdiCreditCardOutline,
    title: "Потребительский кредит",
    category: "Кредиты и займы",
    items: [
      {
        question: "Хочу взять кредит — с чего начать?",
        answer:
          "Проверьте кредитную историю. Рассчитайте допустимый платёж — не более 30–40% от дохода. Сравните ставки в разных банках.",
      },
      {
        question: "Досрочное погашение: как это работает?",
        answer:
          "Уведомите банк заранее. После погашения запросите справку об отсутствии долга.",
      },
      {
        question: "Банк навязал страховку — могу ли я отказаться?",
        answer:
          "Да, можно обратиться в страховую компанию и уточнить условия отказа от страховки.",
      },
    ],
  },
  {
    icon: mdiCar,
    title: "Автокредит",
    category: "Кредиты и займы",
    items: [
      {
        question: "Какие документы нужны для автокредита?",
        answer:
          "Обычно нужны удостоверение личности, ИИН и документы, подтверждающие доход.",
      },
      {
        question: "Машина в залоге — могу ли я её продать?",
        answer:
          "Только с согласия банка, потому что автомобиль находится в залоге.",
      },
    ],
  },
  {
    icon: mdiBank,
    title: "Депозиты",
    category: "Банковские услуги",
    items: [
      {
        question: "Можно ли досрочно снять депозит?",
        answer:
          "Зависит от условий депозита. Иногда при досрочном снятии теряется часть процентов.",
      },
    ],
  },
  {
    icon: mdiShieldCheck,
    title: "Страхование",
    category: "Страхование",
    items: [
      {
        question: "Зачем нужно страхование?",
        answer:
          "Страхование помогает снизить финансовые риски при непредвиденных ситуациях.",
      },
    ],
  },
  {
    icon: mdiChartLine,
    title: "Инвестиции",
    category: "Инвестиции",
    items: [
      {
        question: "С чего начать инвестировать?",
        answer:
          "Сначала изучите риски, выберите лицензированного брокера и не вкладывайте деньги, которые не готовы потерять.",
      },
    ],
  },
];

function ChevronDown({ open }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      style={{
        transition: "transform 0.3s ease",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        flexShrink: 0,
      }}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="#112250"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AccordionItem({ question, answer, delay = 0 }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: "14px",
        overflow: "hidden",
        backgroundColor: "white",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 22px",
          textAlign: "left",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            color: "#111827",
            fontWeight: 600,
            fontSize: "15px",
            paddingRight: "16px",
          }}
        >
          {question}
        </span>

        <ChevronDown open={open} />
      </button>

      <div
        style={{
          maxHeight: open ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <div
          style={{
            padding: "0 22px 18px",
            color: "#6B7280",
            fontSize: "14px",
            lineHeight: 1.7,
            borderTop: "1px solid #E5E7EB",
            paddingTop: "14px",
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

function useReveal(delay = 0) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
    },
  };
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("Кредиты и займы");
  const [search, setSearch] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [sent, setSent] = useState(false);
  const [parsedFAQs, setParsedFAQs] = useState([]);

  const title1 = useReveal(100);
  const title2 = useReveal(250);
  const subtitle = useReveal(400);
  const searchReveal = useReveal(550);
  const cardReveal = useReveal(300);

  useEffect(() => {
    fetch("/api/faq")
      .then((res) => res.json())
      .then((data) => {
        if (data.faqs?.length) setParsedFAQs(data.faqs);
      })
      .catch(() => {});
  }, []);

  const filtered = FAQ_DATA
    .filter((section) => section.category === activeCategory)
    .map((section) => {
      if (!search) return section;

      return {
        ...section,
        items: section.items.filter(
          (item) =>
            item.question.toLowerCase().includes(search.toLowerCase()) ||
            item.answer.toLowerCase().includes(search.toLowerCase())
        ),
      };
    })
    .filter((section) => section.items.length > 0);

  const handleSend = () => {
    if (!questionText.trim()) return;

    setSent(true);
    setQuestionText("");

    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <section
        style={{
          backgroundColor: "#112250",
          padding: "90px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.12,
            pointerEvents: "none",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 1440 420">
            <path
              d="M0 200 Q360 80 720 200 T1440 200 V420 H0Z"
              fill="#4B7BF5"
              opacity="0.5"
            />
            <path
              d="M0 260 Q400 140 800 260 T1440 260 V420 H0Z"
              fill="#2B5CE6"
              opacity="0.3"
            />
          </svg>
        </div>

        <div
          style={{
            position: "relative",
            maxWidth: "1240px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div ref={title1.ref} style={title1.style}>
              <h1
                style={{
                  fontSize: "56px",
                  fontWeight: 900,
                  color: "white",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                Часто задаваемые
              </h1>
            </div>

            <div ref={title2.ref} style={title2.style}>
              <h1
                style={{
                  fontSize: "56px",
                  fontWeight: 900,
                  color: "white",
                  lineHeight: 1.1,
                  margin: "0 0 18px",
                }}
              >
                вопросы
              </h1>
            </div>

            <div ref={subtitle.ref} style={subtitle.style}>
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                  maxWidth: "440px",
                }}
              >
                Найдите быстрые ответы на свои вопросы о финансовых
                инструментах и безопасности.
              </p>
            </div>

            <div ref={searchReveal.ref} style={searchReveal.style}>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Опишите вашу проблему или задайте вопрос..."
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "14px",
                    padding: "15px 48px 15px 18px",
                    fontSize: "14px",
                    color: "white",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />

            <div
            style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            >
            <MdiIcon path={mdiMagnify} size={25} />
            </div>
              </div>
            </div>
          </div>

          <div
            ref={cardReveal.ref}
            style={{
              ...cardReveal.style,
              backgroundColor: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(12px)",
              borderRadius: "22px",
              padding: "28px",
              boxShadow: "0 18px 42px rgba(0,0,0,0.24)",
            }}
          >
            <h3
              style={{
                color: "#111827",
                fontWeight: 800,
                fontSize: "20px",
                margin: "0 0 16px",
              }}
            >
              Задать вопрос
            </h3>

            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Опишите вашу ситуацию..."
              rows={5}
              style={{
                width: "100%",
                border: "1px solid #E5E7EB",
                borderRadius: "14px",
                padding: "14px 16px",
                fontSize: "14px",
                color: "#111827",
                outline: "none",
                resize: "none",
                marginBottom: "16px",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />

            <button
              onClick={handleSend}
              style={{
                width: "100%",
                backgroundColor: "#112250",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "15px",
                padding: "14px",
                borderRadius: "14px",
              }}
            >
              {sent ? "✓ Отправлено!" : "Отправить"}
            </button>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "white", padding: "48px 32px 90px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "36px",
            }}
          >
            {CATEGORIES.map((cat, index) => {
              const active = activeCategory === cat.label;

              return (
                <button
                  key={cat.label}
                  onClick={() => {
                    setActiveCategory(cat.label);
                    setSearch("");
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "10px 18px",
                    borderRadius: "999px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: active ? "1px solid #112250" : "1px solid #E5E7EB",
                    backgroundColor: active ? "#112250" : "white",
                    color: active ? "white" : "#374151",
                    opacity: 0,
                    animation: `fadeSlideUp 0.4s ease ${
                      index * 60
                    }ms forwards`,
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: active ? "white" : cat.dot,
                    }}
                  />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {parsedFAQs.length > 0 && (
            <div
              style={{
                marginBottom: "24px",
                padding: "16px",
                backgroundColor: "#EFF6FF",
                border: "1px solid #BFDBFE",
                borderRadius: "14px",
              }}
            >
              <p
                style={{
                  color: "#112250",
                  fontSize: "13px",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                Актуальные вопросы с fingramota.kz
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {parsedFAQs.map((item, index) => (
                  <AccordionItem key={index} {...item} delay={index * 80} />
                ))}
              </div>
            </div>
          )}

          {filtered.length > 0 ? (
            filtered.map((section, sectionIndex) => (
              <div key={sectionIndex} style={{ marginBottom: "34px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      background: "rgba(17,34,80,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#112250",
                      flexShrink: 0,
                    }}
                  >
                    <MdiIcon path={section.icon} size={22} />
                  </div>

                  <h2
                    style={{
                      color: "#112250",
                      fontWeight: 800,
                      fontSize: "22px",
                      margin: 0,
                    }}
                  >
                    {section.title}
                  </h2>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {section.items.map((item, index) => (
                    <AccordionItem key={index} {...item} delay={index * 80} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div
                style={{
                    width: "70px",
                    height: "70px",
                    margin: "0 auto 16px",
                    borderRadius: "20px",
                    background: "rgba(17,34,80,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#112250",
                }}
                >
                <MdiIcon path={mdiMagnify} size={38} />
                </div>
              <p style={{ color: "#111827", fontWeight: 600 }}>
                По запросу ничего не найдено.
              </p>
              <p style={{ color: "#6B7280", fontSize: "14px" }}>
                Попробуйте другую категорию или задайте вопрос выше.
              </p>
            </div>
          )}
        </div>
      </section>

      <style>
        {`
          @keyframes fadeSlideUp {
            from {
              opacity: 0;
              transform: translateY(12px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          input::placeholder {
            color: rgba(255,255,255,0.45);
          }

          textarea::placeholder {
            color: #9CA3AF;
          }
        `}
      </style>
    </div>
  );
}