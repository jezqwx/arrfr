import { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

import MdiIcon from "../components/MdiIcon";
import {
  mdiEyeOutline,
  mdiEyeOffOutline,
  mdiCurrencyUsd,
  mdiShieldCheckOutline,
  mdiAlertOutline,
  mdiChartLineVariant,
} from "@mdi/js";

const BENEFITS = [
  {
    icon: mdiCurrencyUsd,
    title: "Изучать финансы простым языком",
    desc: "Курсы и материалы для повседневной финансовой грамотности.",
  },
  {
    icon: mdiShieldCheckOutline,
    title: "Проверять финансовые организации",
    desc: "Быстрая проверка лицензий, сайтов и инвестиционных проектов.",
  },
  {
    icon: mdiAlertOutline,
    title: "Избегать мошенничества",
    desc: "Узнавайте признаки финансовых пирамид и подозрительных схем.",
  },
  {
    icon: mdiChartLineVariant,
    title: "Развивать финансовые навыки",
    desc: "Учитесь управлять бюджетом, накоплениями и личными финансами.",
  },
];

function PasswordInput({ value, onChange, placeholder, id }) {
  const [show, setShow] = useState(false);
  return (
    <div className="auth-input-wrap">
      <input
        id={id}
        className="auth-input"
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="new-password"
      />
      <button
        type="button"
        className="auth-eye"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Скрыть пароль" : "Показать пароль"}
      >
        <MdiIcon path={show ? mdiEyeOffOutline : mdiEyeOutline} size={22} />
      </button>
    </div>
  );
}

function PasswordRules({ password }) {
  const rules = [
    { label: "Минимум 8 символов",       ok: password.length >= 8 },
    { label: "Содержит цифры и буквы",    ok: /[0-9]/.test(password) && /[a-zA-Zа-яА-Я]/.test(password) },
    { label: "Минимум одна заглавная буква", ok: /[A-ZА-Я]/.test(password) },
  ];
  return (
    <ul className="auth-rules">
      {rules.map((r) => (
        <li key={r.label} className={`auth-rule ${r.ok ? "auth-rule--ok" : ""}`}>
          <span className="auth-rule__dot" />
          {r.label}
        </li>
      ))}
    </ul>
  );
}

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    agree: false,
  });

  const set = (field) => (e) =>
    setForm((p) => ({
      ...p,
      [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  return (
    <div className="auth-page">
      {/* Logo */}
      <div className="auth-logo" >
        <img src="/logo.svg" alt="FinGramota" />
        
      </div>

      {/* Card */}
      <div className="auth-card auth-card--wide">
        {/* ── Left: form ── */}
        <div className="auth-form-col">
          <h1 className="auth-title">
            <span className="auth-title__bar" aria-hidden="true" />
            Создайте аккаунт
          </h1>
          <p className="auth-desc">
            Получите доступ к обучению, проверке финансовых организаций и
            полезным инструментам финансовой грамотности.
          </p>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="reg-first">Имя</label>
              <input id="reg-first" className="auth-input" type="text"
                placeholder="Введите ваше имя" value={form.firstName} onChange={set("firstName")} />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="reg-last">Фамилия</label>
              <input id="reg-last" className="auth-input" type="text"
                placeholder="Введите вашу фамилию" value={form.lastName} onChange={set("lastName")} />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="reg-email">Почта</label>
              <input id="reg-email" className="auth-input" type="email"
                placeholder="Введите ваш email" value={form.email} onChange={set("email")} />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="reg-phone">Телефон</label>
              <input id="reg-phone" className="auth-input" type="tel"
                placeholder="+7 (___) ___ __ __" value={form.phone} onChange={set("phone")} />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="reg-pass">Пароль</label>
              <PasswordInput id="reg-pass" value={form.password}
                onChange={set("password")} placeholder="Введите пароль" />
              <PasswordRules password={form.password} />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="reg-confirm">Подтвердите пароль</label>
              <PasswordInput id="reg-confirm" value={form.confirm}
                onChange={set("confirm")} placeholder="Повторите пароль" />
            </div>

            <label className="auth-checkbox">
              <input type="checkbox" checked={form.agree} onChange={set("agree")} />
              <span className="auth-checkbox__box" />
              <span className="auth-checkbox__text">
                Я согласен с условиями{" "}
                <a href="/terms" className="auth-link">Пользовательского соглашения</a>
                {" "}и{" "}
                <a href="/privacy" className="auth-link">Политикой конфиденциальности</a>
              </span>
            </label>

            <button type="submit" className="auth-submit" disabled={!form.agree}>
              Зарегистрироваться
            </button>

            <p className="auth-switch">
              Уже есть аккаунт?{" "}
              <Link to="/login" className="auth-link auth-link--gold">Войти</Link>
            </p>
          </form>
        </div>

        {/* ── Right: benefits ── */}
        <div className="auth-benefits-col">
          <h2 className="auth-benefits-title">
            С FinGramota<br />
            <span className="auth-benefits-title__gold">вы получаете</span>
          </h2>

          <ul className="auth-benefits" role="list">
            {BENEFITS.map((b) => (
              <li key={b.title} className="auth-benefit">
                <div className="auth-benefit__icon">
                  <MdiIcon path={b.icon} size={26} />
                </div>
                <div>
                  <p className="auth-benefit__title">{b.title}</p>
                  <p className="auth-benefit__desc">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Shield illustration */}
          <div className="auth-shield-placeholder" aria-hidden="true">
            <img
              src="/14-shield.svg"
              alt=""
              className="auth-shield-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
