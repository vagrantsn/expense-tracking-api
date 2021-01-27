import db from '../../database'
import { create } from '../../types/database/users'

let create: create = async ({ email, password }) => {
  const user = await new db.User({ email, password }).save()

  return user.toObject()
}

export default create
