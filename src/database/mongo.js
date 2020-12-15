const mongoose = require('mongoose')

const config = require('../config/mongo.js')

const uri = `mongodb://${config.user}:${config.password}@${config.host}:${config.port}`

const openConnection = async () => mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const closeConnection = async () => mongoose.connection.close()

module.exports = {
  closeConnection,
  openConnection,
}
