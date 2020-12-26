const create = require('./create')
const find = require('./find')

const operationsDomain = db => ({
  create: create(db),
  find: find(db),
})

module.exports = operationsDomain
