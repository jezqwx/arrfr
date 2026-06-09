import { useState, useMemo, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./MarketplacePage.css";
import MdiIcon from "../components/MdiIcon";
import {
  mdiCreditCardOutline,
  mdiPiggyBankOutline,
  mdiHomeOutline,
  mdiCardAccountDetailsOutline,
  mdiTrendingUp,
  mdiAlertCircleOutline,
  mdiMagnify,
  mdiTuneVariant,
  mdiChevronDown,
  mdiChevronUp,
  mdiCancel,
  mdiCloseCircleOutline,
  mdiTimerOutline,
  mdiChartLineVariant,
  mdiOpenInNew,
  mdiCheckCircleOutline,
  mdiLayersOutline,
  mdiClose,
  mdiRefresh,
} from "@mdi/js";

function useRevealOnScroll() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return {
    ref,
    className: visible ? "mp-reveal mp-reveal--visible" : "mp-reveal",
  };
}

// ── Data ──────────────────────────────────────────────────────────

const TABS = [
  { id: "credits",     label: "Кредиты",               icon: mdiCreditCardOutline },
  { id: "deposits",    label: "Депозиты",               icon: mdiPiggyBankOutline },
  { id: "mortgage",    label: "Ипотека",                icon: mdiHomeOutline },
  { id: "debit",       label: "Дебетовые карты и счета",icon: mdiCardAccountDetailsOutline },
  { id: "investments", label: "Инвестиционные продукты",icon: mdiTrendingUp },
];

const TAB_DATA = {
  credits: {
    title: "Потребительские кредиты",
    subtitle: "Кредит на личные расходы без залога: ремонт, техника, обучение, лечение или другие цели",
    tips: [
      { color: "red",    icon: mdiCancel,          text: "Низкая ставка — не всегда низкая переплата" },
      { color: "blue",   icon: mdiMagnify,          text: "Смотрите на ГЭСВ" },
      { color: "yellow", icon: mdiTimerOutline,     text: "Чем длиннее срок — тем выше переплата" },
      { color: "green",  icon: mdiChartLineVariant, text: "Досрочное погашение уменьшает переплату" },
    ],
  },
  deposits: {
    title: "Депозиты",
    subtitle: "Депозит - это вклад, на котором клиент хранит деньги и получает вознаграждение от банка",
    tips: [
      { color: "red",    icon: mdiCancel,          text: "Высокая ставка часто означает ограничения по снятию" },
      { color: "blue",   icon: mdiMagnify,          text: "Смотрите на ГЭСВ, а не только на номинальную ставку" },
      { color: "yellow", icon: mdiTimerOutline,     text: "Депозиты в РК гарантируются КФГД в пределах установленных лимитов" },
      { color: "green",  icon: mdiChartLineVariant, text: "Важно проверить возможность пополнения" },
    ],
  },
  mortgage: {
    title: "Ипотека",
    subtitle: "Ипотека - это кредит на покупку жилья. Обычно требует первоначальный взнос и оформляется на длительный срок",
    tips: [
      { color: "red",    icon: mdiCancel,          text: "Условия зависят от типа жилья: первичное, вторичное, ДДУ" },
      { color: "blue",   icon: mdiMagnify,          text: "Смотрите ГЭСВ, а не только ставку" },
      { color: "yellow", icon: mdiTimerOutline,     text: "Чем больше срок - тем выше переплата" },
      { color: "green",  icon: mdiChartLineVariant, text: "Первоначальный взнос сильно влияет на платёж" },
    ],
  },
  debit: {
    title: "Дебетовые карты и счета",
    subtitle: "Дебетовая карта — это карта для хранения денег, переводов, оплаты покупок, снятия наличных и получения зарплаты",
    tips: [
      { color: "red",    icon: mdiCancel,          text: "Смотрите комиссии за снятие и переводы" },
      { color: "blue",   icon: mdiMagnify,          text: "Уточняйте лимиты на бесплатные операции" },
      { color: "yellow", icon: mdiTimerOutline,     text: "Кешбэк не должен быть главным критерием, важнее комиссии и удобство" },
      { color: "green",  icon: mdiChartLineVariant, text: "Проверьте стоимость обслуживания" },
    ],
  },
  investments: {
    title: "Инвестиционные продукты",
    subtitle: "Инвестиционные продукты - это инструменты для покупки ценных бумаг, фондов, валютных активов или других финансовых инструментов",
    tips: [
      { color: "red",    icon: mdiCancel,          text: "Инвестиции не являются депозитом" },
      { color: "blue",   icon: mdiMagnify,          text: "Доходность не гарантирована" },
      { color: "yellow", icon: mdiTimerOutline,     text: "Возможна потеря части или всей суммы" },
      { color: "green",  icon: mdiChartLineVariant, text: "Важно проверять лицензию брокера и комиссии" },
    ],
  },
};

