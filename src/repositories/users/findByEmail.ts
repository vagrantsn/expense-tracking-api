import db from '../../database'
import { findByEmail } from '../../types/database/users'

let findByEmail: findByEmail = async (email) => {
  const user = await db.User.where('email', email).findOne()

  if (!user) return null

  return user.toObject()
}

export default findByEmail
