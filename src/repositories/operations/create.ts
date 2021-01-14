import db from '../../database'

import formatOperation from './format'

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
    user_id: userId,
  }).save()

  const obj = operation.toObject()

  const response = formatOperation(obj)

  return response
}

export default create
