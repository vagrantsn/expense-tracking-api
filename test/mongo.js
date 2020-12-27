const mongoose = require('mongoose')
const { v4: uuid } = require('uuid')

const connect = async () => {
  const randomDbName = uuid().split('-')[0]

  const uri = `mongodb://mongo/${randomDbName}`

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}

const disconnect = async () => mongoose.connection.close()

module.exports = {
  connect,
  disconnect,
}
