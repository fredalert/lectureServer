const Lectures = require("../model/lectures");

exports.getLectures= function(req, res){
  console.log("enters get lectures function")
  Lectures.find(function(err, lectures){
    if(err){
       throw err;
    }
    else{
      console.log("lectures are :", lectures)
      res.json(lectures);
    }
  })
}

exports.getLecture=function(req, res, next){
  console.log("get lecture started")
const id=req.params.lId;
console.log("id is ", id)

Lectures.findOne({_id:id}, function(err, lectur){

  if (err){return next(err)}
  else{
    console.log(lectur)

    return res.json(lectur)}
})
}

exports.postLecture=function(req, res, next){
  console.log("req.body is ", req.body)
  let lect=new Lectures(req.body);

lect.save(function(err, user){
  if(err){
    return next(err)
  }res.json(user)

})
}


exports.updateLecture=function(req, res, next){
  const lecture= req.body;
  const query={_id:req.params.lId};
  const update= {$set:{information:lecture.information,

                        questions:lecture.questions}};


  Lectures.findByIdAndUpdate(query, update, function(err, lecture){
    if(err){
      throw err;}
      console.log("UPDATED LECTURE IS, :", lecture)
    return res.json(lecture)
  })
}

exports.updateLectureForum=function(req, res, next){
  console.log("enters updateLectureForum")
const forum=req.body;
const query={_id:req.params.lId};
const update= {$set:{forum:forum}};
const options={new:true}
Lectures.findByIdAndUpdate(query, update, options, function(err, lecture){
  if(err){
    throw err;}
    else{
      return res.json(lecture)
    }
  }
)
}

exports.deleteLecture=function(req,res, next){
  const _id=req.params._id;
  Lectures.findByIdAndRemove(_id, function(err, lecture){
    if (err){throw err;}
    return res.json(lecture)
  })
}
