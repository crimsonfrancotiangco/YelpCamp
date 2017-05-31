var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware"); //no need for index.js because this is speacial name automatic call index
										  //when require


//INDEX - SHOW ALL CAMPGROUNDS
router.get("/",function(req,res) {
		//GET ALL CAMPGROUNDS IN DB
	Campground.find({},function(err,allCampgrounds){
			if(err){
				console.log(err);
			}else {
				res.render('campgrounds/index',{campgrounds:allCampgrounds,currentUser:req.user});	//GET USER 
			}
	});
});


//NEW -  SHOW FORM TO CREATE CAMPGROUND
router.get("/new",middleware.isLoggedIn,function(req,res) {
	res.render("campgrounds/new.ejs");
});

//CREATE - ADD NEW CAMPGROUNDS TO DB
router.post("/",middleware.isLoggedIn,function(req,res) {
		var name = req.body.name;
		var image = req.body.image;
		var desc = req.body.description;
		var author = {
			id: req.user._id,
			username: req.user.username
		};
		var newCampground = {name: name,image: image, description: desc, author : author};
		//CREATE NEW CAMPGROUND AND SAVE TO DATABASE
		Campground.create(newCampground,function(err,newlyCreated) {
			if(err) {
				console.log(err);
			}else {
				//REDIRECT BACK TO CAMPGROUND!
				console.log(newlyCreated);
			 	res.redirect("/campgrounds");	
			}
		});	
});
//SHOW - SHOWS MORE INFO ABOUT ONE CAMPGROUND
router.get("/:id",function(req,res) {
		//FIND THE CAMPGROUND WITH THE PROVIDED ID
		Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground) {
			if(err) {
				console.log(err);
			}else {
				console.log(foundCampground);
				//RENDER SHOW TEMPLATE WITH THAT CAMPGROUND
				res.render('campgrounds/show',{campground:foundCampground});
			}
		});
});


//get campground by id route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res) {
	 Campground.findById(req.params.id,function(err,foundCampground){
			res.render("campgrounds/edit",{campground:foundCampground});
		  });	
});

//update campground route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){ //id get here req.body.id
	
	Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err,updatedCampground) { //using mongoose findByIdAndUpdate
		if(err) {
			res.redirecet("/campgrounds");
		}
			res.redirect("/campgrounds/" + req.params.id);
	});
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
			if(err) {
				res.redirect("/campgrounds");
			}else {
				res.redirect("/campgrounds");
			}
			
	});
});


module.exports = router;