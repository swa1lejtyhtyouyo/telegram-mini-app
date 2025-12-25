import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isTelegram, setIsTelegram] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Проверяем, доступен ли объект Telegram
    if (window.Telegram?.WebApp) {
      setIsTelegram(true);

      // Говорим Telegram, что приложение готово
      window.Telegram.WebApp.ready();

      // Устанавливаем тему
      setTheme(window.Telegram.WebApp.colorScheme); // 'light' или 'dark'

      // Можно также получить данные пользователя
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user) {
        console.log('Пользователь:', user);
      }
    } else {
      setTheme('light');
    }
  }, []);

  // Функция для вызова алерта через Telegram
  const showAlert = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showAlert('Привет из Mini App! 🚀');
    } else {
      alert('Работает не в Telegram');
    }
  };

  return (
    <div className="App" style={{ backgroundColor: theme === 'dark' ? '#1c1c1e' : '#f5f5f7' }}>
      <header className="App-header" style={{ color: theme === 'dark' ? 'white' : 'black' }}>
        <h1>Telegram Mini App</h1>
        {isTelegram ? (
          <p>Запущено внутри Telegram ✅</p>
        ) : (
          <p>Работает в браузере (не в Telegram) ⚠️</p>
        )}
        <button
          onClick={showAlert}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#0088cc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Показать алерт
        </button>
      </header>
    </div>
  );
}

export default App;
