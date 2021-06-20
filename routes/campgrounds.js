var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');


router.get("/campgrounds",function(req,res){
	// Get all campgrounds from DB
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/campgrounds",{campgrounds:allcampgrounds});
		}
	});
});
router.post("/campgrounds",function(req,res){
	// get data from form and to campground array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name:name,image:image,description:desc};
	// Create a new campground and save to DB
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			// redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
	
});
router.get("/campgrounds/new",function(req,res){
	res.render("campgrounds/new");
});

router.get("/campgrounds/:id",function(req,res){
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			// render show template with that campground
			res.render("campgrounds/show",{campground:foundCampground});
		}
	});
	
});



module.exports = router;