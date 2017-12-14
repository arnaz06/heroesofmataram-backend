fs = require('fs');
path = require('path');

let User = require('../models/user');

module.exports = {
  savedata: function(req, res) {
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
      let result = JSON.parse(data)
      let user = new User(result)
      user.save(function(err){
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
    });

  }
}
