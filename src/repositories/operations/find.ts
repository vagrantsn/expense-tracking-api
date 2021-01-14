import {
  complement,
  either,
  equals,
  filter,
} from 'ramda'

import db from '../../database'

import formatOperation from './format'

const isNilOrUndefined = either(equals(null), equals(undefined))
const filterEmptyProps = filter(complement(isNilOrUndefined))

const find = async (
  {
    amount,
    label,
    tags,
    userId,
  } = {},
  {
    createdAt,
  } = {}
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
