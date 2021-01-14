import db from '../../database'

import formatUser from './format'

const findByEmail = async (email) => {
  const user = await db.User.where({ email }).findOne().lean()

  return user && formatUser(user)
}

export default findByEmail
