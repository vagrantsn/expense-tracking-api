const createToken = require('./create-token')
const verify = require('./verify')

const AuthorizationDomain = (secret) => ({
  createToken: createToken(secret),
  verify: verify(secret),
})

module.exports = AuthorizationDomain
