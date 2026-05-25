import { useEffect, useRef, useState } from "react";
import MdiIcon from "../components/MdiIcon";
import {
  mdiCheck,
  mdiAlertOutline,
  mdiShieldCheckOutline,
  mdiCalculatorVariantOutline,
  mdiCheckCircleOutline,
  mdiCreditCardOutline,
  mdiBookOpenPageVariantOutline,
  mdiCardAccountDetailsOutline,
  mdiWheelchairAccessibility,
  mdiEyeOutline,
  mdiEarHearing,
  mdiArrowRight,
  mdiChevronLeft,
  mdiChevronRight,
  mdiArrowTopRight
} from "@mdi/js";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { getHomeContent } from "../services/fingramotaApi";

const cards = [
  {
    icon: mdiCreditCardOutline,
    title: "Маркетплейс",
    text: "Планирование доходов и расходов, финансовые цели и полезные привычки для стабильного бюджета.",
  },
  {
    icon: mdiBookOpenPageVariantOutline,
    title: "Обучение",
    text: "Что важно учитывать перед оформлением кредита, как читать договор и оценивать условия.",
  },
  {
    icon: mdiShieldCheckOutline,
    title: "Безопасность",
    text: "Как распознать мошенничество, защитить карты, счета и персональные данные.",
  },
  {
    icon: mdiCardAccountDetailsOutline,
    title: "Инструменты",
    text: "Банковские карты, депозиты, страхование и другие финансовые услуги простым языком.",
  },
];

const interesting = [
  {
    title: "Стоп кредит",
    text: "Каждый гражданин может на неограниченное количество времени установить запрет на выдачу банковских займов и микрокредитов",
    image: "/interesting/stop-credit.svg",
  },
  {
    title: "Европротокол",
    text: "Позволит получить страховые выплаты дистанционно и оперативно, без привлечения дорожной полиции",
    image: "/interesting/europrotocol.svg",
  },
  {
    title: "Рынок ценных бумаг",
    text: "Знания, которые помогут принимать уверенные финансовые решения.",
    image: "/interesting/market.svg",
  },
  {
    title: "Мошеннический кредит",
    text: "С полученным постановлением необходимо обратиться к кредитору.",
    image: "/interesting/fraud-credit.svg",
  },
  {
    title: "Хочу разобраться в финансах",
    text: "Знания, которые помогут принимать уверенные финансовые решения.",
    image: "/interesting/finance.svg",
  },
  {
    title: "Кто такие дропперы",
    text: "Это лицо, которое предоставляет свои банковские реквизиты для проведения незаконных операций",
    image: "/interesting/dropper.svg",
  },
  {
    title: "Страхование",
    text: "Финансовая защита от возможных убытков или рисков.",
    image: "/interesting/insurance.svg",
  },
  {
    title: "Оспаривания кредитной истории",
    text: "Вы не согласны со своей кредитной историей и не знаете что делать тогда эта статья для вас",
    image: "/interesting/history.svg",
  },
];

const fallbackPodcasts = [
  {
    title: "Цифровые информационные ресурсы",
    image: "/podcasts/podcast-1.svg",
  },
  {
    title: "Цифровые информационные ресурсы",
    image: "/podcasts/podcast-1.svg",
  },
  {
    title: "Цифровые информационные ресурсы",
    image: "/podcasts/podcast-1.svg",
  },
  {
    title: "Цифровые информационные ресурсы",
    image: "/podcasts/podcast-1.svg",
  },
  {
    title: "Цифровые информационные ресурсы",
    image: "/podcasts/podcast-1.svg",
  },
  {
    title: "Цифровые информационные ресурсы",
    image: "/podcasts/podcast-1.svg",
  },
];

