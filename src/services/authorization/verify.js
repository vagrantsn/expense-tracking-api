const jwt = require('jsonwebtoken')

const verify = secret => (token) => {
  try {
    jwt.verify(token, secret)
    return true
  } catch (error) {
    return false
  }
}

module.exports = verify
