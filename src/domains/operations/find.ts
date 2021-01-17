import {
  mergeLeft,
} from 'ramda'

import { Query } from '../../repositories/operations/find'

const find = db => async (userId: string, query?: Query) => {
  const builtQuery = mergeLeft({ userId }, query)
  const sort = { createdAt: 'ascending' }

  const result = await db.operations.findAll(builtQuery, sort)

  return result
}

export default find
