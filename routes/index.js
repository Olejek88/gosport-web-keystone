var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', (req, res, next) => {
//	res.notfound();
});

// Handle other errors
keystone.set('500', (err, req, res, next) => {
	let	title;
	let	message;
	if (err instanceof Error) {
		message = err.message;
		err = err.stack;
	}
	res.status(500).render('errors/500', {
		err,
		errorTitle: title,
		errorMsg: message,
	});
});

// Load Routes
const routes = {
	views: importRoutes('./views'),
	auth: importRoutes('./auth'),
	tools: importRoutes('./tools'),
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.all('/contact', routes.views.contact);

	// Session
	app.all('/join', routes.views.session.join);
	app.all('/signin', routes.views.session.signin);
	app.get('/signout', routes.views.session.signout);
	app.all('/forgot-password', routes.views.session['forgot-password']);
	app.all('/reset-password/:key', routes.views.session['reset-password']);

	// Authentication
	app.all('/auth/confirm', routes.auth.confirm);
	app.all('/auth/app', routes.auth.app);
	app.all('/auth/:service', routes.auth.service);

	// User
	app.all('/me*', middleware.requireUser);
	app.all('/me', routes.views.me);
	app.all('/meedit', routes.views.meedit);

	// Stadiums
	 app.all('/stadiums', routes.views.stadiums);
	 app.all('/stadiumnew', routes.views.stadiumnew);
	// app.all('/stadiumedit', routes.views.serviceedit);
	 app.all('/stadium/:stadium', routes.views.stadium);
	 app.all('/stadium/:id', routes.views.stadium);

	app.get('/api/stadiums', keystone.middleware.api, routes.api.stadiums.list);
};
