const create = require('./create')

const UserService = db => ({
  create: create(db),
})

module.exports = UserService
