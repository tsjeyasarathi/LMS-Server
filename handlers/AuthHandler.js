var UserDB = require('./../app/models/user');

var AuthHandler = function() {
	this.googleSignIn = googleSignIn;
	this.googleSignInCallback = googleSignInCallback;
	this.logout = logout;
}

function logout (req, res) {
	req.logout();
	res.end();
}

function googleSignIn(req, res, next) {

	passport = req._passport.instance;
	
	passport.authenticate('google',{scope: 'https://www.googleapis.com/auth/userinfo.profile  https://www.googleapis.com/auth/userinfo.email'}, function(err, user, info) {
        
	})(req,res,next);

};

function googleSignInCallback(req, res, next) {
	passport = req._passport.instance;
	passport.authenticate('google',function(err, user, info) {
		console.log('User =>', user);
        if(err) {
			return next(err);
		}
		
        if(!user) {
			return res.redirect('http://localhost:4200/#/login');
		}

		UserDB.findOne({email: user.email},function(err,usr) {
			res.writeHead(302, {
				'Location': 'http://localhost:4200/#/login?token=' + usr.token + '&user=' + usr._id
			});
			res.end();
		});
	})(req,res,next);
};

module.exports = AuthHandler; 