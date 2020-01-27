
var mongoose = require("mongoose");

var picSchema = new mongoose.Schema({
  Title: String,
   image: String,
   description: String,
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Pic", picSchema); // no need to write mongoose.model("Pic",picSchema);

// Pic.create({
// 	image : "http://i.imgur.com/qK42fUu.jpg"
// },function(err,pics){
// 	if(err){
// 		console.log(err);
// 	}
// 	else
// 		{console.log("Added");}
// } );