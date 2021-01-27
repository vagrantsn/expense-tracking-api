import {
  complement,
  either,
  equals,
  filter,
} from 'ramda'

import db from '../../database'

import Operation from '../../types/operation'
import { Query, SortQuery } from '../../types/database/operations'

const isNilOrUndefined = either(equals(null), equals(undefined))
const filterEmptyProps = filter(complement(isNilOrUndefined))

const find = async (
  { amount, label, tags, user_id } : Query,
  { createdAt } : SortQuery = {}
) : Promise<Operation[]> => {
  const filteredQuery = filterEmptyProps({
    amount,
    label,
    tags,
    user_id,
  })

  const operations: Operation[] = (
    await db.Operation.find(filteredQuery).sort({ created_at: createdAt })
  ).map(op => op.toObject())

  return operations
}

export default find
