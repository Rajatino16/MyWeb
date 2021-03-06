var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Blog", blogSchema);