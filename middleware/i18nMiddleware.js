const HttpMiddleware = require('i18next-http-middleware');
const i18next = require('../i18n');

const i18nMiddleware = HttpMiddleware.handle(i18next);

module.exports = i18nMiddleware;