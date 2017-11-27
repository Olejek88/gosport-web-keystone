// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();
//const schedule = require('node-schedule');
// Require keystone
var keystone = require('keystone');
const mongoose = require('mongoose');

keystone.init({
	'name': 'gosport-web-keystone',
	'brand': 'gosport-web-keystone',
	back: '/me',

	 port: '3000',
	 host: '192.168.1.124',
	 mongo: 'mongodb://localhost/gosport',
	 'mongo options': { server: { keepAlive: 1 }},

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'signin logo': '../images/letsgosport.png',
	'views': 'templates/views',
	'view engine': 'pug',
         title: 'Панель управления GoSport!',

	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	'session store': 'mongo',
	'cookie secret': process.env.COOKIE_SECRET,
	'auth': true,
	'user model': 'User',
});
keystone.import('models');
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
keystone.set('routes', require('./routes'));

keystone.set('nav', {
  Игроки: 'users',
  Площадки: 'stadia',
  Тренировки: 'trainings',
  Команды: 'teams',
  Турниры: 'events',
  Справочники:  { Амплуа: 'ampluas', Спорт: 'sports', Уровни: 'levels'},
  Связи:  { СпортИгроки: 'ampluas', ТренировкиИгроки: 'sports'},
  Запросы: 'tickets',
  Файлы: 'files',
  Журнал: 'logs',
});

keystone.set('email locals', {
  utils: keystone.utils,
  host: (function () {
    if (keystone.get('env') === 'staging') return 'http://192.168.1.124';
    if (keystone.get('env') === 'production') return 'http://gosport.ru';
    return (keystone.get('host') || 'http://192.168.1.124:') + (keystone.get('port') || '3000');
  }()),
});

keystone.start();
