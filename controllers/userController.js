const User= require("../model/user");
const jwt = require("jwt-simple")
const jwtDecoder = require("jwt-decode")

exports.getUser = function(req, res, next){

console.log("STARTING THE get user")
  const id= jwtDecoder(req.headers.authorization).sub

  User.findById(id).populate("createdLectures")
  .exec(function (error, user) {
          if (error) {
            return next(error);
          } else {

            return res.json(user);
          }
        });
  }

exports.getUsers = function(req, res, next){


    User.find({})
    .exec(function (error, users) {
            if (error) {
              return next(error);
            } else {


              return res.json(users);
            }
          });
    }

  exports.addProgressToUser = function(req,res, next){
  var query= {_id:req.params._id};

  var update= { $set: {lectures:req.body}
  }
  var options = {new:true}
  User.findOneAndUpdate(query, update, options, function(err, user, next){
    if(err){
      throw err;
    }
    else{
      res.json(user)
    }
  })
}

exports.addCreatedLectureToUser= function(req,res, next){

  var query= {_id:req.params._id};
  console.log("REQ:BODY IISSSSS", req.body)
    console.log("_id", req.params._id)

  var update= { $set: {createdLectures:req.body}
  }

  User.findOneAndUpdate(query, update, function(err, user, next){
    if(err){
      throw err;
    }
    else{
      res.json(user)
    }
  })
}
