// Simple I18N implementation
const translations = {
  en: {
    'background': 'Background',
    'none': 'None',
    'image': 'Image',
    'video': 'Video',
    'apply': 'Apply',
    'custom_css': 'Custom CSS',
    'apply_css': 'Apply CSS',
    'reset_css': 'Reset CSS',
    'more': 'More',
    'settings': 'Settings',
    'weather': 'Weather',
    'my_town': 'My Town',
    'videos': 'Videos',
    'minimal_search': 'Minimal Search',
    'pics': 'Pics',
    'software': 'Software',
    'transport': 'Transport',
  },
  ru: {
    'background': 'Фон',
    'none': 'Нет',
    'image': 'Изображение',
    'video': 'Видео',
    'apply': 'Применить',
    'custom_css': 'Пользовательский CSS',
    'apply_css': 'Применить CSS',
    'reset_css': 'Сбросить CSS',
    'more': 'Ещё',
    'settings': 'Настройки',
    'weather': 'Погода',
    'my_town': 'Мой город',
    'videos': 'Видео',
    'minimal_search': 'Мини-поиск',
    'pics': 'Фотки',
    'software': 'Софт',
    'transport': 'Транспорт',
  }
};

// Load locale file dynamically
function loadLocale(lang, callback) {
  const url = `/client/js/locales/${lang}.json`;
  fetch(url)
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (data) {
        Object.assign(translations[lang], data);
      }
      if (callback) callback();
    })
    .catch(() => callback && callback());
}

// Override getUserLang to check localStorage first
function getUserLang() {
  const stored = localStorage.getItem('i18nLang');
  if (stored) return stored;
  const lang = navigator.language || navigator.userLanguage || 'en';
  if (lang.startsWith('ru')) return 'ru';
  return 'en';
}

function translatePage() {
  const lang = getUserLang();
  if (lang !== 'en' && !translations[lang]) translations[lang] = {};
  loadLocale(lang, () => {
    const dict = translations[lang] || translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
  });
}

document.addEventListener('DOMContentLoaded', translatePage);
