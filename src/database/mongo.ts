import mongoose from 'mongoose'

import config from '../config/mongo'

const uri = `mongodb://${config.host}:${config.port}`

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
