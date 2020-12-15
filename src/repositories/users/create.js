const db = require('../../database')

const create = async ({ email, password }) => {
  const user = await new db.User({ email, password }).save()

  return user
}

module.exports = create
