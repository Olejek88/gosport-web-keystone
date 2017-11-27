var async = require('async'),
    keystone = require('keystone');

var User = keystone.list('User');

exports.list = function(req, res) {
	User.model.find()
		.exec(function(err, items) {
			if (err) return res.apiError('database error', err);
			if (!items) return res.apiError('not found');
			res.apiResponse(
				items
			);
		});
};

exports = module.exports;
