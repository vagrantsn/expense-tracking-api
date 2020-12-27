const operationToJson = ({
  id,
  userId,
  amount,
  label,
  tags,
  createdAt,
  updatedAt,
} = {}) => ({
  id,
  user_id: userId,
  amount,
  label,
  tags,
  created_at: createdAt,
  updated_at: updatedAt,
})

module.exports = operationToJson
