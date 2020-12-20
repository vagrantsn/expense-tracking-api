const db = require('../../repositories')
const secret = process.env.JWT_SECRET

const AuthenticationDomain = require('../../domains/authentication')

module.exports = AuthenticationDomain({ db, secret })
