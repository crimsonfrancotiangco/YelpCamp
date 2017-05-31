var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root Route
router.get("/",function(req,res) {
	res.render("landing");
});

//Register Form Route
router.get("/register",function(req,res) {
	res.render("register");
});
//register post route
router.post("/register",function(req,res) {
	var newUser = new User({username:req.body.username});
	//User.register(new User({username:req.body.username}), req.body.password) //provided by passport-local-mongoose
	User.register(newUser, req.body.password, function(err,user) {
					if(err) {
						req.flash("error",err.message);
						return res.redirect("back");
					}
					passport.authenticate("local")(req, res, function() {
							req.flash("success","Welcome to YelpCamp " + user.username);
							res.redirect("/campgrounds")
					});
	});
});

//Show login Form
router.get("/login",function(req,res) {
	res.render("login");
});

//Handling Login Logic
//app.post("/login",middleware, callback ) //sample logic
router.post("/login",passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}),function(req,res) {
});

//Logout Route
router.get("/logout",function(req,res) {
		req.logout();

		req.flash("success","Logged you out!");
		res.redirect("/campgrounds");
});



module.exports = router;