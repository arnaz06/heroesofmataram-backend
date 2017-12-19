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
        username: dataJSON.username
      }, function(err, userFind) {
        if (userFind != null) {
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
      Username: req.body.username
    }, function(err, userFind) {
      if (err) {
        result.msg = 'Cant load data ' + req.body.username
        res.json(result)
      } else if(userFind== null){
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
      console.log(req.body.username);
      User.findOne({
        Username: req.body.username
      }, function(err, userFind) {
        if (err) {
          result.msg = err
          res.json(result)
        } else {
          if (userFind == null) {
            result.msg = 'user not found'
            res.json(result)
          } else if (dataJSON.Username != userFind.Username) {
            result.msg = 'cant change username '
            res.json(result)
          } else if (JSON.stringify(dataJSON) === JSON.stringify(userFind)) {
            result.msg = "there not data are updated"
            res.json(result)
          } else {
            User.update({
              Username: dataJSON.username
            }, dataJSON, function(err, affected, resp) {
              console.log(affected);
              result.success = true
              result.status = "OK"
              result.msg = 'data updated'
              res.json(result)
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
    User.findOne({
      Username: req.body.username
    }, function(err, userFind) {
      if (err) {
        result.msg = err
        res.json(result)
      } else if (userFind == null) {
        result.msg = 'user not found'
        res.json(result)
      } else {
        User.remove(userFind, function(err) {
          if (err) {
            result.msg = 'delete failed'
            res.json(result)
          } else {
            result.success = true
            result.status = 'OK'
            result.msg = 'delete success'
            res.json(result)
          }
        })
      }
    })
  }

}
