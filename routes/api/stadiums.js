var async = require('async'),
    keystone = require('keystone');

var Stadium = keystone.list('Stadium');

exports.list = function(req, res) {
    Stadium.model.find(function(err, items) {
	
	if (err) return res.apiError('database error', err);
	
	res.apiResponse(
		items
	);
	
    });
};

exports = module.exports;
