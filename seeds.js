var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name:"Crimson",
		image:"http://www.co.jefferson.id.us/use_images/Parks/pavedsite.jpg",
		description: "Lorem ipsum dolor sit amet, sed tortor luctus libero volutpat suspendisse erat, dui morbi eleifend, molestie tincidunt adipiscing hac lorem diam magna, eget est ut nisl nam commodo. Duis suspendisse phasellus in. Odio congue justo ducimus integer, tempor vulputate arcu lectus, nulla adipiscing velit habitant, libero nec dictum mauris. Leo semper. Mi et dolor fusce a, magna sed egestas, accumsan congue mollitia neque quis nisl vestibulum. Ligula nec egestas amet, amet ligula, amet ac sed penatibus, non curabitur felis curabitur congue bibendum, phasellus curabitur fringilla."
	},
	{
		name:"Yumi",
		image:"http://www.co.jefferson.id.us/use_images/Parks/pavedsite.jpg",
		description: "Lorem ipsum dolor sit amet, sed tortor luctus libero volutpat suspendisse erat, dui morbi eleifend, molestie tincidunt adipiscing hac lorem diam magna, eget est ut nisl nam commodo. Duis suspendisse phasellus in. Odio congue justo ducimus integer, tempor vulputate arcu lectus, nulla adipiscing velit habitant, libero nec dictum mauris. Leo semper. Mi et dolor fusce a, magna sed egestas, accumsan congue mollitia neque quis nisl vestibulum. Ligula nec egestas amet, amet ligula, amet ac sed penatibus, non curabitur felis curabitur congue bibendum, phasellus curabitur fringilla."
	},

	{
		name:"Tine",
		image:"http://www.co.jefferson.id.us/use_images/Parks/pavedsite.jpg",
		description: "Lorem ipsum dolor sit amet, sed tortor luctus libero volutpat suspendisse erat, dui morbi eleifend, molestie tincidunt adipiscing hac lorem diam magna, eget est ut nisl nam commodo. Duis suspendisse phasellus in. Odio congue justo ducimus integer, tempor vulputate arcu lectus, nulla adipiscing velit habitant, libero nec dictum mauris. Leo semper. Mi et dolor fusce a, magna sed egestas, accumsan congue mollitia neque quis nisl vestibulum. Ligula nec egestas amet, amet ligula, amet ac sed penatibus, non curabitur felis curabitur congue bibendum, phasellus curabitur fringilla."
	},
];

function seedDB() {
	//remove all campgrounds
	Campground.remove({},function(err) {
			if(err) {
				console.log(err);
			}
			console.log("remove campground");
			//add a few campgrounds
			data.forEach(function(seed) {
					Campground.create(seed,function(err,campground) {
					if(err){
						console.log(err);
					}else {
						console.log("added a campground");
						//add a few comments
						Comment.create(
							{
								text:"This place is greatest",
								author:"homer"
							}, function(err,comment){
									if(err) {
										console.log(err);
									}else {
										campground.comments.push(comment);
										campground.save();
										console.log("Craeted new Comments");
									}
									
							});

					}
		});
	});
	});
	

	

}

module.exports = seedDB;
