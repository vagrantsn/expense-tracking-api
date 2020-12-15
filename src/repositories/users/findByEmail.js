const db = require('../../database')

const findByEmail = async (email) => {
  const user = await db.User.where({ email }).findOne()
  return user
}

module.exports = findByEmail
