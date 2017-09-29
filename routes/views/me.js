const keystone = require('keystone');
const _ = require('lodash');

const User = keystone.list('User');
const UserSport = keystone.list('UserSport');
const UserTraining = keystone.list('UserTraining');

module.exports = function a(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	locals.section = 'me';
	locals.page.title = 'Настройки аккаунта';

	view.on('render', (next) => {
		User.model.findOne()
		.where('_id', req.user._id)
		.exec((err, user) => {
			if (err) return res.err(err);
			if (!user) {
				req.flash('info', 'Пользователь не найден, зарегистируйтесь снова');
				return res.redirect('/signin');
			}
			locals.user = user;
			return next();
		});
	});

	view.on('render', (next) => {
		UserSport.model.find()
		.where('user', req.user)
		.populate('sport')
		.populate('amplua')
		.populate('team')
		.populate('level')
		.sort('-createdAt')
		.exec((err, sports) => {
			if (err) return res.err(err);
			locals.usersports = sports;
			// dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
			return next();
		});
	});

	view.on('render', (next) => {
		UserTraining.model.find()
		.where('user', req.user)
		.count((err, count) => {
			if (err) return res.err(err);
			locals.trainingscount = count;
			return next();
		});
	});

	view.on('post', { action: 'profile.details' }, (next) => {
		req.user.getUpdateHandler(req).process(req.body, {
			fields: 'name, email',
			flashErrors: true,
		}, (err) => {
			if (err) {
				return next();
			}
			req.flash('success', 'Your changes have been saved.');
			return next();
		});
	});

	view.on('init', (next) => {
		if (!_.has(req.query, 'disconnect')) return next();

		User.model.findOne()
		.where('_id', req.user._id)
//		.populate('client')
		.exec((err, user) => {
			if (err) return res.err(err);
			if (!user) {
				req.flash('info', 'Пользователь не найден, зарегистируйтесь снова');
				return res.redirect('/signin');
			}
			locals.user = user;
//			return next();
		});

		req.user.save((err) => {
			console.log('save');
			if (err) {
				req.flash('success', 'The service could not be disconnected, please try again.');
				return next();
			}
			return next();
		});
	});

	view.on('post', { action: 'profile.password' }, (next) => {
		if (!req.body.password || !req.body.password_confirm) {
			req.flash('error', 'Пожалуйста введите пароль.');
			return next();
		}

		req.user.getUpdateHandler(req).process(req.body, {
			fields: 'password',
			flashErrors: true,
		}, (err) => {
			if (err) {
				return next();
			}

			req.flash('success', 'Ваши изменения сохранены.');
			return next();
		});
	});
	view.render('site/me');
	// return res.redirect('/me');
};
exports = module.exports;
