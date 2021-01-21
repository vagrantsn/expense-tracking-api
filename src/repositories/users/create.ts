import db from '../../database'
import User from '../../types/User'

const create = async (
  { email, password } :
  { email: string, password: string }
) : Promise<User> => {
  const user = await new db.User({ email, password }).save()

  return user.toObject()
}

export default create
