const keystone = require('keystone');
// const _ = require('lodash');

const Log = keystone.list('Log');
const Stadium = keystone.list('Stadium');
// const User = keystone.list('User');

const Sport = keystone.list('Sport');
// const ObjectID = require('mongodb').ObjectID;

module.exports = function a(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	locals.section = 'stadiumnew';
	locals.page.title = 'Добавление площадки';

	view.on('post', { action: 'stadium.add' }, (next) => {
		let stadiumId = 1;
		Stadium.model.find().sort({ stadiumId: -1 })
			.exec((err2, data) => {
				if (data[0] && data[0].stadiumId) { stadiumId = data[0].stadiumId + 1; }

				const newStadium = new Stadium.model({
					stadiumId,
					photo: req.body.photo,
					sport: req.body.sport,
					name: req.body.name,
					description: req.body.description,
					latitude: req.body.latitude,
					longitude: req.body.longitude,
					address: req.body.address,
					adr: req.body.address,
					createdBy: locals.user,
					user: locals.user,
				}),
				updater = newStadium.getUpdateHandler(req, res, {
				    errorMessage: 'There was an error'
				});
	
				updater.process(req.body, {
				    flashErrors: true,
				    logErrors: true,
				    fields: 'photo'
				}, function(err) {
				if (err) {
				    locals.validationErrors = err.errors;
				} else {
					//newStadium.notifyAdmins();
	    				req.flash('success', 'Your added');
					return res.redirect('/stadiums/' + newPost.slug);
					}
				    next();
				});
				
				const newLog = new Log.model({
					description: `Создана площадка ${req.body.name}`,
					user: locals.user,
				});

				newLog.save((err) => {
					if (err) { console.log(err); }
				});

				req.flash('success', 'Изменения сохранены');
				return res.redirect('/stadiums');
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

	view.render('site/stadiumnew');
};
exports = module.exports;
