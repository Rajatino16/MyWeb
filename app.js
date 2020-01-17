var express = require("express");
var app = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
	Pic = require("./models/pic"),
	methodOverride = require("method-override")
	// Blog  = require("./models/Blog"),
	// Comment     = require("./models/comment")

mongoose.connect("mongodb://localhost/myWeb");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

app.get("/", function(req, res){
    res.render("home");
 });

app.get("/pics", function(req, res){
	    // Get all campgrounds from DB
    Pic.find({}, function(err, allpics){
       if(err){
           console.log(err);
       } else {
          res.render("pics",{ Pic : allpics});
       }
    });
 });

app.get("/about", function(req, res){
   res.render("about");
});

app.get("/login", function(req, res){
   res.render("login");
});

app.get("/register", function(req, res){
   res.render("register");
});

app.post("/pics/newPic", function(req, res){
    // get data from form and add to pics array
	var name = req.body.Title ;
    var Nimage = req.body.image;
    var desc = req.body.description;
    var addition = { Title: name, image: Nimage, description: desc} 
    // Create a new image and save to DB
    Pic.create(addition, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to pics page
            res.redirect("/pics");
        }
    });
});

app.get("/pics/newPic", function(req, res){
   res.render("pictures/newPic"); 
});

// SHOW - shows more info about one campground
app.get("/pics/:id", function(req, res){
    //find the campground with provided ID
    Pic.findById(req.params.id).exec(function(err, foundPic){ // Pic.findById(req.params.id).populate("comments").exec(function(err, foundPic){
        if(err){
            console.log(err);
        } else {
            // console.log(foundPic)
            //render show template with that pic
            res.render("pictures/show", {pict: foundPic});
        }
    });
});

// DESTROY CAMPGROUND ROUTE
app.delete("/:id", function(req, res){
   Pic.findByIdAndRemove(req.params.id, function(err){
      if(err){
		  
          res.redirect("/pics");
      } else {
          res.redirect("/pics");
      }
   });
});
// app.delete("/:id", function(req, res){
// var myquery = { _id: re.params.id }
//   Pic.collection("pics").deleteOne(myquery, function(err, obj) {
//     if (err) throw err;
//     console.log("deleted");
//     res.redirect("/pics");
//   });
// });


 app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!!!");
 });

 // USE ABOVE METHOD OR THIS METHOD IN GOORM IDE
// app.listen(3000, function() { 
//   console.log('Server listening on port 3000'); 
// });    use "PORT=3000 node app.js" to run the code 