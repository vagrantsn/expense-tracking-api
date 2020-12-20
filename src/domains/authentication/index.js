const createToken = require('./create-token')
const verify = require('./verify')

const AuthorizationDomain = ({ db, secret }) => ({
  createToken: createToken({ secret, db }),
  verify: verify(secret),
})

module.exports = AuthorizationDomain
