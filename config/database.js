require('dotenv').config()
module.exports =
{
  dbUrl:process.env.MONGO_URL || 'heroesofMataramBackendDev'
}
