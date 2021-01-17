import Unauthorized from '../../errors/Unauthorized'

const create = db => async (
  { amount, label, tags = [], userId } :
  { amount: number, label: string, tags?: string[], userId: string }
) => {
  const user = await db.users.findById(userId)

  if (!user) {
    throw new Unauthorized('unauthorized-authentication', 'Access unauthorized')
  }

  const operation = await db.operations.create({
    amount,
    label,
    tags,
    userId,
  })

  return operation
}

export default create
