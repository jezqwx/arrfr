import { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";

import MdiIcon from "../components/MdiIcon";
import {
  mdiEyeOutline,
  mdiEyeOffOutline,
} from "@mdi/js";

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
        autoComplete="current-password"
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

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    login: "",
    password: "",
    remember: false,
  });

  const set = (field) => (e) =>
    setForm((p) => ({
      ...p,
      [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));


  return (
    <div className="auth-page">
      {/* Logo */}
      <div className="auth-logo">
        <div className="auth-logo__icon" aria-hidden="true">
          <img src="/logo_1.svg" alt="FinGramota" width={44} height={44} />

        </div>
        <div>
          <div className="auth-logo__name">
            <span className="auth-logo__fin">Fin</span>Gramota
          </div>
          <div className="auth-logo__sub">ГОСУДАРСТВЕННАЯ ПЛАТФОРМА</div>
        </div>
      </div>

      {/* Card */}
      <div className="auth-card auth-card--narrow">
        <h1 className="auth-title">
          <span className="auth-title__bar" aria-hidden="true" />
          Вход в аккаунт
        </h1>
        <p className="auth-desc">
          Получите доступ к обучению, проверке финансовых организаций и
          полезным инструментам финансовой грамотности.
        </p>

        <form
  className="auth-form"
  onSubmit={(e) => {
    e.preventDefault();

    // здесь потом будет API авторизации

    navigate("/home");
  }}
>
          <div className="auth-field">
            <label className="auth-label" htmlFor="login-email">
              Логин/email
            </label>
            <input
              id="login-email"
              className="auth-input"
              type="text"
              placeholder="Введите ваш логин/email"
              value={form.login}
              onChange={set("login")}
              autoComplete="username"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="login-pass">
              Пароль
            </label>
            <PasswordInput
              id="login-pass"
              value={form.password}
              onChange={set("password")}
              placeholder="Введите пароль"
            />
          </div>

          <div className="auth-row-between">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={set("remember")}
              />
              <span className="auth-checkbox__box" />
              <span className="auth-checkbox__text">Запомнить меня</span>
            </label>
            <a href="/forgot" className="auth-link auth-link--muted">
              Забыли пароль?
            </a>
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={!form.login.trim() || !form.password.trim()}
          >
            Войти
          </button>

          <p className="auth-switch">
            Нет аккаунта?{" "}
            <Link to="/register" className="auth-link auth-link--gold">
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
