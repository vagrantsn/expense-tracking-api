import db from '../../repositories'
const secret = process.env.JWT_SECRET

import AuthenticationDomain from '../../domains/authentication'

export default AuthenticationDomain({ db, secret })
