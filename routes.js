function setup(app,handlers) {
	app.get('/auth/google',handlers.auth.googleSignIn);
	app.get('/auth/google/callback',handlers.auth.googleSignInCallback);
	app.get('/auth/logout',handlers.auth.logout);

	app.get('/users',handlers.user.getUsers);
	app.get('/users/:id',handlers.user.getUser);
	app.put('/users/:id',handlers.user.updateUser);
	app.post('/users',handlers.user.createUser);
	console.log("Successfully set up routes");
};

exports.setup = setup;