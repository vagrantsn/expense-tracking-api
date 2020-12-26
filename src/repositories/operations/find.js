const db = require('../../database')

const create = async ({
  amount,
  label,
  tags,
  userId,
}, { createdAt }) => {
  const operations = await db.Operation.find({
    amount,
    label,
    tags,
    userId,
  }).sort({ createdAt })

  return operations
}

module.exports = create
