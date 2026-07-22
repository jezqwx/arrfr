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
  mdiAccountOutline,
  mdiCellphone,
  mdiGiftOutline,
  mdiShieldLockOutline,
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
  { id: "credits",     label: "Кредиты",                icon: mdiCreditCardOutline },
  { id: "deposits",    label: "Депозиты",               icon: mdiPiggyBankOutline },
  { id: "mortgage",    label: "Ипотека",                icon: mdiHomeOutline },
  { id: "debit",       label: "Дебетовые карты и счета",icon: mdiCardAccountDetailsOutline },
  { id: "investments", label: "Инвестиционные продукты",icon: mdiTrendingUp },
  { id: "services",    label: "Сервисы для физ. лиц",   icon: mdiAccountOutline },
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
  services: {
    title: "Сервисы для физ. лиц",
    subtitle: "",
    tips: [],
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

function ServiceAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mp-service-acc mp-service-acc--fico">
      <button className="mp-service-acc__head" onClick={() => setOpen(!open)}>
        <span className="mp-service-acc__title">Персональный кредитный скоринг One FICO</span>
        <MdiIcon path={open ? mdiChevronUp : mdiChevronDown} size={24} />
      </button>

      {open && (
        <div className="mp-service-acc__body">
          <div className="mp-service-acc__text">
            <p>
              Скоринг One FICO – это инструмент для оценки уровня кредитного риска заемщика. Кредитный скоринг это числовой показатель кредитоспособности клиента (физического лица) для банков и иных финансовых организаций, арендодателей движимого и недвижимого имущества и сотовых операторов.
            </p>
            <p>
              FICO (Fair Isaac Corporation) – это международный лидер в области скоринговых решений. Сегодня практически все решения в США принимаются с участием скорингов FICO. FICO® Score – персональный кредитный скоринг, который может использоваться как для кредитования, так и для предоставления аренды квартир, автомобилей и других услуг. FICO работает со многими кредитными бюро в мире, в том числе в США, Турции, Европейском регионе, России, Израиле, в странах Ближнего Востока, Юго-Восточной Азии и в других регионах.
            </p>
            <p>
              ПКБ является официальным провайдером FICO с 2014 года и имеет лицензию для распространения и реализации скорингов FICO, в том числе в Казахстане, Кыргызстане, Беларуси, Молдове и в других странах.
            </p>
          </div>

          <div className="mp-service-acc__cards">
            <div className="mp-service-card">
              <MdiIcon path={mdiChartLineVariant} size={22} />
              <span>Быстрый анализ вашей кредитной привлекательности</span>
            </div>
            <div className="mp-service-card">
              <MdiIcon path={mdiPiggyBankOutline} size={22} />
              <span>Оплата через баланс мобильного телефона</span>
            </div>
            <div className="mp-service-card">
              <MdiIcon path={mdiOpenInNew} size={22} />
              <span>Быстрое получение на сайте и в мобильном приложении</span>
            </div>
          </div>

          <ServiceInfo />
        </div>
      )}
    </div>
  );
}

function openStopCreditService(event) {
  event.preventDefault();
  window.dispatchEvent(new Event("open-stop-credit-service"));
}

function MobileAppAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mp-service-acc mp-service-acc--mobile">
      <button className="mp-service-acc__head" onClick={() => setOpen(!open)}>
        <span className="mp-service-acc__title">Мобильное приложение 1cb.kz</span>
        <MdiIcon path={open ? mdiChevronUp : mdiChevronDown} size={24} />
      </button>

      {open && (
        <div className="mp-service-acc__body mp-mobile-app">
          <div className="mp-service-acc__text">
            <p>
              Мобильное приложение 1cb.kz – это приложение, с помощью которого вы получаете безопасный и удобный доступ ко всем сервисам 1cb.kz прямо со своего мобильного телефона.
            </p>
            <p>
              Приложение 1cb.kz доступно в <a href="https://apps.apple.com/ru/app/1cb-kz/id1571443906" target="_blank" rel="noopener noreferrer">AppStore</a>, <a href="https://play.google.com/store/apps/details?id=kz.fcbk.android" target="_blank" rel="noopener noreferrer">Google Play</a> и <a href="https://appgallery.huawei.com/app/C110304717?sharePrepath=ag&locale=ru_RU&source=appshare&subsource=C110304717&shareTo=com.android.bluetooth&shareFrom=appmarket&shareIds=ac31248604df4868baf94a76e2aff6f9_com.android.bluetooth&callType=SHARE" target="_blank" rel="noopener noreferrer">AppGallery</a>
            </p>
          </div>

          <div className="mp-mobile-app__features">
            <div className="mp-mobile-app__feature">
              <MdiIcon path={mdiTimerOutline} size={50} />
              <span>24/7</span>
            </div>
            <div className="mp-mobile-app__feature">
              <MdiIcon path={mdiCardAccountDetailsOutline} size={50} />
              <span>Без ЭЦП</span>
            </div>
            <div className="mp-mobile-app__feature">
              <MdiIcon path={mdiOpenInNew} size={50} />
              <span>Онлайн за 1 минуту</span>
            </div>
          </div>

          <div className="mp-service-info__section mp-mobile-app__benefits">
            <h3>Преимущества приложения:</h3>
            <ol>
              <li>Быстрая регистрация и авторизация через биометрию лица.</li>
              <li>Облегчённое подписание документов одним нажатием через ЭЦП ФСВКеу.</li>
              <li>Выпуски отзывов ФСВКеу в самом приложении всего за 1 минуту.</li>
              <li>Проверка подлинности ранее подписанных документов через ФСВКеу.</li>
              <li>Новые способы оплаты.</li>
              <li>Возможность мониторинга своей кредитной истории 24/7.</li>
            </ol>
          </div>

          <div className="mp-mobile-app__download">
            <h3>Скачать приложение 1cb.kz</h3>
            <div className="mp-mobile-app__stores">
              <a
                className="mp-mobile-app__store"
                href="https://play.google.com/store/apps/details?id=kz.fcbk.android"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mp-mobile-app__store-icon mp-mobile-app__store-icon--google">▶</span>
                <span><small>ДОСТУПНО В</small>Google Play</span>
              </a>
              <a
                className="mp-mobile-app__store"
                href="https://apps.apple.com/ru/app/1cb-kz/id1571443906"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mp-mobile-app__store-icon mp-mobile-app__store-icon--apple">●</span>
                <span><small>ЗАГРУЗИТЕ В</small>App Store</span>
              </a>
              <a
                className="mp-mobile-app__store"
                href="https://appgallery.huawei.com/app/C110304717?sharePrepath=ag&locale=ru_RU&source=appshare&subsource=C110304717&shareTo=com.android.bluetooth&shareFrom=appmarket&shareIds=ac31248604df4868baf94a76e2aff6f9_com.android.bluetooth&callType=SHARE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mp-mobile-app__store-icon mp-mobile-app__store-icon--huawei">H</span>
                <span><small>ОТКРОЙТЕ В</small>AppGallery</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FcbKeyAccordion() {
  const [open, setOpen] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const subscribeLink = "https://www.1cb.kz/no-permission?mathURL=profile%2Fstopcredit-main";

  return (
    <div className="mp-service-acc mp-service-acc--fcbkey">
      <button className="mp-service-acc__head" onClick={() => setOpen(!open)}>
        <span className="mp-service-acc__title">ЭЦП FCBKey</span>
        <MdiIcon path={open ? mdiChevronUp : mdiChevronDown} size={24} />
      </button>

      {open && (
        <div className="mp-service-acc__body mp-fcbkey">
          <div className="mp-service-acc__text">
            <p>
              <strong>ЭЦП FCBKey</strong> - это цифровая подпись, которой вы можете воспользоваться на данном портале для получения любого сервиса ПКБ. Благодаря ЭЦП FCBKey вы можете получать информацию о кредитной истории не только через десктоп, но и через мобильное устройство. Достаточно авторизоваться в мобильном приложении 1cb.kz, чтобы получить доступ ко всем сервисам ПКБ без наличия классического ЭЦП.
            </p>
          </div>

          <div className="mp-fcbkey__features">
            <div className="mp-fcbkey__feature">
              <MdiIcon path={mdiCellphone} size={36} />
              <span>Можно использовать с мобильного телефона</span>
            </div>
            <div className="mp-fcbkey__feature">
              <MdiIcon path={mdiGiftOutline} size={36} />
              <span>ЭЦП FCBKey выпускается бесплатно</span>
            </div>
            <div className="mp-fcbkey__feature">
              <MdiIcon path={mdiShieldLockOutline} size={36} />
              <span>Ваши данные защищены двухфакторной аутентификацией</span>
            </div>
          </div>

          <p className="mp-fcbkey__important">
            <strong>Важно:</strong> ЭЦП FCBKey невозможно скачать, она будет храниться в облаке.
          </p>

          <div className="mp-fcbkey__section">
            <h3>Зачем нужна ЭЦП FCBKey?</h3>
            <p>Двухфакторная идентификация ЭЦП FCBKey - это дополнительный уровень безопасности ПКБ, который гарантирует, что доступ к вашим данным можете иметь только вы. После выпуска ЭЦП FCBKey вы можете получать услуги ПКБ, подписывая заявление на получение при помощи биометрической идентификации (просто лицом).</p>
          </div>

          <div className="mp-fcbkey__section">
            <h3>Как выпустить ЭЦП FCBK?</h3>
            <p>Чтобы выпустить ЭЦП FCBKey, достаточно выполнить 3 действия:</p>
            <p>- скачать мобильное приложение 1cb.kz и пройти регистрацию.</p>
            <p>- указать ФИО и номер телефона, зарегистрированный в <a href="https://bmg.gov.kz" target="_blank" rel="noopener noreferrer">Базе мобильных граждан</a> (БМГ).</p>
            <p>- пройти биометрическую идентификацию в мобильном приложении 1cb.kz.</p>
            <p>При успешном прохождении, профилю присваивается облачная ЭЦП, которая позволяет вам просматривать свою кредитную историю, подписывать документы и получать кредитные отчеты.</p>
          </div>

          <button className="mp-fcbkey__cta" onClick={() => setShowQr(true)}>
            Выпустить ЭЦП FCBKey
          </button>

          {showQr && (
            <div className="mp-fcbkey__overlay" onClick={() => setShowQr(false)}>
              <div className="mp-fcbkey__modal" onClick={e => e.stopPropagation()}>
                <button className="mp-fcbkey__modal-close" onClick={() => setShowQr(false)}>×</button>
                <h3>Наведите камеру телефона на QR код, чтобы перейти к мобильному приложению</h3>
                <img
                  className="mp-fcbkey__qr"
                  src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://play.google.com/store/apps/details?id=kz.one.cb"
                  alt="QR код для мобильного приложения"
                />
              </div>
            </div>
          )}

          <div className="mp-fcbkey__stop-credit">
            <div className="mp-fcbkey__stop-left">
              <h3>Стоп кредит</h3>
              <p>Услуга, которой вы можете ограничить получение своего кредитного отчета для всех кредиторов.</p>
              <div className="mp-fcbkey__stop-actions">
                <button className="mp-fcbkey__stop-about" onClick={openStopCreditService}>О продукте</button>
                <a className="mp-fcbkey__stop-subscribe" href={subscribeLink} target="_blank" rel="noopener noreferrer">Подписаться</a>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

function RevitAccordion() {
  const [open, setOpen] = useState(false);
  const revitLink = "https://www.1cb.kz/no-permission?mathURL=profile%2Fstopcredit-main";

  return (
    <div className="mp-service-acc mp-service-acc--revit">
      <button className="mp-service-acc__head" onClick={() => setOpen(!open)}>
        <span className="mp-service-acc__title">ReVit Улучшение кредитного рейтинга</span>
        <MdiIcon path={open ? mdiChevronUp : mdiChevronDown} size={24} />
      </button>

      {open && (
        <div className="mp-service-acc__body mp-revit">
          <div className="mp-service-acc__text">
            <p>
              <strong>ReVit</strong> - сервис для повышения Вашего кредитного рейтинга и создания большей привлекательности в глазах кредиторов. Вы получите индивидуальные рекомендации, основанные на анализе вашей кредитной истории и текущего уровня дохода.
            </p>
            <p>
              Математическая модель создаст Ваш личный план действий, помогающий достичь кредитного рейтинга 700 и выше.
            </p>
          </div>

          <div className="mp-revit__features">
            <div className="mp-revit__feature">
              <MdiIcon path={mdiChartLineVariant} size={38} />
              <span>Персональные рекомендации</span>
            </div>
            <div className="mp-revit__feature">
              <MdiIcon path={mdiCheckCircleOutline} size={38} />
              <span>Бесплатная проверка под условия модели</span>
            </div>
          </div>

          <div className="mp-revit__section">
            <h3>Преимущества сервиса:</h3>
            <ol>
              <li>Гарантированное повышение кредитного рейтинга на значение 700 и выше (при условиях соблюдения рекомендаций)</li>
              <li>Большая привлекательность в глазах кредиторов и вероятность одобрения кредитов</li>
              <li>Формирование привычки грамотного заемщика – Вы будете понимать, какие действия повышают, а какие понижают Ваш рейтинг.</li>
            </ol>
          </div>

          <div className="mp-revit__section">
            <h3>Что нужно знать:</h3>
            <ol>
              <li>Вы можете бесплатно пройти проверку подходят ли Ваши условия под повышения кредитного рейтинга.</li>
              <li>Вы можете подписаться на сервис лишь в случае, если Ваши данные подходят под условия повышения рейтинга.</li>
              <li>Качество рекомендаций напрямую зависит от Вашей кредитной истории и указанного дохода. Чем точнее будет указан доход, тем точнее будут Ваши рекомендации.</li>
              <li>Если Вы просрочите исполнение рекомендации, Ваша подписка аннулируется. Для формирования новых рекомендаций Вам нужно будет возобновить подписку.</li>
            </ol>
          </div>

          <div className="mp-revit__disclaimer">
            <h3>Дисклеймер</h3>
            <ol>
              <li>Для корректного расчета необходимо указывать реальный ежемесячный доход.</li>
              <li>Если у Вас есть текущая просрочка более 90 дней свыше 1 000 тенге за последний месяц, то для подписки на сервис Вам необходимо её погасить.</li>
              <li>Информация по кредитной истории обновляется не реже одного раза в течение 10 рабочих дней (БВУ, МФО и Ломбарды) и 30 календарных дней (Коллекторские агентства и Субъекты естественных монополий). Необходимо учитывать данное условие при выполнении рекомендаций.</li>
              <li>Оценка Персонального кредитного рейтинга может отличаться от внутренней оценки кредитора, поэтому высокое значение ПКР не гарантирует выдачу кредита.</li>
              <li>Кредитор обращает внимание на Ваш официальный (подтвержденный) доход. Согласно законодательства сумма всех ежемесячных платежей не должна превышать 50% от этого дохода. Поэтому рассчитывайте сумму нового займа, исходя из данных требований.</li>
            </ol>
          </div>

          <div className="mp-revit__section mp-revit__requirements">
            <h3>Что требуется для подписки</h3>
            <p>Нужно быть авторизованным пользователем 1cb.kz</p>
            <p>Корректно указать данные о доходе</p>
          </div>

          <div className="mp-revit__section mp-revit__price">
            <h3>Стоимость услуги</h3>
            <p>Проверка на доступность - <strong>бесплатно</strong></p>
            <p>Подписка на ReVit - <strong>3 108 тенге</strong></p>
          </div>

          <a className="mp-revit__cta" href={revitLink} target="_blank" rel="noopener noreferrer">
            Повысить рейтинг
          </a>

          <div className="mp-revit__stop-credit">
            <h3>Стоп кредит</h3>
            <p>Не хотите, чтобы мошенники оформили на вас кредит? Тогда блокируйте получение своего кредитного отчета для всех кредиторов.</p>
            <div className="mp-revit__actions">
              <a className="mp-revit__about" href={revitLink} target="_blank" rel="noopener noreferrer">О продукте</a>
              <a className="mp-revit__subscribe" href={revitLink} target="_blank" rel="noopener noreferrer">Подписаться</a>
              <MdiIcon path={mdiCancel} size={78} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CreditHistoryAccordion() {
  const [open, setOpen] = useState(false);
  const subscribeLink = "https://www.1cb.kz/no-permission?mathURL=profile%2Fkki-main";
  const stopCreditLink = "https://www.1cb.kz/no-permission?mathURL=profile%2Fstopcredit-main";

  return (
    <div className="mp-service-acc mp-service-acc--kki">
      <button className="mp-service-acc__head" onClick={() => setOpen(!open)}>
        <span className="mp-service-acc__title">Контроль кредитной истории</span>
        <MdiIcon path={open ? mdiChevronUp : mdiChevronDown} size={24} />
      </button>

      {open && (
        <div className="mp-service-acc__body mp-kki">
          <div className="mp-service-acc__text">
            <p>
              <strong>Контроль кредитной истории</strong> - услуга, которая необходима для отслеживания изменений в вашей <strong>кредитной истории</strong>. Эту услугу можно сравнить с СМС-банкингом, когда на каждое действие по счету (<strong>истории</strong>) приходит уведомление на электронный адрес или sms.
            </p>
          </div>

          <div className="mp-kki__features">
            <div className="mp-kki__feature">
              <MdiIcon path={mdiCardAccountDetailsOutline} size={32} />
              <span>До 5 полных ПКО в подарок к подписке</span>
            </div>
            <div className="mp-kki__feature">
              <MdiIcon path={mdiAlertCircleOutline} size={32} />
              <span>Надежная защита от мошенничества</span>
            </div>
            <div className="mp-kki__feature">
              <MdiIcon path={mdiPiggyBankOutline} size={32} />
              <span>Стоимость подписки в месяц - от 500 тенге</span>
            </div>
          </div>

          <div className="mp-kki__section">
            <h3>Преимущества подписки:</h3>
            <p>Полный <strong>контроль</strong> над своей <strong>кредитной историей.</strong></p>
            <p>Возможность быстрого реагирования на любую ошибку, несанкционированное изменение <strong>истории</strong> или попытку оформления <strong>кредита</strong> третьими лицами.</p>
          </div>

          <div className="mp-kki__section">
            <h3>Что требуется для подключения услуги?</h3>
            <ul>
              <li>Карта любого банка;</li>
            </ul>
            <p>Чтобы получать оповещения по кредитной истории было удобнее, рекомендуем скачать наше мобильное приложение: 1CB.kz</p>
          </div>

          <div className="mp-kki__section">
            <h3>Условия подписки</h3>
            <p>Расчетным периодом считается календарный месяц, в котором была оформлена подписка. Например, если Вы подключили услугу 20 сентября на период 3 месяц, то срок первого месяца подписки истечет 30 сентября в 00:00 по времени г.Астана. Об этом пользователь будет уведомлен путем на email или sms в рамках подписки на <strong>оповещения по кредитной истории.</strong></p>
          </div>

          <div className="mp-kki__section mp-kki__price">
            <h3>Стоимость услуги:</h3>
            <ul>
              <li>1 месяц 500 тенге</li>
              <li>3 месяца 1200 тенге (+ 1 ПКО полный)</li>
              <li>6 месяцев 2100 тенге (+ 2 ПКО полный)</li>
              <li>9 месяцев 2250 тенге (+ 3 ПКО полный)</li>
              <li>12 месяцев 2400 тенге (+ 5 ПКО полный)</li>
            </ul>
            <p className="mp-kki__note">*за проведение платежей может взиматься комиссия, согласно тарифам банка</p>
          </div>

          <a className="mp-kki__cta" href={subscribeLink} target="_blank" rel="noopener noreferrer">
            Оформить подписку
          </a>

          <div className="mp-kki__stop-credit">
            <h3>Стоп кредит</h3>
            <p>Услуга, которой вы можете ограничить получение своего кредитного отчета для всех кредиторов.</p>
            <div className="mp-kki__actions">
              <a className="mp-kki__about" href={stopCreditLink} target="_blank" rel="noopener noreferrer">О продукте</a>
              <a className="mp-kki__subscribe" href={subscribeLink} target="_blank" rel="noopener noreferrer">Подписаться</a>
              <MdiIcon path={mdiCancel} size={72} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PersonalCreditReportAccordion() {
  const [open, setOpen] = useState(false);
  const fullReportLink = "https://www.1cb.kz/assets/doc/pko-full.pdf";
  const shortReportLink = "https://www.1cb.kz/assets/doc/pko-short.pdf";
  const reportLink = "https://www.1cb.kz/no-permission?mathURL=profile%2Fpko-main";
  const stopCreditLink = "https://www.1cb.kz/no-permission?mathURL=profile%2Fstopcredit-main";

  return (
    <div className="mp-service-acc mp-service-acc--pko">
      <button className="mp-service-acc__head" onClick={() => setOpen(!open)}>
        <span className="mp-service-acc__title">Персональный кредитный отчет</span>
        <MdiIcon path={open ? mdiChevronUp : mdiChevronDown} size={24} />
      </button>

      {open && (
        <div className="mp-service-acc__body mp-pko">
          <div className="mp-service-acc__text">
            <p>
              <strong>Кредитная история</strong> - документ, который содержит сведения обо всех ваших кредитах, а также о том, как вы их погашаете. Каждое <strong>физическое лицо</strong> вправе получить свою <strong>кредитную историю</strong> в виде <strong>персонального кредитного отчета</strong> и <strong>полного персонального кредитного отчета.</strong>
            </p>
          </div>

          <div className="mp-pko__features">
            <div className="mp-pko__feature">
              <MdiIcon path={mdiPiggyBankOutline} size={32} />
              <span>1 раз в год полный ПКО - бесплатно</span>
            </div>
            <div className="mp-pko__feature">
              <MdiIcon path={mdiOpenInNew} size={32} />
              <span>Моментальное получение онлайн</span>
            </div>
            <div className="mp-pko__feature">
              <MdiIcon path={mdiHomeOutline} size={32} />
              <span>В ПКО также отображены данные из дополнительных источников</span>
            </div>
          </div>

          <div className="mp-pko__section">
            <h3>Зачем нужен ПКО?</h3>
            <p><strong>Получать кредитную историю</strong> нужно каждому, кто пользуется банковскими займами. ПКО нужен для нескольких целей:</p>
            <ul>
              <li>для контроля процесса погашения долга;</li>
              <li>для того, чтобы знать свои реальные шансы на получение очередного займа;</li>
              <li>чтобы понимать, почему вам отказано в предоставлении кредита.</li>
            </ul>
          </div>

          <div className="mp-pko__section">
            <h3>Как получить кредитный отчет?</h3>
            <p><strong>Запросить кредитную историю</strong> в режиме <strong>онлайн</strong> можно в <strong>кредитном бюро.</strong> Все справочные сведения предоставляются клиенту в виде <strong>выписки.</strong></p>
            <p><strong>Персональный кредитный отчет (ПКО)</strong> не содержит информацию об истории по кредитам, по которым последняя информация получена более 5 лет назад.</p>
            <p><strong>Полный Персональный кредитный отчет (полный ПКО)</strong> содержит полную информацию по кредитной истории. Раз в год услуга <strong>получения полного ПКО</strong> бесплатна.</p>
            <p>Чтобы <strong>получить кредитный отчет,</strong> необходимо наличие ЭЦП, а также платежной карты любого банка Казахстана.</p>
            <p>Как только <strong>запрос</strong> на услугу будет отправлен (сделать это можно после регистрации на сайте), ПКО незамедлительно поступает клиенту.</p>
          </div>

          <div className="mp-pko__section mp-pko__price">
            <h3>Стоимость услуги</h3>
            <ul>
              <li>ПКО - 414 тенге</li>
              <li>Полный ПКО - раз в год бесплатно, и 414 тенге на все последующие полные ПКО</li>
            </ul>
          </div>

          <div className="mp-pko__actions">
            <a className="mp-pko__sample" href={fullReportLink} target="_blank" rel="noopener noreferrer">Полный ПКО (образец)</a>
            <a className="mp-pko__sample" href={shortReportLink} target="_blank" rel="noopener noreferrer">ПКО (образец)</a>
            <a className="mp-pko__get" href={reportLink} target="_blank" rel="noopener noreferrer">Получить ПКО</a>
          </div>

          <div className="mp-pko__stop-credit">
            <h3>Стоп кредит</h3>
            <p>Не хотите, чтобы мошенники оформили на вас кредит? Тогда блокируйте получение своего кредитного отчета для всех кредиторов.</p>
            <div className="mp-pko__stop-actions">
              <a className="mp-pko__about" href={stopCreditLink} target="_blank" rel="noopener noreferrer">О продукте</a>
              <a className="mp-pko__subscribe" href={stopCreditLink} target="_blank" rel="noopener noreferrer">Подписаться</a>
              <MdiIcon path={mdiCancel} size={72} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UnlimAccordion() {
  const [open, setOpen] = useState(false);
  const subscribeLink = "https://www.1cb.kz/no-permission?mathURL=profile%2Funlim-req";
  const stopCreditLink = "https://www.1cb.kz/no-permission?mathURL=profile%2Fstopcredit-main";

  return (
    <div className="mp-service-acc mp-service-acc--unlim">
      <button className="mp-service-acc__head" onClick={() => setOpen(!open)}>
        <span className="mp-service-acc__title">Подписка на Unlim</span>
        <MdiIcon path={open ? mdiChevronUp : mdiChevronDown} size={24} />
      </button>

      {open && (
        <div className="mp-service-acc__body mp-unlim">
          <div className="mp-service-acc__text">
            <p>
              <strong>Подписка на Unlim</strong> - это предложение от ПКБ, предусматривающее неограниченное получение ПКО и полных ПКО (Персонального кредитного отчета) в течение 365 дней.
            </p>
          </div>

          <div className="mp-kki__features mp-unlim__features">
            <div className="mp-kki__feature">
              <MdiIcon path={mdiOpenInNew} size={32} />
              <span>Безлимитный ПКО во всех каналах ПКБ</span>
            </div>
            <div className="mp-kki__feature">
              <MdiIcon path={mdiPiggyBankOutline} size={32} />
              <span>Подписка на безлимит по цене 9 ПКО</span>
            </div>
            <div className="mp-kki__feature">
              <MdiIcon path={mdiTimerOutline} size={32} />
              <span>Неограниченное получение ПКО 365 дней</span>
            </div>
          </div>

          <div className="mp-kki__section">
            <h3>Преимущества подписки</h3>
            <p>Если вы внимательно следите за своей кредитной историей и регулярно получаете ПКО, то подписка на безлимитное получение кредитных отчетов как раз для вас. Подпишитесь на услугу по цене 9 отчетов и получайте кредитную историю целый год в неограниченном количестве.</p>
          </div>

          <div className="mp-kki__section">
            <h3>Что требуется для подключения услуги?</h3>
            <p>Подключение услуги предусматривает наличие:</p>
            <ul>
              <li>ЭЦП;</li>
              <li>Карта любого банка;</li>
            </ul>
            <p>Услуга Unlim предусматривает предоставление <strong>неограниченного количества ПКО</strong> только физическим лицам.</p>
            <p>Услуга будет действительна на протяжении года с момента оформления подписки.</p>
          </div>

          <div className="mp-kki__section mp-kki__price">
            <h3>Стоимость услуги</h3>
            <ul>
              <li>3 625 тенге.</li>
            </ul>
          </div>

          <a className="mp-kki__cta" href={subscribeLink} target="_blank" rel="noopener noreferrer">
            Оформить подписку
          </a>

          <div className="mp-kki__stop-credit">
            <h3>Стоп кредит</h3>
            <p>Не хотите, чтобы мошенники оформили на вас кредит? Тогда блокируйте получение своего кредитного отчета для всех кредиторов.</p>
            <div className="mp-kki__actions">
              <a className="mp-kki__about" href={stopCreditLink} target="_blank" rel="noopener noreferrer">О продукте</a>
              <a className="mp-kki__subscribe" href={stopCreditLink} target="_blank" rel="noopener noreferrer">Подписаться</a>
              <MdiIcon path={mdiCancel} size={72} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PersonalCreditRatingAccordion() {
  const [open, setOpen] = useState(false);
  const ratingLink = "https://www.1cb.kz/no-permission?mathURL=profile%2Fpkr-main";
  const stopCreditLink = "https://www.1cb.kz/no-permission?mathURL=profile%2Fstopcredit-main";

  return (
    <div className="mp-service-acc mp-service-acc--pkr">
      <button className="mp-service-acc__head" onClick={() => setOpen(!open)}>
        <span className="mp-service-acc__title">Персональный кредитный рейтинг</span>
        <MdiIcon path={open ? mdiChevronUp : mdiChevronDown} size={24} />
      </button>

      {open && (
        <div className="mp-service-acc__body mp-pkr">
          <div className="mp-service-acc__text">
            <p>
              <strong>Персональный кредитный рейтинг</strong> - оценка кредитоспособности заемщика, основанная на его кредитной истории и иных персональных данных (например возраст, семейное положение и т.д.).
            </p>
            <p>
              Получив <strong>персональный кредитный рейтинг</strong>, вы сможете видеть свою кредитную историю так, как оценивают ее кредиторы. Для оценки физических лиц используются баллы, определяющие надежность плательщика. Принцип формирования банковского скоринга похож на принцип формирования <strong>ПКР.</strong>
            </p>
          </div>

          <div className="mp-kki__features mp-pkr__features">
            <div className="mp-kki__feature">
              <MdiIcon path={mdiOpenInNew} size={32} />
              <span>Быстрое получение в бот-мессенджерах и в приложении</span>
            </div>
            <div className="mp-kki__feature">
              <MdiIcon path={mdiChartLineVariant} size={32} />
              <span>Быстрый анализ вашей кредитной привлекательности</span>
            </div>
            <div className="mp-kki__feature">
              <MdiIcon path={mdiPiggyBankOutline} size={32} />
              <span>Оплата через баланс мобильного телефона</span>
            </div>
          </div>

          <div className="mp-kki__section">
            <h3>Преимущества услуги</h3>
            <p>Получив <strong>кредитный рейтинг онлайн</strong>, вы можете:</p>
            <ul>
              <li>оценить шанс на получение кредита;</li>
              <li>увидеть себя глазами банков;</li>
              <li>получить быструю характеристику вашей кредитной истории;</li>
            </ul>
          </div>

          <div className="mp-kki__section">
            <h3>Что требуется для подписки?</h3>
            <ul>
              <li>ИИН;</li>
              <li>любая платежная карта или баланс на номере телефона;</li>
            </ul>
          </div>

          <div className="mp-kki__section mp-kki__price">
            <h3>Стоимость услуги:</h3>
            <p>Стоимость персонального кредитного рейтинга <strong>104 тенге.</strong></p>
          </div>

          <a className="mp-kki__cta" href={ratingLink} target="_blank" rel="noopener noreferrer">
            Получить ПКР
          </a>

          <div className="mp-kki__stop-credit">
            <h3>Стоп кредит</h3>
            <p>Не хотите, чтобы мошенники оформили на вас кредит? Тогда блокируйте получение своего кредитного отчета для всех кредиторов.</p>
            <div className="mp-kki__actions">
              <a className="mp-kki__about" href={stopCreditLink} target="_blank" rel="noopener noreferrer">О продукте</a>
              <a className="mp-kki__subscribe" href={stopCreditLink} target="_blank" rel="noopener noreferrer">Подписаться</a>
              <MdiIcon path={mdiCancel} size={72} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DisputeInformationAccordion() {
  const [open, setOpen] = useState(false);
  const disputeLink = "https://www.1cb.kz/no-permission?mathURL=profile%2Fpersonal-data";
  const stopCreditLink = "https://www.1cb.kz/no-permission?mathURL=profile%2Fstopcredit-main";

  return (
    <div className="mp-service-acc mp-service-acc--dispute">
      <button className="mp-service-acc__head" onClick={() => setOpen(!open)}>
        <span className="mp-service-acc__title">Оспаривание информации</span>
        <MdiIcon path={open ? mdiChevronUp : mdiChevronDown} size={24} />
      </button>

      {open && (
        <div className="mp-service-acc__body mp-dispute">
          <div className="mp-service-acc__text">
            <p>
              С помощью этой услуги вы получаете возможность <strong>оспаривания информации</strong>, если в вашей кредитной истории была отражена ошибочная информация. Для запуска процесса <strong>оспаривания</strong> вы можете подать заявление онлайн на нашем сайте с указанием ошибки и приложив ПКО (персональный кредитный отчет), полученный не позднее 10 дней назад. ПКБ направит ваш запрос кредиторам. На основании полученного от поставщика информации ответа вам будет направлен соответствующий результат от ПКБ.
            </p>
          </div>

          <div className="mp-kki__features mp-dispute__features">
            <div className="mp-kki__feature">
              <MdiIcon path={mdiTimerOutline} size={32} />
              <span>Сроки оспаривания зависят от поставщика информации</span>
            </div>
            <div className="mp-kki__feature">
              <MdiIcon path={mdiHomeOutline} size={32} />
              <span>Оспаривание в режиме онлайн без вашего участия</span>
            </div>
            <div className="mp-kki__feature">
              <MdiIcon path={mdiPiggyBankOutline} size={32} />
              <span>Услуга абсолютно бесплатна</span>
            </div>
          </div>

          <div className="mp-kki__section">
            <h3>Когда нужно воспользоваться услугой?</h3>
            <ul>
              <li>Если поставщик информации допустил ошибку в кредитной истории;</li>
              <li>Если вы увидели непогашенную сумму в отчете, но можете доказать, что погасили ее;</li>
              <li>Если в кредитном отчете появился займ, который вы не оформляли.</li>
            </ul>
            <p>Чтобы избежать таких ситуаций, предлагаем <strong>оспорить информацию</strong> в персональном кредитном отчете и исключить наличие <strong>ошибки в кредитной истории.</strong></p>
            <p><strong>ОБРАТИТЕ ВНИМАНИЕ:</strong> Поставщики информации обязаны передавать обновления в кредитное бюро в течение 10 рабочих дней, коллекторские агентства - в течение 30 календарных дней. При этом, при оформлении новых займов информация направляется в кредитное бюро в течение 1-го рабочего дня. В случае если вам необходимо обновить информацию раньше указанного срока, обратитесь напрямую к кредитору.</p>
          </div>

          <div className="mp-kki__section mp-kki__price">
            <h3>Стоимость услуги:</h3>
            <p><strong>Оспаривание в режиме онлайн</strong> абсолютно бесплатно.</p>
          </div>

          <a className="mp-kki__cta" href={disputeLink} target="_blank" rel="noopener noreferrer">
            Оспорить
          </a>

          <div className="mp-kki__stop-credit">
            <h3>Стоп кредит</h3>
            <p>Не хотите, чтобы мошенники оформили на вас кредит? Тогда блокируйте получение своего кредитного отчета для всех кредиторов.</p>
            <div className="mp-kki__actions">
              <a className="mp-kki__about" href={stopCreditLink} target="_blank" rel="noopener noreferrer">О продукте</a>
              <a className="mp-kki__subscribe" href={stopCreditLink} target="_blank" rel="noopener noreferrer">Подписаться</a>
              <MdiIcon path={mdiCancel} size={72} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StopCreditAccordion({ accordionRef }) {
  const [open, setOpen] = useState(false);
  const termsLink = "https://www.1cb.kz/no-permission?mathURL=profile%2Fstopcredit-terms";
  const subscribeLink = "https://www.1cb.kz/no-permission?mathURL=profile%2Fstopcredit-main";

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
      setTimeout(() => {
        accordionRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
    window.addEventListener("open-stop-credit-service", handleOpen);
    return () => window.removeEventListener("open-stop-credit-service", handleOpen);
  }, [accordionRef]);

  return (
    <div className="mp-service-acc mp-service-acc--stop" ref={accordionRef}>
      <button className="mp-service-acc__head" onClick={() => setOpen(!open)}>
        <span className="mp-service-acc__title">Добровольный отказ от оформления займов, микрокредитов (Stop Credit)</span>
        <MdiIcon path={open ? mdiChevronUp : mdiChevronDown} size={24} />
      </button>

      {open && (
        <div className="mp-service-acc__body mp-stop-service">
          <div className="mp-service-acc__text">
            <p>
              <strong>Стоп кредит (Stop Credit)</strong> - сервис, позволяющий физическому лицу установить добровольный запрет на оформление займов и микрокредитов, а также дополнительно получать sms-уведомления об изменениях в кредитной истории. Финансовые организации автоматически информируются о действующем запрете.
            </p>
          </div>

          <div className="mp-stop-service__features">
            <div className="mp-stop-service__feature">
              <MdiIcon path={mdiAlertCircleOutline} size={32} />
              <span>Контроль и защита от мошеннических займов</span>
            </div>
            <div className="mp-stop-service__feature">
              <MdiIcon path={mdiTimerOutline} size={32} />
              <span>Онлайн-подключение и отключение подписки 24/7</span>
            </div>
            <div className="mp-stop-service__feature">
              <MdiIcon path={mdiCardAccountDetailsOutline} size={32} />
              <span>Оперативные sms-уведомления об изменениях в кредитной истории (в случае платной подписки с Credit control)</span>
            </div>
            <div className="mp-stop-service__feature">
              <MdiIcon path={mdiCancel} size={32} />
              <span>Уведомление кредиторов об установленном запрете на оформление кредитов на ваше имя</span>
            </div>
          </div>

          <div className="mp-stop-service__section">
            <h3>Преимущества подписки:</h3>
            <ul>
              <li>Возможность обезопасить себя от кредитных мошенников в случае долгосрочного отъезда из страны.</li>
              <li>Способ оповещения кредиторов о нежелании субъекта оформлять кредит в любой организации.</li>
              <li>Возможность онлайн подписки и отписки от сервиса в любое время суток.</li>
              <li>Возможность контролировать свою кредитную историю в рамках подписки.</li>
            </ul>
          </div>

          <div className="mp-stop-service__section">
            <h3>Условия подписки:</h3>
            <p>Сервисом могут воспользоваться физические лица. Пользователь может подписаться на услугу сроком на 6, 12 месяцев либо бессрочно. Отписаться от услуги можно до истечения срока окончания подписки.</p>
            <p>Подписка максимально ограничивает возможность получения кредита, но полностью не гарантирует невыдачу займа. Сервис гарантирует уведомление финансовых организаций о том, что у субъекта установлена подписка на добровольный отказ от оформления займов/микрокредитов, при запросе кредитного отчета и иных сервисов в ПКБ.</p>
            <p>В рамках подписки, пользователь будет получать уведомления об изменениях в его кредитной истории, таких как осуществление нового запроса на кредитный отчет, выход на просрочку, изменение суммы задолженности, появление нового займа в кредитной истории и другое (доступно только для платной подписки, включающей сервис Credit Control).</p>
          </div>

          <div className="mp-stop-service__section mp-stop-service__price">
            <h3>Стоимость:</h3>
            <ul>
              <li>6 месяцев - бесплатно</li>
              <li>12 месяцев - бесплатно</li>
              <li>Бессрочно - бесплатно</li>
              <li>6 месяцев (включая Кредит контроль и 2 полных ПКО) - 2100 тг</li>
              <li>12 месяцев (включая Кредит контроль и 5 полных ПКО) - 2400 тг</li>
            </ul>
          </div>

          <div className="mp-stop-service__actions">
            <a className="mp-stop-service__terms" href={termsLink} target="_blank" rel="noopener noreferrer">Условия договора</a>
            <a className="mp-stop-service__subscribe" href={subscribeLink} target="_blank" rel="noopener noreferrer">Подписаться</a>
          </div>

          <div className="mp-stop-service__final">
            <h3>Стоп кредит</h3>
            <p>Услуга, которой вы можете ограничить получение своего кредитного отчета для всех кредиторов.</p>
            <div className="mp-stop-service__final-actions">
              <a className="mp-stop-service__final-button" href={subscribeLink} target="_blank" rel="noopener noreferrer">Подписаться</a>
              <MdiIcon path={mdiCancel} size={78} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceInfo() {
  return (
    <div className="mp-service-info">
      <div className="mp-service-info__intro">
        Для расчета скоринга One FICO применяется математическая модель, которая учитывает различные факторы, такие как: платежная дисциплина, текущий уровень задолженности, типы кредитов и продолжительность кредитной истории, а также параметры новых займов.
      </div>

      <p className="mp-service-info__text">
        Оценочное значение скоринга One FICO по заемщику может находиться в диапазоне от 0 до 850 пунктов. В основном, «хорошим» показателем FICO® Score является оценка от 650 и выше, обладатели рейтинга 600 и ниже — могут иметь существенные проблемы с получением привлекательных условий по займу.
      </p>

      <div className="mp-service-info__notice">
        Важно помнить, что FICO® Score, в отличие от многих подобных скорингов, не учитывает следующие показатели: доход заемщика, его трудовой статус, возраст и семейное положение, а основывается только на информации, содержащейся в кредитной истории физического лица.
      </div>

      <div className="mp-service-info__section">
        <h3>Преимущества услуги</h3>
        <ol>
          <li>Оценить шанс на получение кредита;</li>
          <li>Увидеть себя глазами банков;</li>
          <li>Получить быструю характеристику вашей кредитной истории;</li>
        </ol>
      </div>

      <div className="mp-service-info__section">
        <h3>Что требуется для получения скоринга</h3>
        <ol>
          <li>ИИН;</li>
          <li>Любая платежная карта или баланс на номере телефона;</li>
        </ol>
      </div>

      <div className="mp-service-info__section mp-service-info__cost">
        <h3>Стоимость услуги</h3>
        <p>Стоимость скоринга One FICO - <strong>311 тенге</strong></p>
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  const location = useLocation();
  const stopCreditRef = useRef(null);

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

  useEffect(() => {
    function handleOpenStopCredit() {
      setActiveTab("services");
    }
    window.addEventListener("open-stop-credit-service", handleOpenStopCredit);
    return () => window.removeEventListener("open-stop-credit-service", handleOpenStopCredit);
  }, []);

  const [calcMode,    setCalcMode]    = useState("new");
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

      <section className="mp-section">
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

        {activeTab === "services" ? (
          <>
            <ServiceAccordion />
            <MobileAppAccordion />
            <RevitAccordion />
            <CreditHistoryAccordion />
            <PersonalCreditReportAccordion />
            <UnlimAccordion />
            <PersonalCreditRatingAccordion />
            <DisputeInformationAccordion />
            <StopCreditAccordion accordionRef={stopCreditRef} />
            <FcbKeyAccordion />
          </>
        ) : (
          <div className="mp-tips">
            {tab.tips.map((tip, i) => (
              <TipCard key={`${activeTab}-${i}`} tip={tip} delay={i * 80} />
            ))}
          </div>
        )}

        {activeTab !== "services" && (
          <>
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
          </>
        )}
      </section>

      {activeTab !== "services" && (
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
              <div className="mp-calc__left">
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
      )}

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

