import {
  mergeLeft,
  is,
} from 'ramda'

import InternalError from '../../errors/InternalError'

const find = db => async (userId, query) => {
  if (!userId || !is(String, userId)) {
    throw new InternalError()
  }

  const builtQuery = mergeLeft({ userId }, query)
  const sort = { createdAt: 'ascending' }

  const result = await db.operations.findAll(builtQuery, sort)

  return result
}

export default find
