import React from "react";
import "./GamifiedPage.css";

export default function GamifiedPage() {
  return (
    <div className="gamified-page">
      <section className="gamified-hero">
        <div className="gamified-hero-inner">
          <div className="gamified-hero-text">
            <h1>
              Твое <br />
              приключение в <br />
              мире финансов!
            </h1>

            <p>
              Проходи уровни, зарабатывай бонусы и стань экспертом цифровой
              безопасности
            </p>
          </div>

          <img
            className="gamified-robot"
            src="/kids-robot.png"
            alt="Робот"
          />

          <div className="gamified-progress-card">
            <div className="gamified-progress-top">
              <span>Твой прогресс</span>
              <b>3/20</b>
            </div>

            <div className="gamified-progress-line">
              <div className="gamified-progress-fill"></div>
            </div>

            <p>Еще 17 уровней до мастера!</p>
          </div>
        </div>
      </section>

      
      <section className="game-map-section">
  <div className="game-map-inner">
    <svg
      className="game-map-path"
      width="1440"
      height="2207"
      viewBox="0 0 1440 2207"
      fill="none"
    >
      <path
        d="
          M 719 119
          C 790 145, 850 205, 919 309

          C 760 405, 610 430, 524 484

          C 570 620, 730 655, 949 764

          C 915 900, 760 990, 634 1029

          C 660 1135, 735 1195, 954 1249

          C 915 1370, 815 1445, 719 1499

          C 765 1605, 845 1695, 959 1774

          C 815 1855, 640 1888, 579 1944

          C 610 2045, 745 2025, 874 2064
        "
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="8 8"
      />
    </svg>

    {[
      { n: 1, type: "blue", icon: "/level-check-icon.svg", card: "left", title: "Запрос пользователя", stars: true, x: 655, y: 55 },
      { n: 2, type: "green", icon: "/level-check-icon.svg", card: "right", cat: "Безопасность", title: "Безопасные пароли", stars: true, x: 855, y: 245 },
      { n: 3, type: "red", icon: "/level-mail-icon.svg", card: "left", cat: "Угрозы", title: "Что такое фишинг?", play: true, x: 460, y: 420 },
      { n: 4, type: "gray", icon: "/level-lock-icon.svg", card: "right", cat: "Социальные сети", title: "Безопасность в соц сетях", x: 885, y: 700 },
      { n: 5, type: "gray", icon: "/level-lock-icon.svg", card: "left", cat: "Мобильные устройства", title: "Мобильная безопасность", x: 570, y: 965 },
      { n: 6, type: "gray", icon: "/level-lock-icon.svg", card: "right", cat: "Покупки", title: "Онлайн-покупки", x: 890, y: 1185 },
      { n: 7, type: "gray", icon: "/level-lock-icon.svg", card: "left", cat: "Финансы", title: "Банковские карты", x: 655, y: 1435 },
      { n: 8, type: "gray", icon: "/level-lock-icon.svg", card: "right", cat: "Покупки", title: "Онлайн-покупки", x: 895, y: 1710 },
      { n: 9, type: "gray", icon: "/level-lock-icon.svg", card: "left", cat: "Финансы", title: "Банковские карты", x: 515, y: 1880 },
      { n: 10, type: "gray", icon: "/level-lock-icon.svg", card: "right", cat: "SOS", title: "Что делать при атаке?", x: 810, y: 2000 },
    ].map((item) => (
      <div
        key={`${item.n}-${item.x}-${item.y}`}
        className="map-item"
        style={{ left: item.x, top: item.y }}
      >
        <div className={`map-circle ${item.type}`}>
          <img src={item.icon} alt="" />
          <span className="level-number">{item.n}</span>

          {item.type !== "gray" && <span className="coin-badge">3</span>}

          {item.play && (
            <span className="play-badge">
              <img src="/level-play-icon.svg" alt="" />
            </span>
          )}
        </div>

        <div className={`map-card ${item.card}`}>
          {item.cat && <span>{item.cat}</span>}
          <h3>{item.title}</h3>
          {item.stars && <div className="stars">★ ★ ★</div>}
        </div>
      </div>
    ))}
  </div>
        </section>


        <section className="bonus-section">
  <div className="bonus-card">
    <img
      src="/bonus-green-circle.svg"
      alt=""
      className="bonus-circle"
    />

    <h2>Бонусы Halyk Bank!</h2>

    <p className="bonus-subtitle">
      За каждый пройденный уровень
    </p>

    <div className="bonus-list">
      <div className="bonus-item">
        <div className="bonus-value">+50</div>
        <div className="bonus-label">баллов</div>
      </div>

      <div className="bonus-item">
        <div className="bonus-value">+10%</div>
        <div className="bonus-label">кэшбек</div>
      </div>

      <div className="bonus-item">
        <div className="bonus-gift">🎁</div>
        <div className="bonus-label">подарки</div>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}