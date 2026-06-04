import { useState } from "react";
import "./profile.css";

import MdiIcon from "../components/MdiIcon";
import {
  mdiAccountOutline,
  mdiLogoutVariant,
  mdiBellOutline,
  mdiLockOutline,
  mdiTranslate,
  mdiPaletteOutline,
  mdiEyeOutline,
  mdiShieldOutline,
  mdiTrophyOutline,
  mdiChevronDown,
  mdiCheck,
} from "@mdi/js";

// ── Mock user data ─────────────────────────────────────────────────
const USER = {
  name: "Имя Фамилия",
  badge: "Взрослый аккаунт",
  city: "Алматы",
  userId: "id3456",
  registered: "20.05.2026",
};

// ── Toggle component ───────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`profile-toggle ${checked ? "profile-toggle--on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span className="profile-toggle__thumb" />
    </button>
  );
}

// ── Radio component ────────────────────────────────────────────────
function Radio({ label, checked, onChange }) {
  return (
    <label className="profile-radio">
      <span className={`profile-radio__circle ${checked ? "profile-radio__circle--checked" : ""}`}>
        {checked && <span className="profile-radio__dot" />}
      </span>
      <span className="profile-radio__label">{label}</span>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="profile-radio__input"
      />
    </label>
  );
}

// ── Personal data tab ──────────────────────────────────────────────
function PersonalTab() {
  const [form, setForm] = useState({
    name: "Имя Фамилия",
    email: "email.dfghj2@gmail.com",
    phone: "+7 (456) 1239 45 56",
    birthdate: "15.05.2025",
    city: "Алматы",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="profile-tab-content">
      <div className="profile-form-grid">
        <div className="profile-field">
          <label className="profile-label">ФИО</label>
          <input
            className="profile-input"
            type="text"
            value={form.name}
            placeholder="Введите ваше ФИО"
            onChange={handleChange("name")}
          />
        </div>

        <div className="profile-field">
          <label className="profile-label">Почта</label>
          <input
            className="profile-input"
            type="email"
            value={form.email}
            placeholder="example@mail.com"
            onChange={handleChange("email")}
          />
        </div>

        <div className="profile-field">
          <label className="profile-label">Телефон</label>
          <input
            className="profile-input"
            type="tel"
            value={form.phone}
            placeholder="example@mail.com"
            placeholder="+7 (___) ___-__-__"
            onChange={handleChange("phone")}
          />
        </div>

        <div className="profile-field">
          <label className="profile-label">Дата Рождения</label>
          <input
            className="profile-input"
            type="text"
            value={form.birthdate}
            placeholder="ДД.ММ.ГГГГ"
            onChange={handleChange("birthdate")}
          />
        </div>

        <div className="profile-field profile-field--full">
          <label className="profile-label">Город Проживания</label>
          <div className="profile-select-wrap">
            <select
              className="profile-input profile-select"
              value={form.city}
              onChange={handleChange("city")}
            >
              <option>Алматы</option>
              <option>Астана</option>
              <option>Шымкент</option>
              <option>Қарағанды</option>
            </select>
            <MdiIcon path={mdiChevronDown} size={0.9} className="profile-select-icon" />
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button className="profile-btn profile-btn--primary" type="button">
          Сохранить данные
        </button>
        <button className="profile-btn profile-btn--ghost" type="button">
          Отмена
        </button>
      </div>
    </div>
  );
}

// ── Settings tab ───────────────────────────────────────────────────
function SettingsTab() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("ru");

  const toggle = (key) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="profile-tab-content">
      {/* Notifications */}
      <div className="profile-settings-group">
        <h3 className="profile-settings-title">
          <MdiIcon path={mdiBellOutline} size={0.9} />
          Уведомления
        </h3>
        <div className="profile-settings-divider" />

        <div className="profile-settings-row">
          <span>Email-уведомления</span>
          <Toggle checked={notifications.email} onChange={() => toggle("email")} />
        </div>
        <div className="profile-settings-row">
          <span>Push-уведомления</span>
          <Toggle checked={notifications.push} onChange={() => toggle("push")} />
        </div>
        <div className="profile-settings-row">
          <span>СМС-информирование</span>
          <Toggle checked={notifications.sms} onChange={() => toggle("sms")} />
        </div>
      </div>

      {/* Security */}
      <div className="profile-settings-group">
        <h3 className="profile-settings-title">
          <MdiIcon path={mdiLockOutline} size={0.9} />
          Безопасность
        </h3>
        <div className="profile-settings-divider" />

        <div className="profile-security-btns">
          <button className="profile-btn profile-btn--outline" type="button">
            <MdiIcon path={mdiEyeOutline} size={0.85} />
            Изменить пароль
          </button>
          <button className="profile-btn profile-btn--outline" type="button">
            <MdiIcon path={mdiShieldOutline} size={0.85} />
            Настроить двухфакторную аутентификацию
          </button>
        </div>
      </div>

      {/* Language + Theme */}
      <div className="profile-settings-bottom">
        <div className="profile-settings-group profile-settings-group--half">
          <h3 className="profile-settings-title">
            <MdiIcon path={mdiTranslate} size={0.9} />
            Язык интерфейса
          </h3>
          <div className="profile-settings-divider" />
          <div className="profile-select-wrap profile-select-wrap--light">
            <select
              className="profile-input profile-select"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="ru">Русский</option>
              <option value="kz">Қазақша</option>
            </select>
            <MdiIcon path={mdiChevronDown} size={0.9} className="profile-select-icon" />
          </div>
        </div>

        <div className="profile-settings-group profile-settings-group--half">
          <h3 className="profile-settings-title">
            <MdiIcon path={mdiPaletteOutline} size={0.9} />
            Тема оформления
          </h3>
          <div className="profile-settings-divider" />
          <div className="profile-theme-options">
            <Radio label="Светлая"  checked={theme === "light"}  onChange={() => setTheme("light")}  />
            <Radio label="Тёмная"   checked={theme === "dark"}   onChange={() => setTheme("dark")}   />
            <Radio label="Системная" checked={theme === "system"} onChange={() => setTheme("system")} />
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button className="profile-btn profile-btn--primary" type="button">
          Сохранить данные
        </button>
        <button className="profile-btn profile-btn--ghost" type="button">
          Отмена
        </button>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────
function Profile() {
  const [tab, setTab] = useState("personal"); // "personal" | "settings"

  return (
    <div className="profile-page">
      <div className="profile-layout">

        {/* ── Left column ── */}
        <aside className="profile-sidebar">

          {/* User card */}
          <div className="profile-user-card">
            <div className="profile-avatar">
              <MdiIcon path={mdiAccountOutline} size={2.2} />
            </div>
            <h2 className="profile-user-name">{USER.name}</h2>
            <span className="profile-user-badge">{USER.badge}</span>

            <div className="profile-user-divider" />

            <div className="profile-user-meta">
              <div className="profile-meta-row">
                <span className="profile-meta-key">Город</span>
                <span className="profile-meta-val">{USER.city}</span>
              </div>
              <div className="profile-meta-row">
                <span className="profile-meta-key">UserID</span>
                <span className="profile-meta-val">{USER.userId}</span>
              </div>
              <div className="profile-meta-row">
                <span className="profile-meta-key">Регистрация</span>
                <span className="profile-meta-val">{USER.registered}</span>
              </div>
            </div>

            <button className="profile-logout" type="button">
              <MdiIcon path={mdiLogoutVariant} size={0.9} />
              Выйти с аккаунта
            </button>
          </div>

        </aside>

        {/* ── Right column ── */}
        <div className="profile-main">

          {/* Tabs + content card */}
          <div className="profile-card">
            <div className="profile-tabs">
              <button
                type="button"
                className={`profile-tab ${tab === "personal" ? "profile-tab--active" : ""}`}
                onClick={() => setTab("personal")}
              >
                Личные данные
              </button>
              <button
                type="button"
                className={`profile-tab ${tab === "settings" ? "profile-tab--active" : ""}`}
                onClick={() => setTab("settings")}
              >
                Настройки
              </button>
            </div>

            {tab === "personal" ? <PersonalTab /> : <SettingsTab />}
          </div>

          {/* Achievements card */}
          <div className="profile-card profile-achievements">
            <div className="profile-achievements-header">
              <h3 className="profile-achievements-title">Ваши достижения</h3>
              <a href="/education" className="profile-achievements-link">
                Смотреть курсы
              </a>
            </div>

            <div className="profile-achievements-empty">
              <MdiIcon path={mdiTrophyOutline} size={2} />
              <p>
                Здесь будут отображаться ваши достижения после прохождения
                курсов, тестов и других активностей.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
