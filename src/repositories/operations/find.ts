import {
  complement,
  either,
  equals,
  filter,
} from 'ramda'
import { Types } from 'mongoose'

import db from '../../database'

import Operation from '../../types/Operation'

const isNilOrUndefined = either(equals(null), equals(undefined))
const filterEmptyProps = filter(complement(isNilOrUndefined))

export interface Query {
  id?: string|Types.ObjectId,
  amount?: number,
  label?: string,
  tags?: string[],
  userId?: string|Types.ObjectId
}

interface Sort {
  createdAt?: 'ascending'|'descending',
}

const find = async (
  { amount, label, tags, userId } : Query,
  { createdAt } : Sort = {}
) : Promise<Operation[]> => {
  const filteredQuery = filterEmptyProps({
    amount,
    label,
    tags,
    user_id: userId,
  })

  const operations = (
    await db.Operation.find(filteredQuery).sort({ created_at: createdAt })
  ).map(op => op.toObject())

  return operations
}

export default find
