import React from "react";
import "./CoursePage.css";
import { useNavigate } from "react-router-dom";

export default function CoursePage() {
  const navigate = useNavigate();

  const steps = [
    {
      title: "Осознание проблемы",
      icon: "/course-alert-icon.svg",
      active: true,
    },
    {
      title: "Теория",
      icon: "/course-book-white-icon.svg",
      active: true,
    },
    {
      title: "Практика",
      icon: "/course-target-icon.svg",
      active: true,
    },
    {
      title: "Проверка знаний",
      icon: "/course-check-white-icon.svg",
      active: true,
    },
    {
      title: "Применение",
      icon: "/course-medal-gray-icon.svg",
      active: false,
    },
  ];

  return (
    <div className="course-page">
      <section className="course-steps-hero">

       <button
         className="course-back-btn"
        onClick={() => {
        navigate("/learning");
        setTimeout(() => window.scrollTo(0, 0), 0);
    }}
>
  <img src="/course-back-icon.svg" alt="" />
</button>

        <h1>Путь пользователя</h1>

        <p>От проблемы до решения — пошаговый процесс</p>

        <div className="course-steps-line">
          {steps.map((step) => (
            <div className="course-step" key={step.title}>
              <div
                className={`course-step-circle ${
                  step.active ? "active" : "disabled"
                }`}
              >
                <img src={step.icon} alt="" />
              </div>

              <span className={step.active ? "" : "disabled-text"}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        </section>



    <section className="course-video-section">
  <div className="course-video-inner">
    <div className="course-video-card">
      <button className="course-play-btn">
        <span></span>
      </button>

      <div className="course-video-text">
        <h2>Основы банковской безопасности</h2>
        <p>Модуль 4: Как защитить свои цифровые данные</p>
      </div>

      <div className="course-video-actions">
        <button className="course-action-btn">CC</button>

        <button className="course-action-btn">
          <img src="/course-settings-icon.svg" alt="" />
        </button>
      </div>
    </div>

    <div className="course-sidebar">
      <div className="course-progress-box">
        <div className="course-progress-title">
          <span>Прогресс курса</span>
          <b>65%</b>
        </div>

        <div className="course-progress-line">
          <span></span>
        </div>
      </div>

      <div className="course-next-box">
        <h3>Следующее</h3>

        <div className="course-next-lesson">
          <div></div>

          <p>
            Двухфакторная-аутентификация
            <span>12 минут · Видео-урок</span>
          </p>
        </div>

        <button className="course-next-btn">
          Перейти к следующему
          <img src="/course-next-arrow-icon.svg" alt="" />
        </button>
      </div>
    </div>

    <div className="course-transcript">Транскрипт</div>
  </div>
</section>

    </div>
  );
}