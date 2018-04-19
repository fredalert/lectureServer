const express=require("express");
const http = require("http")
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const path = require('path');
const router= require("./router.js")
const mongoose = require("mongoose")
const busboy = require('connect-busboy');
const fs= require("fs")
const cors= require("cors")
const fileUpload=require("express-fileupload")



//Db setup
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/videoLecture' , {useMongoClient: true,});

//App setup

app.use(morgan("combined"));
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')))


//file handling
app.post('/uploadvideo', function(req, res) {

console.log(req.files)
  if (!req.files){
    return res.status(400).send('No files were uploaded.');}
  let sampleFile =  req.files.file
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file


let path=`./public/videos/${req.files.file.name}`
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(path, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send(path)
  });
});

app.post('/uploadimage', function(req, res) {


  if (!req.files){
    return res.status(400).send('No files were uploaded.');}

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.file;
let path=`./public/images/${req.files.file.name}`
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(path, function(err) {
    if (err)
      return res.status(500).send(err);
    res.send(path)
  });
});


app.use(bodyParser.json({type:"*/*"}))







router(app);

//Server setup

const port  = process.env.PORT || 3090;
const server = http.createServer(app);
//"http://192.168.1.3"
server.listen(3090);
console.log("Server listeing on port", port)
