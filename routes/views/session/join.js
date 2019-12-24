const keystone = require('keystone');
const async = require('async');

module.exports = function a(req, res) {
	if (req.user) {
		return res.redirect(req.cookies.target || '/me');
	}

	const view = new keystone.View(req, res);
	const locals = res.locals;

	locals.section = 'session';
	locals.form = req.body;

	view.on('post', { action: 'join' }, (next) => {
		async.series([
			function cb1(cb) {
				//console.log("cb1");
				if (!req.body.name || !req.body.email || !req.body.password) {
					req.flash('error', 'Пожалуйста введите имя, email и пароль.');
					// console.log('Please enter a name, email and password.');
					return cb(true);
				}

				return cb();
			},

			function cb2(cb) {
				//console.log("cb2");
				keystone.list('User').model.findOne({ email: req.body.email }, (err, user) => {
					//console.log('check user');
					if (err || user) {
						// console.log('User already exists with that email address');
						req.flash('error', 'Пользователь с таким е-мэйл уже существует');
						return cb(true);
					}
					
					return cb();
				});
			},

			function cb3(cb) {
				const userData = {
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
					type: '1',
					
				};

				const User = keystone.list('User').model;
				console.log("set " + req.body.name + " " + req.body.email + " " + req.body.password);				
				const newUser = new User(userData);
				//console.log(userData);
				newUser.save(err => cb(err));
				console.log("save complete");
			},

		], (err) => {
			if (err) return next();

			const onSuccess = function () {
				if (req.body.target && !/join|signin/.test(req.body.target)) {
					console.log(`[join] - Set target as [${req.body.target}].`);
					res.redirect(req.body.target);
				} else {
					res.redirect('/me');
				}
			};

			const onFail = function () {
				req.flash('error', 'Проблема с входом систему, попробуйте еще');
				return next();
			};

			keystone.session.signin({
				email: req.body.email,
				password: req.body.password },
			req, res, onSuccess, onFail);
			//return next();
		});
	});
	console.log("join");			
	return view.render('session/join');
};
exports = module.exports;
