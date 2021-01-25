import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import Database from '../../types/database'

import { Unauthorized } from '../../errors'

interface createToken {
  (config: { db: Database, secret: string })
    : (payload: { email: string, password: string }) => Promise<string>
}

const createToken: createToken = config => async ({ email, password }) => {
  const { db, secret } = config

  const user = await db.users.findByEmail(email)

  const isCorrectPassword = user && bcrypt.compareSync(password, user.password)

  if (!user || !isCorrectPassword) {
    throw new Unauthorized('wrong-credentials', 'Invalid e-mail or password')
  }

  const payload = {
    user: { id: user.id, email: user.email }
  }

  const options = { expiresIn: '1h' }
  return jwt.sign(payload, secret, options)
}

export default createToken
