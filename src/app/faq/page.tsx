"use client";

import { useState, useEffect, useRef } from "react";

interface FAQItem { question: string; answer: string; }
interface FAQSection { icon: string; title: string; category: string; items: FAQItem[]; }

const CATEGORIES = [
  { label: "Кредиты и займы",             dot: "#3B82F6" },
  { label: "Банковские услуги",            dot: "#22C55E" },
  { label: "Страхование",                 dot: "#EAB308" },
  { label: "Пенсия и накопления",          dot: "#F97316" },
  { label: "Инвестиции",                  dot: "#A855F7" },
  { label: "Долги и банкротство",          dot: "#EF4444" },
  { label: "Мошенничество и защита прав",  dot: "#F97316" },
  { label: "Налоги",                      dot: "#22C55E" },
];

const FAQ_DATA: FAQSection[] = [
  {
    icon: "💳", title: "Потребительский кредит", category: "Кредиты и займы",
    items: [
      { question: "Хочу взять кредит — с чего начать?", answer: "Проверьте кредитную историю на 1cb.kz (бесплатно 1 раз в год). Рассчитайте допустимый платёж — не более 30–40% от дохода. Сравните ставки в разных банках, обязательно смотрите на ГЭСВ — годовую эффективную ставку, а не рекламную." },
      { question: "Досрочное погашение: как это работает?", answer: "Уведомите банк минимум за 30 дней. По закону РК банк не вправе брать штраф за досрочное погашение (ст. 723 ГК РК). После погашения запросите справку об отсутствии долга." },
      { question: "Банк навязал страховку — могу ли я отказаться?", answer: "Да. В течение 5 рабочих дней с даты подписания вы вправе отказаться от страховки без штрафов (период охлаждения). Заявление подаётся напрямую в страховую компанию, не в банк." },
    ],
  },
  {
    icon: "🚗", title: "Автокредит", category: "Кредиты и займы",
    items: [
      { question: "Какие документы нужны для автокредита?", answer: "Удостоверение личности, справка о доходах (форма 086-У или банковская выписка за 6 месяцев), ИИН. Некоторые банки запрашивают справку из ЕНПФ о пенсионных отчислениях." },
      { question: "Машина в залоге — могу ли я её продать?", answer: "Только с письменного согласия банка. Схема: покупатель оплачивает банку остаток долга → банк снимает обременение → вы получаете разницу. Проверить обременение: egov.kz → «Движимое имущество в залоге»." },
    ],
  },
  {
    icon: "🏠", title: "Ипотека", category: "Кредиты и займы",
    items: [
      { question: "Как использовать материнский капитал для ипотеки?", answer: "Материнский капитал можно использовать как первоначальный взнос или для погашения основного долга. Обратитесь в Отбасы банк с документами: удостоверение, свидетельства о рождении детей, договор купли-продажи." },
      { question: "Что такое ипотечные каникулы?", answer: "Отсрочка платежей по ипотеке на срок до 3 месяцев при сложной жизненной ситуации. Подайте заявление в банк с подтверждающими документами." },
      { question: "Какие государственные программы ипотеки есть в Казахстане?", answer: "Отбасы банк (ставка от 5%), 7-20-25 (новое жильё, взнос 20%, ставка 7%), Баспана Хит (через БРК, ставка от 10.75%). Подробности на baspana.kz." },
    ],
  },
  {
    icon: "🏦", title: "Депозиты", category: "Банковские услуги",
    items: [
      { question: "Банк лишился лицензии — что с моими деньгами?", answer: "Вклады застрахованы в КФГД (kdif.kz) до 20 млн тенге. Выплата в течение 14 дней с момента отзыва лицензии." },
      { question: "Можно ли досрочно снять депозит?", answer: "Зависит от типа депозита. При снятии вклада «без права изъятия» теряете накопленные проценты. Срочные депозиты «с правом изъятия» можно снять, уведомив банк за 5–30 дней." },
    ],
  },
  {
    icon: "🛡️", title: "ОГПО (Обязательное автострахование)", category: "Страхование",
    items: [
      { question: "Попал в ДТП — как получить выплату по ОГПО?", answer: "Оформите ДТП с полицией или по европротоколу. Уведомите страховую в течение 3 рабочих дней. Не ремонтируйте авто до осмотра. Выплата — в течение 15 рабочих дней." },
      { question: "Страховая занизила сумму выплаты — что делать?", answer: "Запросите акт осмотра письменно. Проведите независимую экспертизу. Финансовый омбудсман (finombudsman.kz) — бесплатно, или суд." },
    ],
  },
  {
    icon: "🏥", title: "ОСМС (Медицинское страхование)", category: "Страхование",
    items: [
      { question: "Как проверить свои взносы ОСМС?", answer: "egov.kz → «Проверить статус застрахованного» или eGov Mobile. Работодатель обязан перечислять 2% от зарплаты + 2% за свой счёт." },
      { question: "Как платить ОСМС самозанятому?", answer: "5% от 1,4 МЗП ежемесячно. Оплата через egov.kz или банковское приложение. При неуплате теряется статус застрахованного." },
    ],
  },
  {
    icon: "👴", title: "Пенсионные накопления (ЕНПФ)", category: "Пенсия и накопления",
    items: [
      { question: "Как проверить свои пенсионные накопления?", answer: "egov.kz → «Сведения о пенсионных накоплениях» или приложение ЕНПФ (enpf.kz). Работодатель обязан перечислять 10% от зарплаты ежемесячно." },
      { question: "Работодатель не перечислял взносы — что делать?", answer: "Жалоба в Государственную инспекцию труда (enbek.kz) или прокуратуру. Работодатель несёт уголовную ответственность при систематическом удержании взносов." },
      { question: "Можно ли досрочно снять пенсионные накопления?", answer: "Да: на лечение, на жильё (при превышении порога достаточности), при выезде на ПМЖ. Подача через egov.kz → «Использование пенсионных накоплений»." },
    ],
  },
  {
    icon: "📈", title: "Как начать инвестировать", category: "Инвестиции",
    items: [
      { question: "С чего начать инвестировать в Казахстане?", answer: "Откройте ИИС у брокера из реестра АРРФР (finreg.kz). Начните с государственных облигаций (МЕКАМ). Биржи: KASE (kase.kz) и AIX (aifc.kz)." },
      { question: "Какой налог платить с инвестиций?", answer: "Дивиденды: 15% ИПН. Прирост стоимости: 15% при продаже. При владении более 3 лет и бумага в списке KASE — освобождение от налога." },
    ],
  },
  {
    icon: "⚖️", title: "Банкротство физического лица", category: "Долги и банкротство",
    items: [
      { question: "Кто может объявить себя банкротом в Казахстане?", answer: "Долг от 4 600 000 тенге (300 МРП), просрочка более 12 месяцев, нет имущества для погашения. Внесудебное банкротство через egov.kz." },
      { question: "Что будет с жильём при банкротстве?", answer: "Единственное жильё не изымается (если не ипотечное). Повторное банкротство — не ранее чем через 7 лет." },
    ],
  },
  {
    icon: "🚨", title: "Мошеннические звонки", category: "Мошенничество и защита прав",
    items: [
      { question: "Звонят «от имени банка» — что делать?", answer: "Немедленно положите трубку. Перезвоните сами на официальный номер банка. Банки и госорганы никогда не просят коды из SMS или CVV." },
      { question: "Мошенники взяли кредит на моё имя — что делать?", answer: "Заявление в полицию. Кредитный отчёт на 1cb.kz. Уведомите банк письменно. Жалоба в АРРФР с копией заявления из полиции." },
    ],
  },
  {
    icon: "📋", title: "Декларирование и налоги", category: "Налоги",
    items: [
      { question: "Кто обязан сдавать декларацию в 2025 году?", answer: "Все физические лица, получающие доходы. Форма 250.00 — до 15 сентября за прошлый год. Подача через cabinet.salyk.kz или ЦОН." },
      { question: "Нужно ли платить налог с продажи квартиры?", answer: "Если продали дороже чем купили — разница облагается ИПН 15%. Освобождение: владение более 1 года. Форма 240.00 до 31 марта следующего года." },
    ],
  },
];

