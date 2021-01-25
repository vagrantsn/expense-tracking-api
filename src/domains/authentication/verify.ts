import jwt from 'jsonwebtoken'

import User from '../../types/user'

const verify = (secret: string) => (token: string) => {
  try {
    const { user } = jwt.verify(token, secret) as { user: User }
    return user
  } catch (error) {
    return false
  }
}

export default verify
