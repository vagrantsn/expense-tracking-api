const db = require('../../database')

const formatUser = require('./format')

const findById = async (id) => {
  const user = await db.User.findById(id).lean()

  return user && formatUser(user)
}

module.exports = findById
