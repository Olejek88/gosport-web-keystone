var async = require('async'),
    keystone = require('keystone');

var UserTraining = keystone.list('UserTraining');

exports.list = function(req, res) {
	UserTraining.model
		.exec(function(err, items) {
			if (err) return res.apiError('database error', err);
			if (!items) return res.apiError('not found');
			res.apiResponse(
				items
			);
		});
};

exports = module.exports;
