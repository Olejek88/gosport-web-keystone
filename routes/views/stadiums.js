const keystone = require('keystone');

const Stadium = keystone.list('Stadium');

module.exports = function a(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	view.on('render', (next) => {
		Stadium.model.find()
		.populate('sport')
		.sort('updatedAt')
		.exec((err, stadiums) => {
			if (err) return res.err(err);
			locals.stadiums = stadiums;
			return next();
		});
	});

	view.render('site/stadiums');
};
exports = module.exports;