const BANKS = [
  {
    id: "halyk",
    name: "Halyk Bank",
    amount: "до 8 000 000 ₸",
    rate: "от 17.5%",
    term: "до 60 месяцев",
    gesv: "39.10 %",
    features: [
      "Онлайн оформление через Homebank",
      "Возможен кредит без справки о доходах",
      "Бесплатное досрочное погашение",
      "Для зарплатных клиентов условия лучше",
    ],
    note: "в самом сайте есть калькулятор , который может пригодится в работе.",
    link: "https://homebank.kz",
    tags: ["online", "no-pledge", "early"],
  },
  {
    id: "kaspi",
    name: "Kaspi Bank",
    amount: "до 5 000 000 ₸",
    rate: "от 19%",
    term: "до 48 месяцев",
    gesv: "42.00 %",
    features: [
      "Оформление через Kaspi.kz или приложение",
      "Решение за 5 минут",
      "Без поручителей и залога",
    ],
    note: "Один из самых быстрых кредитов — всё онлайн.",
    link: "https://kaspi.kz",
    tags: ["online", "no-pledge", "no-guarantor"],
  },
  {
    id: "centercredit",
    name: "CenterCredit Bank",
    amount: "до 10 000 000 ₸",
    rate: "от 16%",
    term: "до 84 месяцев",
    gesv: "35.50 %",
    features: [
      "Длительный срок кредитования",
      "Возможно оформление с поручителем",
      "Гибкий график погашения",
    ],
    note: "Подходит для крупных покупок с длинным сроком.",
    link: "https://bcc.kz",
    tags: ["online", "early"],
  },
  {
    id: "freedom",
    name: "Freedom",
    amount: "до 6 000 000 ₸",
    rate: "от 18%",
    term: "до 60 месяцев",
    gesv: "40.20 %",
    features: [
      "Онлайн-заявка без визита в банк",
      "Страхование по желанию",
      "Досрочное погашение без штрафа",
    ],
    note: "Хороший вариант для онлайн-оформления.",
    link: "https://ffin.kz",
    tags: ["online", "no-pledge", "early"],
  },
  {
    id: "bereke",
    name: "Bereke Bank",
    amount: "до 7 000 000 ₸",
    rate: "от 20%",
    term: "до 60 месяцев",
    gesv: "44.00 %",
    features: [
      "Без залога и поручителей",
      "Онлайн-оформление доступно",
      "Возможна реструктуризация",
    ],
    note: "Подходит если нет зарплатной карты в крупных банках.",
    link: "https://berekebank.kz",
    tags: ["online", "no-pledge", "no-guarantor"],
  },
  {
    id: "alatau",
    name: "Alatau City Bank",
    amount: "до 3 000 000 ₸",
    rate: "от 22%",
    term: "до 36 месяцев",
    gesv: "48.00 %",
    features: [
      "Минимальный пакет документов",
      "Для новых клиентов особые условия",
    ],
    note: "Небольшие суммы, быстрое рассмотрение.",
    link: "https://alataucitybank.kz",
    tags: ["online"],
  },
];

// ── Calculator logic ───────────────────────────────────────────────
function calcCredit(amount, months, rate) {
  const r = rate / 100 / 12;
  if (r === 0) {
    const monthly = amount / months;
    return { monthly, total: amount, overpay: 0 };
  }
  const monthly = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const total = monthly * months;
  const overpay = total - amount;
  return { monthly: Math.round(monthly), total: Math.round(total), overpay: Math.round(overpay) };
}

