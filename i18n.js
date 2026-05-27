const i18next = require('i18next');
const middleware = require('i18next-http-middleware');
const path = require('path');
const fs = require('fs');

const supportedLngs = ['en', 'es', 'fr', 'hi'];

const resources = supportedLngs.reduce((acc, lng) => {
  const filePath = path.join(__dirname, `locales/${lng}.json`);
  acc[lng] = {
    translation: JSON.parse(fs.readFileSync(filePath, 'utf-8')),
  };
  return acc;
}, {});

i18next
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    supportedLngs,
    resources,
    detection: {
      order: ['querystring', 'header'],
      caches: false,
    },
  });

module.exports = i18next;
