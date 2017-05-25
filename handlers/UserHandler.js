var user = require('./../app/models/user');

var UserHandler = function() {
	this.createUser = handleCreateUserRequest;
	this.getUsers = handleGetUsersRequest;
	this.getUser = handleGetUserRequest;
	this.updateUser = handleUpdateUserRequest;
	this.deleteUser = handleDeleteUserRequest;
	console.log("User Handler Set Up");
};

function handleCreateUserRequest(req,res) {
	console.log(req.params);
};

function handleGetUsersRequest(req,res) {
	console.log(req.params);	
};

function handleGetUserRequest(req,res) {
	console.log(req.params);
	user.findOne({_id: req.params.id}, { token: 0 },function(err,usr) {
		console.log(usr);

		if (!usr) {

		}
		res.json(200, usr);
	});
};

function handleUpdateUserRequest(req,res) {
	var dummy = {text: "dummy get"};
	res.json = (200, dummy);
};

function handleDeleteUserRequest(req,res) {
	var dummy = {text: "dummy get"};
	res.json = (200, dummy);
};

module.exports = UserHandler;