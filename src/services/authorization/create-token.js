const jwt = require('jsonwebtoken')

const createToken = secret => (user) => {
  const payload = {
    user: { id: user.id, email: user.email }
  }

  const options = { expiresIn: '1h' }
  return jwt.sign(payload, secret, options)
}

module.exports = createToken
