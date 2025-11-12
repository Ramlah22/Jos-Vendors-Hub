import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import haTranslations from './locales/ha.json';
import yoTranslations from './locales/yo.json';
import igTranslations from './locales/ig.json';

const resources = {
  en: { translation: enTranslations },
  ha: { translation: haTranslations },
  yo: { translation: yoTranslations },
  ig: { translation: igTranslations }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
