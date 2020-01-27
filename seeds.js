var mongoose = require("mongoose");
var pict = require("./models/pic");
var Comment   = require("./models/comment");

var data = [
    {
        Title: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Awesome spot"
    },
    {
        Title: "Desert Mesa", 
        image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Nice place to visit"
    },
    {
        Title: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "B E A Utifulll"
    }
]

function seedDB(){
   //Remove all campgrounds
   pict.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed pics!");
         //add a few campgrounds
        data.forEach(function(seed){
            pict.create(seed, function(err, p){
                if(err){
                    console.log(err)
                } else {
                    //console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                p.comments.push(comment);
                                p.save();
                               // console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;