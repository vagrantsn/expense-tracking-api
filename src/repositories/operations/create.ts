import db from '../../database'

import Operation from '../../types/operation'

const create = async (
  { amount, label, tags = [], user_id } : Operation
) : Promise<Operation> => {
  const operation = await new db.Operation({
    amount,
    label,
    tags,
    user_id,
  }).save()

  return operation.toObject()
}

export default create
