import db from '../../database'
import { findById } from '../../types/database/users'

let findById: findById = async (id) => {
  const user = await db.User.findById(id)

  if (!user) return null

  return user.toObject()
}

export default findById
