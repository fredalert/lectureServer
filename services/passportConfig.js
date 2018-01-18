const User = require("../model/user")
const config = require("../config")
const passport = require("passport")
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

const localOptions={
  usernameField:"email"
}

const localLogin= new LocalStrategy(localOptions, function(email, password, done){
  User.findOne({email:email}, function(err, user){
    if(err){
      return done(err)}
    if(!user){
      return done(null, false)
    }
    if(user){
      user.comparePassword(password, function(err, isMatch){
        if(err){
          return done(err)
        }
        if(!isMatch){
          return done(null, false)
        }
        else{
          return done(null, user)
        }
      })
    }
  })
})

const jwtOptions={
  jwtFromRequest:ExtractJwt.fromHeader("authorization"),
  secretOrKey:config.secret,
}
const jwtLogin= new jwtStrategy(jwtOptions, function(payload, done){

User.findById(payload.sub, function(err, user){
  if(err){
  done(err, false)
  }
  if(user){
  done(null, user)
  }
  if(!user){
  done(null, false)
}
})
});

passport.use(jwtLogin)
passport.use(localLogin)
