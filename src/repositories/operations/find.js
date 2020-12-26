const {
  complement,
  either,
  equals,
  filter,
  pick,
} = require('ramda')

const db = require('../../database')

const isNilOrUndefined = either(equals(null), equals(undefined))

const filterEmptyProps = filter(complement(isNilOrUndefined))

const find = async (
  {
    amount,
    label,
    tags,
    userId,
  } = {},
  {
    createdAt,
  } = {}
) => {
  const filteredQuery = filterEmptyProps({
    amount,
    label,
    tags,
    userId,
  })

  const operations = await db.Operation
    .find(filteredQuery)
    .sort({ createdAt })
    .lean()

  const fieldsToReturn = [
    'amount', 'label', 'tags', 'createdAt', 'updatedAt'
  ]

  const result = operations.map(operation => ({
    id: operation._id.toString(),
    userId: operation.userId.toString(),
    ...pick(fieldsToReturn, operation),
  }))

  return result
}

module.exports = find