// Логотип — золотой герб
function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="19" fill="#C9952A" stroke="#E8B84B" strokeWidth="1.5"/>
      <circle cx="20" cy="20" r="15" fill="#B8841F" stroke="#E8B84B" strokeWidth="0.5"/>
      <text x="20" y="26" textAnchor="middle" fill="#FFF3C4" fontSize="14" fontWeight="bold" fontFamily="serif">Ф</text>
    </svg>
  );
}

// Шеврон вниз
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      style={{ transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
      <path d="M5 7.5L10 12.5L15 7.5" stroke="#00246C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Один вопрос-ответ
function AccordionItem({ question, answer, delay = 0 }: FAQItem & { delay?: number }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
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
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "white",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      >
        <span style={{ color: "#111827", fontWeight: 500, fontSize: "14px", paddingRight: "16px" }}>{question}</span>
        <ChevronDown open={open} />
      </button>
      <div style={{
        maxHeight: open ? "400px" : "0",
        overflow: "hidden",
        transition: "max-height 0.35s ease",
      }}>
        <div style={{ padding: "0 20px 16px", color: "#6B7280", fontSize: "14px", lineHeight: 1.7, borderTop: "1px solid #E5E7EB", paddingTop: "14px" }}>
          {answer}
        </div>
      </div>
    </div>
  );
}

// Хук для анимации появления
function useReveal(delay = 0) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease, transform 0.6s ease` } };
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("Кредиты и займы");
  const [search, setSearch] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [sent, setSent] = useState(false);
  const [parsedFAQs, setParsedFAQs] = useState<FAQItem[]>([]);

  const title1 = useReveal(100);
  const title2 = useReveal(250);
  const subtitle = useReveal(400);
  const searchReveal = useReveal(550);
  const cardReveal = useReveal(300);

  useEffect(() => {
    fetch("/api/faq")
      .then((r) => r.json())
      .then((data) => { if (data.faqs?.length) setParsedFAQs(data.faqs); })
      .catch(() => {});
  }, []);

  const filtered = FAQ_DATA
    .filter((s) => s.category === activeCategory)
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
    .filter((s) => s.items.length > 0);

  const handleSend = () => {
    if (questionText.trim()) {
      setSent(true);
      setQuestionText("");
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>

      {/* ════════════════════════════
          NAVBAR
      ════════════════════════════ */}
      <nav style={{ backgroundColor: "#0B1340", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Лого */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Logo size={36} />
          <div>
            <div style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "0.02em" }}>
              {/* Fin — жёлтый #F5D45A, Gramota — белый */}
              <span style={{ color: "#F5D45A" }}>Fin</span>
              <span style={{ color: "#FFFFFF" }}>Gramota</span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Государственная платформа
            </div>
          </div>
        </div>

        {/* Меню */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {["Главное", "Центр проверки", "Маркетплейс", "Обучение", "Инструменты"].map((item) => (
            <a key={item} href="#" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            >{item}</a>
          ))}
          <a href="/faq" style={{ color: "white", fontWeight: 600, textDecoration: "none", fontSize: "14px" }}>FAQ</a>
        </div>

        {/* Правая часть */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: "4px", fontSize: "14px" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M8 1C8 1 5 4.5 5 8C5 11.5 8 15 8 15" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M8 1C8 1 11 4.5 11 8C11 11.5 8 15 8 15" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M1 8H15" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            RU
          </button>
          {/* Кнопка Личный кабинет — цвет #E0C58F */}
          <button
            style={{ backgroundColor: "#E0C58F", color: "#0B1340", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontWeight: 600, fontSize: "13px", padding: "8px 16px", borderRadius: "8px", transition: "opacity 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Личный кабинет
          </button>
        </div>
      </nav>

      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section style={{ backgroundColor: "#0B1340", padding: "64px 32px", position: "relative", overflow: "hidden" }}>
        {/* Анимированный фон */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none" }}>
          <svg width="100%" height="100%" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMid slice">
            <path d="M0 200 Q360 80 720 200 T1440 200 V420 H0Z" fill="#4B7BF5" opacity="0.5"/>
            <path d="M0 260 Q400 140 800 260 T1440 260 V420 H0Z" fill="#2B5CE6" opacity="0.3"/>
            <circle cx="1280" cy="80" r="220" fill="#3B6CF5" opacity="0.2"/>
            <circle cx="160" cy="340" r="160" fill="#1B3CF5" opacity="0.15"/>
            <circle cx="720" cy="60" r="100" fill="#5B8CF5" opacity="0.1"/>
          </svg>
        </div>

        <div style={{ position: "relative", maxWidth: "1152px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "flex-start" }}>
          {/* Левая часть */}
          <div>
            <div ref={title1.ref} style={title1.style}>
              <h1 style={{ fontSize: "48px", fontWeight: 800, color: "white", lineHeight: 1.2, margin: 0 }}>
                Часто задаваемые
              </h1>
            </div>
            <div ref={title2.ref} style={title2.style}>
              <h1 style={{ fontSize: "48px", fontWeight: 800, color: "white", lineHeight: 1.2, margin: "0 0 16px" }}>
                вопросы
              </h1>
            </div>
            <div ref={subtitle.ref} style={subtitle.style}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.7, marginBottom: "28px", maxWidth: "420px" }}>
                Найдите быстрые ответы на свои вопросы о финансовых инструментах и безопасности.
              </p>
            </div>
            <div ref={searchReveal.ref} style={searchReveal.style}>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Опишите вашу проблему или задайте вопрос..."
                  style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", padding: "13px 44px 13px 16px", fontSize: "13px", color: "white", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#F5D45A")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
                />
                <svg style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }} width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="7.5" cy="7.5" r="6" stroke="white" strokeWidth="1.5"/>
                  <path d="M12 12L16 16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Карточка "Задать вопрос" — 80% прозрачность */}
          <div ref={cardReveal.ref} style={{ ...cardReveal.style, backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", borderRadius: "20px", padding: "24px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#00246C" strokeWidth="1.5"/>
                <text x="10" y="15" textAnchor="middle" fill="#00246C" fontSize="11" fontWeight="bold">?</text>
              </svg>
              <h3 style={{ color: "#111827", fontWeight: 600, fontSize: "15px", margin: 0 }}>Задать вопрос</h3>
            </div>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Опишите вашу ситуацию..."
              rows={4}
              style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "12px 16px", fontSize: "13px", color: "#111827", outline: "none", resize: "none", marginBottom: "16px", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#00246C")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
            />
            <div style={{ display: "flex", gap: "8px" }}>
              {/* Кнопка Отправить — цвет #00246C */}
              <button
                onClick={handleSend}
                style={{ flex: 1, backgroundColor: "#00246C", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontWeight: 600, fontSize: "14px", padding: "13px", borderRadius: "12px", transition: "opacity 0.2s, transform 0.1s" }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {sent ? "✓ Отправлено!" : (
                  <>
                    Отправить
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8L14 2L8 14L7 9L2 8Z" fill="white"/>
                    </svg>
                  </>
                )}
              </button>
              <button
                style={{ width: "46px", height: "46px", border: "1px solid #E5E7EB", borderRadius: "12px", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F3F4F6")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 3h3l1.5 4-2 1.5a11 11 0 005 5L12 11l4 1.5V15a2 2 0 01-2 2C6.477 17 1 11.523 1 5a2 2 0 012-2z" stroke="#6B7280" strokeWidth="1.3" fill="none"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          КОНТЕНТ — БЕЛЫЙ
      ════════════════════════════ */}
      <section style={{ backgroundColor: "white", padding: "40px 32px" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto" }}>

          {/* Категории */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
            {CATEGORIES.map((cat, i) => {
              const active = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => { setActiveCategory(cat.label); setSearch(""); }}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "8px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 500,
                    cursor: "pointer", border: active ? "1px solid #00246C" : "1px solid #E5E7EB",
                    backgroundColor: active ? "#00246C" : "white",
                    color: active ? "white" : "#374151",
                    transition: "all 0.2s",
                    opacity: 0, animation: `fadeSlideUp 0.4s ease ${i * 60}ms forwards`,
                  }}
                  onMouseEnter={(e) => { if (!active) { e.currentTarget.style.borderColor = "#00246C"; e.currentTarget.style.color = "#00246C"; } }}
                  onMouseLeave={(e) => { if (!active) { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.color = "#374151"; } }}
                >
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0, backgroundColor: active ? "white" : cat.dot }} />
                  {cat.label}
                </button>
              );
            })}
            {/* Особый таб */}
            <button
              onClick={() => { setActiveCategory("Как пользоваться сайтом"); setSearch(""); }}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 500,
                cursor: "pointer",
                border: activeCategory === "Как пользоваться сайтом" ? "1px solid #00246C" : "1px solid #00246C",
                backgroundColor: activeCategory === "Как пользоваться сайтом" ? "#00246C" : "#00246C",
                color: "white", transition: "all 0.2s",
                opacity: 0, animation: `fadeSlideUp 0.4s ease ${CATEGORIES.length * 60}ms forwards`,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6.5" stroke="white" strokeWidth="1.2"/>
                <text x="7" y="11" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">?</text>
              </svg>
              Как пользоваться сайтом
            </button>
          </div>

          {/* Парсенные */}
          {parsedFAQs.length > 0 && (
            <div style={{ marginBottom: "24px", padding: "16px", backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "12px" }}>
              <p style={{ color: "#00246C", fontSize: "12px", fontWeight: 600, marginBottom: "12px" }}>Актуальные вопросы с fingramota.kz</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {parsedFAQs.map((item, i) => <AccordionItem key={i} {...item} delay={i * 80} />)}
              </div>
            </div>
          )}

          {/* FAQ секции */}
          {filtered.length > 0 ? (
            filtered.map((section, si) => (
              <div key={si} style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "22px" }}>{section.icon}</span>
                  <h2 style={{ color: "#00246C", fontWeight: 700, fontSize: "18px", margin: 0 }}>{section.title}</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {section.items.map((item, ii) => (
                    <AccordionItem key={ii} {...item} delay={ii * 80} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
              <p style={{ color: "#111827", fontWeight: 500 }}>По запросу ничего не найдено.</p>
              <p style={{ color: "#6B7280", fontSize: "14px", marginTop: "4px" }}>Попробуйте другую категорию или задайте вопрос выше.</p>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════
          FOOTER
      ════════════════════════════ */}
      <footer style={{ backgroundColor: "#0B1340", padding: "48px 32px" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px", marginBottom: "40px" }}>
          {/* Лого */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Logo size={32} />
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700 }}>
                  <span style={{ color: "#F5D45A" }}>Fin</span>
                  <span style={{ color: "white" }}>Gramota</span>
                </div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Государственная платформа</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", lineHeight: 1.7, marginBottom: "20px" }}>
              Ваш надёжный проводник в мире финансов. Мы помогаем гражданам принимать осознанные решения и защищаем от мошенников.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                <path key="fb" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" fill="currentColor"/>,
                <><rect key="ig-r" x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" fill="none"/><circle key="ig-c" cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/><circle key="ig-d" cx="17.5" cy="6.5" r="1" fill="currentColor"/></>,
                <path key="tw" d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" fill="currentColor"/>,
                <path key="yt" d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" fill="currentColor"/>,
              ].map((icon, i) => (
                <a key={i} href="#" style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">{icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Платформа */}
          <div>
            <h4 style={{ color: "#60A5FA", fontWeight: 600, fontSize: "13px", marginBottom: "16px" }}>Платформа</h4>
            {["Вакансии", "Партнёры", "О проекте", "Новости"].map((item) => (
              <a key={item} href="#" style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "12px", marginBottom: "10px", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >{item}</a>
            ))}
          </div>

          {/* Инструменты */}
          <div>
            <h4 style={{ color: "#60A5FA", fontWeight: 600, fontSize: "13px", marginBottom: "16px" }}>Инструменты</h4>
            {["Кредитный калькулятор", "Проверка брокера", "Сообщить о мошенничестве", "Финансовый словарь"].map((item) => (
              <a key={item} href="#" style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "12px", marginBottom: "10px", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >{item}</a>
            ))}
          </div>

          {/* Контакты */}
          <div>
            <h4 style={{ color: "#60A5FA", fontWeight: 600, fontSize: "13px", marginBottom: "16px" }}>Контакты</h4>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "12px" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                <path d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4z" stroke="#60A5FA" strokeWidth="1.2"/>
                <circle cx="7" cy="5" r="1.5" stroke="#60A5FA" strokeWidth="1.2"/>
              </svg>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", lineHeight: 1.6 }}>г. Астана, пр. Мангилик Ел, 55А,<br/>БЦ "Байтерек"</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2h3l1 3-1.5 1.5a9 9 0 004 4L10 9l3 1v2.5A1.5 1.5 0 0111.5 14C5.149 14 0 8.851 0 2.5A1.5 1.5 0 012 1V2z" stroke="#60A5FA" strokeWidth="1.2" fill="none"/>
              </svg>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 500 }}>1459 (Call-center)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="#60A5FA" strokeWidth="1.2"/>
                <path d="M1 4l6 4 6-4" stroke="#60A5FA" strokeWidth="1.2"/>
              </svg>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>info@fingramota.kz</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="#" style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >Политика конфиденциальности</a>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>© 2026 FinGramota. Все права защищены.</span>
          <a href="#" style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >Условия использования</a>
        </div>
      </footer>

      {/* Глобальные анимации */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.4); }
        textarea::placeholder { color: #9CA3AF; }
      `}</style>
    </div>
  );
}
