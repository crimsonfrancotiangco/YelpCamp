var express = require("express");
var router = express.Router({mergeParams: true});//merge the campgrounds and the comment together
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware"); 

//Comments New
router.get("/new",middleware.isLoggedIn, function(req,res) {
	//find the campground by id
	Campground.findById(req.params.id, function(err,campground) {
			if(err){

			}else {
			  res.render("comments/new",{campground:campground});
			}
	});
		
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req,res) {
		//lookup campground using ID
		Campground.findById(req.params.id,function(err,campground) {
				if(err) {
					console.log(err);
					res.redirect("/campgrounds");
				}else {
					//create new comment
					Comment.create(req.body.comment, function(err,comment) {
						if(err) {
							req.flash("error","Something went wrong");
							console.log(err);
						}else {
							//Add username and id to comment
							comment.author.id = req.user._id; //comment author object schema
							comment.author.username = req.user.username; //comment author object schema
							//and then save comment
							comment.save();
							campground.comments.push(comment);
							campground.save();
							req.flash("success","Successfully added comment");
							res.redirect("/campgrounds/" + campground._id);
						}
					});
				}
		});
});

//COMMENTS EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res) {//:id_comment because :id is already define in campground routing //"/campgrounds/:id/comments/:comment_id/edit"
	Comment.findById(req.params.comment_id,function(err,foundComment) {
		if(err) {
			res.redirect("back");
		}else {
			res.render("./comments/edit",{campground_id: req.params.id, comment:foundComment});	
		}
	});

					 	
});


//COMMENTS UPDATE ROUTE
//campgrounds/:id/comments/:comment_id	
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res) {
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment) {
			if(err) {
				res.redirect("back");
			}else {
				res.redirect("/campgrounds/"+ req.params.id);
			}
	});
});
//COMMENT DESTROY ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res) {
	Comment.findByIdAndRemove(req.params.comment_id,function(err) {
		if(err) {
			res.redirect("back");
		}else {
			req.flash("success","Comment Deleted");
			res.redirect("/campgrounds/" + req.params.id);//id from campground in app.js
		}
	});
});
//Middleware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;

