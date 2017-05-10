// server.js

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');



var configDB = require('./config/database.js');
mongoose.connect(configDB.url);


    
var db = mongoose.connection;
var dbCollection = db.collections;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(") we're connected! ");
});
// define the schema for our user model
var userSchema = mongoose.Schema({
    local            : {
        user_id        : Number ,
        course_id        : String,
        step        : Number,
        level        : Number,
        status     : String,
        timestamp     : Date,
    }
});
UserProgress = mongoose.model('UserProgress',userSchema);


// create the model for users and expose it to our app
//module.exports = mongoose.model('UserProgress', userSchema);

// set up our express application
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'lmss3cr3tppanoiss3s' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

// Add headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


require('./config/passport')(passport); 
require('./app/routes.js')(app, passport); 

app.listen(port, function() {
	console.log('LMS sever listens on port ' + port);
});

app.post('/user/courseUpd', function (req, res) {
    
  console.log('User pgres');
  data = req.body
  data['timestamp']= new Date();
  console.log(data);  
    
  UserProgress.collection.insert(data ,onInsert);
    function onInsert(err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.info('%d potatoes were successfully stored.', docs.length);
        }
    }
    
//  collection.insertOne({_id:"abc", user:"David"} );
  res.send('Hello World!');
})