const {
  complement,
  either,
  equals,
  filter,
} = require('ramda')

const db = require('../../database')

const isNilOrUndefined = either(equals(null), equals(undefined))

const filterEmptyProps = filter(complement(isNilOrUndefined))

const find = async ({
  amount,
  label,
  tags,
  userId,
}, { createdAt }) => {
  const filteredQuery = filterEmptyProps({
    amount,
    label,
    tags,
    userId,
  })

  console.log(filteredQuery)

  const operations = await db.Operation.find(filteredQuery).sort({ createdAt })

  return operations
}

module.exports = find
