const db = require('../../database')

const formatUser = require('./format')

const create = async ({ email, password }) => {
  const user = await new db.User({ email, password }).save()

  return formatUser(user)
}

module.exports = create
