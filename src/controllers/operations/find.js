const wrapAsync = require('../wrapper')

const operationsService = require('../../services/operations')

const format = operation => ({
  id: operation.id,
  user_id: operation.userId,
  amount: operation.amount,
  label: operation.label,
  tags: operation.tags,
  created_at: operation.createdAt,
  updated_at: operation.updatedAt,
})

const find = async (req, res) => {
  const {
    amount,
    label,
    tags,
  } = req.query

  const { id: userId } = res.locals.authenticated

  const operations = (await operationsService.find(userId, {
    amount,
    label,
    tags,
  })).map(format)

  return res.status(200).json(operations)
}

module.exports = wrapAsync(find)
