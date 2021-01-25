import bcrypt from 'bcrypt'

import Database from '../../types/database'
import { BadRequest } from '../../errors'

const create = (db: Database) => async (
  { email, password } :
  { email: string, password: string }
) => {
  const existentUser = await db.users.findByEmail(email)
  if (existentUser) {
    throw new BadRequest('unavailable-email', 'E-mail already registered')
  }

  let encrypted = bcrypt.hashSync(password, 10)

  const user = await db.users.create({
    email,
    password: encrypted,
  })

  return user
}

export default create
