var async = require('async'),
    keystone = require('keystone');

var Team = keystone.list('Team');

exports.list = function(req, res) {
    Team.model.find(function(err, items) {
	
	if (err) return res.apiError('database error', err);
	
	res.apiResponse(
		items
	);
	
    });
};

exports.create = function(req, res) {
	let teamId = 1;
	Team.model.find().sort({ teamId: -1 })
		.exec((err, data) => {
		if (data[0] && data[0].teamId) { teamId = data[0].teamId + 1; }
			const newTeam = new Team.model({
				teamId,
				photo: req.body.photo,
				sport: req.body.sport,
				name: req.body.name,
				description: req.body.description,
				level: req.body.level,
				photo: req.body.photo,
				}),
				updater = newTeam.getUpdateHandler(req, res, {
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
						req.flash('success', 'Your added');
					}
					next();
				});
		});
};

exports = module.exports;
