import React, { useEffect, useRef, useState } from "react";
import "./InstrumentsPage.css";

import {
  mdiShieldCheck,
  mdiChartLine,
} from "@mdi/js";

import MdiIcon from "../components/MdiIcon";

const tools = [
  {
    category: "Расчёты",
    title: "Кредитный калькулятор",
    text: "Рассчитайте ежемесячный платёж и общую сумму выплат по кредиту.",
    image: "/1-kalkulyator.jpg",
  },

  {
    category: "Проверки",
    title: "Проверка брокера",
    text: "Убедитесь, что у инвестиционной компании есть лицензия.",
    image: "/2-broker.jpg",
  },

  {
    category: "Проверки",
    title: "Проверка лицензии",
    text: "Единый реестр финансовых организаций с лицензиями.",
    image: "/3-licenziya.jpg",
  },

  {
    category: "Безопасность",
    title: "Финансовая пирамида",
    text: "Проверить признаки сомнительной организации чек-листом.",
    image: "/4-piramida.jpg",
  },

  {
    category: "Безопасность",
    title: "Проверка сайта",
    text: "Выявление фишинговых сайтов и поддельных страниц.",
    image: "/5-sait.jpg",
  },

  {
    category: "Безопасность",
    title: "Проверка телефона",
    text: "Узнайте, кто звонил и есть ли номер в базе мошенников.",
    image: "/6-telefon.jpg",
  },

  {
    category: "Инвестиции",
    title: "Доходность инвестиций",
    text: "Сравните доходность вкладов, облигаций и акций.",
    image: "/7-dohodnost.jpg",
  },

  {
    category: "Расчёты",
    title: "Долговая нагрузка",
    text: "Оцените свой показатель DTI перед новым кредитом.",
    image: "/8-nagruzka.jpg",
  },
];

function useReveal(delay = 0) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return {
    ref,

    style: {
      opacity: visible ? 1 : 0,

      transform: visible
        ? "translateY(0)"
        : "translateY(24px)",

      transition:
        "opacity 0.6s ease, transform 0.6s ease",
    },
  };
}

export default function InstrumentsPage() {
  const [activeTab, setActiveTab] = useState("Все");

  const filteredTools =
    activeTab === "Все"
      ? tools
      : tools.filter(
          (tool) => tool.category === activeTab
        );

  const badgeReveal = useReveal(100);
  const titleReveal = useReveal(220);
  const textReveal = useReveal(340);
  const imageReveal = useReveal(420);
  const statusReveal = useReveal(580);
  const loadReveal = useReveal(720);
  const sectionReveal = useReveal(250);
  const tabsReveal = useReveal(360);

  return (
    <div className="instruments-page">
      <section className="instruments-hero">
        <div className="instruments-hero-inner">

          <div className="instruments-hero-text">

            <div
              ref={badgeReveal.ref}
              style={badgeReveal.style}
              className="instruments-badge"
            >
              <MdiIcon
                path={mdiShieldCheck}
                size={16}
              />

              <span>Центр инструментов</span>
            </div>

            <h1
              ref={titleReveal.ref}
              style={titleReveal.style}
            >
              Инструменты <br />

              <span>
                финансовой защиты и расчёта
              </span>
            </h1>

            <p
              ref={textReveal.ref}
              style={textReveal.style}
            >
              Страница «Инструменты» — это
              единый цифровой центр финансовой
              помощи, финансовой грамотности
              и защиты пользователей.
            </p>
          </div>

          <div
            ref={imageReveal.ref}
            style={imageReveal.style}
            className="instruments-hero-image"
          >
            <img
              src="/инст.svg"
              alt="Financial Protection"
            />

            <div
              ref={statusReveal.ref}
              style={statusReveal.style}
              className="status-card"
            >
              <div className="status-icon">
                <MdiIcon
                  path={mdiShieldCheck}
                  size={22}
                />
              </div>

              <div className="status-content">
                <small>Статус</small>
                <b>Безопасно</b>
              </div>
            </div>

            <div
              ref={loadReveal.ref}
              style={loadReveal.style}
              className="load-card"
            >
              <div className="load-icon">
                <MdiIcon
                  path={mdiChartLine}
                  size={18}
                />
              </div>

              <small>Анализ нагрузки</small>

              <div className="load-line">
                <span />
              </div>

              <div className="load-info">
                <b>45%</b>
                <span>Норма</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tools-section">

        <div className="circle-decor circle-left" />
        <div className="circle-decor circle-right" />

        <div className="tools-inner">

          <h2
            ref={sectionReveal.ref}
            style={sectionReveal.style}
          >
            Сервисы
          </h2>

          <div
            ref={tabsReveal.ref}
            style={tabsReveal.style}
            className="tools-tabs"
          >
            {[
              "Все",
              "Расчёты",
              "Проверки",
              "Инвестиции",
              "Безопасность",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={
                  activeTab === tab
                    ? "active"
                    : ""
                }
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="tools-grid">
            {filteredTools.map((tool, index) => (
              <article
                className="tool-card"
                key={tool.title}
                style={{
                  opacity: 1,

                  transform:
                    "translateY(0px)",

                  animation: `fadeTool 0.55s ease forwards`,

                  animationDelay: `${
                    index * 80
                  }ms`,
                }}
              >
                <div className="tool-image">
                  <img
                    src={tool.image}
                    alt={tool.title}
                  />
                </div>

                <div className="tool-content">
                  <div>
                    <h3>{tool.title}</h3>
                    <p>{tool.text}</p>
                  </div>

                  <button>Открыть</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}