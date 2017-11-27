var async = require('async'),
    keystone = require('keystone');

var Sport = keystone.list('Sport');

exports.list = function(req, res) {
    Sport.model.find(function(err, items) {
	
	if (err) return res.apiError('database error', err);
	
	res.apiResponse(
		items
	);
	
    });
};

exports = module.exports;
