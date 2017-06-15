const Users = require('../Models/user')
const bcrypt = require ('bcrypt')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

function signup (req,res){
  let hash = bcrypt.hashSync(req.body.password,salt)
  Users.create({
    name: req.body.name,
    username: req.body.username,
    password: hash,
    email: req.body.email
  })
}

function login (req,res){
  Users.findOne({
    username: req.body.username
  },function(err,result){
    if(bcrypt.compare(req.body.password,result.password)){
      let user = {
        _id: result._id,
        name: result.name
      }
      res.send(user)
    }
  })
}

module.exports = {
  login,signup
}
  