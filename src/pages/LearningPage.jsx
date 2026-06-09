import React from "react";
import { useNavigate } from "react-router-dom";
import MdiIcon from "../components/MdiIcon";
import {
  mdiArrowRight,
  mdiBookOpenPageVariantOutline,
  mdiCheckCircleOutline,
  mdiClockOutline,
  mdiCreationOutline,
  mdiMedalOutline,
  mdiSchoolOutline,
  mdiShieldCheckOutline,
  mdiTrendingUp,
} from "@mdi/js";
import "./LearningPage.css";


export default function LearningPage() {
  const navigate = useNavigate();
    <form
  className="auth-form"
  onSubmit={(e) => {
    e.preventDefault();

    // здесь потом будет API логина
    navigate("/home");
  }}
>

</form>
  const lessons = [
    { title: "Урок 1", percent: 75 },
    { title: "Урок 2", percent: 100 },
    { title: "Урок 3", percent: 60 },
    { title: "Урок 4", percent: 30 },
  ];

  const courses = [
    {
      level: "Базовый",
      levelColor: "blue",
      title: "Основы финансовой безопасности",
      time: "2 часа",
      lessons: "8 уроков",
      progress: 75,
      button: "Продолжить",
    },
    {
      level: "Базовый",
      levelColor: "purple",
      title: "Кредиты: что нужно знать",
      time: "1.5 часа",
      lessons: "6 уроков",
      progress: 40,
      button: "Продолжить",
    },
    {
      level: "Средний",
      levelColor: "middle",
      title: "Криптовалюты: основы для инвестора",
      time: "1.5 часа",
      lessons: "6 уроков",
      progress: 40,
      button: "Продолжить",
    },
    {
      level: "Средний",
      levelColor: "green",
      title: "Инвестиции для начинающих",
      time: "3 часа",
      lessons: "10 уроков",
      progress: 0,
      button: "Начать курс",
    },
    {
      level: "Базовый",
      levelColor: "red",
      title: "Защита от мошенников",
      time: "1 час",
      lessons: "5 уроков",
      progress: 100,
      button: "Повторить",
      done: true,
    },
    {
      level: "Базовый",
      levelColor: "red",
      title: "Личный бюджет: от хаоса к системе",
      time: "2 часа",
      lessons: "9 уроков",
      progress: 0,
      button: "Повторить",
      done: true,
    },
  ];

  const popular = [
    {
      title: "Личные финансы",
      count: "120 курсов",
      text: "Планирование, бюджет, накопления",
      className: "popular-card-tall",
    },
    {
      title: "Инвестиции",
      count: "85 курсов",
      text: "Планирование, бюджет, накопления",
      className: "popular-card-wide",
    },
    {
      title: "Банковские продукты",
      count: "90 курсов",
      text: "Планирование, бюджет, накопления",
      className: "popular-card-small",
    },
    {
      title: "Кибербезопасность",
      count: "70 курсов",
      text: "Планирование, бюджет, накопления",
      className: "popular-card-small",
    },
  ];

  const renderCourseCard = (course, prefix = "") => (
    <article className="course-card" key={`${prefix}${course.title}`}>
      {course.done && (
        <div className="course-done" aria-label="Курс завершён">
          <MdiIcon path={mdiCheckCircleOutline} size={18} />
        </div>
      )}

      <span className={`course-level ${course.levelColor}`}>
        {course.level}
      </span>

      <h3>{course.title}</h3>

      <div className="course-meta">
        <span>
          <MdiIcon path={mdiClockOutline} size={14} />
          {course.time}
        </span>

        <span>
          <MdiIcon path={mdiBookOpenPageVariantOutline} size={14} />
          {course.lessons}
        </span>
      </div>

      <div className="course-progress-head">
        <span>Прогресс</span>
        <b>{course.progress}%</b>
      </div>

      <div className="course-progress-track">
        <div
          className="course-progress-fill"
          style={{ width: `${course.progress}%` }}
        />
      </div>

      <button className="course-btn" onClick={() => navigate("/course")}>
        {course.button}
        <MdiIcon path={mdiArrowRight} size={16} />
      </button>
    </article>
  );

  return (
    <>
      <section className="learning-hero">
        <div className="learning-pattern">
          {Array.from({ length: 22 }).map((_, index) => (
            <svg
              key={index}
              className={`pattern-line pattern-line-${index + 1}`}
              xmlns="http://www.w3.org/2000/svg"
              width="990"
              height="802"
              viewBox="0 0 990 802"
              fill="none"
            >
              <path
                d="M879.99 173.956C856.638 -51.3782 720.51 10.4627 374.485 267.116C374.485 225.623 341.05 119.334 207.31 26.1219C40.1349 -90.3939 141.236 220.403 -6.56805 224.384C-154.372 228.366 78.8769 582.159 207.31 500.412C335.743 418.666 417.207 453.965 343.438 687.262C269.669 920.559 677.788 733.975 603.753 663.906C529.718 593.837 1214.34 644.531 911.036 500.412C607.733 356.294 903.341 399.291 879.99 173.956Z"
                stroke="white"
                strokeOpacity="0.16"
                strokeWidth="1"
              />
            </svg>
          ))}

          <svg
            className="pattern-small"
            xmlns="http://www.w3.org/2000/svg"
            width="296"
            height="343"
            viewBox="0 0 296 343"
            fill="none"
          >
            <path
              d="M127.711 124.447C275.481 137.53 324.666 152.732 279.141 215.97C233.616 279.208 167.356 200.639 212.469 306.951C257.583 413.262 92.9457 243.861 95.9779 278.777C99.01 313.693 -48.7191 268.421 23.6273 225.321C95.9737 182.22 83.077 154.541 31.3204 146.213C-20.4363 137.884 0.438272 -6.30677 39.3956 26.43C78.3528 59.1667 123.41 -43.7913 139.795 24.3341C152.903 78.8344 137.2 113.784 127.711 124.447Z"
              stroke="white"
              strokeOpacity="0.16"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="learning-content">
          <div className="learning-info">
            <h1>
              Финансовая <br />
              грамотность — <br />
              понятным языком
            </h1>

            <p>Выберите формат и начните с вашей ситуации</p>

            <button className="learning-start-btn">
              <MdiIcon path={mdiCreationOutline} size={18} />
              Начать обучение
            </button>
          </div>

          <div className="learning-progress-card">
            <div className="learning-points">
              <MdiIcon path={mdiMedalOutline} size={20} />
              +50 баллов
            </div>

            <div className="learning-card-head">
              <div className="learning-icon-box">
                <MdiIcon path={mdiShieldCheckOutline} size={26} />
              </div>

              <div>
                <h3>Защита от мошенников</h3>
                <span>Модуль 4 из 10</span>
              </div>
            </div>

            <div className="learning-lessons">
              {lessons.map((lesson) => (
                <div className="learning-lesson" key={lesson.title}>
                  <div className="lesson-row">
                    <span>{lesson.title}</span>
                    <span>{lesson.percent}%</span>
                  </div>

                  <div className="lesson-track">
                    <div
                      className="lesson-fill"
                      style={{ width: `${lesson.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="learning-total-progress">
              <MdiIcon path={mdiTrendingUp} size={20} />
              Прогресс: 65%
            </div>
          </div>
        </div>
      </section>

      <section className="online-courses-section">
        <div className="online-courses-inner">
          <h2>Онлайн курсы</h2>

          <div className="courses-tabs">
            <button className="active">В тренде</button>
            <button>Видео-уроки</button>
            <button>Курсы</button>
            <button>Игры</button>
          </div>

          <div className="courses-grid">
            {courses.map((course) => renderCourseCard(course, "online-"))}
          </div>
        </div>
      </section>

      <section className="popular-section">
        <div className="popular-inner">
          <h2>Часто ищут</h2>
          <p>Популярные направления обучения и востребованные навыки</p>

          <div className="popular-grid">
            {popular.map((item) => (
              <article
                className={`popular-card ${item.className}`}
                key={item.title}
              >
                <div>
                  <h3>{item.title}</h3>
                  <span>{item.count}</span>
                  <p>{item.text}</p>
                </div>

                <button>
                  Перейти
                  <MdiIcon path={mdiArrowRight} size={16} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="recommended-courses-section">
        <div className="recommended-courses-inner">
          <h2>Рекомендованные курсы</h2>
          <p>Курсы, отобранные на основе ваших интересов и уровня подготовки</p>

          <div className="courses-grid">
            {courses.map((course) => renderCourseCard(course, "recommended-"))}
          </div>
        </div>
      </section>

      <section className="kids-adventure-section">
        <div className="kids-adventure-inner">
          <div className="kids-adventure-content">
            <h2>Финансовое приключение для детей!</h2>

            <p>
              Учим распоряжаться карманными деньгами и копить на мечту в игровом
              формате
            </p>

            <button
              className="kids-adventure-btn"
              onClick={() => navigate("/gamified")}
            >
              Перейти
              <MdiIcon path={mdiArrowRight} size={18} />
            </button>
          </div>

          <img
            className="kids-robot-img"
            src="/happy retro robot.svg"
            alt="Робот для детского обучения"
          />
        </div>
      </section>
    </>
  );
}