const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var ForumSchema =new Schema({

    author:String,
    time:{ type: Date, default: Date.now },
    comment:String,
    imageUrl:String,
}
);




module.exports= ForumSchema;
