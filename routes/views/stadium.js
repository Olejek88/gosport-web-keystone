const keystone = require('keystone');
// const _ = require('lodash');
// const moment = require('moment');

const Stadium = keystone.list('Stadium');
const Sport = keystone.list('Sport');
const ObjectID = require('mongodb').ObjectID;

const Log = keystone.list('Log');

module.exports = function a(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	locals.section = 'stadium';
	locals.page.title = 'ТОиРУС настройки клиента';

	// load stadium

	view.on('init', (next) => {
		console.log(locals.user.stadium);
		Stadium.model.findOne()
			.where('_id', new ObjectID(req.params.stadium))
			.exec((err, stadium) => {
				if (err) return res.err(err);
				console.log(stadium);
				if (!stadium) return res.redirect('/stadiumnew');
				locals.stadium = stadium;
				return next();
			});
	});

	view.on('init', (next) => {
		Sport.model.find()
		.exec((err, sports) => {
			if (err) return res.err(err);
			// console.log(methods);
			locals.sports = sports;
			return next();
		});
	});

	view.on('post', { action: 'stadium.details' }, (next) => {
		console.log(req.body);
		Stadium.model.findOne()
			.where('_id', new ObjectID(req.params.stadium))
			.exec((err, stadium) => {
				if (err) return res.err(err);
				if (!stadium) return res.notfound('Клиент не найден');
				stadium.getUpdateHandler(req).process(req.body, {
					fields: 'name, address, phone, description, method',
					flashErrors: true,
				}, (err2) => {
					if (err2) {
						return next();
					}
					req.flash('success', 'Изменения сохранены');
					return res.redirect('/stadiums');
				});
			});
	});

	view.on('post', { action: 'stadium.delete' }, () => {
		Stadium.model.findOne()
			.where('_id', new ObjectID(req.params.stadium))
			.remove((err) => {
				new Log.model({
					description: `Пользователем ${locals.user.name} удалена площадка ${req.body.name}`,
					user: locals.user,
				}).save((err2) => {
					if (err2) { console.log(err); }
				});
				return res.redirect('/stadiums');
			});
	});

	view.render('site/stadium');
};
exports = module.exports;
