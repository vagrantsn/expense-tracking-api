const {
  pickAll,
} = require('ramda')

const db = require('../../database')

const create = async ({
  amount,
  label,
  tags,
  userId,
}) => {
  const operation = await new db.Operation({
    amount,
    label,
    tags,
    userId,
  }).save()

  const raw = operation.toObject()

  const response = {
    id: raw._id,
    ...pickAll([
      'amount',
      'label',
      'tags',
      'userId',
      'createdAt',
      'updatedAt',
    ], raw)
  }

  return response
}

module.exports = create
