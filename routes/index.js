const landing = require('./landing');
const private = require('./private');
const search = require('./search');
const error = require('./error');

const constructorMethod = app => {
	app.use('/', landing);
	app.use('/private', private);
	app.use('/search', search);
	app.use('/error', error);
	app.use('*', (req, res) => {
		res.redirect("/error/404");
	});
}

module.exports = constructorMethod;