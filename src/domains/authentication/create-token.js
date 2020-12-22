const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { Unauthorized } = require('../../errors')

const createToken = ({ db, secret }) => async ({ email, password }) => {
  const user = await db.users.findByEmail(email)

  const isCorrectPassword = user && bcrypt.compareSync(password, user.password)

  if (!user || !isCorrectPassword) {
    throw new Unauthorized('wrong-credentials', 'Invalid e-mail or password')
  }

  const payload = {
    user: { id: user.id, email: user.email }
  }

  const options = { expiresIn: '1h' }
  return jwt.sign(payload, secret, options)
}

module.exports = createToken
