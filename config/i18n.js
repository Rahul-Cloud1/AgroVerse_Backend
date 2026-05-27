const i18next = require('i18next');
const HttpMiddleware = require('i18next-http-middleware');
const path = require('path');
const fs = require('fs');

// Load translation files
const en = JSON.parse(fs.readFileSync(path.join(__dirname, '../locales/en.json'), 'utf-8'));
const es = JSON.parse(fs.readFileSync(path.join(__dirname, '../locales/es.json'), 'utf-8'));
const fr = JSON.parse(fs.readFileSync(path.join(__dirname, '../locales/fr.json'), 'utf-8'));
const hi = JSON.parse(fs.readFileSync(path.join(__dirname, '../locales/hi.json'), 'utf-8'));

i18next
  .use(HttpMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'fr', 'hi'],
    detection: {
      order: ['querystring', 'header'],
      caches: ['cookie']
    },
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      hi: { translation: hi }
    }
  });

module.exports = i18next;
