var async = require('async'),
    keystone = require('keystone');

var Amplua = keystone.list('Amplua');

exports.list = function(req, res) {
	Amplua.model.find()
		.populate('sport')
		.exec((err, items) => {
			if (err) return res.apiError('database error', err);
			res.apiResponse(
				items
			);
	});
};

exports = module.exports;
