import createToken from './create-token'
import verify from './verify'

import Database from '../../types/database'

interface AuthorizationDomain {
  <T extends Database>(config: { db: T, secret: string }) : any
}

const AuthorizationDomain: AuthorizationDomain = ({ db, secret }) => ({
  createToken: createToken({ secret, db }),
  verify: verify(secret),
})

export default AuthorizationDomain
