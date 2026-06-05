import "./CoursesPage.css";
import { useEffect, useRef, useState } from "react";
import MdiIcon from "../components/MdiIcon";
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiClockOutline,
  mdiBookOpenOutline,
  mdiCheckCircleOutline,
} from "@mdi/js";

// ── Mock data (замени через бэк) ───────────────────────────────────
const ACTIVE_COURSE = {
  badge: "Изучается сейчас",
  title: "Основы финансовой безопасности",
  module: "Модуль 4: Распределение вероятностей",
  progress: 75,
};

const COURSES = [
  {
    id: 1,
    badge: "Базовый",
    badgeColor: "blue",
    title: "Основы финансовой безопасности",
    hours: "2 часа",
    lessons: "8 уроков",
    progress: 75,
    completed: false,
  },
  {
    id: 2,
    badge: "Базовый",
    badgeColor: "blue",
    title: "Кредиты: что нужно знать",
    hours: "1.5 часа",
    lessons: "6 уроков",
    progress: 40,
    completed: false,
  },
  {
    id: 3,
    badge: "Средний",
    badgeColor: "green",
    title: "Инвестиции для начинающих",
    hours: "3 часа",
    lessons: "10 уроков",
    progress: 0,
    completed: false,
  },
  {
    id: 4,
    badge: "Базовый",
    badgeColor: "blue",
    title: "Защита от мошенников",
    hours: "1 час",
    lessons: "5 уроков",
    progress: 100,
    completed: true,
  },
];

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
    className: visible ? "courses-reveal courses-reveal--visible" : "courses-reveal",
  };
}

// ── Progress bar ───────────────────────────────────────────────────
function ProgressBar({ value, dark }) {
  return (
    <div className={`courses-progress-bar ${dark ? "courses-progress-bar--dark" : ""}`}>
      <div
        className="courses-progress-bar__fill"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

// ── Course card ────────────────────────────────────────────────────
function CourseCard({ badge, badgeColor, title, hours, lessons, progress, completed, delay = 0 }) {
  const btnLabel = completed ? "Повторить" : progress === 0 ? "Начать курс" : "Продолжить";
  const reveal = useRevealOnScroll();

  return (
  
    <article
      ref={reveal.ref}
      className={`courses-card ${reveal.className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="courses-card__top">
        <span className={`courses-badge courses-badge--${badgeColor}`}>
          {badge}
        </span>

        {completed && (
          <span className="courses-card__done">
            <MdiIcon path={mdiCheckCircleOutline} size={22} />
          </span>
        )}
      </div>

      <h3 className="courses-card__title">{title}</h3>

      <div className="courses-card__meta">
        <span>
          <MdiIcon path={mdiClockOutline} size={16} />
          {hours}
        </span>
        <span>
          <MdiIcon path={mdiBookOpenOutline} size={16} />
          {lessons}
        </span>
      </div>

      <div className="courses-card__progress-row">
        <span>Прогресс</span>
        <span className="courses-card__pct">{progress}%</span>
      </div>
      <ProgressBar value={progress} />

      <button className="courses-card__btn" type="button">
        {btnLabel}
        <MdiIcon path={mdiChevronRight} size={18} />
      </button>
    </article>
  );
}

// ── Page ───────────────────────────────────────────────────────────
export default function CoursesPage() {
  const heroCardReveal = useRevealOnScroll();
  const titleReveal = useRevealOnScroll();
  const subtitleReveal = useRevealOnScroll();

  return (
    <div className="courses-page">

      <section className="courses-hero">
        <img src="/16-bcg_l_courses.svg" alt="" className="courses-hero__bg-left" />
        <img src="/15-bcg_r_courses.svg" alt="" className="courses-hero__bg-right" />

        <button className="courses-hero__back" type="button" aria-label="Назад">
          <MdiIcon path={mdiChevronLeft} size={20} />
        </button>

        <div
          ref={heroCardReveal.ref}
          className={`courses-hero__card ${heroCardReveal.className}`}
          style={{ transitionDelay: "180ms" }}
        >
          <span className="courses-badge courses-badge--light">
            {ACTIVE_COURSE.badge}
          </span>

          <h2 className="courses-hero__title">{ACTIVE_COURSE.title}</h2>
          <p className="courses-hero__module">{ACTIVE_COURSE.module}</p>

          <div className="courses-hero__progress-row">
            <span>Прогресс курса</span>
            <span className="courses-hero__pct">{ACTIVE_COURSE.progress}%</span>
          </div>

          <ProgressBar value={ACTIVE_COURSE.progress} dark />

          <button className="courses-hero__btn" type="button">
            Продолжить
            <MdiIcon path={mdiChevronRight} size={18} />
          </button>
        </div>
      </section>

      <section className="courses-section">
        <h2
          ref={titleReveal.ref}
          className={`courses-section__title ${titleReveal.className}`}
        >
          Ваши курсы
        </h2>

        <p
          ref={subtitleReveal.ref}
          className={`courses-section__sub ${subtitleReveal.className}`}
          style={{ transitionDelay: "100ms" }}
        >
          Продолжите с того места, где остановились
        </p>

        <div className="courses-grid">
          {COURSES.map((course, index) => (
            <CourseCard key={course.id} {...course} delay={index * 100} />
          ))}
        </div>
      </section>

    </div>
  );
}