const create = require('./create')

const operationsDomain = db => ({
  create: create(db),
})

module.exports = operationsDomain
