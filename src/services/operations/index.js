const db = require('../../repositories')

const operationsDomain = require('../../domains/operations')

module.exports = operationsDomain(db)
