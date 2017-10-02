const keystone = require('keystone');
const _ = require('lodash');
// const moment = require('moment');
const User = keystone.list('User');
const UserSport = keystone.list('UserSport');
const UserTraining = keystone.list('UserTraining');
const Level = keystone.list('Level');
const Team = keystone.list('Team');
const Amplua = keystone.list('Amplua');
const Sport = keystone.list('Sport');

module.exports = function a(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	locals.section = 'meedit';
	locals.page.title = 'настройки профиль';

	view.on('post', { action: 'profile.details' }, (next) => {
		req.user.getUpdateHandler(req).process(req.body, {
			fields: 'name, email, type, age, phone, vk',
			flashErrors: true,
		}, (err) => {
			if (err) {
				return next();
			}
			Sport.model.findOne()
			.where('name', 'Хоккей')
			.exec((err2, hockey) => {
				UserSport.model.findOne()
				.where('user',req.user)
				.where('sport', hockey)
				.exec((err2, hockeysport) => {
					if (!req.body.hockeyteam)
						req.body.hockeyteam = null;
					if (!req.body.hockeyamplua)
						req.body.hockeyamplua = null;
					if (!req.body.hockeylevel)
						req.body.hockeylevel = null;

					if (!hockeysport) {				 
						new UserSport.model({
							sport: hockey,
							amplua: req.body.hockeyamplua,
							team: req.body.hockeyteam,
							level: req.body.hockeylevel,					
							user: locals.user,
						}).save((err2) => {
							if (err2) { console.log(err2); }
							console.log ("sport created");
						});
					}
					else {
						hockeysport.amplua = req.body.hockeyamplua;
						hockeysport.team =  req.body.hockeyteam;
						hockeysport.level = req.body.hockeylevel;
						hockeysport.save(function(err) { 
							console.log ("sport saved");
						});
					}	
				});
			});
			Sport.model.findOne()
			.where('name', 'Футбол')
			.exec((err3, football) => {
				UserSport.model.findOne()
				.where('user',req.user)
				.where('sport', football)
				.exec((err2, footballsport) => {
					if (!req.body.footballteam)
						req.body.footballteam = null;
					if (!req.body.footballamplua)
						req.body.footballamplua = null;
					if (!req.body.footballlevel)
						req.body.footballlevel = null;				

					if (!hockeysport) {
						new UserSport.model({
							sport: football,
							amplua: req.body.footballamplua,
							team: req.body.footballteam,
							level: req.body.footballlevel,					
							user: locals.user,
						}).save((err3) => {
							if (err3) { console.log(err3); }
							console.log ("sport created");
						});
					}
					else {
						footballsport.amplua = req.body.footballamplua;
						footballsport.team =  req.body.footballteam;
						footballsport.level = req.body.footballlevel;
						footballsport.save(function(err) { 
							console.log ("sport saved");
						});						
					}
				});
			});
			req.flash('success', 'Изменения сохранены');
			return next();
		});
	});

	view.on('render', (next) => {
		Sport.model.findOne()
		.where('name','Хоккей')
		.exec((err, hockey) => {
			if (!err && hockey) {
			    //console.log(football);
			    Level.model.find()
			    .where('sport', hockey)
			    .exec((err, levels) => {
				if (!err)
				    locals.hockeylevels = levels;
				//console.log(locals.footballlevels);
	    			return next();
			    });
			}
		    });			
	});

	view.on('render', (next) => {
		Sport.model.findOne()
		.where('name','Хоккей')
		.exec((err, hockey) => {
			if (!err && hockey) {
			    Amplua.model.find()
			    .where('sport', hockey)
			    .exec((err, ampluas) => {
				if (!err)
				    locals.hockeyampluas = ampluas;
				//console.log(locals.footballampluas);
		    		return next();
			    });
			}
		    });			
		//return next();
	});

	view.on('render', (next) => {
		Sport.model.findOne()
		.where('name','Хоккей')
		.exec((err, hockey) => {
			if (!err && hockey) {
			    Team.model.find()
			    .where('sport', hockey)
			    .exec((err, teams) => {
				if (!err) {
				    locals.hockeyteams = teams;
				}
				return next();
			    });
			}
		    });			
	});

	view.on('render', (next) => {
		Sport.model.findOne()
		.where('name','Футбол')
		.exec((err, football) => {
			if (!err && football) {
			    //console.log(football);
			    Level.model.find()
			    .where('sport', football)
			    .exec((err, levels) => {
				if (!err)
				    locals.footballlevels = levels;
	    			return next();
			    });
			}
		    });			
	});

	view.on('render', (next) => {
		Sport.model.findOne()
		.where('name','Футбол')
		.exec((err, football) => {
			if (!err && football) {
			    Amplua.model.find()
			    .where('sport', football)
			    .exec((err, ampluas) => {
				if (!err)
				    locals.footballampluas = ampluas;
				//console.log(locals.footballampluas);
	    			return next();
			    });
			}
		    });			
	});

	view.on('render', (next) => {
		Sport.model.findOne()
		.where('name','Футбол')
		.exec((err, football) => {
			if (!err && football) {
			    Team.model.find()
			    .where('sport', football)
			    .exec((err, teams) => {
				if (!err) {
				    locals.footballteams = teams;
				}
				return next();
			    });
			}
		});			
	});

	view.on('render', (next) => {
		//if (!_.has(req.query, 'disconnect')) return next();
		const serviceName = '';
		User.model.findOne()
		.where('_id', req.user._id)
		.exec((err, user) => {
			if (err) return res.err(err);
			if (!user) {
				req.flash('info', 'Пользователь не найден, зарегистируйтесь снова');
				return res.redirect('/signin');
			}
			locals.user = user;
    			Sport.model.findOne()
			.where('name','Хоккей')
			.exec((err, hockey) => {
				if (!err && hockey) {
					// console.log(req.user);
					console.log(hockey);
					UserSport.model.findOne()
					.where('user', req.user)
					.where('sport', hockey)
					.exec((err, usersport) => {
						//console.log(usersport);
						if (!err) {
							locals.hockeysport = usersport;
							console.log(locals.hockeysport);
						}
						return next();
					});
				}
				else 
					return next();
			});
		});
	});

	view.on('render', (next) => {
		//if (!_.has(req.query, 'disconnect')) return next();
		const serviceName = '';
		User.model.findOne()
		.where('_id', req.user._id)
		.exec((err, user) => {
			if (err) return res.err(err);
			if (!user) {
				req.flash('info', 'Пользователь не найден, зарегистируйтесь снова');
				return res.redirect('/signin');
			}
			
			locals.user = user;
    			Sport.model.findOne()
			.where('name','Футбол')
			.exec((err, football) => {
				if (!err && football) {
					UserSport.model.findOne()
					.where('user', req.user)
					.where('sport', football)
					.exec((err, usersport) => {
						// console.log(usersport);
						if (!err) {
							locals.footballsport = usersport;
							console.log(locals.footballsport);
						}
						return next();
					});
				}
				else
					return next();
			});
		});
	});

	view.on('init', (next) => {
		//if (!_.has(req.query, 'disconnect')) return next();
		const serviceName = '';
		User.model.findOne()
		.where('_id', req.user._id)
		.exec((err, user) => {
			if (err) return res.err(err);
			if (!user) {
				req.flash('info', 'Пользователь не найден, зарегистируйтесь снова');
				return res.redirect('/signin');
			}
			UserTraining.model.find()
			.where('user.uuid', req.user.uuid)
			.exec((err, usertrainings) => {
				if (err) return res.err(err);
				locals.usertrainings = usertrainings;
				return next();
			    });
		});
	});

	view.on('post', { action: 'profile.password' }, (next) => {
		if (!req.body.password || !req.body.password_confirm) {
			req.flash('error', 'Please enter a password.');
			return next();
		}

		req.user.getUpdateHandler(req).process(req.body, {
			fields: 'password',
			flashErrors: true,
		}, (err) => {
			if (err) {
				return next();
			}

			req.flash('success', 'Your changes have been saved.');
			return next();
		});
		return next();
	});

	view.render('site/meedit');
};
exports = module.exports;
