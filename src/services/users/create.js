const usersDomain = require('../../domains/user')

const repositories = require('../../repositories')

const create = ({ email, password }) => {
  return usersDomain(repositories).create({ email, password })
}

module.exports = create
