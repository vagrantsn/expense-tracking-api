import db from '../../database'
import User from '../../types/User'

const findById = async (id: string) : Promise<User|null> => {
  const user = await db.User.findById(id)

  if (!user) return null

  return user.toObject()
}

export default findById
