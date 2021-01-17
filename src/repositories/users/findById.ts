import db from '../../database'

import formatUser from './format'

const findById = async (id: string) => {
  const user = await db.User.findById(id).lean()

  return user && formatUser(user)
}

export default findById
