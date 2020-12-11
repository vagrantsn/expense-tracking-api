const authenticate = require('./authenticate')

const authenticationDomain = db => ({
  authenticate: authenticate(db)
})

module.exports = authenticationDomain
