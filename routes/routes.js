// load up our shiny new route for users
const breakbeatRoutes = require('./breakbeats');
const appRouter = (app, fs) => {
	app.get('/', (req, res) => {
		res.send('welcome to the breaktbeat api-server');
	});

	// run our user route module here to complete the wire up
	breakbeatRoutes(app, fs);

};

// this line is unchanged
module.exports = appRouter;
