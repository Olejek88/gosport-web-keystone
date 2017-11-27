var async = require('async'),
    keystone = require('keystone');

var Training = keystone.list('Training');

exports.list = function(req, res) {
	Training.model.find()
		.exec(function(err, items) {
			if (err) return res.apiError('database error', err);
			if (!items) return res.apiError('not found');
			res.apiResponse(
				items
			);
		});
};

exports = module.exports;
