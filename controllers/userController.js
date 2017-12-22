fs = require('fs');
path = require('path');

let User = require('../models/user');

module.exports = {
  saveData: function(req, res) {
    let result = {
      success: false,
      status: 'ERROR',
      msg: 'SOMETHING WENT WRONG!!!'
    }
    let file = req.files
    filePath = path.join(__dirname, '../' + file[0].path);
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        console.log(err);
        result.msg = err
        res.json(result)
      }
      let dataJSON = JSON.parse(data)
      User.findOne({
        user_Name: dataJSON.user_Name
      }, function(err, _userFind) {
        if(_userFind == null){
          let userSave = new User(dataJSON)
          userSave.save(function(err) {
            if (err) {
              console.log(err);
              result.msg = 'Error when create new user'
            } else {
              result.success = true
              result.status = 'OK'
              result.msg = 'user saved'
            }
            res.json(result)
          })
        } else{
          let userFind = _userFind.toJSON()
          if (userFind.user_Name == dataJSON.user_Name) {
            console.log(userFind.user_Name);
            result.msg = 'user already exists!!'
            res.json(result)
          } else {
            let userSave = new User(dataJSON)
            userSave.save(function(err) {
              if (err) {
                console.log(err);
                result.msg = 'Error when create new user'
              } else {
                result.success = true
                result.status = 'OK'
                result.msg = 'user saved'
              }
              res.json(result)
            })

          }
        }
      })
    });
  },
  loadData: function(req, res) {
    let result = {
      success: false,
      status: 'ERROR',
      msg: 'SOMETHING WENT WRONG!!!'
    }
    User.findOne({
      user_Name: req.body.username
    }, function(err, userFind) {
      if (err) {
        result.msg = 'Cant load data ' + req.body.username
        res.json(result)
      } else if(userFind == null){
        result.msg= 'User not found'
        res.json(result)
      }else {
        result.success = true
        result.status = 'OK'
        result.msg = 'load data success'
        result.user = userFind
        res.json(result)
      }
    })
  },
  updateData: function(req, res) {
    let result = {
      success: false,
      status: 'ERROR',
      msg: 'SOMETHING WENT WRONG!!!'
    }
    let file = req.files
    filePath = path.join(__dirname, '../' + file[0].path);
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        console.log('disini', err);
        result.msg = err
        res.json(result)
      }
      let dataJSON = JSON.parse(data)
      User.findOne({
        user_Name: req.body.username
      },'user_Name',function(err,_userFind){
        // console.log(userFind.user_Name  );
        if(_userFind==null){
          result.msg= 'user not found'
          res.json(result)
        }else{
          let userFind = _userFind.toJSON()
          if(userFind.user_Name != dataJSON.user_Name){
            result.msg = 'cant change username'
            res.json(result)
          }else{
            User.update({
              user_Name: req.body.username
            },dataJSON,{ multi: true }, function(err, affected) {
              if (err) {
                result.msg = err
                res.json(result)
              }else{
                result.success = true
                result.status = "OK"
                result.msg = 'user updated'
                res.json(result)
              }
            })
          }
        }
      })
    })
  },
  delete: function(req, res) {
    let result = {
      success: false,
      status: 'ERROR',
      msg: 'SOMETHING WHEN WRONG!!!'
    }
    User.remove({user_Name: req.body.username},function(err,_removed){
      if(err){
        result.msg = err
        res.json(result)
      }else{
        let removed = _removed.toJSON()
        if(removed.n == 0){
          result.msg= 'user not found'
          res.json(result)
        }else{
          result.success = true
          result.status = 'OK'
          result.msg = 'user are removed'
          res.json(result)
        }
      }
    })
    // User.findOne({
    //   user_Name: req.body.username
    // }, function(err, _userFind) {
    //   console.log(_userFind);
    //   if (err) {
    //     result.msg = err
    //     res.json(result)
    //   } else if (_userFind == null) {
    //     result.msg = 'user not found'
    //     res.json(result)
    //   } else {
    //     let userFind = _userFind.toJSON()
    //     User.remove(userFind, function(err) {
    //       if (err) {
    //         result.msg = 'delete failed'
    //         res.json(result)
    //       } else {
    //         result.success = true
    //         result.status = 'OK'
    //         result.msg = 'delete success'
    //         res.json(result)
    //       }
    //     })
    //   }
    // })
  }

}
