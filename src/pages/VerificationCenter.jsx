import { useEffect, useRef, useState } from "react";
import MdiIcon from "../components/MdiIcon";
import {
  mdiAlertOutline,
  mdiChevronRight,
  mdiFileDocumentCheckOutline,
  mdiMagnify,
} from "@mdi/js";
import "./VerificationCenter.css";
import background from "/13-background.svg";

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
    className: visible ? "reveal revealVisible" : "reveal",
  };
}

function useFadeOnScroll() {
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
    className: visible ? "revealFade revealFadeVisible" : "revealFade",
  };
}
// ── Hero ─────────────────────────────────────────────

export function HeroBanner() {
  const [value, setValue] = useState("");

  const bgReveal = useFadeOnScroll();
  const titleReveal = useRevealOnScroll();
  const subReveal = useRevealOnScroll();
  const inputReveal = useRevealOnScroll();

  return (
    <section className="heroBanner">
      <div
        ref={bgReveal.ref}
        className={`bgImage ${bgReveal.className}`}
      >
        <img src={background} alt="" className="bgImg" />
      </div>

      <div className="content">
        <h1
          ref={titleReveal.ref}
          className={`title ${titleReveal.className}`}
          style={{ transitionDelay: "100ms" }}
        >
          Перехват —<br />
          остановите риск<br />
          до потери денег
        </h1>

        <p
          ref={subReveal.ref}
          className={`sub ${subReveal.className}`}
          style={{ transitionDelay: "220ms" }}
        >
          Проверьте компанию, номер телефона или сайт за<br />
          10 секунд
        </p>

        <div
          ref={inputReveal.ref}
          className={`inputRow ${inputReveal.className}`}
          style={{ transitionDelay: "340ms" }}
        >
          <input
            className="input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите БИН / ИИН / номер / сайт"
          />

          <button className="btn" type="button">
            <MdiIcon path={mdiMagnify} size={18} />
            Проверить
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Data ─────────────────────────────────────────────

const TYPES = [
  {
    id: "license",
    icon: mdiFileDocumentCheckOutline,
    label: "Проверка лицензии",
    title: "Проверка лицензии",
    placeholder: "Название компании, номер лицензии, БИН, адрес сайта",
  },
  {
    id: "pyramid",
    icon: mdiAlertOutline,
    label: "Проверка финансовых пирамид",
    title: "Проверка финансовых пирамид",
    placeholder: "Название, БИН/ИИН, адрес сайта, ФИО основателя проекта",
  },
];

const TRAINING_CARDS = [
  {
    variant: "dark",
    title: "4 сценария на основе реальных случаев в Казахстане",
    text: "Звонок из «банка», инвестброкер с криптой, SMS-фишинг, выигрыш в лотерею — каждый основан на данных АРРФР и МВД за 2024–2025 год.",
  },
  {
    variant: "light",
    title: "Чат или звонок — выбирайте как реагировать. Нет правильных ответов заранее",
    text: "4 варианта ответа на каждый ход. Частично верные — частичные очки. Как в жизни: идеального ответа нет, есть лучший.",
  },
  {
    variant: "light",
    title: "Симулируем реальный сценарий мошенничества — звонок из банка, выигрыш, инвестиция",
    text: "Мошенник пытается с задержкой, создаёт панику и срочность — точно как в настоящем звонке.",
  },
  {
    variant: "dark",
    title: "Живой индикатор угрозы и разбор красных флагов после каждого хода",
    text: "Шкала угрозы растёт в реальном времени. После вашего ответа мгновенный разбор ошибки и все красные флаги этого сценария.",
  },
];

function TrainerCard({ card, delay = 0 }) {
  const reveal = useRevealOnScroll();

  return (
    <article
      ref={reveal.ref}
      className={`trainerCard ${
        card.variant === "dark" ? "trainerCardDark" : "trainerCardLight"
      } ${reveal.className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="trainerIcon">
        <MdiIcon path={mdiAlertOutline} size={24} />
      </div>

      <div>
        <h3>{card.title}</h3>
        <p>{card.text}</p>
      </div>
    </article>
  );
}

export function VigilanceTrainerBanner() {
  const headerReveal = useRevealOnScroll();

  return (
    <section className="trainerBanner">
      <div className="trainerInner">
        <div
          ref={headerReveal.ref}
          className={`trainerHeader ${headerReveal.className}`}
        >
          <h2 className="trainerTitle">Тренажёр бдительности</h2>
          <p className="trainerSubtitle">
            Чат-симулятор: мошенник пишет вам в реальном времени, индикатор угрозы нарастает
            <br />
            с каждым ходом — после полный разбор ошибок.
          </p>

          <button className="trainerButton" type="button">
            Начать тренировку
          </button>
        </div>

        <div className="trainerGrid">
          {TRAINING_CARDS.map((card, index) => (
            <TrainerCard key={card.title} card={card} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function VerificationCenter() {
  const [activeId, setActiveId] = useState("license");
  const [value, setValue] = useState("");

  const headerReveal = useRevealOnScroll();
  const sidebarReveal = useRevealOnScroll();
  const panelReveal = useRevealOnScroll();

  const active = TYPES.find((type) => type.id === activeId);

  const handleSwitch = (id) => {
    setActiveId(id);
    setValue("");
  };

  return (
    <>
      <HeroBanner />

      <section className="section">
        <div
          ref={headerReveal.ref}
          className={`header ${headerReveal.className}`}
        >
          <h2 className="title">Центр проверки</h2>
          <p className="subtitle">
            Выберите тип проверки и получите мгновенную диагностику
          </p>
        </div>

        <div className="body">
          <aside
            ref={sidebarReveal.ref}
            className={`sidebar ${sidebarReveal.className}`}
            style={{ transitionDelay: "100ms" }}
          >
            <p className="sidebarLabel">Типы проверки</p>

            <ul className="typeList" role="list">
              {TYPES.map((type) => (
                <li key={type.id}>
                  <button
                    type="button"
                    className={
                      "typeBtn " + (activeId === type.id ? "typeBtnActive" : "")
                    }
                    onClick={() => handleSwitch(type.id)}
                    aria-pressed={activeId === type.id}
                  >
                    <span className="typeBtnIcon">
                      <MdiIcon path={type.icon} size={22} />
                    </span>

                    <span className="typeBtnLabel">{type.label}</span>

                    {activeId === type.id && (
                      <MdiIcon
                        className="typeBtnArrow"
                        path={mdiChevronRight}
                        size={18}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div
            ref={panelReveal.ref}
            className={`panel ${panelReveal.className}`}
            style={{ transitionDelay: "200ms" }}
          >
            <h3 className="panelTitle">{active.title}</h3>

            <div className="inputRow">
              <input
                key={activeId}
                className="input"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setValue("")}
                placeholder={active.placeholder}
                aria-label={active.title}
              />

              <button className="btn" type="button" disabled={!value.trim()}>
                <MdiIcon path={mdiMagnify} size={18} />
                Проверить
              </button>
            </div>

            <div className="emptyState">
              <MdiIcon path={mdiMagnify} size={48} color="#c8c6d8" />
              <p>Введите данные для проверки</p>
            </div>
          </div>
        </div>
      </section>

      <VigilanceTrainerBanner />
    </>
  );
}