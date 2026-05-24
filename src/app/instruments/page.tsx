import React from 'react';
import Image from 'next/image';

// Подключаем шрифт Jost напрямую из Next.js
import { Jost } from 'next/font/google';
const jostFont = Jost({ 
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function InstrumentsPage() {
  return (
    <main className={`min-h-screen bg-[#F8F9FA] text-[#212529] ${jostFont.className} flex flex-col justify-between`}>
      
      <div>
        {/* ШАПКА САЙТА (HEADER) */}
        <header className="sticky top-0 z-50 w-full h-[64px] border-b-[0.8px] border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.6)] backdrop-blur-md shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
          <div className="max-w-[1440px] h-full mx-auto px-6 flex items-center justify-between">
            
            {/* Левая часть: Логотип */}
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
              <div>
                <div className="text-lg font-bold leading-none tracking-tight text-[#112250]">
                  <span className="text-[#E4C58F]">Fin</span>Gramota
                </div>
                <p className="text-[9px] uppercase tracking-wider text-[#212529] opacity-60 mt-0.5">
                  Государственная платформа
                </p>
              </div>
            </div>

            {/* Центральная часть: Меню навигации */}
            <nav className="hidden md:flex items-center gap-8 text-[17px] font-medium text-[#212529]">
              <a href="#" className="hover:text-[#112250] transition">Главное</a>
              <a href="#" className="hover:text-[#112250] transition">Центр проверки</a>
              <a href="#" className="hover:text-[#112250] transition">Маркетплейс</a>
              <a href="#" className="hover:text-[#112250] transition">Обучение</a>
              <a href="#" className="hover:text-[#112250] transition text-[#112250] font-semibold">Инструменты</a>
              <a href="/faq" className="hover:text-[#112250] transition">FAQ</a>
            </nav>

            {/* Правая часть: Поиск, Язык, Личный кабинет */}
            <div className="flex items-center gap-6">
              <button className="hover:opacity-70 transition flex items-center justify-center">
                <Image src="/search.svg" alt="Search" width={20} height={20} />
              </button>
              <div className="h-4 w-[1px] bg-gray-300" />
              <div className="flex items-center gap-1.5 text-[14px] font-medium text-[#112250]">
                <Image src="/globe.svg" alt="Lang" width={18} height={18} />
                <span>RU</span>
              </div>
              
              <button 
                className="flex items-center justify-center gap-1.5 text-[#112250] text-[12px] font-semibold transition hover:opacity-95 active:scale-98 flex-shrink-0"
                style={{
                  width: '145px',
                  height: '35px',
                  borderRadius: '14px',
                  background: 'linear-gradient(180deg, #E0C58F 0%, #EACF9A 100%)',
                  boxShadow: '0 10px 15px -3px rgba(224, 197, 143, 0.20), 0 4px 6px -4px rgba(224, 197, 143, 0.20)'
                }}
              >
                <Image src="/user.svg" alt="User" width={14} height={14} />
                <span className="leading-none mt-0.5">Личный кабинет</span>
              </button>
            </div>

          </div>
        </header>

        {/* ГЛАВНЫЙ БАННЕР (HERO SECTION) */}
        <section className="w-full bg-[#F5F5F5] py-[41px] px-4 md:px-[80px] overflow-hidden relative z-0">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-[50px] md:gap-[100px]">
            
            <div className="flex-1 max-w-[733px]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[rgba(17,34,80,0.05)] rounded-full mb-5">
                <Image src="/shield-icon.svg" alt="Shield" width={14} height={14} />
                <span className="text-[11px] font-semibold tracking-wider text-[#112250] uppercase">
                  Центр инструментов
                </span>
              </div>

              <h1 className="text-3xl md:text-[48px] font-bold leading-[1.2] tracking-tight mb-4">
                <span className="text-[#112250]">Инструменты</span> <br />
                <span className="text-[#3C507D]">финансовой защиты и расчёта</span>
              </h1>

              <p className="text-[15px] md:text-[16px] text-[#212529] opacity-80 leading-[1.6] max-w-[650px]">
                Страница «Инструменты» — это единый цифровой центр финансовой помощи, финансовой грамотности и защиты пользователей. Здесь вы можете найти полезные инструменты связанные с финансами.
              </p>
            </div>

            <div className="flex-1 max-w-[419px] relative flex justify-center py-6">
              <div className="rounded-[24px] overflow-hidden bg-transparent">
                <Image 
                  src="/hero-illustration.png" 
                  alt="Financial Protection" 
                  width={419} 
                  height={350} 
                  className="object-contain"
                  priority
                />
              </div>

              <div className="absolute -top-2 -right-4 md:-right-8 bg-white border border-[#F3F4F6] rounded-[16px] p-3 flex items-center gap-3 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] min-w-[180px]">
                <div className="w-8 h-8 rounded-full bg-[#EBF7EE] flex items-center justify-center flex-shrink-0">
                  <Image src="/shield-success.svg" alt="Shield Green" width={18} height={18} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold">Статус</span>
                  <span className="text-[14px] font-bold text-[#1E7E34]">Безопасно</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white border border-[#F3F4F6] rounded-[16px] p-4 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] min-w-[200px]">
                <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1.5">
                  Анализ нагрузки
                </span>
                <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden mb-2">
                  <div className="h-full w-[45%] bg-[#112250] rounded-full" />
                </div>
                <div className="flex justify-between items-center text-[12px] font-bold">
                  <span className="text-[#112250]">45%</span>
                  <span className="text-gray-400 font-medium text-[11px]">Норма</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* БЛОК СЕРВИСОВ С КОЛЬЦАМИ ИЗ FIGMA */}
        <section className="relative w-full pt-[60px] pb-[120px] px-4 md:px-[60px] overflow-hidden">
          
          <div className="absolute pointer-events-none z-0 left-[-120px] bottom-[100px] w-[460px] h-[460px] opacity-60 select-none">
            <svg width="100%" height="100%" viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="225" cy="225" r="210" stroke="rgba(17, 34, 80, 0.43)" strokeWidth="3" strokeDasharray="12 8" />
              <circle cx="225" cy="225" r="115" stroke="rgba(17, 34, 80, 0.43)" strokeWidth="3" opacity="0.5" />
            </svg>
          </div>

          <div className="absolute pointer-events-none z-0 right-[-140px] top-[20px] w-[520px] h-[520px] opacity-40 select-none">
            <svg width="100%" height="100%" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="250" cy="250" r="230" stroke="rgba(17, 34, 80, 0.43)" strokeWidth="3" strokeDasharray="14 8" />
              <circle cx="250" cy="250" r="140" stroke="rgba(17, 34, 80, 0.43)" strokeWidth="3" />
            </svg>
          </div>

          <div className="max-w-[1440px] mx-auto relative z-10">
            
            <h2 className="text-[32px] font-bold text-[#112250] tracking-tight mb-6">
              Сервисы
            </h2>

            <div className="flex flex-wrap items-center gap-3 mb-[40px]">
              <button className="px-5 py-2.5 text-white text-[14px] font-medium rounded-full bg-gradient-to-b from-[#274DB6] to-[#112250] shadow-sm">
                Все
              </button>
              {['Расчёты', 'Проверки', 'Инвестиции', 'Безопасность'].map((tab) => (
                <button key={tab} className="px-5 py-2.5 bg-transparent text-[#212529] opacity-70 text-[14px] font-medium hover:opacity-100 transition">
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[24px] gap-y-[40px] justify-items-center">
              
              {/* 1. Кредитный калькулятор */}
              <div className="w-[312px] h-[334px] bg-white border border-[#F3F4F6] rounded-[16px] overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition duration-300">
                <div className="w-full h-[200px] relative overflow-hidden flex-shrink-0">
                  <Image src="/1-kalkulyator.jpg" alt="Кредитный калькулятор" width={312} height={200} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#112250] leading-[22px] mb-0.5 truncate">Кредитный калькулятор</h3>
                    <p className="text-[14px] text-gray-500 leading-tight line-clamp-1">Рассчитайте ежемесячный платёж и общую сумму выплат по кредиту.</p>
                  </div>
                  <button className="w-full h-[36px] bg-[#112250] text-white text-[14px] font-semibold rounded-[12px] hover:bg-[#1c3270] transition flex-shrink-0">Открыть</button>
                </div>
              </div>

              {/* 2. Проверка брокера */}
              <div className="w-[312px] h-[334px] bg-white border border-[#F3F4F6] rounded-[16px] overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition duration-300">
                <div className="w-full h-[200px] relative overflow-hidden flex-shrink-0">
                  <Image src="/2-broker.jpg" alt="Проверка брокера" width={312} height={200} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#112250] leading-[22px] mb-0.5 truncate">Проверка брокера</h3>
                    <p className="text-[14px] text-gray-500 leading-tight line-clamp-1">Убедитесь, что у инвестиционной компании есть лицензия.</p>
                  </div>
                  <button className="w-full h-[36px] bg-[#112250] text-white text-[14px] font-semibold rounded-[12px] hover:bg-[#1c3270] transition flex-shrink-0">Открыть</button>
                </div>
              </div>

              {/* 3. Проверка лицензии */}
              <div className="w-[312px] h-[334px] bg-white border border-[#F3F4F6] rounded-[16px] overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition duration-300">
                <div className="w-full h-[200px] relative overflow-hidden flex-shrink-0">
                  <Image src="/3-licenziya.jpg" alt="Проверка лицензии" width={312} height={200} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#112250] leading-[22px] mb-0.5 truncate">Проверка лицензии</h3>
                    <p className="text-[14px] text-gray-500 leading-tight line-clamp-1">Единый реестр финансовых организаций с лицензиями.</p>
                  </div>
                  <button className="w-full h-[36px] bg-[#112250] text-white text-[14px] font-semibold rounded-[12px] hover:bg-[#1c3270] transition flex-shrink-0">Открыть</button>
                </div>
              </div>

              {/* 4. Финансовая пирамида */}
              <div className="w-[312px] h-[334px] bg-white border border-[#F3F4F6] rounded-[16px] overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition duration-300 relative">
                <div className="w-full h-[200px] relative overflow-hidden flex-shrink-0">
                  <Image src="/4-piramida.jpg" alt="Финансовая пирамида" width={312} height={200} className="w-full h-full object-cover" />
                  <div className="absolute flex items-center bg-[#BA1A1A]" style={{ top: '16px', left: '16px', height: '22px', padding: '4px 12px', borderRadius: '999px', gap: '4px' }}>
                    <Image src="/risk.svg" alt="Risk Icon" width={12} height={11} className="text-white filter brightness-0 invert" />
                    <span className="text-white font-medium whitespace-nowrap" style={{ fontSize: '12px', lineHeight: '14px' }}>Высокий риск</span>
                  </div>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#112250] leading-[22px] mb-0.5 truncate">Финансовая пирамида</h3>
                    <p className="text-[14px] text-gray-500 leading-tight line-clamp-1">Проверить признаки сомнительной организации чек-листом.</p>
                  </div>
                  <button className="w-full h-[36px] bg-[#112250] text-white text-[14px] font-semibold rounded-[12px] hover:bg-[#1c3270] transition flex-shrink-0">Открыть</button>
                </div>
              </div>

              {/* 5. Проверка сайта */}
              <div className="w-[312px] h-[334px] bg-white border border-[#F3F4F6] rounded-[16px] overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition duration-300">
                <div className="w-full h-[200px] relative overflow-hidden flex-shrink-0">
                  <Image src="/5-sait.jpg" alt="Проверка сайта" width={312} height={200} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#112250] leading-[22px] mb-0.5 truncate">Проверка сайта</h3>
                    <p className="text-[14px] text-gray-500 leading-tight line-clamp-1">Выявление фишинговых сайтов и поддельных страниц.</p>
                  </div>
                  <button className="w-full h-[36px] bg-[#112250] text-white text-[14px] font-semibold rounded-[12px] hover:bg-[#1c3270] transition flex-shrink-0">Открыть</button>
                </div>
              </div>

              {/* 6. Проверка телефона */}
              <div className="w-[312px] h-[334px] bg-white border border-[#F3F4F6] rounded-[16px] overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition duration-300">
                <div className="w-full h-[200px] relative overflow-hidden flex-shrink-0">
                  <Image src="/6-telefon.jpg" alt="Проверка телефона" width={312} height={200} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#112250] leading-[22px] mb-0.5 truncate">Проверка телефона</h3>
                    <p className="text-[14px] text-gray-500 leading-tight line-clamp-1">Узнайте, кто звонил и есть ли номер в базе мошенников.</p>
                  </div>
                  <button className="w-full h-[36px] bg-[#112250] text-white text-[14px] font-semibold rounded-[12px] hover:bg-[#1c3270] transition flex-shrink-0">Открыть</button>
                </div>
              </div>

              {/* 7. Доходность инвестиций */}
              <div className="w-[312px] h-[334px] bg-white border border-[#F3F4F6] rounded-[16px] overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition duration-300">
                <div className="w-full h-[200px] relative overflow-hidden flex-shrink-0">
                  <Image src="/7-dohodnost.jpg" alt="Доходность инвестиций" width={312} height={200} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#112250] leading-[22px] mb-0.5 truncate">Доходность инвестиций</h3>
                    <p className="text-[14px] text-gray-500 leading-tight line-clamp-1">Сравните доходность вкладов, облигаций и акций.</p>
                  </div>
                  <button className="w-full h-[36px] bg-[#112250] text-white text-[14px] font-semibold rounded-[12px] hover:bg-[#1c3270] transition flex-shrink-0">Открыть</button>
                </div>
              </div>

              {/* 8. Долговая нагрузка */}
              <div className="w-[312px] h-[334px] bg-white border border-[#F3F4F6] rounded-[16px] overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition duration-300">
                <div className="w-full h-[200px] relative overflow-hidden flex-shrink-0">
                  <Image src="/8-nagruzka.jpg" alt="Долговая нагрузка" width={312} height={200} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#112250] leading-[22px] mb-0.5 truncate">Долговая нагрузка</h3>
                    <p className="text-[14px] text-gray-500 leading-tight line-clamp-1">Оцените свой показатель DTI перед новым кредитом.</p>
                  </div>
                  <button className="w-full h-[36px] bg-[#112250] text-white text-[14px] font-semibold rounded-[12px] hover:bg-[#1c3270] transition flex-shrink-0">Открыть</button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

{/* ФУТЕР */}
<footer
  className="w-full pt-[56px] pb-[28px] px-[28px] text-white relative overflow-hidden"
  style={{
    background:
      'linear-gradient(90deg, #2D4687 0%, #112250 100%)',
  }}
>
  <div className="max-w-[1220px] mx-auto">

    {/* Верхняя сетка */}
    <div className="grid grid-cols-1 md:grid-cols-[260px_220px_260px_260px] gap-[34px]">

      {/* 1 колонка: Логотип и соцсети */}
<div className="max-w-[250px]">

  <div className="flex items-center gap-3 mb-4">
    {/* Контейнер для логотипа с фиксированным размером, чтобы картинка не "ломалась" */}
    <div className="w-[50px] h-[50px] relative flex-shrink-0">
      <Image
        src="/logo2.png"
        alt="Logo"
        fill
        className="object-contain"
      />
    </div>

    <div>
      <div className="text-[20px] font-bold leading-none text-white">
        <span className="text-[#E4C58F]">Fin</span>Gramota
      </div>
      <p className="text-[10px] uppercase tracking-wider text-white/70 mt-1">
        Государственная платформа
      </p>
    </div>
  </div>

  <p className="text-[15px] leading-[1.6] text-white/85 mb-5">
    Ваш надежный проводник в мире финансов.
    Мы помогаем гражданам принимать осознанные
    решения и защищаем от мошенников.
  </p>

  {/* ИКОНКИ СОЦСЕТЕЙ */}
  <div className="flex items-center gap-3">
    <a href="#" className="w-[30px] h-[30px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
      <Image src="/facebook.svg" alt="Facebook" width={14} height={14} className="brightness-0 invert" />
    </a>
    <a href="#" className="w-[30px] h-[30px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
      <Image src="/instagram.svg" alt="Instagram" width={14} height={14} className="brightness-0 invert" />
    </a>
    <a href="#" className="w-[30px] h-[30px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
      <Image src="/twitter.svg" alt="Twitter" width={14} height={14} className="brightness-0 invert" />
    </a>
    <a href="#" className="w-[30px] h-[30px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
      <Image src="/youtube.svg" alt="YouTube" width={14} height={14} className="brightness-0 invert" />
    </a>
  </div>
</div>

      {/* 2 колонка */}
      <div>
        <h4 className="text-[#E4C58F] text-[16px] font-bold mb-5">
          Платформа
        </h4>
        <div className="flex flex-col gap-3 text-[15px] text-white/85">
          <a href="#" className="hover:text-white transition">Вакансии</a>
          <a href="#" className="hover:text-white transition">Партнеры</a>
          <a href="#" className="hover:text-white transition">О проекте</a>
          <a href="#" className="hover:text-white transition">Новости</a>
        </div>
      </div>

      {/* 3 колонка */}
      <div>
        <h4 className="text-[#E4C58F] text-[16px] font-bold mb-5">
          Инструменты
        </h4>
        <div className="flex flex-col gap-3 text-[15px] text-white/85">
          <a href="#" className="hover:text-white transition">Кредитный калькулятор</a>
          <a href="#" className="hover:text-white transition">Проверка брокера</a>
          <a href="#" className="hover:text-white transition">Сообщить о мошенничестве</a>
          <a href="#" className="hover:text-white transition">Финансовый словарь</a>
        </div>
      </div>

      {/* 4 колонка */}
      <div>
        <h4 className="text-[#E4C58F] text-[16px] font-bold mb-5">
          Контакты
        </h4>
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-3">
            <Image src="/footer-map.svg" alt="Location" width={18} height={18} className="brightness-0 invert mt-1" />
            <p className="text-[15px] leading-[1.5] text-white/90">г. Астана, пр. Мангилик Ел, 55А, БЦ "Байтерек"</p>
          </div>
          <div className="flex items-center gap-3">
            <Image src="/footer-phone.svg" alt="Phone" width={18} height={18} className="brightness-0 invert" />
            <p className="text-[15px] font-semibold text-white">1459 (Call-center)</p>
          </div>
          <div className="flex items-center gap-3">
            <Image src="/footer-mail.svg" alt="Mail" width={18} height={18} className="brightness-0 invert" />
            <p className="text-[15px] text-white/90">info@fingramota.kz</p>
          </div>
        </div>
      </div>

    </div>

    {/* ЛИНИЯ */}
    <div className="w-full h-[1px] bg-white/10 mt-[52px] mb-[18px]" />

    {/* НИЗ */}
    <div className="flex items-center justify-between text-[14px] text-white/55">
      <p>Политика конфиденциальности</p>
      <p>© 2026 FinGramota. Все права защищены.</p>
      <p>Условия использования</p>
    </div>

  </div>
</footer>

    </main>
  );
}