import mongoose from 'mongoose'
import { v4 as uuid } from 'uuid'

import config from '../config/mongo'

const connect = async () => {
  const randomDbName = uuid().split('-')[0]

  const uri = `mongodb://${config.host}:${config.port}/${randomDbName}`

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}

const disconnect = async () => mongoose.connection.close()

export default {
  connect,
  disconnect,
}
