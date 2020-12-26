const db = require('../../database')

const findByEmail = async (email) => {
  const user = await db.User.where({ email }).findOne().lean()

  return {
    id: user._id.toString(),
    email: user.email,
    password: user.password,
  }
}

module.exports = findByEmail
