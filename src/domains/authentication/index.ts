import createToken from './create-token'
import verify from './verify'

const AuthorizationDomain = ({ db, secret }) => ({
  createToken: createToken({ secret, db }),
  verify: verify(secret),
})

export default AuthorizationDomain
