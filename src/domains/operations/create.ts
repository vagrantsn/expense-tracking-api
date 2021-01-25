import Database from '../../types/database'
import Operation from '../../types/operation'

import Unauthorized from '../../errors/Unauthorized'

const create = (db: Database) => async (payload : Operation) => {
  const { amount, label, tags = [], user_id } = payload

  const user = await db.users.findById(user_id)

  if (!user) {
    throw new Unauthorized('unauthorized-authentication', 'Access unauthorized')
  }

  const operation = await db.operations.create({
    amount,
    label,
    tags,
    user_id,
  })

  return operation
}

export default create
