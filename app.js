var express        = require("express"),
	bodyParser     = require("body-parser"),
	mongoose       = require("mongoose"),
	Comment        = require("./models/comment"),
	passport 	   = require("passport"),
	LocalStrategy  = require("passport-local"),
	flash 		   = require("connect-flash"),
	methodOverride = require("method-override");
	User           = require("./models/user"),
	app            = express(),
	Campground     = require("./models/campground");
	var seedDB     = require("./seeds");

//Requiring Routes	 
var commentRoutes    = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes      = require("./routes/index");


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/yelp_camp_v11");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB(); //Seed the Database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"Crimson Tiangco",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //the middleware passport.authenticate
passport.serializeUser(User.serializeUser());  
passport.deserializeUser(User.deserializeUser());

//CURRENT USER USE TO ALL ROUTES //ADDED TO ALL EVERY SINGLE TEMPLATE EVERY SINGLE ROUTE
app.use(function(req, res, next) {
	res.locals.currentUser = req.user; 		//@curentUser config from mongoose
	res.locals.error = req.flash("error"); //@message flash config
	res.locals.success = req.flash("success"); //@message flash config
	next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes); //set "/campgrounds" in front of them
app.use("/campgrounds/:id/comments",commentRoutes);//merge the campgrounds and the comment together extension



app.listen(3000, function() {
	console.log("YelpCamp Server is now Serving ... ");
});



