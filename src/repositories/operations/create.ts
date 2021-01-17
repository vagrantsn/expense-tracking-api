import { Types } from 'mongoose'

import db from '../../database'

import formatOperation from './format'

interface Query {
  amount: number,
  label: string,
  tags?: string[],
  userId: string|Types.ObjectId,
}

const create = async (
  { amount, label, tags = [], userId } : Query
) => {
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
