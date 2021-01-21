import db from '../../database'
import User from '../../types/User'

const findByEmail = async (email: string) : Promise<User|null> => {
  const user = await db.User.where('email', email).findOne()

  if (!user) return null

  return user.toObject()
}

export default findByEmail