function fmt(n) {
  return n.toLocaleString("ru-RU");
}

// ── Filter panel ───────────────────────────────────────────────────
function FilterPanel({ onClose, filters, onChange }) {
  const creditTypes = ["Потребительский", "Авто", "Микрокредит"];
  const conditions = [
    { key: "online",       label: "Онлайн-оформление",             sub: "Без визита в отделение" },
    { key: "no-pledge",    label: "Без залога",                    sub: "Не требуется имущество в обеспечение" },
    { key: "no-guarantor", label: "Без поручения",                 sub: "Только на основании дохода заёмщика" },
    { key: "early",        label: "Досрочное погашение без штрафа",sub: "Можно закрыть кредит раньше срока" },
  ];

  return (
    <div className="mp-filter-overlay" onClick={onClose}>
      <div className="mp-filter-panel" onClick={e => e.stopPropagation()}>
        <div className="mp-filter-head">
          <div>
            <h3>Фильтр банков</h3>
            <p>Найдено {BANKS.length} банков</p>
          </div>
          <button className="mp-filter-reset" onClick={() => onChange({ type: "Потребительский", tags: [] })}>
            Сбросить
          </button>
        </div>

        <div className="mp-filter-body">
          <div className="mp-filter-section">
            <h4>Тип кредита</h4>
            <div className="mp-filter-types">
              {creditTypes.map(t => (
                <button
                  key={t}
                  type="button"
                  className={`mp-filter-type-btn ${filters.type === t ? "mp-filter-type-btn--active" : ""}`}
                  onClick={() => onChange({ ...filters, type: t })}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mp-filter-section">
            <h4>Условия оформления</h4>
            {conditions.map(c => (
              <label key={c.key} className="mp-filter-check">
                <span className={`mp-filter-check__box ${filters.tags.includes(c.key) ? "mp-filter-check__box--checked" : ""}`}
                  onClick={() => {
                    const tags = filters.tags.includes(c.key)
                      ? filters.tags.filter(t => t !== c.key)
                      : [...filters.tags, c.key];
                    onChange({ ...filters, tags });
                  }}
                >
                  {filters.tags.includes(c.key) && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  )}
                </span>
                <div>
                  <p className="mp-filter-check__label">{c.label}</p>
                  <p className="mp-filter-check__sub">{c.sub}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="mp-filter-section">
            <h4>Страхование депозитов(КФГД)</h4>
            <label className="mp-filter-check">
              <span className={`mp-filter-check__box ${filters.tags.includes("kfgd") ? "mp-filter-check__box--checked" : ""}`}
                onClick={() => {
                  const tags = filters.tags.includes("kfgd")
                    ? filters.tags.filter(t => t !== "kfgd")
                    : [...filters.tags, "kfgd"];
                  onChange({ ...filters, tags });
                }}
              >
                {filters.tags.includes("kfgd") && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                )}
              </span>
              <div>
                <p className="mp-filter-check__label">Только участники КФГД</p>
                <p className="mp-filter-check__sub">Вклады защищены государство до 20 млн тенге</p>
              </div>
            </label>
          </div>
        </div>

        <button className="mp-filter-apply" onClick={onClose}>
          Показать банки
          <MdiIcon path={mdiOpenInNew} size={18} />
        </button>
      </div>
    </div>
  );
}

function TipCard({ tip, delay = 0 }) {
  const reveal = useRevealOnScroll();

  return (
    <div
      ref={reveal.ref}
      className={`mp-tip ${reveal.className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`mp-tip__icon mp-tip__icon--${tip.color}`}>
        <MdiIcon path={tip.icon} size={22} />
      </div>
      <p>{tip.text}</p>
    </div>
  );
}

function BankCard({ bank, open, onToggle, delay = 0 }) {
  const reveal = useRevealOnScroll();

  return (
    <div
      ref={reveal.ref}
      className={`mp-bank ${reveal.className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button type="button" className="mp-bank__head" onClick={onToggle}>
        <span className="mp-bank__name">{bank.name}</span>
        <MdiIcon path={open ? mdiChevronUp : mdiChevronDown} size={24} />
      </button>

      {open && (
        <div className="mp-bank__body">
          <div className="mp-bank__params">
            <span><strong>Сумма:</strong> {bank.amount}</span>
            <span><strong>Ставка:</strong> {bank.rate}</span>
            <span><strong>Срок:</strong> {bank.term}</span>
            <span><strong>ГЭСВ:</strong> {bank.gesv}</span>
          </div>

          <div className="mp-bank__features-head">
            <div className="mp-bank__feat-icon">
              <MdiIcon path={mdiCardAccountDetailsOutline} size={18} />
            </div>
            <strong>Особенности</strong>
          </div>

          <ul className="mp-bank__features">
            {bank.features.map((f, i) => (
              <li key={i}>
                <MdiIcon path={mdiCheckCircleOutline} size={18} />
                {f}
              </li>
            ))}
          </ul>

          <div className="mp-bank__note">
            <p><strong>ВАЖНО:</strong> {bank.note}</p>
            <a
              href={bank.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mp-bank__link"
            >
              <MdiIcon path={mdiOpenInNew} size={16} />
              Ссылка
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────
export default function MarketplacePage() {
  const location = useLocation();

useEffect(() => {
  if (location.hash === "#calculator") {
    setTimeout(() => {
      document.getElementById("calculator")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }
}, [location]);
  const [activeTab,   setActiveTab]   = useState("credits");
  const [openBanks,   setOpenBanks]   = useState({});
  const [search,      setSearch]      = useState("");
  const [showFilter,  setShowFilter]  = useState(false);
  const [filters,     setFilters]     = useState({ type: "Потребительский", tags: [] });

  // Calculator state
  const [calcMode,    setCalcMode]    = useState("new"); // "new" | "existing"
  const [amount,      setAmount]      = useState(3000000);
  const [months,      setMonths]      = useState(24);
  const [rate,        setRate]        = useState(20);
  const [calcBank,    setCalcBank]    = useState("Халык Банк - Потребительский кредит - ГЭСВ до 25%");

  const result = calcCredit(amount, months, rate);
  const overpayPct = amount > 0 ? Math.round((result.overpay / amount) * 100) : 0;

  const tab = TAB_DATA[activeTab];
  const heroTitleReveal = useRevealOnScroll();
  const heroSubReveal = useRevealOnScroll();
  const heroNoticeReveal = useRevealOnScroll();

  const tabsReveal = useRevealOnScroll();

  const sectionTitleReveal = useRevealOnScroll();
  const sectionSubReveal = useRevealOnScroll();
  const searchReveal = useRevealOnScroll();

  const calcTitleReveal = useRevealOnScroll();
  const calcSubReveal = useRevealOnScroll();
  const calcCardReveal = useRevealOnScroll();

  const toggleBank = (id) =>
    setOpenBanks(prev => ({ ...prev, [id]: !prev[id] }));

  const filteredBanks = useMemo(() => {
    return BANKS.filter(b => {
      const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
      const matchTags   = filters.tags.length === 0 || filters.tags.every(t => b.tags.includes(t));
      return matchSearch && matchTags;
    });
  }, [search, filters]);

  return (
    <div className="mp-page">

      {/* ── Hero ── */}
      <section className="mp-hero">
      <img src="/bg-mrkp.svg" alt="" className="mp-hero__bg" />

      <h1
        ref={heroTitleReveal.ref}
        className={`mp-hero__title ${heroTitleReveal.className}`}
        style={{ transitionDelay: "100ms" }}
      >
        Финансовый маркетплейс
      </h1>

      <p
        ref={heroSubReveal.ref}
        className={`mp-hero__sub ${heroSubReveal.className}`}
        style={{ transitionDelay: "220ms" }}
      >
        Сравнивайте банковские продукты осознанно - с прозрачными условиями,
        расчетами и официальной информацией
      </p>

      <div
        ref={heroNoticeReveal.ref}
        className={`mp-hero__notice ${heroNoticeReveal.className}`}
        style={{ transitionDelay: "340ms" }}
      >
        <MdiIcon path={mdiAlertCircleOutline} size={20} />
        <div>
          <p><strong>FinGramota не продаёт финансовые продукты и не принимает заявки.</strong></p>
          <p>Платформа помогает понять условия банков, сравнить предложения и избежать скрытых переплат</p>
        </div>
      </div>
    </section>

      {/* ── Sticky tabs ── */}
      <div
        ref={tabsReveal.ref}
        className={`mp-tabs-bar ${tabsReveal.className}`}
      >
        <div className="mp-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`mp-tab ${activeTab === t.id ? "mp-tab--active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              <MdiIcon path={t.icon} size={18} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Section ── */}
      <section className="mp-section">

        {/* Title */}
        <h2
          ref={sectionTitleReveal.ref}
          className={`mp-section__title ${sectionTitleReveal.className}`}
        >
          {tab.title}
        </h2>

        <p
          ref={sectionSubReveal.ref}
          className={`mp-section__sub ${sectionSubReveal.className}`}
          style={{ transitionDelay: "100ms" }}
        >
          {tab.subtitle}
        </p>

        <div className="mp-tips">
          {tab.tips.map((tip, i) => (
            <TipCard key={`${activeTab}-${i}`} tip={tip} delay={i * 80} />
          ))}
        </div>

        {/* Search + Filter */}
        <div
          ref={searchReveal.ref}
          className={`mp-search-row ${searchReveal.className}`}
          style={{ transitionDelay: "220ms" }}
        >
          <div className="mp-search-wrap">
            <MdiIcon path={mdiMagnify} size={20} />
            <input
              className="mp-search"
              type="text"
              placeholder=""
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="mp-filter-btn"
            onClick={() => setShowFilter(true)}
          >
            <MdiIcon path={mdiTuneVariant} size={18} />
            Фильтр
          </button>
        </div>

        {/* Banks accordion */}
        <div className="mp-banks">
          {filteredBanks.map((bank, index) => (
            <BankCard
              key={bank.id}
              bank={bank}
              open={openBanks[bank.id]}
              onToggle={() => toggleBank(bank.id)}
              delay={index * 80}
            />
          ))}

          {filteredBanks.length === 0 && (
            <div className="mp-banks__empty">
              Банки не найдены. Измените параметры поиска.
            </div>
          )}
        </div>
      </section>

      {/* ── Calculator ── */}
      <section id="calculator" className="mp-calc-section">
        <img src="/bg-mrkp-calc.svg"  alt="" className="mp-calc__bg" />
        <h2
          ref={calcTitleReveal.ref}
          className={`mp-calc__title ${calcTitleReveal.className}`}
        >
          Калькулятор кредита
        </h2>
        <p
          ref={calcSubReveal.ref}
          className={`mp-calc__sub ${calcSubReveal.className}`}
          style={{ transitionDelay: "100ms" }}
        >
          {calcBank}
        </p>

        <div
          ref={calcCardReveal.ref}
          className={`mp-calc-card ${calcCardReveal.className}`}
          style={{ transitionDelay: "220ms" }}
        >

          <div className="mp-calc-card">
            {/* Mode switcher */}
            <p className="mp-calc__mode-label">Ваша ситуация</p>
            <div className="mp-calc__modes">
              <button
                type="button"
                className={`mp-calc__mode ${calcMode === "new" ? "mp-calc__mode--active" : ""}`}
                onClick={() => setCalcMode("new")}
              >
                <MdiIcon path={mdiCloseCircleOutline} size={22} />
                <div>
                  <strong>Хочу взять кредит</strong>
                  <span>Ещё нет кредита в этом банке</span>
                </div>
              </button>
              <button
                type="button"
                className={`mp-calc__mode ${calcMode === "existing" ? "mp-calc__mode--active" : ""}`}
                onClick={() => setCalcMode("existing")}
              >
                <MdiIcon path={mdiLayersOutline} size={22} />
                <div>
                  <strong>У меня уже есть кредит</strong>
                  <span>Хочу понять переплату или досрочку</span>
                </div>
              </button>
            </div>

            <div className="mp-calc__body">
              {/* Left: sliders */}
              <div className="mp-calc__left">
                {/* Amount */}
                <div className="mp-calc__field">
                  <div className="mp-calc__field-head">
                    <label>Сумма кредита</label>
                    <div className="mp-calc__input-wrap">
                      <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                      />
                      <span>₸</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={50000}
                    max={5000000}
                    step={50000}
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                    className="mp-calc__range"
                  />
                  <div className="mp-calc__range-labels">
                    <span>50 тыс</span>
                    <span>5 млн</span>
                  </div>
                </div>

                {/* Term */}
                <div className="mp-calc__field">
                  <div className="mp-calc__field-head">
                    <label>Срок</label>
                    <div className="mp-calc__input-wrap">
                      <input
                        type="number"
                        value={months}
                        onChange={e => setMonths(Number(e.target.value))}
                      />
                      <span>мес</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={120}
                    value={months}
                    onChange={e => setMonths(Number(e.target.value))}
                    className="mp-calc__range"
                  />
                  <div className="mp-calc__range-labels">
                    <span>3 мес</span>
                    <span>120 мес</span>
                  </div>
                </div>

                {/* Rate */}
                <div className="mp-calc__field">
                  <div className="mp-calc__field-head">
                    <label>Процентная ставка</label>
                    <div className="mp-calc__input-wrap">
                      <input
                        type="number"
                        value={rate}
                        onChange={e => setRate(Number(e.target.value))}
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={56}
                    value={rate}
                    onChange={e => setRate(Number(e.target.value))}
                    className="mp-calc__range"
                  />
                  <div className="mp-calc__range-labels">
                    <span>5%</span>
                    <span>56%(макс)</span>
                  </div>
                </div>
              </div>

              {/* Right: results */}
              <div className="mp-calc__right">
                <div className="mp-calc__results">
                  <div className="mp-calc__result-item">
                    <span>Ежемесячный платёж</span>
                    <strong>{fmt(result.monthly)} ₸</strong>
                  </div>
                  <div className="mp-calc__result-item">
                    <span>Общая выплата</span>
                    <strong>{fmt(result.total)} ₸</strong>
                  </div>
                  <div className="mp-calc__result-item mp-calc__result-item--gold">
                    <span>Переплата</span>
                    <strong>{fmt(result.overpay)} ₸</strong>
                  </div>
                  <div className="mp-calc__result-item mp-calc__result-item--gold">
                    <span>Ставка ГЭСВ</span>
                    <strong>{rate}%</strong>
                  </div>
                </div>

                {/* Bar chart */}
                <div className="mp-calc__bars">
                  <div className="mp-calc__bar-row">
                    <span>Основной долг</span>
                    <span>{fmt(amount)} ₸</span>
                  </div>
                  <div className="mp-calc__bar-track">
                    <div className="mp-calc__bar-fill mp-calc__bar-fill--navy"
                      style={{ width: `${Math.min((amount / result.total) * 100, 100)}%` }} />
                  </div>

                  <div className="mp-calc__bar-row" style={{ marginTop: 12 }}>
                    <span>Переплата (проценты)</span>
                    <span>{fmt(result.overpay)} ₸</span>
                  </div>
                  <div className="mp-calc__bar-track">
                    <div className="mp-calc__bar-fill mp-calc__bar-fill--red"
                      style={{ width: `${Math.min((result.overpay / result.total) * 100, 100)}%` }} />
                  </div>
                </div>

                <p className="mp-calc__advice">
                  Переплата — {overpayPct}% от суммы. Чем короче срок, тем
                  меньше итоговая переплата — попробуйте сдвинуть ползунок срока влево
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter panel ── */}
      {showFilter && (
        <FilterPanel
          onClose={() => setShowFilter(false)}
          filters={filters}
          onChange={setFilters}
        />
      )}
    </div>
  );
}
