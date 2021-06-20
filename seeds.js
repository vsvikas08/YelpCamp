var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
	{
		name : "Cloud's Rest",
		image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxUTasaOQcOVh_4PC1TlPdTkIHcKu8eIC5ZxqtV3AWEDKuZNOB",
		description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
	},
	{
		name : "Bird sitting",
		image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT8Cd-n8DnDIv9zPn-5kc4jaTvfE9CYmho02vFAI6djcmQtDXa_",
		description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
	},
	{
		name : "Nature is beauty",
		image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT1B3_ZAe_cdLg59Ie1UiCBLFz7yKYpZJusP38EH8xDZtnm4aDQ",
		description : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
	}
]

function seedDB(){
	// Remove all campgrounds
	Campground.remove({},function(err){
		if(err)
			console.log(err);
		console.log("removed Campgrounds!!");
		// add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
				if(err)
					console.log(err);
				else{
					console.log("Added campgrounds!!");
					// create a comment
					Comment.create(
						{
							text : "This Place is great, but I wish there was internet",
							author : "Homer",
						} , function(err,comment){
							if(err)
								console.log(err)
							else{
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment");
							}
						}
					);
				}
			});
		});
	});

	// add a few comments
}



module.exports = seedDB;