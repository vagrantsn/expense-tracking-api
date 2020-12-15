const create = require('./create')

const UserDomain = db => ({
  create: create(db),
})

module.exports = UserDomain
