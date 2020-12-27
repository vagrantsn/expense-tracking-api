const db = require('../../database')

const formatUser = require('./format')

const findByEmail = async (email) => {
  const user = await db.User.where({ email }).findOne().lean()

  return user && formatUser(user)
}

module.exports = findByEmail
