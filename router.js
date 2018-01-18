const Authentication = require("./controllers/authentication")
const passportConfig=require("./services/passportConfig")
const passport = require("passport")

const requireAuth= passport.authenticate("jwt", {session:false})
const requireSignin = passport.authenticate("local", {session:false})

module.exports =function(app){


app.get("/", requireAuth, function(req, res, next){
  res.send({success:"yes, authenticated"})
})
app.post("/signup", Authentication.signup)

app.post("/signin", requireSignin, Authentication.signin)



}
