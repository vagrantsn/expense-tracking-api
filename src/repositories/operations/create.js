const {
  pick,
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

  const fieldsToReturn = [
    'amount', 'label', 'tags', 'createdAt', 'updatedAt'
  ]

  const response = {
    id: raw._id.toString(),
    userId: raw.userId.toString(),
    ...pick(fieldsToReturn, raw),
  }

  return response
}

module.exports = create
