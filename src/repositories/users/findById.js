const db = require('../../database')

const findById = async (id) => {
  const user = await db.User.findById(id).lean()
  return {
    id: user._id.toString(),
    email: user.email,
    password: user.password,
  }
}

module.exports = findById
