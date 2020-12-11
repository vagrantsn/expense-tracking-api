const { compare } = require('bcrypt')

const authenticate = db => async ({ email, password }) => {
  const user = await db.user.findByEmail(email)

  if (!user) {
    return false
  }

  const isPasswordCorrect = await compare(password, user.password)

  if (!isPasswordCorrect) {
    return false
  }

  return {
    id: user.id,
    email: user.email,
  }
}

module.exports = authenticate
