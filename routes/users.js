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
  let upload = multer({ storage: storage });
/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
/**
  * @api {post} api/user/savedata Create User
  * @apiGroup User
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer 09f0a3f774d713dbd9ec86746447b774fa4e73136bd1d7e4cc",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "file": username-savedata.txt
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {file} file file user berupa JSON
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  {
      "success": true,
      "status": "OK",
      "msg": "user saved"
  }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *      "success": false,
         "status": "ERROR",
         "msg": "SOMETHING WENT WRONG"
  *      }
**/
router.post('/savedata', upload.any(), userController.saveData)
/**
  * @api {post} api/user/loaddata Load Data
  * @apiGroup User
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer 09f0a3f774d713dbd9ec86746447b774fa4e73136bd1d7e4cc",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "username": kevin123
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {file} file file user beruba JSON
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  {
    "success": true,
    "status": "OK",
    "msg": "load data success",
    "user": {
        "_id": "5a368c7231ea132f13ae9002",
        "updatedAt": "2017-12-17T15:25:38.295Z",
        "createdAt": "2017-12-17T15:25:38.295Z",
        "Ganjel_Value": 0,
        "WeeklyRewardTaken": true,
        "After3BattleBool": true,
        "SpellScrollReady": false,
        "GrupCounter": 0,
        "RandomBoxReady": false,
        "MaterialBoxQuantity": [],
        "WeekCounter": 0,
        "DailyGet": false,
        "spelllist": [],
        "DayOfWeek": "kosong",
        "Pencarian_Tut": false,
        "PencarianMaterialCount": [],
        "WeaponUniqueID": 0,
        "Gold": 0,
        "herolist": [],
        "fullgamestart": false,
        "Announ_Hide": false,
        "Ganjel_bool": false,
        "BGMFirst": false,
        "HideFleeTime": 0,
        "StageCounter": 0,
        "Announ_Num": [],
        "DailyRewardCounter": 0,
        "Misi_Tut": false,
        "ShoeUniqueID": 0,
        "WeeklyRewardDone": false,
        "TokoBahan_Tut": false,
        "ClashedTutorial": false,
        "FleeWarning": false,
        "WeeklyDailyRewardCount": 0,
        "BattleTutorial": false,
        "CooldownFind": false,
        "RandomQuestBool": false,
        "TutorialProgress": 0,
        "PencarianMaterial": [],
        "shoelist": [],
        "ResetDailyReward": false,
        "VIP": false,
        "hero1": {
            "Attack_Speed": 0,
            "DefensePower": 0,
            "Defend": 0,
            "ShoeSet": false,
            "CriticalChance": 0,
            "HP": 0,
            "WeaponSet": false,
            "ShoeUniqueID": 0,
            "MaxLevelBool": false,
            "PantUniqueID": 0,
            "TorsoSet": false,
            "PantSet": false,
            "Attack": 0,
            "Kategori": "",
            "Slot": -1,
            "ID": 0,
            "WeaponUniqueID": 0,
            "HeroExp": 0,
            "Level": 1,
            "TorsoUniqueID": 0
        },
        "initialgame": false,
        "firstDaily": false,
        "MaxSlotHeroes": 0,
        "SpellScrollQuantity": 0,
        "PencarianTimer": 0,
        "Bahan": [],
        "Device_ID": "",
        "hero2": {
            "Attack_Speed": 0,
            "DefensePower": 0,
            "Defend": 0,
            "ShoeSet": false,
            "CriticalChance": 0,
            "HP": 0,
            "WeaponSet": false,
            "ShoeUniqueID": 0,
            "MaxLevelBool": false,
            "PantUniqueID": 0,
            "TorsoSet": false,
            "PantSet": false,
            "Attack": 0,
            "Kategori": "",
            "Slot": -1,
            "ID": 0,
            "WeaponUniqueID": 0,
            "HeroExp": 0,
            "Level": 1,
            "TorsoUniqueID": 0
        },
        "JumlahBahan": [],
        "SlotGear": 0,
        "QuestTimer": 0,
        "feature_Open": 0,
        "TokoBahanTimer": 0,
        "questgoal": [],
        "torsolist": [],
        "DailyRewardReady": false,
        "SpellScrollChance": 0,
        "BoxReward": [],
        "TorsoUniqueID": 0,
        "Limited_Offer": false,
        "StoryCounter": 0,
        "Lumpia_Value": 0,
        "TokoBahanCounter": 0,
        "MaterialBoxID": [],
        "FindInit": false,
        "StoryON": false,
        "PencarianCounter": 0,
        "Tier_EXP": 0,
        "materialunlock": false,
        "PencarianID": 0,
        "FleeInit": false,
        "Tier_Level": 0,
        "PantUniqueID": 0,
        "EpisodeProgressCounter": 0,
        "Lumpia_bool": false,
        "PencarianInit": false,
        "materiaList": [],
        "pantlist": [],
        "SystemTimer": "-8586886288299252884",
        "Username": "Kevin123",
        "FleeTarget": false,
        "AfterBattleBool": false,
        "Tier_MAX_EXP": 0,
        "CooldownFlee": false,
        "tempquest": [],
        "BoxBool": [],
        "MaxSlotGear": 0,
        "Arena_Tut": false,
        "QuestDoneCounter": 0,
        "weaponlist": [],
        "__v": 0,
        "deleted": false
    }
}
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *      "success": false,
         "status": "ERROR",
         "msg": "SOMETHING WENT WRONG"
  *      }
**/
router.post('/loaddata',userController.loadData)
/**
  * @api {post} api/user/updatedata Update Data User
  * @apiGroup User
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer 09f0a3f774d713dbd9ec86746447b774fa4e73136bd1d7e4cc",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "file": username-updatedata.txt,
         "username": Kevin123
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {file} file file user berupa JSON
  * @apiSuccess {string} username Kevin123 username
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  {
      "success": true,
      "status": "OK",
      "msg": "data updated"
  }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *      "success": false,
         "status": "ERROR",
         "msg": "SOMETHING WENT WRONG"
  *      }
**/
router.post('/updatedata', upload.any(), userController.updateData)
/**
  * @api {post} api/user/deletedata Delete Data User
  * @apiGroup User
  * @apiHeader {String} token token untuk login user
  * @apiHeaderExample {json} Header-Example:
  *     {
  *       "Authorization": "Bearer 09f0a3f774d713dbd9ec86746447b774fa4e73136bd1d7e4cc",
  *     }
  * @apiParamExample {json} Request-Example:
  *  {
  *      "username": "Kevin123"
  *  }
  * @apiSuccess {Boolean} success true jika berhasil
  * @apiSuccess {string} status "OK" jika berhasil
  * @apiSuccess {file} username string username username yang ingin dihapus
  * @apiSuccessExample {json} success
  *     HTTP/1.1 200 OK
  {
      "success": true,
      "status": "OK",
      "msg": "delete success"
  }
  * @apiErrorExample {json} Internal Server Error
  *     HTTP/1.1 500 Internal Server Error
  *     {
  *      "success": false,
         "status": "ERROR",
         "msg": "SOMETHING WENT WRONG"
  *      }
**/
router.post('/deletedata', upload.any(), userController.delete)

module.exports = router;
