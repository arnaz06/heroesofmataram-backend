fs = require('fs');
path = require('path');

let User = require('../models/user');

module.exports = {
  saveData: function(req, res) {
    let result={
      success: false,
      status: 'ERROR',
      msg: 'SOMETHING WHEN WRONG!!!'
    }
    let file = req.files
    filePath = path.join(__dirname,'../'+file[0].path);
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      }
      let dataJson = JSON.parse(data)
      User.findOne({username: dataJson.username}, function(err, userFind){
        if(userFind != null){
          result.msg='user already exists!!'
          res.json(result)
        }else{
          let userSave = new User(dataJson)
          userSave.save(function(err){
            if(err){
              console.log(err);
              result.msg= 'Error when create new user'
            }else{
              result.success= true
              result.status= 'OK'
              result.msg='user saved'
            }
            res.json(result)
          })
        }
      })
    });
  },
  loadData: function(req,res){
    let result={
      success: false,
      status: 'ERROR',
      msg: 'SOMETHING WHEN WRONG!!!'
    }
    User.findOne({username: req.body.username}, function(err, userFind){
      if(err){
        result.msg='Cant load data '+req.body.username
        res.json(result)
      }else{
        result.success= true
        result.status='OK'
        result.msg= 'load data success'
        result.user=userFind
        res.json(result)
      }
    })
  },
  updateData: function(req,res){
    let result={
      success: false,
      status: 'ERROR',
      msg: 'SOMETHING WHEN WRONG!!!'
    }
  }

}
