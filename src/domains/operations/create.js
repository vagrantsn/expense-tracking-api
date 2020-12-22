const Unauthorized = require('../../errors/Unauthorized')

const create = db => async (operationPayload) => {
  const {
    amount,
    label,
    tags,
    userId,
  } = operationPayload

  const user = await db.users.findById(userId)

  if (!user) {
    throw new Unauthorized('unauthorized-authentication', 'Access unauthorized')
  }

  const operation = await db.operations.create({
    amount,
    label,
    tags: tags || [],
    userId,
  })

  return operation
}

module.exports = create
