const db = require('../../repositories')

const usersDomain = require('../../domains/users')

module.exports = usersDomain(db)
