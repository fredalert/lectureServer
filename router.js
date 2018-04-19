const Authentication = require("./controllers/authentication")
const userController = require("./controllers/userController")
const lectureController = require("./controllers/lectureController")
const passportConfig=require("./services/passportConfig")
const passport = require("passport")


const requireAuth= passport.authenticate("jwt", {session:false})
const requireSignin = passport.authenticate("local", {session:false})
require('ofe').call();

module.exports =function(app){


app.get("/", requireAuth, function(req, res, next){
  res.send({message:"supersecretcode"})
})

//Authentication routes
app.post("/signup", Authentication.signup)
app.post("/signin", requireSignin, Authentication.signin)

//USER ROUTES

app.get("/user", requireAuth, userController.getUser )
app.get("/users", requireAuth, userController.getUsers)
app.put("/user/:_id/lectures", requireAuth, userController.addProgressToUser)
app.put("/user/:_id/createdlectures", requireAuth, userController.addCreatedLectureToUser)



//LectureRoutes
app.get("/lectures", requireAuth, lectureController.getLectures)
app.post("/lectures", lectureController.postLecture)
app.get("/lectures/:lId", requireAuth, lectureController.getLecture)
app.put("/updatelecture/:lId", requireAuth, lectureController.updateLecture)
app.put("/updatelectureforum/:lId/", requireAuth, lectureController.updateLectureForum)
app.delete("deletelecture/:lId", requireAuth, lectureController.deleteLecture)
}
