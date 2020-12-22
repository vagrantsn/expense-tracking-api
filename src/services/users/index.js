const db = require('../../repositories')

const usersDomain = require('../../domains/user')

module.exports = usersDomain(db)
