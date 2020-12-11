import mongoose from 'mongoose'

import config from '../config/mongo.js'

mongoose.connect(`mongodb://${config.host}:${config.port}/${config.db}`)

export default mongoose
