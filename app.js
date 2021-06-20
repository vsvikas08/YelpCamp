var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var passport = require('passport');
var LocalStrategy = require('passport-local');
var Campground = require("./models/campground")
var Comment = require("./models/comment");
var User = require('./models/user');
var seedDB = require('./seeds');

var commentRoutes = require('./routes/comments'),
	campgroundRoutes = require('./routes/campgrounds'),
	indexRoutes = require('./routes/index')


mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true,useUnifiedTopology:true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.use(require('express-session')({
	secret : "Once again Rusty wins cutest dog!",
	resave : false,
	saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// add username of many thing to all page
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
})
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);



app.listen(3000,function(req,res){
	console.log("YelpCamp Server Started!!")
});