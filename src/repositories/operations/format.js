const {
  pick,
} = require('ramda')

const formatOperationFromDb = operation => {
  const fields = [
    'amount', 'label', 'tags', 'createdAt', 'updatedAt'
  ]

  return {
    id: operation._id.toString(),
    userId: operation.userId.toString(),
    ...pick(fields, operation)
  }
}

module.exports = formatOperationFromDb
