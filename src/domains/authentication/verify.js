const jwt = require('jsonwebtoken')

const verify = secret => (token) => {
  try {
    const { user } = jwt.verify(token, secret)
    return user
  } catch (error) {
    return false
  }
}

module.exports = verify
