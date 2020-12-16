const mongoose = require('mongoose')

const config = require('../config/mongo.js')

const uri = `mongodb://${config.host}:${config.port}`

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
