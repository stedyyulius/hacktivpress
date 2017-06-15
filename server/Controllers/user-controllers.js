const Users = require('../Models/user')
const bcrypt = require ('bcrypt')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

function signup (req,res){
  console.log(`masuk`);
  // let hash = bcrypt.hashSync(req.body.password,salt)
  Users.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  },function(err,result){
    res.send(result)
  })
}

function login (req,res){
  Users.findOne({
    username: req.body.username,
    password: req.body.password
  },function(err,result){
    // if(bcrypt.compare(req.body.password,result.password)){
      let user = {
        _id: result._id,
        name: result.name
      }
      res.send(user)
//    }
  })
}

function listUsers (req,res){
  Users.find({},function(err,result){
    res.send(result)
  })
}

module.exports = {
  login,signup,listUsers
}
  