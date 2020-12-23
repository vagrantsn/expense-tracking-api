const db = require('../../database')

const findById = async (id) => {
  const user = await db.User.findById(id)
  return user
}

module.exports = findById
