import {
  complement,
  either,
  equals,
  filter,
} from 'ramda'
import { Types } from 'mongoose'

import db from '../../database'

import formatOperation from './format'

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
  createdAt?: string
}

const find = async (
  { amount, label, tags, userId } : Query,
  { createdAt } : Sort = {}
) => {
  const filteredQuery = filterEmptyProps({
    amount,
    label,
    tags,
    user_id: userId,
  })

  const operations = await db.Operation
    .find(filteredQuery)
    .sort({ created_at: createdAt })
    .lean()

  const result = operations.map(formatOperation)

  return result
}

export default find
