var async = require('async'),
    keystone = require('keystone');

var Event = keystone.list('Event');

exports.list = function(req, res) {
	Event.model.find()
		.populate('sport')
		.exec(function(err, items) {
			if (err) return res.apiError('database error', err);
			if (!items) return res.apiError('not found');
			res.apiResponse(
				items
			);
		});
};

exports = module.exports;
