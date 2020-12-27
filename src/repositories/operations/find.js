const {
  complement,
  either,
  equals,
  filter,
} = require('ramda')

const db = require('../../database')

const formatOperation = require('./format')

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

  const result = operations.map(formatOperation)

  return result
}

module.exports = find
