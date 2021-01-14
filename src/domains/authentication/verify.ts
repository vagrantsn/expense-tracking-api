import jwt from 'jsonwebtoken'

const verify = secret => (token) => {
  try {
    const { user } = jwt.verify(token, secret)
    return user
  } catch (error) {
    return false
  }
}

export default verify
