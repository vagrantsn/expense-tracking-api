import { Types } from 'mongoose'

import db from '../../database'

import Operation from '../../types/Operation'

interface Query {
  amount: number,
  label: string,
  tags?: string[],
  userId: string|Types.ObjectId,
}

const create = async (
  { amount, label, tags = [], userId } : Query
) : Promise<Operation> => {
  const operation = await new db.Operation({
    amount,
    label,
    tags,
    user_id: userId,
  }).save()

  const obj = operation.toObject()

  return obj
}

export default create
