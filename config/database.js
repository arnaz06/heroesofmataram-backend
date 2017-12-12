require('dotenv').config()
module.exports =
{
  dbUrl:process.env.MONGO_URL || "mongodb://localhost:27017/heroesofMataramBackendDev"
}