export default function HomePage() {
  const [news, setNews] = useState([]);
  const [podcasts, setPodcasts] = useState([]);

  const podcastTrackRef = useRef(null);

const scrollPodcasts = (direction) => {
  if (!podcastTrackRef.current) return;

  const track = podcastTrackRef.current;
  const card = track.querySelector(".podcast-card");

  if (!card) return;

  const gap = 28;
  const scrollAmount = card.offsetWidth + gap;

  track.scrollBy({
    left: direction === "next" ? scrollAmount : -scrollAmount,
    behavior: "smooth",
  });
};

  useEffect(() => {
    getHomeContent().then((data) => {
      setNews(data.news);
      setPodcasts(data.podcasts);
    });
  }, []);

useEffect(() => {
  const interval = setInterval(() => {
    if (!podcastTrackRef.current) return;

    const track = podcastTrackRef.current;
    const card = track.querySelector(".podcast-card");

    if (!card) return;

    const gap = 28;
    const scrollAmount = card.offsetWidth + gap;

    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    if (track.scrollLeft >= maxScrollLeft - 10) {
      track.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      track.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, 5000);

  return () => clearInterval(interval);
}, []);

  return (
    <>
      <Header />

      <main>
        <section className="hero">
          <div className="hero-left">
            <div className="portal-badge">● ОФИЦИАЛЬНЫЙ ГОСУДАРСТВЕННЫЙ ПОРТАЛ</div>

            <h1>
              Повышение <span>финансовой</span> грамотности населения
            </h1>

            <p>
              Научитесь разбираться в деньгах, кредитах и финансовой безопасности
              в повседневной жизни
            </p>

            <div className="hero-buttons">
              <button className="sos-btn">
                <MdiIcon path={mdiAlertOutline} size={1} />
                SOS ситуация
              </button>
              <button className="start-btn">Начать курс</button>
            </div>

            <div className="hero-points">
              <span><MdiIcon path={mdiCheckCircleOutline} size={20} /> Бесплатно</span>
              <span><MdiIcon path={mdiCheckCircleOutline} size={20} /> Без рекламы</span>
              <span><MdiIcon path={mdiCheckCircleOutline} size={20} /> 100% анонимно</span>
            </div>
          </div>

          <div className="hero-center">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>

            <img
              src="/Vector (1).svg"
              alt="shield"
              className="hero-shield"
            />
          </div>

          <div className="license-card">
            <div className="license-icon">
              <MdiIcon path={mdiCheck} size={30} />
            </div>

            <div>
              <small>Статус проверки</small>
              <b>Лицензия активна</b>
            </div>
          </div>

          <div className="calc-card">
            <MdiIcon path={mdiCalculatorVariantOutline} size={80} />
            <div>
              <small>Инструменты</small>
              <b>Кредитный калькулятор</b>
            </div>
          </div>
        </section>

        <section className="intro-section">
          <div className="feature-grid">
          {cards.map((card) => (
            <article className="feature-card" key={card.title}>
              <div className="feature-top">
                <MdiIcon path={card.icon} size={28} className="feature-icon" />
                <h3>{card.title}</h3>
              </div>

              <p>{card.text}</p>

              <button className="more-btn">
                <span>Подробнее</span>
                <MdiIcon path={mdiArrowTopRight} size={14} />
              </button>
            </article>
          ))}
          </div>
          <div className="intro-text">
            <h2>Финансовая грамотность <span>простым языком</span></h2>
            <p>
              Портал создан для повышения финансовой грамотности населения и
              предоставляет актуальную и проверенную информацию.
            </p>
            <button className="hero-btn">
              Калькулятор
            </button>
          </div>
        </section>

        <section className="interesting-section">
          <h2>Интересное</h2>

          <div className="interesting-grid">
            {interesting.map((item, index) => (
            <article
              key={item.title}
              className={`interesting-card card-${index + 1}`}
            >
              <img className="interesting-bg-icon" src={item.image} alt="" />

              <div className="interesting-content">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
            ))}
          </div>
        </section>

        <section className="news-section">
          <div className="section-head">
            <h2>Новости</h2>
            <p>Следите за последними новостями в сфере финансов и безопасности</p>
            <a>Все новости <MdiIcon path={mdiArrowRight} size={20} /></a>
          </div>

          <div className="news-grid">
            {news.slice(0, 8).map((item, index) => (
              <article className={`news-card ${index < 2 ? "large" : ""}`} key={index}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <span>{item.date}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="podcast-section">
          <div className="podcast-header">
            <h2>Подкасты</h2>

            <p>
              Слушайте полезные выпуски о финансах,
              безопасности и цифровой грамотности
            </p>
          </div>

          <div className="podcast-slider">
            <div className="podcast-track" ref={podcastTrackRef}>
              {podcasts.map((item, index) => (
                <article className="podcast-card" key={index}>
                  <img src={item.image} alt={item.title} />
                </article>
              ))}
            </div>
          </div>

          <div className="podcast-buttons">
            <button onClick={() => scrollPodcasts("prev")} aria-label="Назад">
              <MdiIcon path={mdiChevronLeft} size={40} />
            </button>

            <button onClick={() => scrollPodcasts("next")} aria-label="Вперёд">
              <MdiIcon path={mdiChevronRight} size={40} />
            </button>
          </div>
        </section>

        <section className="inclusive-section">
          <div className="inclusive-text">
            <h2>Инклюзивные финансы</h2>
            <p>
              Мы стремимся сделать финансовые услуги доступными для каждого.
              Наша интерактивная карта поможет вам найти отделения банков,
              оборудованные всем необходимым для людей с особыми потребностями.
            </p>

            <div className="inclusive-buttons">
              <button><MdiIcon path={mdiWheelchairAccessibility} size={30} /> Пандусы и подъемники</button>
              <button><MdiIcon path={mdiEyeOutline} size={30} /> Шрифт Брайля в терминалах</button>
              <button><MdiIcon path={mdiEarHearing} size={30} /> Оборудование для слабослышащих</button>
            </div>
          </div>

          <div className="map-card">
            <img src="/map.svg" alt="Инклюзивная карта" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}