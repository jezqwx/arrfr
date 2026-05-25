import React from "react";
import "./InstrumentsPage.css";

import { mdiShieldCheck, mdiChartLine } from "@mdi/js";
import MdiIcon from "../components/MdiIcon";

const tools = [
  ["Кредитный калькулятор", "Рассчитайте ежемесячный платёж и общую сумму выплат по кредиту.", "/1-kalkulyator.jpg"],
  ["Проверка брокера", "Убедитесь, что у инвестиционной компании есть лицензия.", "/2-broker.jpg"],
  ["Проверка лицензии", "Единый реестр финансовых организаций с лицензиями.", "/3-licenziya.jpg"],
  ["Финансовая пирамида", "Проверить признаки сомнительной организации чек-листом.", "/4-piramida.jpg"],
  ["Проверка сайта", "Выявление фишинговых сайтов и поддельных страниц.", "/5-sait.jpg"],
  ["Проверка телефона", "Узнайте, кто звонил и есть ли номер в базе мошенников.", "/6-telefon.jpg"],
  ["Доходность инвестиций", "Сравните доходность вкладов, облигаций и акций.", "/7-dohodnost.jpg"],
  ["Долговая нагрузка", "Оцените свой показатель DTI перед новым кредитом.", "/8-nagruzka.jpg"],
];

export default function InstrumentsPage() {
  return (
    <div className="instruments-page">
      <section className="instruments-hero">
        <div className="instruments-hero-inner">
          <div className="instruments-hero-text">
            <div className="instruments-badge">
              <MdiIcon path={mdiShieldCheck} size={16} />
              <span>Центр инструментов</span>
            </div>

            <h1>
              Инструменты <br />
              <span>финансовой защиты и расчёта</span>
            </h1>

            <p>
              Страница «Инструменты» — это единый цифровой центр финансовой
              помощи, финансовой грамотности и защиты пользователей.
            </p>
          </div>

          <div className="instruments-hero-image">
            <img src="/инст.svg" alt="Financial Protection" />

            <div className="status-card">
              <div className="status-icon">
                <MdiIcon path={mdiShieldCheck} size={22} />
              </div>

              <div className="status-content">
                <small>Статус</small>
                <b>Безопасно</b>
              </div>
            </div>

            <div className="load-card">
              <div className="load-icon">
                <MdiIcon path={mdiChartLine} size={18} />
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
          <h2>Сервисы</h2>

          <div className="tools-tabs">
            <button className="active">Все</button>
            <button>Расчёты</button>
            <button>Проверки</button>
            <button>Инвестиции</button>
            <button>Безопасность</button>
          </div>

          <div className="tools-grid">
            {tools.map((item) => (
              <article className="tool-card" key={item[0]}>
                <div className="tool-image">
                  <img src={item[2]} alt={item[0]} />
                </div>

                <div className="tool-content">
                  <h3>{item[0]}</h3>
                  <p>{item[1]}</p>
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