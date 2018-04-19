const User= require("../model/user");
const jwt = require("jwt-simple")
const config = require("../config")


function tokenForUser(user){
  const timestamp=new Date().getTime();
  return jwt.encode({sub:user.id, iat:timestamp}, config.secret)
}

exports.signup = function(req, res, next){
const email=req.body.email;
const password=req.body.password;

if(!email || !password){
  return res.send({error:"Must enter name and password"})
}
User.findOne({email:email}, function(err, excistingUser){
  if(err){
    return next(err);
  }

  if(excistingUser){
  return  res.status(422).send({error:"User does already excist"})
  }
  const user = new User(
    req.body
  );
  user.save(function(err, user){
    if(err){
      return next(err);
    }
    res.json({token:tokenForUser(user)})
  })

})
}

exports.signin = function(req, res, next){

  res.send({token:tokenForUser(req.user)})
}
