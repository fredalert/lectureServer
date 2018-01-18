const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt= require("bcrypt-nodejs")
const ProgressKeeperSchema = require("./progressKeeper")

const userSchema= new Schema({
  email: {type:String,
      required:true,
      unique:true,
      lowercase:true},
name: {
 type:String,
 required:true,
 validate:{
   validator:(name)=>name.length>2,
   message:"must enter an occupation"
 },
},
occupation:{
 type:String,

validate:{
validator:(occupation)=>occupation.length>2,
message:"Name must be at least 2 characters long"
          },
        },
workplace:{type:String,
          required:true},

admin: Boolean,
imageUrl: String,
password: {type:String,
          required:true},
lastModifiedLecture:Number,
createdLectures:[{
 type:Schema.Types.ObjectId,
 ref:"Lectures"
}],
passwordval:String,
lectures:[ProgressKeeperSchema]
},

{
toJSON: { virtuals: true }
});

//Before saving a document run this function
userSchema.pre("save", function(next){
  const user=this;
  bcrypt.genSalt(10, function(err, salt){
      if(err){
        return next(err)
      }
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err){
        return next(err);
      }
      user.password=hash;
      next();
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, callback){
bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
  if(err) {return callback(err)}
  callback(null, isMatch)
})
}

const model = mongoose.model("user", userSchema);

module.exports = model;
