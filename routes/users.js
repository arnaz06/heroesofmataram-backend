let express = require('express');
let router = express.Router();
let multer = require('multer');
let userController = require('../controllers/userController');
let storage = multer.diskStorage({
   destination: 'dataUser/',
   filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
  });

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// router.get('/savedata', userController.savedata)
let upload = multer({ storage: storage });
router.post('/savedata', upload.any(), userController.saveData)
router.post('/loaddata',userController.loadData)
router.post('/updatedata', upload.any(), userController.updateData)
router.post('/deletedata', upload.any(), userController.delete)

module.exports = router;
