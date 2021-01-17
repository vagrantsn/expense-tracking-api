import db from '../../database'

import formatUser from './format'

const findByEmail = async (email: string) => {
  const user = await db.User.where('email', email).findOne().lean()

  return user && formatUser(user)
}

export default findByEmail
