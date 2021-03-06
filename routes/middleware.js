const _ = require('lodash');
const querystring = require('querystring');
const keystone = require('keystone');

exports.packages = [
	'lodash',
];

exports.initLocals = function initlocals(req, res, next) {
	const locals = res.locals;
	// console.log (req.user);
	if (req.user) {
		locals.navLinks = [
		{ label: 'Профиль',	key: 'home',		href: '/me' },
		{ label: 'Площадки',	key: 'stadiums',	href: '/stadiums' },
		{ label: 'Тренировки',	key: 'trainings', href: '/trainings' },
		{ label: 'Команды',	key: 'teams',	href: '/teams' },
		{ label: 'Вопросы',	key: 'tickets',		href: '/tickets' },
		];
	} else	{
		locals.navLinks = [
		{ label: 'Домой',			key: 'home',		href: '/me' },
		];
	}

	locals.user = req.user;

	locals.basedir = keystone.get('basedir');

	locals.page = {
		title: 'Организовывай! Тренируйся!',
		path: req.url.split('?')[0], // strip the query - handy for redirecting back to the page
	};

	locals.qs_set = qs_set(req, res);

	if (req.cookies.target && req.cookies.target === locals.page.path) res.clearCookie('target');

	const bowser = require('../lib/node-bowser').detect(req);

	locals.system = {
		mobile: bowser.mobile,
		ios: bowser.ios,
		iphone: bowser.iphone,
		ipad: bowser.ipad,
		android: bowser.android,
	};

	next();
};


/**
	Inits the error handler functions into `req`
*/

exports.initErrorHandlers = function initErrorHandlers(req, res, next) {
	res.err = function (err, title, message) {
		res.status(500).render('errors/500', {
			err,
			errorTitle: title,
			errorMsg: message,
		});
	};
	res.notfound = function (title, message) {
		res.status(404).render('errors/404', {
			errorTitle: title,
			errorMsg: message,
		});
	};
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function flashMessages(req, res, next) {
	const flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	// console.log ("flashM");
	res.locals.messages = flashMessages;
	next();
};

/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function requireUser(req, res, next) {
	if (!req.user) {
		req.flash('error', 'Пожалуйста зарегистрируйтесь для доступа к странице');
		res.redirect('/signin');
	} else {
		next();
	}
};

/**
	Returns a closure that can be used within views to change a parameter in the query string
	while preserving the rest.
*/

var qs_set = exports.qs_set = function (req, res) {
	return function qs_set(obj) {
		const params = _.clone(req.query);
		for (const i in obj) {
			if (obj[i] === undefined || obj[i] === null) {
				delete params[i];
			} else if (obj.hasOwnProperty(i)) {
				params[i] = obj[i];
			}
		}
		const qs = querystring.stringify(params);
		return req.path + (qs ? `?${qs}` : '');
	};
};
