import { useState } from "react";
import MdiIcon from "../components/MdiIcon";
import {
  mdiAlertOutline,
  mdiChevronRight,
  mdiFileDocumentCheckOutline,
  mdiMagnify,
} from "@mdi/js";
import "./VerificationCenter.css";
import background from "/13-background.svg";


// ── Hero ─────────────────────────────────────────────

export function HeroBanner() {
  const [value, setValue] = useState("");

  return (
    <section className="heroBanner">
      <div className="bgImage" aria-hidden="true">
          <img src={background} alt="" className="bgImg" />
      </div>

      <div className="content">
        <h1 className="title">
          Перехват —<br />
          остановите риск<br />
          до потери денег
        </h1>

        <p className="sub">
          Проверьте компанию, номер телефона или сайт за<br />
          10 секунд
        </p>

        <div className="inputRow">
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

// ── Data ───────────рпппрр──────────────────────────────────

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

export function VigilanceTrainerBanner() {
  return (
    <section className="trainerBanner">
      <div className="trainerInner">
        <div className="trainerHeader">
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
          {TRAINING_CARDS.map((card) => (
            <article
              key={card.title}
              className={`trainerCard ${
                card.variant === "dark" ? "trainerCardDark" : "trainerCardLight"
              }`}
            >
              <div className="trainerIcon">
                <MdiIcon path={mdiAlertOutline} size={24} />
              </div>

              <div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function VerificationCenter() {
  const [activeId, setActiveId] = useState("license");
  const [value, setValue] = useState("");

  const active = TYPES.find((type) => type.id === activeId);

  const handleSwitch = (id) => {
    setActiveId(id);
    setValue("");
  };

  return (
    <>
      <HeroBanner />

      <section className="section">
        <div className="header">
          <h2 className="title">Центр проверки</h2>
          <p className="subtitle">
            Выберите тип проверки и получите мгновенную диагностику
          </p>
        </div>

        <div className="body">
          <aside className="sidebar">
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

          <div className="panel">
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