const { mergeLeft } = require('ramda')

const InternalError = require('../../errors/InternalError')

const find = db => async (userId, query) => {
  if (!userId) {
    throw new InternalError()
  }

  const builtQuery = mergeLeft({ userId }, query)
  const sort = { createdAt: 'descending' }

  const result = await db.operations.findAll(builtQuery, sort)

  return result
}

module.exports = find
