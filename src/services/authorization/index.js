const createToken = require('./create-token')

const AuthorizationDomain = (secret) => ({
  createToken: createToken(secret),
})

module.exports = AuthorizationDomain
