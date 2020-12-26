const db = require('../../database')

const create = async ({ email, password }) => {
  const user = await new db.User({ email, password }).save()

  return {
    id: user._id.toString(),
    email: user.email,
    password: user.password,
  }
}

module.exports = create
