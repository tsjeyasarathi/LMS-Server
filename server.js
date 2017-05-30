// server.js
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 4040;
var mongoose = require('mongoose');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

/**
 * Load routers.js
 */
routes = require('./routes');

/**
 * Load database variables
 */
var configDB = require('./config/database.js');

/**
 * Load the auth variables
 */
var configAuth = require('./config/auth.js');

/**
 * Load the handlers
 */
var UserHandler = require('./handlers/UserHandler');
var AuthHandler = require('./handlers/AuthHandler');
var ActionsHandler = require('./handlers/ActionsHandler');

/**
 * set up our express application
 */
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * required for passport
 */
app.use(session({ secret: 'lmss3cr3tppanoiss3s',  resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/**
 * Add headers
 */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

/**
 * Load user collections' schema
 */
var Users = require('./app/models/user');

mongoose.connect(configDB.url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("we're connected!");
});

var handlers = {
    user: new UserHandler(),
    auth: new AuthHandler(),
    actions: new ActionsHandler()
};

/**
 * Use the GoogleStrategy within Passport.
 * Strategies in Passport require a `verify` function, which accept
 * credentials (in this case, an accessToken, refreshToken, and Google
 * profile), and invoke a callback with a user object.
 */
passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: "http://localhost:4040/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {

        console.log(profile);
        //check user table for anyone with an email of Google
        Users.findOne({ email: profile._json.email }, function(err, user) {
            if (err) {
                return done(err);
            }
            //No user was found... so create a new user with values from Google (all the profile. stuff)
            if (!user) {
                user = new Users({
                    _id: profile.id,
                    first_name: profile.name['givenName'],
                    last_name: profile.name['familyName'],
                    email: profile.emails[0]['value'],
                    token: accessToken
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                //found user. Return
                user.token = accessToken;
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            }
        });
    }
));

routes.setup(app,handlers);

app.listen(port, function() {
    console.log('LMS sever listens on port ' + port);
});