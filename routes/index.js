var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  result={
    msg: "berhasil bos"
  }
  res.json(result);
});

module.exports = router;
